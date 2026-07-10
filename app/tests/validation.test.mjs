import assert from 'node:assert/strict';

const today = '2026-07-10';
const has = (v) => v !== undefined && v !== null && String(v).trim() !== '';
const before = (d) => d && new Date(`${d}T00:00`) < new Date(`${today}T00:00`);
const active = (s, status) => !({ invoice: ['Filed','Paid','Rejected'], sales: ['Won','Lost','Cold','Closed'], client: ['Active','Cancelled'] }[s]).includes(status);

const data = {
  invoice: [
    ['INV-001','ABC Supplies','Invoice','INV-4521','2026-07-31','1437.50','Ready for Review','Admin','Owner','doc','folder','','No duplicate found','Approve invoice','2026-07-11'],
    ['INV-002','Quick Repairs','Invoice','QR-998','2026-07-15','4370','Missing Info','Admin','Owner','doc','folder','VAT number missing','No duplicate found','Request VAT number','2026-07-10'],
    ['INV-003','City Stationery','Receipt','RCPT-77','','356.50','Filed','Admin','Admin','doc','folder','','No duplicate found','No action',''],
    ['INV-004','Metro Cleaning','Invoice','MC-1044','2026-07-17','8760','Waiting for Approval','Admin','Owner','doc','folder','','New supplier','Approve supplier','2026-07-11'],
    ['INV-005','BuildMart','Invoice','BM-2201','2026-07-30','2910','Possible Duplicate','Admin','Owner','doc','folder','','Possible duplicate','Review duplicate','2026-07-11'],
    ['INV-006','ABC Supplies','Invoice','INV-4522','2026-07-11','2100','Ready for Review','Admin','Owner','doc','folder','','No duplicate found','Approve due-soon invoice','2026-07-10'],
    ['INV-007','','Invoice','UNK-001','2026-07-25','1200','Needs Capture','Admin','','doc','','Supplier missing','No duplicate found','Identify supplier','2026-07-11'],
    ['INV-008','Quick Repairs','Invoice','QR-997','2026-07-12','3200','New','','','doc','folder','','No duplicate found','','2026-07-08'],
    ['INV-009','ABC Supplies','Invoice','INV-4523','2026-07-29','500','Approved','Admin','','doc','folder','','No duplicate found','Add approval owner','2026-07-10'],
    ['INV-010','City Stationery','Receipt','RCPT-78','','180','Filed','Admin','Admin','','','','No duplicate found','Add links','2026-07-10']
  ],
  sales: [
    ['LEAD-001','Thabo Mokoena','Website','Gate motor repair','High','Needs Response','Owner','No','','','','Call and confirm',''],
    ['LEAD-002','Lerato Naidoo','WhatsApp','Office cleaning quote','Normal','Quote Sent','Admin','Yes','2026-07-10','4500','2026-07-12','Follow up',''],
    ['LEAD-003','Pieter Jacobs','Referral','Panel beating estimate','Normal','Won','Owner','Yes','2026-07-09','8200','','Schedule job','Won'],
    ['LEAD-004','Ayesha Khan','Facebook DM','Security camera installation','High','Follow-up Due','Admin','Yes','2026-07-08','12500','2026-07-10','Follow up before competitor',''],
    ['LEAD-005','Chris Botha','Phone','Monthly cleaning','Normal','Waiting for Client','Admin','Yes','2026-07-07','6800','2026-07-11','Wait for photos',''],
    ['LEAD-006','Naledi Jacobs','Email','Electrical compliance','Low','Cold','Owner','Yes','','','','','No response after 3 follow-ups'],
    ['LEAD-007','Musa Dlamini','Walk-in','Repair quote','Normal','Contacted','Admin','Yes','','','2026-07-13','Prepare estimate',''],
    ['LEAD-008','Faulty Quote','Website','Install quote','Normal','Quote Sent','Admin','Yes','2026-07-10','3500','','',''],
    ['LEAD-009','Ownerless Lead','WhatsApp','Urgent repair','High','Needs Response','','No','','','','',''],
    ['LEAD-010','No Reason Lost','Email','Service quote','Normal','Lost','Admin','Yes','','','','','']
  ],
  client: [
    ['ONB-001','Lerato Naidoo','Monthly Admin Support','Documents Requested','Admin','Yes','No','ID and agreement','Pending','Pending','Yes','folder','No','Follow up','2026-07-12'],
    ['ONB-002','Thabo Mokoena','Invoice Admin Setup','Ready to Start','Admin','Yes','Yes','','Signed','Paid','Yes','folder','Yes','Schedule kickoff','2026-07-11'],
    ['ONB-003','Pieter Jacobs','Sales Admin Setup','Waiting for Client','Owner','Yes','Partial','VAT and address','Pending','Pending','No','','No','Request missing details','2026-07-10'],
    ['ONB-004','Ayesha Khan','Property Admin','Payment/Agreement Pending','Admin','Yes','Yes','','Pending','Pending','Yes','folder','No','Send reminder','2026-07-10'],
    ['ONB-005','Chris Botha','Client Admin Setup','Active','Admin','Yes','Yes','','Signed','Paid','Yes','folder','Yes','Move to support','2026-07-15'],
    ['ONB-006','Demo Clean','Invoice Admin Setup','New Client','Admin','No','No','Business details','Pending','Pending','No','','No','Send welcome','2026-07-11'],
    ['ONB-007','Stuck Client','Sales Admin Setup','Stuck','Admin','Yes','Partial','Access details','Signed','Paid','Yes','folder','No','Escalate stuck onboarding','2026-07-10'],
    ['ONB-008','Bad Ready','Client Admin Setup','Ready to Start','Admin','Yes','Partial','Signed agreement','Signed','Paid','No','','Yes','','2026-07-10'],
    ['ONB-009','Bad Active Gates','Sales Admin Setup','Active','Admin','Yes','No','All docs','Pending','Pending','Yes','folder','Yes','','2026-07-10'],
    ['ONB-010','Bad Active Folder','Invoice Admin Setup','Active','Admin','Yes','Yes','','Signed','Paid','No','','No','','2026-07-10']
  ]
};

