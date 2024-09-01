const express = require("express");

const {
  createWorkshop,
  approveWorkshops,
  deleteWorkshop,
  updateWorkshop,
} = require("../controllers/WorkshopController");

const router = express.Router();

router.post("/create", createWorkshop);

router.post("/delete", deleteWorkshop);

router.post("/approve", approveWorkshops);

router.post("/update", updateWorkshop);

module.exports = router;
