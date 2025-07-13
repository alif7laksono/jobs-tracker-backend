const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    jobType: { type: String, enum: ["Full-time", "Internship", "Contract", "Part-time", "Freelance"] },
    status: { type: String, enum: ["Applied", "Interviewing", "Rejected", "Offer", "Accepted"] },
    applicationDate: { type: Date, default: Date.now },
    jobLink: { type: String, match: /^https?:\/\/[^\s$.?#].[^\s]*$/ },
    notes: { type: String, maxlength: 1000 },
    userEmail: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model("JobApplicationSchema", JobApplicationSchema)