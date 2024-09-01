const Leave = require("../models/Leaves");
const Faculty = require("../models/Faculty"); // Adjust the path according to your project structure

// Create Leave Controller
exports.createLeave = async (req, res) => {
  const { facultyId, reason, date } = req.body;

  try {
    // Find the faculty by ID
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Create a new leave entry
    const newLeave = new Leave({
      reason,
      date,
    });

    // Save the leave entry
    await newLeave.save();

    // Add leave to faculty's leaves
    faculty.leaves.push(newLeave._id);
    await faculty.save();

    res.status(201).json({ message: "Leave created successfully", newLeave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.approveLeave = async (req, res) => {
  const { leaveId } = req.body;

  try {
    // Find the leave by ID
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Update the approval status
    leave.approved = true;
    await leave.save();

    res.status(200).json({ message: "Leave approved successfully", leave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteLeave = async (req, res) => {
  const { leaveId } = req.body;

  try {
    // Find the leave by ID
    const leave = await Leave.findByIdAndDelete(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ message: "Leave deleted successfully", leave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
