import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { withdraw } from "../services/api";

const Withdraw = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleWithdraw = async () => {
    const customerID = location.state?.customerID || localStorage.getItem("customerID");
    if (!customerID) {
      navigate("/login");
      return;
    }
    if (!accountNumber || !amount) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await withdraw(customerID, accountNumber, parseFloat(amount));
      navigate("/dashboard");
    } catch (err) {
      setError("Withdrawal failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Withdraw</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleWithdraw}>Withdraw</Button>
          <Button onClick={() => navigate("/dashboard")}>Back</Button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;