const express = require("express");
const router = express.Router();
const JobApplication = require("../models/JobApplication")

// Get All
router.get("/", async (req, res) => {
    try {
        const { userEmail } = req.query;
        if (!userEmail) {
            return res.status(400).json({ error: "Missing userEmail in query" });
        }
        const apps = await JobApplication.find({ userEmail }).sort({ createdAt: -1 });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get one Application
router.get("/:id", async (req, res) => {
    try {
        const app = await JobApplication.findOne({ _id: req.params.id, userEmail: req.query.userEmail });
        if (!app) return res.status(404).json({ error: "Application not found or unauthorized" });
        res.json(app);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// POST create new
router.post("/", async (req, res) => {
    const { userEmail, ...rest } = req.body;

    if (!userEmail) {
        return res.status(400).json({ error: "User email is required" });
    }

    const newApp = new JobApplication({ ...rest, userEmail });
    await newApp.save();
    res.json(newApp);
});

// PUT update
router.put("/:id", async (req, res) => {
    const updated = await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;