# Drone API Server (Assignment1)
API Server ที่สร้างด้วย Node.js และ Express.js 

## Live API Endpoint

**Base URL:** `https://drone-api-a43n.onrender.com`

---

## API Endpoints & test

### 1. Get Drone Config
- **Endpoint:** `GET /configs/:droneId`
- ดึงข้อมูล Config ของโดรนตาม ID ที่ระบุ
- **test:** curl https://drone-api-a43n.onrender.com/configs/66010727

### 2. Get Drone Status
- **Endpoint:** `GET /status/:droneId`
- ดึงข้อมูลสถานะของโดรน
- **test:** curl https://drone-api-a43n.onrender.com/status/66010727

### 3. Get Drone Logs
- **Endpoint:** `GET /logs/:droneId`
- ดึงข้อมูล Logs การทำงานของโดรน
- **test:** curl "https://drone-api-a43n.onrender.com/logs/66010727"

### 4. Create New Log
- **Endpoint:** `POST /logs`
- สร้าง Log record ใหม่
- **test:** curl -X POST https://drone-api-a43n.onrender.com/logs \
    -H "Content-Type: application/json" \
    -d '{"drone_id":66010727,"drone_name":"MyDrone","country":"TH","celsius":35}'

---

## การติดตั้ง และ run (Local)

### สิ่งที่ต้องมี
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### ขั้นตอน
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Noeywanat/Assignment1.git
    cd Assignment1
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **สร้างไฟล์ `.env`:**
    สร้างไฟล์ `.env` ใน root ของโปรเจกต์ และใส่ค่าตัวแปรตามนี้:
    ```
    DRONE_CONFIG_URL=[https://script.google.com/macros/s/AKfycbzwclqJRodyVjzYyY-NTQDb9cWG6Hoc5vGAABVtr5-jPA_ET_2IasrAJK4aeo5XoONiaA/exec](https://script.google.com/macros/s/AKfycbzwclqJRodyVjzYyY-NTQDb9cWG6Hoc5vGAABVtr5-jPA_ET_2IasrAJK4aeo5XoONiaA/exec)
    DRONE_LOG_URL=[https://app-tracking.pockethost.io/api/collections/drone_logs/records](https://app-tracking.pockethost.io/api/collections/drone_logs/records)
    DRONE_LOG_API_TOKEN=20250901efx
    PORT=3000
    ```

4.  **Run the server:**
    ```bash
    npm start
    ```
    เซิร์ฟเวอร์จะทำงานที่ `http://localhost:3000`

---

## โครงสร้างโปรเจกต์
- **/controllers**: จัดการ Logic การทำงานของแต่ละ Endpoint
- **/routes**: กำหนด Path และเชื่อมต่อกับ Controller ที่ถูกต้อง
- **server.js**: ไฟล์เริ่มต้นสำหรับตั้งค่าและรันเซิร์ฟเวอร์