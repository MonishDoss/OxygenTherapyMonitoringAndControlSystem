import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  role: 'doctor' | 'nurse';
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - In a real app, this would come from your backend
const MOCK_USERS = [
  {
    id: '1',
    name: 'Dr. John Smith',
    role: 'doctor',
    email: 'doctor@example.com',
    password: 'doctor123'
  },
  {
    id: '2',
    name: 'Nurse Sarah Johnson',
    role: 'nurse',
    email: 'nurse@example.com',
    password: 'nurse123'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication - Replace with real API call
    const mockUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!mockUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = mockUser;
    setUser(userWithoutPassword as User);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));

    // Redirect based on role
    if (mockUser.role === 'doctor') {
      navigate('/admin');
    } else {
      navigate('/nurse');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}