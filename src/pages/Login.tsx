import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { login } from "../services/api"; // Import the login function

const Login = () => {
  const [customerID, setCustomerID] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!customerID || !pin) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await login(customerID, pin); // Use the login function
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Customer ID"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;