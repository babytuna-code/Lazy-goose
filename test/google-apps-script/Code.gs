/**
 * Lazy Goose — รับคะแนนแบบทดสอบรวมบทแล้วบันทึกลง Google Sheets
 * วิธีใช้: ดูไฟล์ README_หลังบ้าน.md ในโฟลเดอร์ test
 *
 * นำโค้ดนี้ไปวางใน Google Sheets > ส่วนขยาย > Apps Script
 * แล้ว Deploy เป็น Web app (Execute as: Me, Who has access: Anyone)
 *
 * หน้าหลังบ้านครู (test/admin.html) จะดึงคะแนนของทุกเครื่องจากชีตนี้ผ่าน doGet
 * โดยต้องใส่รหัสผ่านให้ตรงกับ ADMIN_PIN ด้านล่าง และ adminPin ใน score-config.js
 */

// รหัสผ่านสำหรับดึงข้อมูลไปแสดงในหน้าหลังบ้าน — ต้องตรงกับ adminPin ใน score-config.js
const ADMIN_PIN = "1234";

const SHEET_NAME = "คะแนนแบบทดสอบรวมบท";
const TOTAL = 10;

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const header = ["รหัสการสอบ", "วันที่-เวลา", "Username",
      "คะแนน", "คะแนนเต็ม", "ร้อยละ",
      "เกมอัตราส่วน (เต็ม 5)", "เกมสัดส่วน (เต็ม 5)", "เกมร้อยละ (เต็ม 5)",
      "แบบทดสอบ: อัตราส่วน", "แบบทดสอบ: สัดส่วน", "แบบทดสอบ: ร้อยละ"];
    for (let q = 1; q <= TOTAL; q++) header.push("ข้อ " + q);
    for (let q = 1; q <= TOTAL; q++) header.push("โจทย์ข้อ " + q);
    for (let q = 1; q <= TOTAL; q++) header.push("คำตอบข้อ " + q);
    header.push("ข้อมูลดิบ (ใช้กับหน้าหลังบ้าน)");
    sheet.appendRow(header);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, header.length).setFontWeight("bold").setBackground("#abe4b7");
  }
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();

    // กันข้อมูลซ้ำ (การสอบรอบเดียวกันส่งมาซ้ำ)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().map(r => String(r[0]));
      if (ids.indexOf(String(data.id)) !== -1) {
        return json_({ ok: true, duplicate: true });
      }
    }

    const questions = data.questions || [];
    const marks = questions.map(q => (!q.answered ? "-" : (q.correct ? "ถูก" : "ผิด")));
    const answers = questions.map(q => q.answer || "-");
    const questionIds = questions.map(q => q.id || "-");

    const games = data.games || {};
    const chapters = data.chapters || {};
    const chapter = key => chapters[key] ? chapters[key].right + "/" + chapters[key].total : "-";
    const game = key => (games[key] === null || games[key] === undefined) ? "ยังไม่เล่น" : games[key];

    sheet.appendRow([
      data.id,
      new Date(data.finishedAt),
      data.name,
      data.score,
      data.total,
      data.percent,
      game("ratio"),
      game("prop"),
      game("percent"),
      chapter("ratio"),
      chapter("prop"),
      chapter("percent")
    ].concat(marks, questionIds, answers, [JSON.stringify(data)]));

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

// ?action=list&pin=รหัสผ่าน → ส่งคะแนนทั้งหมดให้หน้าหลังบ้าน (admin.html)
// เปิดลิงก์ Web app เฉย ๆ ในเบราว์เซอร์ = ทดสอบว่าใช้งานได้
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action !== "list") {
    return ContentService.createTextOutput("Lazy Goose score API พร้อมใช้งาน");
  }
  if (String(p.pin) !== String(ADMIN_PIN)) {
    return json_({ ok: false, error: "รหัสผ่านไม่ถูกต้อง" });
  }

  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const records = [];
  if (lastRow > 1) {
    const raw = sheet.getRange(2, lastCol, lastRow - 1, 1).getValues();
    raw.forEach(row => {
      try { records.push(JSON.parse(row[0])); } catch (err) { /* ข้ามแถวที่อ่านไม่ได้ */ }
    });
  }
  return json_({ ok: true, records: records });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
