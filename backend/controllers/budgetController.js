const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

// @route POST /api/budget
const setBudget = async (req, res) => {
  try {
    const { category, monthlyLimit, month, year } = req.body;

    if (!category || !monthlyLimit || !month || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const budget = await Budget.findOneAndUpdate(
      { userId: req.user._id, category, month, year },
      { monthlyLimit },
      { new: true, upsert: true }
    );

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/budget?month=&year=
const getBudgets = async (req, res) => {
  try {
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;
    const year = parseInt(req.query.year) || new Date().getFullYear();

    const budgets = await Budget.find({ userId: req.user._id, month, year });

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const expenses = await Expense.find({
      userId: req.user._id,
      date: { $gte: startDate, $lte: endDate },
    });

    const spentByCategory = {};
    expenses.forEach((exp) => {
      spentByCategory[exp.category] = (spentByCategory[exp.category] || 0) + exp.amount;
    });

    const result = budgets.map((b) => ({
      _id: b._id,
      category: b.category,
      monthlyLimit: b.monthlyLimit,
      spent: spentByCategory[b.category] || 0,
      remaining: b.monthlyLimit - (spentByCategory[b.category] || 0),
      exceeded: (spentByCategory[b.category] || 0) > b.monthlyLimit,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { setBudget, getBudgets };
