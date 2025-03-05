import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { register } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [accounts, setAccounts] = useState<{ accountNumber: string; initialBalance: string }[]>([{ accountNumber: "", initialBalance: "" }]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addAccountField = () => {
    setAccounts([...accounts, { accountNumber: "", initialBalance: "" }]);
  };

  const updateAccountField = (index: number, field: "accountNumber" | "initialBalance", value: string) => {
    const newAccounts = [...accounts];
    newAccounts[index][field] = value;
    setAccounts(newAccounts);
  };

  const removeAccountField = (index: number) => {
    if (accounts.length > 1) {
      setAccounts(accounts.filter((_, i) => i !== index));
    }
  };

  const handleRegister = async () => {
    if (!name || !customerID || !email || !phoneNumber || !pin || accounts.some(acc => !acc.accountNumber || !acc.initialBalance)) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const accountData = accounts.map(acc => ({
        accountNumber: acc.accountNumber,
        initialBalance: parseFloat(acc.initialBalance)
      }));
      await register(name, customerID, email, phoneNumber, pin, accountData);
      navigate("/login");
    } catch (err) {
      setError("Registration failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Customer ID"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Accounts</h3>
            {accounts.map((account, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Account Number"
                  value={account.accountNumber}
                  onChange={(e) => updateAccountField(index, "accountNumber", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Initial Balance"
                  value={account.initialBalance}
                  onChange={(e) => updateAccountField(index, "initialBalance", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {accounts.length > 1 && (
                  <button
                    onClick={() => removeAccountField(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <Button onClick={addAccountField}>Add Account</Button>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleRegister}>Register</Button>
            <Button onClick={() => navigate("/login")}>Back to Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;