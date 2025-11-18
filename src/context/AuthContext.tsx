import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { UserType } from '../types';

type AuthContextType = {
  isSignedIn: boolean;
  signIn: (email: string) => Promise<void> | void;
  signOut: () => void;
  user: UserType | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const value = useMemo(
    () => ({
      isSignedIn,
      user,
      signIn: async (email: string) => {
        // TODO: call your API and store token/uid securely
        const hardcodedUser: any = {
          id: 'USER123',
          name: 'Aman Singh',
          className: '12th A',
          role: 'student',
          email,
          profilePic:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop',
        };

        setUser(hardcodedUser);
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
