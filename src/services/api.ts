const API_BASE_URL = "http://localhost:8080/api"; // Adjust based on your backend port

export const login = async (customerID: string, pin: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerID, pin }),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
};

export const getCustomerData = async () => {
  const response = await fetch(`${API_BASE_URL}/customer`, {
    method: "GET",
    credentials: "include", // If using sessions/cookies
  });
  if (!response.ok) throw new Error("Failed to fetch customer data");
  return response.json();
};

export const getTransactions = async () => {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch transactions");
  return response.json();
};