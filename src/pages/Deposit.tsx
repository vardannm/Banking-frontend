import { useState, useEffect } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { deposit, getCustomerData } from "../services/api";

const Deposit = () => {
  const [accountNumber, setAccountNumber] = useState("");
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
        if (data.accounts.length > 0) setAccountNumber(data.accounts[0].accountNumber); 
      } catch (err) {
        setError("Failed to load accounts: " + err.message);
        navigate("/login");
      }
    };
    fetchAccounts();
  }, [navigate, location]);

  const handleDeposit = async () => {
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
      await deposit(customerID, accountNumber, parseFloat(amount));
      navigate("/dashboard");
    } catch (err) {
      setError("Deposit failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Deposit</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="space-y-4">
          <select
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
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
            <Button onClick={handleDeposit}>Deposit</Button>
            <Button onClick={() => navigate("/dashboard")}>Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;