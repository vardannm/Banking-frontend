import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  customerID: string | null;
  login: (token: string, customerID: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerID, setCustomerID] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for existing token on app load
    const token = localStorage.getItem("token");
    const storedCustomerID = localStorage.getItem("customerID");

    if (token && storedCustomerID) {
      setIsAuthenticated(true);
      setCustomerID(storedCustomerID);
    }
  }, []);

  const login = (token: string, customerID: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("customerID", customerID);
    setIsAuthenticated(true);
    setCustomerID(customerID);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customerID");
    setIsAuthenticated(false);
    setCustomerID(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, customerID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};