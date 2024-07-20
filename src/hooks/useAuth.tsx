import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";

interface AuthContextType {
  auth: { token: boolean };
  setAuth: React.Dispatch<React.SetStateAction<{ token: boolean }>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<{ token: boolean }>({ token: false });

  const value: AuthContextType = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
