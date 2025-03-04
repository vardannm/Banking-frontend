import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { transfer, getCustomerData } from "../services/api";

const Transfer = () => {
  const [fromAccountNumber, setFromAccountNumber] = useState("");
  const [toAccountNumber, setToAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [accounts, setAccounts] = useState<{ accountNumber: string; balance: number }[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAccounts = async () => {
      const customerID = location.state?.customerID || localStorage.getItem("customerID");
      if (!customerID) {
        navigate("/login");
        return;
      }
      try {
        const data = await getCustomerData(customerID);
        setAccounts(data.accounts);
        if (data.accounts.length > 0) {
          setFromAccountNumber(data.accounts[0].accountNumber);
          setToAccountNumber(data.accounts.length > 1 ? data.accounts[1].accountNumber : data.accounts[0].accountNumber);
        }
      } catch (err) {
        setError("Failed to load accounts: " + err.message);
        navigate("/login");
      }
    };
    fetchAccounts();
  }, [navigate, location]);

  const handleTransfer = async () => {
    const customerID = location.state?.customerID || localStorage.getItem("customerID");
    if (!customerID) {
      navigate("/login");
      return;
    }
    if (!fromAccountNumber || !toAccountNumber || !amount || fromAccountNumber === toAccountNumber) {
      setError("Please select different accounts and fill in the amount.");
      return;
    }
    try {
      await transfer(customerID, fromAccountNumber, toAccountNumber, parseFloat(amount));
      navigate("/dashboard");
    } catch (err) {
      setError("Transfer failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Transfer</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="space-y-4">
          <select
            value={fromAccountNumber}
            onChange={(e) => setFromAccountNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {accounts.length === 0 ? (
              <option value="">No accounts available</option>
            ) : (
              accounts.map((acc) => (
                <option key={acc.accountNumber} value={acc.accountNumber}>
                  {acc.accountNumber} (${acc.balance.toFixed(2)})
                </option>
              ))
            )}
          </select>
          <select
            value={toAccountNumber}
            onChange={(e) => setToAccountNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {accounts.length === 0 ? (
              <option value="">No accounts available</option>
            ) : (
              accounts.map((acc) => (
                <option key={acc.accountNumber} value={acc.accountNumber}>
                  {acc.accountNumber} (${acc.balance.toFixed(2)})
                </option>
              ))
            )}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-3">
            <Button onClick={handleTransfer}>Transfer</Button>
            <Button onClick={() => navigate("/dashboard")}>Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;