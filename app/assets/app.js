(function () {
  'use strict';
  var E = window.AdminEngine;
  var system = document.body.dataset.system || 'invoice';
  var config = E.systems[system];
  var records = load();
  var editingIndex = null;

  function $(id) { return document.getElementById(id); }
  function escapeHtml(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]; }); }
  function load() { try { return JSON.parse(localStorage.getItem(config.storageKey)) || []; } catch (e) { return []; } }
  function save() { localStorage.setItem(config.storageKey, JSON.stringify(records)); }
  function fieldKeys() { return config.fields.map(function (f) { return f[0]; }); }
  function idOf(r) { return r[config.id] || ''; }

  function statusPill(result) { return '<span class="pill ' + result.status.toLowerCase() + '">' + result.status + '</span>'; }
  function render() {
    var validations = records.map(function (r) { return E.validate(system, r, records); });
    var rep = E.report(system, records);
    $('system-title').textContent = config.label;
    $('system-subtitle').textContent = system === 'invoice' ? 'Supplier invoices, approvals, filing, duplicates and exceptions.' : system === 'sales' ? 'Enquiries, quotes, follow-ups and lost-lead risk.' : 'Onboarding, documents, payment, folders and handover gates.';
    $('record-count').textContent = records.length;
    $('pass-count').textContent = rep.passed;
    $('fail-count').textContent = rep.failed;
    $('report-grid').innerHTML = Object.keys(rep).map(function (k) { return '<div class="metric"><span>' + label(k) + '</span><strong>' + rep[k] + '</strong></div>'; }).join('');
    renderTable(validations);
    $('blocked-list').innerHTML = records.map(function (r, i) { return { r: r, i: i, v: validations[i] }; }).filter(function (x) { return x.v.status === 'Fail'; }).map(function (x) { return '<li><strong>' + escapeHtml(idOf(x.r)) + '</strong><span>' + escapeHtml(x.v.flags.map(function (f) { return f.label; }).join(' · ')) + '</span></li>'; }).join('') || '<li><strong>Clear</strong><span>No blocked records.</span></li>';
  }
  function label(k) { return k.replace(/_/g, ' ').replace(/\b\w/g, function (m) { return m.toUpperCase(); }); }
  function renderTable(validations) {
    var keys = fieldKeys().slice(0, 7);
    $('records-table').innerHTML = '<thead><tr>' + keys.map(function (k) { return '<th>' + label(k) + '</th>'; }).join('') + '<th>Validation</th><th></th></tr></thead><tbody>' + records.map(function (r, i) {
      var v = validations[i];
      return '<tr class="' + v.status.toLowerCase() + '">' + keys.map(function (k) { return '<td>' + escapeHtml(r[k]) + '</td>'; }).join('') + '<td>' + statusPill(v) + '<small>' + escapeHtml(v.flags[0] ? v.flags[0].label : 'Ready') + '</small></td><td><button class="tiny" data-edit="' + i + '">Edit</button></td></tr>';
    }).join('') + '</tbody>';
    document.querySelectorAll('[data-edit]').forEach(function (b) { b.addEventListener('click', function () { openForm(Number(b.dataset.edit)); }); });
  }
  function openForm(index) {
    editingIndex = typeof index === 'number' ? index : null;
    var record = editingIndex === null ? {} : records[editingIndex];
    $('record-form').innerHTML = config.fields.map(function (f) {
      var key = f[0], name = f[1], type = f[2], value = record[key] || '';
      if (type === 'status') return '<label>' + name + '<select name="' + key + '">' + config.statuses.map(function (s) { return '<option ' + (s === value ? 'selected' : '') + '>' + s + '</option>'; }).join('') + '</select></label>';
      if (type.indexOf('select:') === 0) return '<label>' + name + '<select name="' + key + '">' + type.slice(7).split('|').map(function (s) { return '<option ' + (s === value ? 'selected' : '') + '>' + s + '</option>'; }).join('') + '</select></label>';
      return '<label>' + name + '<input name="' + key + '" type="' + (type || 'text') + '" value="' + escapeHtml(value) + '"></label>';
    }).join('');
    $('record-modal').showModal();
  }
  function formRecord() { return Object.fromEntries(new FormData($('record-form')).entries()); }
  function download(filename, text) { var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' })); a.download = filename; a.click(); URL.revokeObjectURL(a.href); }

  $('load-demo').addEventListener('click', function () { records = E.sampleRecords(system); save(); render(); });
  $('empty-data').addEventListener('click', function () { if (confirm('Clear records for this system?')) { records = []; save(); render(); } });
  $('add-record').addEventListener('click', function () { openForm(); });
  $('export-csv').addEventListener('click', function () { download(system + '-admin.csv', E.toCSV(system, records)); });
  $('import-csv').addEventListener('change', function (e) { var file = e.target.files[0]; if (!file) return; file.text().then(function (text) { records = E.parseCSV(text); save(); render(); }); });
  $('close-modal').addEventListener('click', function () { $('record-modal').close(); });
  $('record-form').addEventListener('submit', function (e) { e.preventDefault(); var r = formRecord(); if (editingIndex === null) records.unshift(r); else records[editingIndex] = r; save(); $('record-modal').close(); render(); });

  if (new URLSearchParams(location.search).get('demo') === '1' && !records.length) { records = E.sampleRecords(system); save(); }
  render();
})();
