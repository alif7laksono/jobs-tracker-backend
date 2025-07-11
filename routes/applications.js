const express = require("express");
const router = express.Router();
const JobApplication = require("../models/JobApplication")

// Get All
router.get("/", async (req, res) => {
    const apps = await JobApplication.find().sort({ createdAt: -1 })
    res.json(apps)
})

// Get one Application
router.get("/:id", async (req, res) => {
    const app = await JobApplication.findById(req.params.id);
    res.json(app);
})

// POST create new
router.post("/", async (req, res) => {
    const newApp = new JobApplication(req.body);
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