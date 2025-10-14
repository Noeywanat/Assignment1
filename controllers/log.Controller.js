const axios = require('axios');

const DRONE_LOG_URL = process.env.DRONE_LOG_URL;
const DRONE_LOG_API_TOKEN = process.env.DRONE_LOG_API_TOKEN;

exports.getLogs = async (req, res) => {
    // ...
};


exports.createLog = async (req, res) => {
  try {
    const { drone_id, drone_name, country, celsius } = req.body;

    if (!drone_id || !drone_name || !country || celsius === undefined) {
      return res.status(400).json({ message: 'Missing required fields: drone_id, drone_name, country, celsius' });
    }

    if (!DRONE_LOG_URL || !DRONE_LOG_API_TOKEN) {
        console.error("!!! ERROR: DRONE_LOG_URL or DRONE_LOG_API_TOKEN is not defined in .env file.");
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