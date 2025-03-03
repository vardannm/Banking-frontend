import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../services/api"; // Import the getTransactions function

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(); // Use the getTransactions function
        setTransactions(data);
      } catch (err) {
        navigate("/login");
      }
    };

    fetchTransactions();
  }, [navigate]);

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
                <td className="p-2">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;