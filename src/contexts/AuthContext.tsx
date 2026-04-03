import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  fullname: string;
  email: string;
  role: 'buyer' | 'seller' | 'both';
  faculty: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ui_marketplace_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem('ui_marketplace_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ui_marketplace_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};