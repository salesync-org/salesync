import auth from '@/api/auth';
import { useState, createContext, useEffect } from 'react';

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (signUpInfo: SignUpInfo) => Promise<void>;
  login: ({ companyName, email, password }: { companyName: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (companyName: string, updatedUser: User) => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('access_token');
    return Boolean(token);
  });

  const location = window.location.href;

  const companyName = location.split('/')[3];

  useEffect(() => {
    const authenticated = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('access_token');
        const user = await auth.getUser(companyName);

        if (!token || !user) {
          throw new Error('No token found');
        }

        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    authenticated();
  }, [companyName]);

  const signUp = async (signUpInfo: SignUpInfo) => {
    const res: TokenResponse = await auth.signUp(signUpInfo);
    if (res) {
      setIsAuthenticated(true);
      setUser(res.user);
      localStorage.setItem('access_token', res.access_token);
    }
  };

  const login = async ({ companyName, email, password }: { companyName: string; email: string; password: string }) => {
    const res = await auth.login(companyName, email, password);
    if (res) {
      setIsAuthenticated(true);
      setUser(res.user);
      localStorage.setItem('access_token', res.access_token);
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

  const updateUser = async (companyName: string, updatedUser: User) => {
    try {
      const res = await auth.updateUser(companyName, updatedUser);

      if (res) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!companyName) return null;

  const value = { user, isLoading, isAuthenticated, login, logout, signUp, updateUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
