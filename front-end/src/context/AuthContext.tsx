import auth from '@/api/auth';
import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContext = {
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await auth.login(email, password);
      if (res) {
        setUser(res.user);
        window.location.href = '/cheatsheet';
        localStorage.setItem('access_token', res.access_token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value = { user, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
