import { useState, useEffect } from 'react';
import './App.css';
import { BsCreditCard, BsHeartPulse, BsHouse, BsPhoneFill } from 'react-icons/bs';
import { ImSpoonKnife } from "react-icons/im";
import { FaCar, FaChartLine } from 'react-icons/fa';
import { FaShirt } from 'react-icons/fa6';
import { GoGoal } from "react-icons/go";
import loadingGif from "./assets/loaderimg.gif"; // Correctly import the GIF file

const App = () => {
  const [salary, setSalary] = useState(0);
  const [loading, setLoading] = useState(true); // State for loader
  const [showAboutModal, setShowAboutModal] = useState(false); // State for about modal
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString()); // State for current date

  // Expense categories with recommended percentages
  const expenseCategories = [
    { id: 1, icon: <BsHouse />, category: 'House Rent', percentage: 30 },
    { id: 2, icon: <ImSpoonKnife />, category: 'Groceries & Food', percentage: 15 },
    { id: 3, icon: <FaCar />, category: 'Transport & Travel', percentage: 5 },
    { id: 4, icon: <BsPhoneFill />, category: 'Utilities (data, wi-fi, mobile, gas, electricity)', percentage: 5 },
    { id: 5, icon: <BsHeartPulse />, category: 'Health Care & Insurance', percentage: 5 },
    { id: 6, icon: <FaShirt />, category: 'Personal Expenses', percentage: 10 },
    { id: 7, icon: <BsCreditCard />, category: 'Debt Repayment (Loan, EMIs)', percentage: 5 },
    { id: 8, icon: <FaChartLine />, category: 'Savings & Investment', percentage: 20 },
    { id: 9, icon: <GoGoal />, category: 'Emergency Funds Contribution', percentage: 5 },
  ];

  // Function to calculate the amount for each category
  const calculateAmount = (percentage) => {
    return ((salary * percentage) / 100).toFixed(2);
  };

  // Function to format numbers with commas
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Simulate a 3-second loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Show loader while loading
  if (loading) {
    return (
      <div className="loader-container">
        <img width={450} src={loadingGif} alt="Loading..." className="loader-image" />
        <p className="mt-3 text-dark">Loading your salary plan...</p>
      </div>
    );
  }

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header with About Icon and Dark Mode Toggle */}
      <div className="header">
        <div className="date">{currentDate}</div>
        <div className="header-icons">
          <button className="icon-button" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="icon-button" onClick={() => setShowAboutModal(true)}>
            ❓
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-5">
        <h1 className="text-center mb-4">Monthly Spending Salary Plan</h1>

        {/* Salary Input Field */}
        <div className="mb-4">
          <label htmlFor="salary" className="form-label text-center w-100">
            Enter Your Monthly Salary:
          </label>
          <input
            type="number"
            id="salary"
            className="form-control"
            placeholder="Enter your salary"
            value={salary}
            onChange={(e) => setSalary(parseFloat(e.target.value))}
          />
        </div>

        {/* Expense Table */}
        <table className="table table-bordered table-hover">
          <thead className={darkMode ? 'table-dark' : 'table-light'}>
            <tr>
              <th>Expense Category</th>
              <th>Recommended (%)</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenseCategories.map((expense) => (
              <tr key={expense.id}>
                <td className='text-start'>{expense.icon} {expense.category}</td>
                <td>{expense.percentage}%</td>
                <td>{formatNumberWithCommas(calculateAmount(expense.percentage))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">About</h5>
              <button type="button" className="close" onClick={() => setShowAboutModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              This app was developed by Nathaniel Nosa.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAboutModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;