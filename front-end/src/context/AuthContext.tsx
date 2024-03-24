import auth from '@/api/auth';
import { useState, createContext, useEffect } from 'react';

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
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
      const userProfile = localStorage.getItem('user');
      if (!token || !userProfile) {
        throw new Error('No token found');
      }

      setUser(JSON.parse(userProfile));
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await auth.login(email, password);
      if (res) {
        console.log({ res });
        // setUser(res.user);
        // setIsAuthenticated(true);
        // localStorage.setItem('access_token', res.access_token);
        // localStorage.setItem('user', JSON.stringify(res.user));
      }
    } catch (error) {
      console.error(error);
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
      localStorage.removeItem('user');
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = { user, isLoading, isAuthenticated, login, logout, fetchUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
