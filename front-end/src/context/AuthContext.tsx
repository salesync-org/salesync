import auth from '@/api/auth';
import { useState, createContext, useEffect, Dispatch, useCallback } from 'react';

type AuthContext = {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (signUpInfo: SignUpInfo) => Promise<void>;
  login: ({ companyName, email, password }: { companyName: string; email: string; password: string }) => Promise<void>;
  verifyPassword: ({
    companyName,
    email,
    password
  }: {
    companyName: string;
    email: string;
    password: string;
  }) => Promise<any>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
  changePassword: (companyName: string, password: string) => Promise<void>;
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
  const companyName = location.length > 3 ? location.split('/')[3] : '';
  useEffect(() => {
    const authenticated = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('access_token');
        const user = companyName && companyName.length > 0 ? await auth.getUser(companyName) : null;

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
    return res;
  };

  const verifyPassword = async ({
    companyName,
    email,
    password
  }: {
    companyName: string;
    email: string;
    password: string;
  }) => {
    const res = await auth.verifyPassword(companyName, email, password);
    return res;
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

  const updateUser = useCallback(
    async (companyName: string, updatedUser: User) => {
      try {
        const res = await auth.updateUser(companyName, updatedUser);

        if (res) {
          setUser(updatedUser);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [setUser]
  );

  const reloadUser = async () => {
    const user = companyName && companyName.length > 0 ? await auth.getUser(companyName) : null;
    setUser(user);
  };

  const changePassword = async (companyName: string, password: string) => {
    const res = await auth.changePassword(companyName, user?.user_id ?? '', password);
    return res;
  };

  // if (!companyName) return null;

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    login,
    logout,
    signUp,
    updateUser,
    reloadUser,
    changePassword,
    verifyPassword
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
