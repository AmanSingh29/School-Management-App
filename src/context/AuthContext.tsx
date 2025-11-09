import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

type AuthContextType = {
  isSignedIn: boolean;
  signIn: (email: string) => Promise<void> | void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const value = useMemo(
    () => ({
      isSignedIn,
      signIn: async (_email: string) => {
        // TODO: call your API and store token/uid securely
        setIsSignedIn(true);
      },
      signOut: () => setIsSignedIn(false),
    }),
    [isSignedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
