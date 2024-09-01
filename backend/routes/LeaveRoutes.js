const express = require("express");
const {
  createLeave,
  approveLeave,
  deleteLeave,
} = require("../controllers/LeaveController");

const router = express.Router();

router.post("/create", createLeave);

router.post("/approve", approveLeave);

router.post("/delete", deleteLeave);

module.exports = router;
