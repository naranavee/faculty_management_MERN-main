const express = require("express");
const {
  login,
  register,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
  singleFaculty,
} = require("../controllers/FacultyController");

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/all", getAllFaculty);

router.post("/single", singleFaculty);

router.post("/update", updateFaculty);

router.post("/delete", deleteFaculty);

module.exports = router;
