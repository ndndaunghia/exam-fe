import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";

interface AuthContextType {
  auth: { token: boolean };
  setAuth: React.Dispatch<React.SetStateAction<{ token: boolean }>>;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isSignUpModalOpen: boolean;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<{ token: boolean }>({ token: true });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = useCallback(() => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
  }, []);

  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  const value: AuthContextType = {
    auth,
    setAuth,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    isSignUpModalOpen,
    openSignUpModal,
    closeSignUpModal,
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
