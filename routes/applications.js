// routes/applications.js

const express = require("express");
const router = express.Router();
const JobApplication = require("../models/JobApplication");

router.get("/", async (req, res) => {
    try {
        const apps = await JobApplication.find({ userEmail: req.userEmail }).sort({ createdAt: -1 });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const app = await JobApplication.findOne({ _id: req.params.id, userEmail: req.userEmail });
        if (!app) {
            return res.status(404).json({ error: "Application not found or unauthorized" });
        }
        res.json(app);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newApp = new JobApplication({ ...req.body, userEmail: req.userEmail });
        await newApp.save();
        res.json(newApp);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await JobApplication.findOneAndUpdate(
            { _id: req.params.id, userEmail: req.userEmail },
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ error: "Application not found or unauthorized" });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await JobApplication.findOneAndDelete({
            _id: req.params.id,
            userEmail: req.userEmail,
        });
        if (!deleted) {
            return res.status(404).json({ error: "Application not found or unauthorized" });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;