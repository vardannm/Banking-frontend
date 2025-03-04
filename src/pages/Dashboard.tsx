import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { getCustomerData } from "../services/api";

const Dashboard = () => {
  const [customerName, setCustomerName] = useState("");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCustomerData = async () => {
      const customerID = location.state?.customerID || localStorage.getItem("customerID");
      if (!customerID) {
        console.error("No customerID found, redirecting to login");
        navigate("/login");
        return;
      }
      try {
        const data = await getCustomerData(customerID);
        setCustomerName(data.name);
        setBalance(data.balance);
      } catch (err) {
        console.error("Failed to fetch customer data:", err);
        navigate("/login");
      }
    };
    fetchCustomerData();
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome, {customerName}!</h2>
        <p className="text-lg mb-4">Your current balance: ${balance.toFixed(2)}</p>
        <div className="space-x-4">
          <Button onClick={() => navigate("/deposit")}>Deposit</Button>
          <Button onClick={() => navigate("/withdraw")}>Withdraw</Button>
          <Button onClick={() => navigate("/add-account")}>Add Account</Button>
          <Button onClick={() => navigate("/transactions")}>View Transactions</Button>
          <Button onClick={() => { localStorage.removeItem("customerID"); navigate("/login"); }}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;