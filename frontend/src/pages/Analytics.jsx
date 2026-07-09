import { useState, useEffect } from "react";
import api from "../services/api";
import { CategoryPieChart, MonthlyBarChart } from "../components/Charts.jsx";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data } = await api.get("/expenses/analytics");
      setAnalytics(data);
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  if (loading) return <p className="text-center text-gray-500 py-10">Loading analytics...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <p className="text-gray-500 text-sm">Total Spent (All Time)</p>
        <p className="text-3xl font-bold text-primary">₹{analytics.totalSpent}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Spending by Category</h3>
          <CategoryPieChart data={analytics.categoryTotals} />
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Monthly Spending Trend</h3>
          <MonthlyBarChart data={analytics.monthTotals} />
        </div>
      </div>
    </div>
  );
}
