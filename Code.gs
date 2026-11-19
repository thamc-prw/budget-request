// Google Apps Script: Extensions > Apps Script ของ Google Sheet แล้ววางโค้ดนี้
// Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone
const SHEET = 'Requests';
const HEAD = ['id','year','type','plan','cat','name','value','desc','status','apv','requester','dept','updated','ts','parentId','apvTs'];

function sheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); }
  sh.getRange(1, 1, 1, HEAD.length).setValues([HEAD]);
  return sh;
}

function doGet() {
  const v = sheet_().getDataRange().getValues().slice(1).filter(r => r[0]);
  const rows = v.map(r => ({
    id: String(r[0]), year: String(r[1]), type: r[2], plan: r[3], cat: r[4], name: r[5],
    value: Number(r[6]) || 0, desc: r[7], status: r[8], apv: Number(r[9]) || 0, requester: r[10], dept: r[11], ts: Number(r[13]) || 0, parentId: r[14] || '', apvTs: Number(r[15]) || 0
  }));
  return ContentService.createTextOutput(JSON.stringify({ requests: rows })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const b = JSON.parse(e.postData.contents), sh = sheet_();
    const ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(r => String(r[0])) : [];
    (b.upsert || []).forEach(r => {
      const row = [r.id, r.year, r.type, r.plan, r.cat, r.name, r.value, r.desc, r.status || '', r.apv || 0, r.requester || '', r.dept || '', new Date(), r.ts || 0, r.parentId || '', r.apvTs || 0];
      const i = ids.indexOf(String(r.id));
      if (i >= 0) sh.getRange(i + 2, 1, 1, row.length).setValues([row]);
      else { sh.appendRow(row); ids.push(String(r.id)); }
    });
    (b.remove || []).forEach(id => {
      const i = ids.indexOf(String(id));
      if (i >= 0) { sh.deleteRow(i + 2); ids.splice(i, 1); }
    });
  } finally { lock.release(); }
  return ContentService.createTextOutput('ok');
}
