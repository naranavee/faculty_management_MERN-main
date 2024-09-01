const express = require("express");

const {
  deleteJournal,
  approveJournal,
  createJournal,
  updateJournal,
} = require("../controllers/JournalController");

const router = express.Router();

router.post("/create", createJournal);

router.post("/delete", deleteJournal);

router.post("/approve", approveJournal);

router.post("/update", updateJournal);

module.exports = router;
