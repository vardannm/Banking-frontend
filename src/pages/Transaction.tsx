import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTransactions } from "../services/api";
import { Line } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
        setTransactions(
          data.map((t: any, index: number) => ({
            id: index,
            type: t.type,
            amount: t.amount,
            dateTime: t.dateTime,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        navigate("/login");
      }
    };
    fetchTransactions();
  }, [navigate, location]);


  const calculateBalanceData = () => {
    let balance = 0;
    const balanceData = transactions.map((t) => {
      if (t.type === "DEPOSIT" || t.type === "TRANSFER_RECEIVED") {
        balance += t.amount;
      } else if (t.type === "WITHDRAWAL" || t.type === "TRANSFER_SENT") {
        balance -= t.amount;
      }
      return balance;
    });
    return balanceData;
  };

  const chartData = {
    labels: transactions.map((t) => t.dateTime),
    datasets: [
      {
        label: "Total Balance",
        data: calculateBalanceData(),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Balance Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Balance ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Transactions</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
      <div className="bg-white p-6 rounded-lg shadow-md">
        {transactions.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p className="text-center text-gray-500">No transactions to display</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;