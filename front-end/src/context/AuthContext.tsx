import auth from '@/api/auth';
import { loadPermimssions, loadRoles } from '@/api/roles';
// import { SignUpInfo, TokenResponse, User } from '@/type';
import { useState, createContext, useEffect, Dispatch, useCallback } from 'react';

type AuthContext = {
  user: User | null;
  company: CompanyInfo | null;
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
  getCompanyInfo: (companyName: string) => Promise<void>;
  updateCompanyInfo: (companyName: string, companyInfo: CompanyInfo) => Promise<void>;
  getRoles: (companyName: string) => Promise<Role[] | null>;
  getPermissions: (companyName: string) => Promise<Permission[] | null>;
};

export const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<CompanyInfo | null>(null);
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
        const companyInfo = companyName && companyName.length > 0 ? await auth.loadCompanyInfo(companyName) : null;
        if (!token || !user) {
          throw new Error('No token found');
        }

        setUser(user);
        setCompany(companyInfo);
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

  const getCompanyInfo = async (companyName: string) => {
    const companyInfo = await auth.loadCompanyInfo(companyName);
    setCompany(companyInfo);
  };

  const updateCompanyInfo = async (companyName: string, companyInfo: CompanyInfo) => {
    const res = await auth.updateCompanyInfo(companyName, companyInfo);
    if (res) {
      setCompany({
        name: companyInfo.name,
        address: companyInfo.address,
        phone: companyInfo.phone,
        tax_code: companyInfo.tax_code,
        avatar_url: companyInfo.avatar_url,
        company_id: companyInfo.company_id
      });
    }
    return res;
  };

  const getRoles = async (companyName: string) => {
    const roles = await loadRoles(companyName);
    return roles;
  };

  const getPermissions = async (companyName: string) => {
    const permissions = await loadPermimssions(companyName);
    return permissions;
  };

  // if (!companyName) return null;

  const value = {
    user,
    isLoading,
    isAuthenticated,
    company,
    setUser,
    login,
    logout,
    signUp,
    updateUser,
    reloadUser,
    changePassword,
    verifyPassword,
    getCompanyInfo,
    getRoles,
    getPermissions,
    updateCompanyInfo
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
