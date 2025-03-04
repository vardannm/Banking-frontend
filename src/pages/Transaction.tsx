import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTransactions } from "../services/api";

interface Transaction {
  id: number; 
  type: string;
  amount: number;
  dateTime: string; 
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTransactions = async () => {
      const customerID = location.state?.customerID || localStorage.getItem("customerID");
      if (!customerID) {
        console.error("No customerID found, redirecting to login");
        navigate("/login");
        return;
      }
      try {
        const data = await getTransactions(customerID);
        setTransactions(data.map((t: any, index: number) => ({
          id: index,
          type: t.type,
          amount: t.amount,
          dateTime: t.dateTime,
        })));
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        navigate("/login");
      }
    };
    fetchTransactions();
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Transactions</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="p-2">{transaction.type}</td>
                <td className="p-2">${transaction.amount.toFixed(2)}</td>
                <td className="p-2">{transaction.dateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;