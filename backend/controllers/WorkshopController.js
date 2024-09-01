const Workshop = require("../models/Workshops");
const Faculty = require("../models/Faculty");

// Create Workshop Controller
exports.createWorkshop = async (req, res) => {
  const { mail, name, venue, started, ended, days, facultyId } = req.body;

  try {
    // Verify faculty exists
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Create a new workshop entry
    const newWorkshop = new Workshop({
      mail,
      name,
      venue,
      started,
      ended,
      days,
    });

    // Save the workshop entry
    await newWorkshop.save();

    // Add workshop to faculty's list of workshops
    faculty.workshops.push(newWorkshop._id);
    await faculty.save();

    res
      .status(201)
      .json({ message: "Workshop created successfully", newWorkshop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteWorkshop = async (req, res) => {
  try {
    const { workshopID } = req.body;
    const workshop = await Workshop.findByIdAndDelete(workshopID);
    if (!workshop) {
      return res.status(404).json({ message: "workshop not found" });
    }

    res
      .status(201)
      .json({ message: "workshop deleted successfully", workshop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.approveWorkshops = async (req, res) => {
  const { workshopId } = req.body;

  try {
    // Find the workshop by ID
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: "workshop not found" });
    }

    // Update the approval status
    workshop.approved = true;
    await workshop.save();

    res
      .status(200)
      .json({ message: "workshop approved successfully", workshop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Workshop Controller
exports.updateWorkshop = async (req, res) => {
  const { workshopId, mail, name, venue, started, ended, days } = req.body;

  try {
    // Find the workshop by ID
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    // Update the workshop fields
    workshop.mail = mail || workshop.mail;
    workshop.name = name || workshop.name;
    workshop.venue = venue || workshop.venue;
    workshop.started = started || workshop.started;
    workshop.ended = ended || workshop.ended;
    workshop.days = days || workshop.days;

    // Save the updated workshop
    await workshop.save();

    res
      .status(200)
      .json({ message: "Workshop updated successfully", workshop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
