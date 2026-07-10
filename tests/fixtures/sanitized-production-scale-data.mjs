export const SYSTEMS = ['invoice', 'sales', 'client', 'property', 'practice', 'member'];

export const ID_KEY = {
  invoice: 'record_id',
  sales: 'lead_id',
  client: 'client_id',
  property: 'property_record_id',
  practice: 'booking_id',
  member: 'member_id'
};

export const ID_PREFIX = {
  invoice: 'INV-PROD',
  sales: 'LEAD-PROD',
  client: 'ONB-PROD',
  property: 'PROP-PROD',
  practice: 'PRAC-PROD',
  member: 'MEM-PROD'
};

export const EXPECTED_FAILS_PER_TEN = {
  invoice: [7, 8, 9],
  sales: [7, 8, 9],
  client: [7, 8, 9],
  property: [7, 8, 9],
  practice: [7, 8, 9],
  member: [7, 8, 9]
};

const NAME_FIELD_PATTERN = /(supplier_name|contact_name|client_name|tenant_name|patient_name|member_name|property_name)$/;
const LINK_FIELD_PATTERN = /(link)$/;
const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const SA_ID_PATTERN = /\b\d{13}\b/;

function pad(n) {
  return String(n).padStart(4, '0');
}

function safeName(system, index) {
  return `Sanitized ${system} record ${pad(index + 1)}`;
}

function sanitizeRecord(system, record, index) {
  const clone = { ...record };
  const idKey = ID_KEY[system];
  clone[idKey] = `${ID_PREFIX[system]}-${pad(index + 1)}`;

  for (const key of Object.keys(clone)) {
    if (NAME_FIELD_PATTERN.test(key)) clone[key] = safeName(system, index);
    if (key === 'unit') clone[key] = `Unit ${((index % 24) + 1)}`;
    if (key === 'plan') clone[key] = index % 2 === 0 ? 'Monthly' : 'Annual';
    if (key === 'source' || key === 'channel') clone[key] = ['Website', 'Phone', 'WhatsApp', 'Email'][index % 4];
    if (key === 'supplier' && clone[key]) clone[key] = `Sanitized Supplier ${pad(index + 1)}`;
    if (LINK_FIELD_PATTERN.test(key) && clone[key]) clone[key] = `local-fixture-${system}-${pad(index + 1)}`;
  }

  return clone;
}

export function buildProductionScaleDataset(engine, system, count = 240) {
  const templates = engine.sampleRecords(system);
  if (!templates || templates.length !== 10) throw new Error(`${system}: expected 10 template records`);
  return Array.from({ length: count }, (_, index) => sanitizeRecord(system, templates[index % templates.length], index));
}

export function expectedFailIds(system, count = 240) {
  const failIndexes = EXPECTED_FAILS_PER_TEN[system];
  const ids = [];
  for (let i = 0; i < count; i += 1) {
    if (failIndexes.includes(i % 10)) ids.push(`${ID_PREFIX[system]}-${pad(i + 1)}`);
  }
  return ids;
}

export function assertSanitizedDataset(records) {
  for (const record of records) {
    const text = JSON.stringify(record);
    if (EMAIL_PATTERN.test(text)) throw new Error(`Fixture contains email-like data: ${text}`);
    if (SA_ID_PATTERN.test(text)) throw new Error(`Fixture contains SA-ID-like data: ${text}`);
  }
}
