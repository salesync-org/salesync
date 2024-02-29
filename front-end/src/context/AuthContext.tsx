import { useState } from 'react';
import { createContext } from 'vm';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {}
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  

  const value = { user, login: setUser, logout: () => {}, register: () => {} };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
