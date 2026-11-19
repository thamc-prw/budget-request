# ระบบคำขอตั้งงบประมาณ (Production)

ไฟล์: `index.html` (ตัวระบบ), `Code.gs` (Apps Script), `Master.csv` (ปี/แผนงาน/หมวด), `Requests.csv` (ข้อมูลตั้งต้นจาก Excel)

## 1. เตรียม Google Sheet
1. สร้าง Google Sheet ใหม่
2. สร้างแท็บ `Master` แล้ว File > Import > Upload `Master.csv` (Replace current sheet)
3. สร้างแท็บ `Requests` แล้ว Import `Requests.csv` ในแท็บนี้ (Replace current sheet)
4. Share > General access > "Anyone with the link: Viewer" (ใช้ดึงข้อมูลหลัก)

## 2. Apps Script (บันทึก/อนุมัติ)
1. Extensions > Apps Script วางโค้ดจาก `Code.gs`
2. Deploy > New deployment > Web app > Execute as: Me, Access: Anyone
3. คัดลอก Web app URL (ลงท้าย /exec)

## 3. Deploy GitHub Pages
1. อัป `index.html` ขึ้น repo (ชื่อไฟล์ต้องเป็น `index.html`)
2. Settings > Pages > Deploy from branch `main` / root

## 4. ตั้งค่าในระบบ
เมนู ตั้งค่า (รหัส 1234) ใส่ Sheet ID, ชื่อแท็บ `Master`, Web App URL แล้วกด "บันทึกและโหลดข้อมูล"
ทุกการเพิ่ม แก้ไข ลบ อนุมัติ จะบันทึกลงแท็บ `Requests` อัตโนมัติ

## หมายเหตุ
- รหัสผ่านตั้งค่าและรหัสอนุมัติ (1234) ตรวจที่ฝั่งเบราว์เซอร์ ไม่ใช่การรักษาความปลอดภัยเต็มรูปแบบ
- หลังแก้ Code.gs ต้อง Deploy เวอร์ชันใหม่
