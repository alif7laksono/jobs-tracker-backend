// routes/applications.js

const express = require("express");
const router = express.Router();
const JobApplication = require("../models/JobApplication");

// GET all job applications (optional: filter by email via query param)
router.get("/", async (req, res) => {
    try {
        const { userEmail } = req.query;

        if (!userEmail) {
            return res.status(400).json({ error: "Missing userEmail in query" });
        }

        const applications = await JobApplication.find({ userEmail });
        res.json(applications);
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
router.delete("/applications/:id", async (req, res) => {
    try {
        const updated = await JobApplication.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json(updated);
    } catch (error) {
        console.error("Error deleting application:", error);
        res.status(500).json({ message: "Failed to delete application" });
    }
});

// GET all deleted applications
router.get("/trash", async (req, res) => {
    try {
        const { userEmail } = req.query;

        if (!userEmail) {
            return res.status(400).json({ error: "Missing userEmail in query" });
        }

        const deletedApps = await JobApplication.find({
            userEmail,
            isDeleted: true
        });
        res.json(deletedApps);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// RESTORE a deleted application
router.put("/trash/restore/:id", async (req, res) => {
    try {
        const restored = await JobApplication.findByIdAndUpdate(
            req.params.id,
            { isDeleted: false, deletedAt: null },
            { new: true }
        );

        if (!restored) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json(restored);
    } catch (error) {
        console.error("Error restoring application:", error);
        res.status(500).json({ message: "Failed to restore application" });
    }
});

// PERMANENTLY DELETE an application from trash
router.delete("/trash/:id", async (req, res) => {
    try {
        const deleted = await JobApplication.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json({ message: "Application permanently deleted" });
    } catch (error) {
        console.error("Error permanently deleting application:", error);
        res.status(500).json({ message: "Failed to permanently delete application" });
    }
});



module.exports = router;
