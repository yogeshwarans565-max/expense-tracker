import api from "../services/api";

export default function ExpenseList({ expenses, onChanged }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await api.delete(`/expenses/${id}`);
    onChanged();
  };

  if (!expenses.length) {
    return <p className="text-gray-500 text-center py-8">No expenses yet. Add your first one above!</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-sm text-gray-600">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{new Date(exp.date).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <span className="bg-indigo-100 text-primary text-xs px-2 py-1 rounded-full">{exp.category}</span>
              </td>
              <td className="px-4 py-3 text-gray-600">{exp.description || "-"}</td>
              <td className="px-4 py-3 font-semibold">₹{exp.amount}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
