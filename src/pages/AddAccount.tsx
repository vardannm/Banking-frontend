import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { addAccount } from "../services/api";

const AddAccount = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddAccount = async () => {
    const customerID = location.state?.customerID || localStorage.getItem("customerID");
    if (!customerID) {
      navigate("/login");
      return;
    }
    if (!accountNumber || !initialBalance || !pin) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await addAccount(customerID, accountNumber, parseFloat(initialBalance), pin);
      navigate("/dashboard");
    } catch (err) {
      setError("Add account failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Add Account</h2>
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
            placeholder="Initial Balance"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-3">
          <Button onClick={handleAddAccount}>Add Account</Button>
          <Button onClick={() => navigate("/dashboard")}>Back</Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;