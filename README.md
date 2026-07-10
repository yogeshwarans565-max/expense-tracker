# 💰 Smart Expense & Budget Tracker
🔗 **Live Demo:** [expense-tracker-seven-blue-54.vercel.app](https://expense-tracker-seven-blue-54.vercel.app)

A full-stack MERN application to track daily expenses, set category-wise monthly budgets, and visualize spending patterns through interactive charts.

## Features

- 🔐 User Authentication (JWT-based signup/login)
- ➕ Add / Edit / Delete expenses with category, amount, description, and date
- 🎯 Set monthly budget limits per category with over-budget warnings
- 📊 Analytics dashboard with Pie chart (category-wise spend) and Bar chart (monthly trend) using Recharts
- 📱 Responsive UI built with React + Tailwind CSS

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, Recharts, React Router, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose)
**Auth:** JWT + bcrypt

## Project Structure

```
expense-tracker/
├── backend/
│   ├── config/db.js
│   ├── models/ (User, Expense, Budget)
│   ├── controllers/ (auth, expense, budget)
│   ├── routes/ (auth, expense, budget)
│   ├── middleware/authMiddleware.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/ (Navbar, ExpenseForm, ExpenseList, BudgetForm, Charts)
│   │   ├── pages/ (Login, Signup, Dashboard, Analytics)
│   │   ├── context/AuthContext.jsx
│   │   ├── services/api.js
│   │   └── App.jsx
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local install or MongoDB Atlas free cluster)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your MongoDB URI and JWT secret:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_own_secret_key
```

Run the backend:
```bash
npm run dev
```
Backend runs on `http://localhost:5000`

### 2. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

### 3. Using the App
1. Open `http://localhost:3000`
2. Signup with name, email, password
3. Add expenses from the Dashboard
4. Set monthly budgets per category
5. View spending patterns on the Analytics page

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/expenses | Get all expenses (auth) |
| POST | /api/expenses | Add expense (auth) |
| PUT | /api/expenses/:id | Update expense (auth) |
| DELETE | /api/expenses/:id | Delete expense (auth) |
| GET | /api/expenses/analytics | Category & monthly totals (auth) |
| POST | /api/budget | Set/update budget (auth) |
| GET | /api/budget | Get current month budgets vs spend (auth) |

## Future Improvements
- CSV/PDF export of reports
- Recurring expense reminders
- Multi-currency support
- Dark mode

## Author
Built as a placement portfolio project.
