// api/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors({ origin: ["https://jobs-tracker-frontend.vercel.app", "http://localhost:3000"] }));
app.use(express.json());

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decoded.email;
        req.userRole = decoded.role;
        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/applications", verifyToken, require("../routes/applications"));

module.exports = app;