import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getCustomerData } from "../services/api"; // Import the getCustomerData function

const Dashboard = () => {
  const [customerName, setCustomerName] = useState("");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await getCustomerData(); // Use the getCustomerData function
        setCustomerName(data.name);
        setBalance(data.balance);
      } catch (err) {
        navigate("/login");
      }
    };

    fetchCustomerData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome, {customerName}!</h2>
        <p className="text-lg mb-4">Your current balance: ${balance.toFixed(2)}</p>
        <div className="space-x-4">
          <Button onClick={() => navigate("/transactions")}>
            View Transactions
          </Button>
          <Button onClick={() => navigate("/login")}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;