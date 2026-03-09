const express = require("express");
const Drive = require("../models/Drive");
const Student = require("../models/Student");
const Application = require("../models/Application");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create Drive
router.post("/", protect, async (req, res) => {
  const drive = await Drive.create(req.body);
  res.json(drive);
});

// Get All Drives
router.get("/", async (req, res) => {
  const drives = await Drive.find();
  res.json(drives);
});

// Eligible Students
router.get("/:driveId/eligible-students", async (req, res) => {
  const drive = await Drive.findById(req.params.driveId);

  const students = await Student.find({
    cgpa: { $gte: drive.minCGPA },
    branch: { $in: drive.branches },
    backlogs: { $lte: drive.backlogsAllowed }
  });

  res.json({
    totalEligible: students.length,
    students
  });
});

// Apply to Drive
router.post("/:driveId/apply", protect, async (req, res) => {
  const student = await Student.findOne({ user: req.user._id });

  const application = await Application.create({
    student: student._id,
    drive: req.params.driveId
  });

  res.json(application);
});

// My Applications
router.get("/my-applications", protect, async (req, res) => {
  const student = await Student.findOne({ user: req.user._id });

  const apps = await Application.find({ student: student._id })
    .populate("drive");

  res.json(apps);
});

// Update Status
router.put("/:driveId/applications/:appId/status", protect, async (req, res) => {
  const application = await Application.findById(req.params.appId);

  application.status = req.body.status;
  await application.save();

  res.json(application);
});

module.exports = router;