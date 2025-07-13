// routes/applications.js

const express = require("express");
const router = express.Router();
const JobApplication = require("../models/JobApplication");

// GET all job applications (optional: filter by email via query param)
router.get("/", async (req, res) => {
    try {
        const { email } = req.query;
        const query = email ? { userEmail: email } : {};
        const apps = await JobApplication.find(query).sort({ createdAt: -1 });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// GET one application by ID
router.get("/:id", async (req, res) => {
    try {
        const app = await JobApplication.findById(req.params.id);
        if (!app) return res.status(404).json({ error: "Application not found" });
        res.json(app);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// CREATE a new application
router.post("/", async (req, res) => {
    try {
        const newApp = new JobApplication(req.body);
        await newApp.save();
        res.json(newApp);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// UPDATE an application
router.put("/:id", async (req, res) => {
    try {
        const updated = await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Application not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE an application
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await JobApplication.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Application not found" });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
