# Drone API Server (Assignment #1)

API Server ที่สร้างด้วย Node.js และ Express.js สำหรับจัดการข้อมูลเกี่ยวกับโดรน โดยดึงและส่งข้อมูลไปยังเซิร์ฟเวอร์ภายนอก

## Live API Endpoint

**Base URL:** `<YOUR_DEPLOYED_APP_URL>`  
*(คุณจะได้รับ URL นี้หลังจาก Deploy โปรเจกต์สำเร็จ)*

---

## API Endpoints & Test

### 1. Get Drone Config
- **Endpoint:** `GET /configs/:droneId`
- **ตัวอย่าง:**
  ```bash
  curl <YOUR_DEPLOYED_APP_URL>/configs/3001
  ```

### 2. Get Drone Status
- **Endpoint:** `GET /status/:droneId`
- **ตัวอย่าง:**
  ```bash
  curl <YOUR_DEPLOYED_APP_URL>/status/3001
  ```

### 3. Get Drone Logs
- **Endpoint:** `GET /logs/:droneId`
- **ตัวอย่าง:**
  ```bash
  curl "<YOUR_DEPLOYED_APP_URL>/logs/3001?page=1&limit=5"
  ```

### 4. Create New Log
- **Endpoint:** `POST /logs`
- **ตัวอย่าง:**
  ```bash
  curl -X POST <YOUR_DEPLOYED_APP_URL>/logs -H "Content-Type: application/json" -d '{"drone_id":3001,"drone_name":"MyDrone","country":"TH","celsius":35}'
  ```

---

## การติดตั้งและ run (Local)

### สิ่งที่ต้องมี
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### ขั้นตอน
1.  **Clone the repository:**
    ```bash
    git clone <your-github-repository-url>
    cd <project-folder-name>
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

## 📂 โครงสร้าง
- **/controllers**: จัดการ Logic การทำงานของแต่ละ Endpoint
- **/routes**: กำหนด Path และเชื่อมต่อกับ Controller
- **server.js**: ไฟล์เริ่มต้นสำหรับตั้งค่าและรันเซิร์ฟเวอร์