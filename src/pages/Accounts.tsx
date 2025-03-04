import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { getCustomerData } from "../services/api";

const Accounts = () => {
  const [accounts, setAccounts] = useState<{ accountNumber: string; balance: number }[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAccounts = async () => {
      const customerID = location.state?.customerID || localStorage.getItem("customerID");
      if (!customerID) {
        console.error("No customerID found, redirecting to login");
        navigate("/login");
        return;
      }
      try {
        const data = await getCustomerData(customerID);
        setAccounts(data.accounts);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
        navigate("/login");
      }
    };
    fetchAccounts();
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">All Accounts</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Account Number</th>
              <th className="text-left p-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.accountNumber} className="border-b">
                <td className="p-2">{account.accountNumber}</td>
                <td className="p-2">${account.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    </div>
  );
};

export default Accounts;