// api/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors({ origin: ["https://jobs-tracker-frontend.vercel.app", "http://localhost:3000"] }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Mount routes
app.use("/api/applications", require("../routes/applications"));

module.exports = app;
