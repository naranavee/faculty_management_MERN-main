const Faculty = require("../models/Faculty"); // Adjust the path according to your project structure

// Register Controller
exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    mobile,
    dob,
    doj,
    address,
    designation,
    department,
    qualification,
    salary,
    married,
  } = req.body;

  try {
    // Check if the user already exists
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    // Create a new faculty (without password hashing)
    const newFaculty = new Faculty({
      name,
      email,
      password,
      gender,
      mobile,
      dob,
      doj,
      address,
      designation,
      department,
      qualification,
      salary,
      married,
    });

    // Save the new faculty to the database
    await newFaculty.save();

    res.status(201).json({ message: "Faculty registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password matches
    if (faculty.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", faculty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Faculty Controller
exports.getAllFaculty = async (req, res) => {
  try {
    const facultyList = await Faculty.find()
      .populate("journals")
      .populate("workshops")
      .populate("leaves");
    res.status(200).json(facultyList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.singleFaculty = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const faculty = await Faculty.findById(id)
      .populate("journals")
      .populate("workshops")
      .populate("leaves");

    if (faculty) {
      return res.status(200).send({
        message: "Success",
        success: true,
        faculty,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Faculty Controller
exports.updateFaculty = async (req, res) => {
  const { id } = req.body;
  const {
    name,
    email,
    password,
    gender,
    mobile,
    dob,
    doj,
    address,
    designation,
    department,
    qualification,
    salary,
    married,
  } = req.body;

  try {
    // Find and update the faculty record
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password, // Update only if necessary (e.g., if changing password)
        gender,
        mobile,
        dob,
        doj,
        address,
        designation,
        department,
        qualification,
        salary,
        married,
      },
      { new: true } // Return the updated document
    );

    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json(updatedFaculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Faculty Controller
exports.deleteFaculty = async (req, res) => {
  const { id } = req.body;

  try {
    // Find and delete the faculty record
    const deletedFaculty = await Faculty.findByIdAndDelete(id);

    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
