import { useState, useEffect } from "react";
import api from "../services/api";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import BudgetForm from "../components/BudgetForm.jsx";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    const { data } = await api.get("/expenses");
    setExpenses(data);
  };

  const fetchBudgets = async () => {
    const { data } = await api.get("/budget");
    setBudgets(data);
  };

  const refreshAll = async () => {
    setLoading(true);
    await Promise.all([fetchExpenses(), fetchBudgets()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Total Spent</p>
          <p className="text-2xl font-bold text-primary">₹{totalSpent}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Total Transactions</p>
          <p className="text-2xl font-bold">{expenses.length}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Budgets Exceeded</p>
          <p className="text-2xl font-bold text-red-500">{budgets.filter((b) => b.exceeded).length}</p>
        </div>
      </div>

      {budgets.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="font-semibold mb-3">This Month's Budgets</h3>
          <div className="space-y-2">
            {budgets.map((b) => (
              <div key={b._id} className="flex justify-between items-center text-sm">
                <span>{b.category}</span>
                <span className={b.exceeded ? "text-red-500 font-semibold" : "text-gray-600"}>
                  ₹{b.spent} / ₹{b.monthlyLimit} {b.exceeded && "⚠️ Exceeded"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <BudgetForm onSet={fetchBudgets} />
      <ExpenseForm onAdded={refreshAll} />

      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading...</p>
      ) : (
        <ExpenseList expenses={expenses} onChanged={refreshAll} />
      )}
    </div>
  );
}
