const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    jobType: { type: String, enum: ["Full-time", "Internship", "Contract"] },
    status: { type: String, enum: ["Applied", "Interviewing", "Rejected", "Offer"] },
    applicationDate: String,
    jobLink: String,
    notes: String,
})

module.exports = mongoose.model("JobApplicationSchema", JobApplicationSchema)