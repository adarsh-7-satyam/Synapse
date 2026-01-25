import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  contact: string;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  fatherContact: string;
  motherContact: string;
  address: string;
  studentId: string;
  department: string;
  year: string;
  dateOfBirth: string;
  guardianName?: string;
  emergencyContact?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUser: User = {
  id: "test_user",
  name: "Adarsh Satyam",
  email: "adarsh.satyam@iitbhilai.ac.in",
  contact: "9876543210",
  bloodGroup: "B+",
  fatherName: "Rajesh Satyam",
  motherName: "Priya Satyam",
  fatherContact: "9876543211",
  motherContact: "9876543212",
  address: "123 MG Road, Patna, Bihar - 800001",
  studentId: "22CS001",
  department: "Computer Science & Engineering",
  year: "2nd Year",
  dateOfBirth: "15-08-2003",
  guardianName: "Rajesh Kumar",
  emergencyContact: "9876543211"
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string) => {
    if (username !== "test_user") {
      return { success: false, message: "User not registered" };
    }
    
    if (password !== "1234") {
      return { success: false, message: "Incorrect password, please contact the admin" };
    }
    
    setUser(defaultUser);
    setIsAuthenticated(true);
    return { success: true, message: "Login successful" };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};