const Journal = require("../models/Journal");
const Faculty = require("../models/Faculty");

// Create Journal Controller
exports.createJournal = async (req, res) => {
  const { name, department, title, volume, issue, date, otherInfo, facultyId } =
    req.body;

  try {
    // Verify faculty exists
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Create a new journal entry
    const newJournal = new Journal({
      name,
      department,
      title,
      volume,
      issue,
      date,
      otherInfo,
    });

    // Save the journal entry
    await newJournal.save();

    // Add journal to faculty's list of journals
    faculty.journals.push(newJournal._id);
    await faculty.save();

    res
      .status(201)
      .json({ message: "Journal created successfully", newJournal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteJournal = async (req, res) => {
  try {
    const { journalID } = req.body;
    const journal = await Journal.findByIdAndDelete(journalID);
    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(201).json({ message: "Journal deleted successfully", journal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.approveJournal = async (req, res) => {
  const { journalId } = req.body;

  try {
    // Find the workshop by ID
    const journal = await Journal.findById(journalId);
    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    // Update the approval status
    journal.approved = true;
    await journal.save();

    res.status(200).json({ message: "Journal approved successfully", journal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Journal Controller
exports.updateJournal = async (req, res) => {
  const { journalId, name, department, title, volume, issue, date, otherInfo } =
    req.body;

  try {
    // Find the journal by ID
    const journal = await Journal.findById(journalId);
    console.log(journalId);
    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    // Update the journal fields
    journal.name = name || journal.name;
    journal.department = department || journal.department;
    journal.title = title || journal.title;
    journal.volume = volume || journal.volume;
    journal.issue = issue || journal.issue;
    journal.date = date || journal.date;
    journal.otherInfo = otherInfo || journal.otherInfo;

    // Save the updated journal
    await journal.save();

    res.status(200).json({ message: "Journal updated successfully", journal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
