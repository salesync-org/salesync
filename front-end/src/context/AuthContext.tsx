import auth from '@/api/auth';
import { useState, createContext, useEffect } from 'react';

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (signUpInfo: SignUpInfo) => Promise<void>;
  login: ({ companyName, email, password }: { companyName: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('access_token');
    return Boolean(token);
  });

  useEffect(() => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = async (signUpInfo: SignUpInfo) => {
    const res: TokenResponse = await auth.signUp(signUpInfo);
    if (res) {
      setIsAuthenticated(true);
      localStorage.setItem('access_token', res.access_token);
    }
  };

  const login = async ({ companyName, email, password }: { companyName: string; email: string; password: string }) => {
    const res = await auth.login(companyName, email, password);
    if (res) {
      setIsAuthenticated(true);
      localStorage.setItem('access_token', res.access_token);
    }
  };

  const fetchUser = async () => {
    try {
      if (!localStorage.getItem('access_token')) return;
      if (user) return;
      const res = await auth.getUser();
      setUser(res);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('access_token');
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = { user, isLoading, isAuthenticated, login, logout, fetchUser, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
