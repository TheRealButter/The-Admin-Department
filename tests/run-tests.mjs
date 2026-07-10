import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const code = readFileSync(new URL('../app/assets/engine.js', import.meta.url), 'utf8');
const context = { console, globalThis: {} };
context.globalThis = context;
vm.createContext(context);
vm.runInContext(code, context);
const E = context.AdminEngine;

const expectedFails = {
  invoice: ['INV-008', 'INV-009', 'INV-010'],
  sales: ['LEAD-008', 'LEAD-009', 'LEAD-010'],
  client: ['ONB-008', 'ONB-009', 'ONB-010']
};
const idKey = { invoice: 'record_id', sales: 'lead_id', client: 'client_id' };

for (const system of ['invoice', 'sales', 'client']) {
  const records = E.sampleRecords(system);
  const validations = records.map((r) => E.validate(system, r, records));
  const failed = records.filter((_, i) => validations[i].status === 'Fail').map((r) => r[idKey[system]]);
  const passed = records.length - failed.length;
  assert.equal(records.length, 10, `${system}: sample set should contain 10 records`);
  assert.equal(passed, 7, `${system}: should pass 7 records`);
  assert.equal(JSON.stringify(failed), JSON.stringify(expectedFails[system]), `${system}: failing records should match expected blockers`);
  const report = E.report(system, records);
  assert.equal(report.total, 10, `${system}: report total should be 10`);
  assert.equal(report.passed, 7, `${system}: report passed should be 7`);
  assert.equal(report.failed, 3, `${system}: report failed should be 3`);
  const roundTrip = E.parseCSV(E.toCSV(system, records));
  assert.equal(roundTrip.length, records.length, `${system}: CSV round-trip should preserve row count`);
  assert.equal(roundTrip[0][idKey[system]], records[0][idKey[system]], `${system}: CSV round-trip should preserve first ID`);
}

console.log('All Admin HQ modular validation tests passed.');
