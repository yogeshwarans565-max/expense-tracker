const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { setBudget, getBudgets } = require("../controllers/budgetController");

router.route("/").post(protect, setBudget).get(protect, getBudgets);

module.exports = router;
