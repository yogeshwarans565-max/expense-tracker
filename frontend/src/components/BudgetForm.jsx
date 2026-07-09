import { useState } from "react";
import api from "../services/api";

const CATEGORIES = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Health", "Education", "Other"];

export default function BudgetForm({ onSet }) {
  const now = new Date();
  const [form, setForm] = useState({
    category: "Food",
    monthlyLimit: "",
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/budget", form);
    setForm({ ...form, monthlyLimit: "" });
    onSet();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-3 items-end">
      <div>
        <label className="text-sm text-gray-600 block mb-1">Category</label>
        <select name="category" value={form.category} onChange={handleChange} className="border rounded px-3 py-2">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm text-gray-600 block mb-1">Monthly Limit (₹)</label>
        <input
          type="number"
          name="monthlyLimit"
          value={form.monthlyLimit}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
      </div>
      <button type="submit" className="bg-primary text-white rounded px-4 py-2 hover:bg-indigo-700">
        Set Budget
      </button>
    </form>
  );
}
