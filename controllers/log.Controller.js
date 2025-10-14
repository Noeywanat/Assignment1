// ในไฟล์ controllers/log.Controller.js

exports.getLogs = async (req, res) => {
  try {

    const config = {
      headers: {
        'Authorization': `Bearer ${DRONE_LOG_API_TOKEN}`
      },
      params: {
        page: page,
        perPage: limit,
        sort: '-created',
        filter: `drone_id=${droneId}`
      },
      timeout: 20000
    };

    const response = await axios.get(DRONE_LOG_URL, config);


  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error("!!! Timeout Error: Drone Log Server took too long to respond.");
      return res.status(504).json({ error: "Gateway Timeout: The Drone Log Server is not responding." });
    }

    console.error("!!! Detailed Error Fetching Logs:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};