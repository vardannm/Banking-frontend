const API_BASE_URL = "http://localhost:8080/api";

export const login = async (customerID: string, pin: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerID, pin }),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
};

export const getCustomerData = async (customerID?: string) => {
  const id = customerID || localStorage.getItem("customerID");
  if (!id) throw new Error("No customerID found");
  const response = await fetch(`${API_BASE_URL}/customer?customerID=${id}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch customer data");
  return response.json() as Promise<{ name: string; accounts: { accountNumber: string; balance: number }[] }>;
};

export const getTransactions = async (customerID?: string) => {
  const id = customerID || localStorage.getItem("customerID");
  if (!id) throw new Error("No customerID found");
  const response = await fetch(`${API_BASE_URL}/transactions?customerID=${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch transactions");
  return response.json();
};

export const deposit = async (customerID: string, accountNumber: string, amount: number) => {
  const response = await fetch(`${API_BASE_URL}/deposit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerID, accountNumber, amount }),
  });
  if (!response.ok) throw new Error("Deposit failed");
  return response.text();
};

export const withdraw = async (customerID: string, accountNumber: string, amount: number) => {
  const response = await fetch(`${API_BASE_URL}/withdraw`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerID, accountNumber, amount }),
  });
  if (!response.ok) throw new Error("Withdrawal failed");
  return response.text();
};

export const addAccount = async (customerID: string, accountNumber: string, initialBalance: number, pin: string) => {
  const response = await fetch(`${API_BASE_URL}/add-account`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerID, accountNumber, initialBalance, pin }),
  });
  if (!response.ok) throw new Error("Add account failed");
  return response.text();
};

export const transfer = async (customerID: string, fromAccountNumber: string, toAccountNumber: string, amount: number) => {
  const response = await fetch(`${API_BASE_URL}/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerID, fromAccountNumber, toAccountNumber, amount }),
  });
  if (!response.ok) throw new Error("Transfer failed");
  return response.text();
};