import { useState } from "react";
import api from "../services/api";

const CATEGORIES = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Health", "Education", "Other"];

export default function ExpenseForm({ onAdded }) {
  const [form, setForm] = useState({
    amount: "",
    category: "Food",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/expenses", form);
      setForm({ amount: "", category: "Food", description: "", date: new Date().toISOString().slice(0, 10) });
      onAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 md:col-span-1"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border rounded px-3 py-2 md:col-span-1"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border rounded px-3 py-2 md:col-span-1"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border rounded px-3 py-2 md:col-span-1"
      />
      <button type="submit" className="bg-primary text-white rounded px-3 py-2 hover:bg-indigo-700 md:col-span-1">
        Add Expense
      </button>
      {error && <p className="text-red-500 text-sm md:col-span-5">{error}</p>}
    </form>
  );
}
