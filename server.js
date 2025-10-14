const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(express.json());


app.use(cors());


const configRoutes = require("./routes/config.Routes");
const statusRoutes = require("./routes/status.Routes");
const logRoutes = require("./routes/log.Routes");

app.use("/configs", configRoutes);
app.use("/status", statusRoutes);
app.use("/logs", logRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});