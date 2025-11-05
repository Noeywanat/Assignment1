const axios = require('axios');

const DRONE_LOG_URL = process.env.DRONE_LOG_URL;
const DRONE_LOG_API_TOKEN = process.env.DRONE_LOG_API_TOKEN;

// GET /logs/:droneId
exports.getLogs = async (req, res) => {
    try {
        const { droneId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12; // limit คือ perPage

        if (!DRONE_LOG_URL || !DRONE_LOG_API_TOKEN) {
            console.error("!!! ERROR: DRONE_LOG_URL or DRONE_LOG_API_TOKEN is not defined.");
            return res.status(500).json({ error: "Server configuration error." });
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${DRONE_LOG_API_TOKEN}`
            },
            // ส่งพารามิเตอร์ page และ limit ให้ API ภายนอก
            params: {
                page: page,
                // *** แก้ไข: เปลี่ยน 'perPage' เป็น 'limit' เพื่อแก้ Error 400 ***
                limit: limit, 
                sort: '-created',
                filter: `drone_id=${droneId}`
            },
            timeout: 20000 
        };

        const response = await axios.get(DRONE_LOG_URL, config);
        
        // 1. ดึง Log ที่ถูกตัดมาแล้ว (items) และข้อมูลเมตา (meta)
        const items = response.data.items || [];
        const meta = response.data.meta || {};
        
        // 2. ดึง Total Count (จำนวน Log ทั้งหมด) จาก Meta Data
        const totalCount = meta.totalItems || meta.totalCount || 0; 
        
        // 3. จัดรูปแบบ Log
        const logs = items.map(log => ({
            drone_id: log.drone_id,
            drone_name: log.drone_name,
            created: log.created,
            country: log.country,
            celsius: log.celsius
        }));

        // 4. ส่ง logs และ totalCount กลับไปให้ Front-end
        res.json({ logs, totalCount }); 

    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error("!!! Timeout Error: Drone Log Server took too long to respond.");
            return res.status(504).json({ error: "Gateway Timeout: The Drone Log Server is not responding." });
        }

        // หากยังเกิด Error 400 อีกครั้ง โค้ดนี้จะ Log ข้อความ Error เต็มๆ ที่ได้จาก API ภายนอกออกมา
        console.error("!!! Detailed Error Fetching Logs:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch logs" });
    }
};

// POST /logs (ไม่ได้แก้ไข)
exports.createLog = async (req, res) => {
    try {
        const { drone_id, drone_name, country, celsius } = req.body;

        if (!drone_id || !drone_name || !country || celsius === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (!DRONE_LOG_URL || !DRONE_LOG_API_TOKEN) {
            console.error("!!! ERROR: DRONE_LOG_URL or DRONE_LOG_API_TOKEN is not defined.");
            return res.status(500).json({ error: "Server configuration error." });
        }

        const logData = { drone_id, drone_name, country, celsius };
        const config = {
            headers: {
                'Authorization': `Bearer ${DRONE_LOG_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(DRONE_LOG_URL, logData, config);

        res.status(201).json(response.data);

    } catch (error) {
        console.error("!!! Detailed Error Creating Log:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to create log" });
    }
};