const fields = {
  invoice: ['id','supplier','type','ref','due','amount','status','owner','approver','doc','folder','missing','duplicate','next','nextDue'],
  sales: ['id','contact','source','service','urgency','status','owner','firstResponse','quoteDate','quoteAmount','followDue','next','reason'],
  client: ['id','client','package','status','owner','welcome','docs','missingDocs','agreement','payment','folder','folderLink','handover','next','nextDue']
};
const rows = (s) => data[s].map(a => Object.fromEntries(fields[s].map((f, i) => [f, a[i] || ''])));

function validate(s, r) {
  const x = [];
  if (s === 'invoice') {
    const adv = ['Ready for Review','Waiting for Approval','Approved','Filed','Paid'].includes(r.status);
    const miss = [];
    if (!has(r.supplier)) miss.push('supplier');
    if (!has(r.type)) miss.push('type');
    if (r.type === 'Invoice' && !has(r.ref)) miss.push('ref');
    if (r.type === 'Invoice' && !has(r.amount)) miss.push('amount');
    if (active(s, r.status) && !has(r.owner)) miss.push('owner');
    if (['Waiting for Approval','Approved','Ready for Review'].includes(r.status) && !has(r.approver)) miss.push('approver');
    if (['Filed','Paid'].includes(r.status) && (!has(r.doc) || !has(r.folder))) x.push('Filed/Paid records need document and folder links');
    if (miss.length && adv) x.push(`Missing fields: ${miss.join(', ')}`);
    if (active(s, r.status) && !has(r.owner)) x.push('Active record needs owner');
    if (r.status === 'Approved' && !has(r.approver)) x.push('Approved record needs approver');
    if (active(s, r.status) && before(r.nextDue)) x.push('Next action overdue');
  }
  if (s === 'sales') {
    const adv = ['Quote Sent','Follow-up Due','Won','Lost','Cold','Closed'].includes(r.status);
    const miss = [];
    if (!has(r.contact)) miss.push('contact');
    if (!has(r.service)) miss.push('service');
    if (active(s, r.status) && !has(r.owner)) miss.push('owner');
    if (active(s, r.status) && !has(r.next)) miss.push('next action');
    if (['Quote Sent','Follow-up Due'].includes(r.status) && !has(r.followDue)) miss.push('follow-up due');
    if (['Lost','Cold'].includes(r.status) && !has(r.reason)) miss.push('lost/cold reason');
    if (miss.length && adv) x.push(`Missing fields: ${miss.join(', ')}`);
    if (r.status === 'Quote Sent' && !has(r.followDue)) x.push('Quote Sent needs follow-up date');
    if (active(s, r.status) && !has(r.owner)) x.push('Active lead needs owner');
    if (active(s, r.status) && !has(r.next)) x.push('Active lead needs next action');
    if (['Lost','Cold'].includes(r.status) && !has(r.reason)) x.push('Lost/Cold needs reason');
    if (r.followDue && before(r.followDue) && active(s, r.status)) x.push('Follow-up overdue');
  }
  if (s === 'client') {
    const adv = ['Ready to Start','Active'].includes(r.status);
    const docs = r.docs !== 'Yes' || has(r.missingDocs);
    const agr = !['Signed','Not applicable'].includes(r.agreement);
    const pay = !['Paid','Not applicable'].includes(r.payment);
    const fold = r.folder !== 'Yes' || !has(r.folderLink);
    const hand = r.handover !== 'Yes';
    if (!has(r.client) && adv) x.push('Missing client');
    if (active(s, r.status) && !has(r.owner)) x.push('Active onboarding needs owner');
    if (adv && docs) x.push('Ready/Active blocked: documents incomplete');
    if (adv && agr) x.push('Ready/Active blocked: agreement not signed');
    if (adv && pay) x.push('Ready/Active blocked: payment not confirmed');
    if (adv && fold) x.push('Ready/Active blocked: folder missing/link blank');
    if (adv && hand) x.push('Ready/Active blocked: handover incomplete');
    if (active(s, r.status) && before(r.nextDue)) x.push('Next action overdue');
  }
  return [...new Set(x)].length ? 'Fail' : 'Pass';
}

const expected = {
  invoice: ['INV-008','INV-009','INV-010'],
  sales: ['LEAD-008','LEAD-009','LEAD-010'],
  client: ['ONB-008','ONB-009','ONB-010']
};

for (const system of ['invoice','sales','client']) {
  const records = rows(system);
  const failed = records.filter(r => validate(system, r) === 'Fail').map(r => r.id);
  const passed = records.filter(r => validate(system, r) === 'Pass').length;
  assert.equal(passed, 7, `${system}: should pass 7 records`);
  assert.equal(failed.length, 3, `${system}: should fail 3 records`);
  assert.deepEqual(failed, expected[system], `${system}: failing IDs should match expected blocked records`);
}

console.log('All Admin HQ validation tests passed.');
