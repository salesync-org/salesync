import auth from '@/api/auth';
import { useState, createContext } from 'react';

type AuthContext = {
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await auth.login(email, password);
      if (res) {
        setUser(res.user);
        localStorage.setItem('access_token', res.access_token);
        window.location.href = '/cheatsheet';
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
  }

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('access_token');
      window.location.href = '/';
      await auth.logOut();
    } catch (error) {
      console.error(error);
    }
  }

  const value = { user, login, logout, fetchUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
