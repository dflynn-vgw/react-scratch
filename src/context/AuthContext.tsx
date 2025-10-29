import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AuthProvider = 'email' | 'facebook' | 'google' | 'apple';

export interface User {
  email: string;
  provider: AuthProvider;
  emailVerified: boolean;
  termsAccepted: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signUpWithProvider: (provider: AuthProvider) => Promise<void>;
  verifyEmail: (email: string) => void;
  signIn: (email: string, password: string) => Promise<boolean>;
  acceptTerms: () => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'auth_users',
  CURRENT_USER: 'auth_current_user',
  PENDING_VERIFICATION: 'auth_pending_verification',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load current user from localStorage on mount
    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUsers = (): Record<string, { password: string; user: User }> => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : {};
  };

  const saveUsers = (users: Record<string, { password: string; user: User }>) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  };

  const signUp = async (email: string, password: string) => {
    const users = getUsers();
    
    if (users[email]) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      email,
      provider: 'email',
      emailVerified: false,
      termsAccepted: false,
      createdAt: new Date().toISOString(),
    };

    users[email] = { password, user: newUser };
    saveUsers(users);

    // Store pending verification email
    localStorage.setItem(STORAGE_KEYS.PENDING_VERIFICATION, email);
  };

  const signUpWithProvider = async (provider: AuthProvider) => {
    // Simulate OAuth flow
    const fakeEmail = `user@${provider}.com`;
    const users = getUsers();

    const newUser: User = {
      email: fakeEmail,
      provider,
      emailVerified: true, // Social providers are pre-verified
      termsAccepted: false,
      createdAt: new Date().toISOString(),
    };

    users[fakeEmail] = { password: '', user: newUser };
    saveUsers(users);

    // Store pending verification (even though verified, for flow consistency)
    localStorage.setItem(STORAGE_KEYS.PENDING_VERIFICATION, fakeEmail);
  };

  const verifyEmail = (email: string) => {
    const users = getUsers();
    if (users[email]) {
      users[email].user.emailVerified = true;
      saveUsers(users);
      localStorage.removeItem(STORAGE_KEYS.PENDING_VERIFICATION);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const users = getUsers();
    const userRecord = users[email];

    if (!userRecord) {
      throw new Error('User not found');
    }

    if (userRecord.user.provider === 'email' && !userRecord.user.emailVerified) {
      throw new Error('Email not verified');
    }

    if (userRecord.user.provider === 'email' && userRecord.password !== password) {
      throw new Error('Invalid password');
    }

    const currentUser = userRecord.user;
    setUser(currentUser);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));

    // Return whether terms need to be accepted
    return !currentUser.termsAccepted;
  };

  const acceptTerms = () => {
    if (!user) return;

    const users = getUsers();
    if (users[user.email]) {
      users[user.email].user.termsAccepted = true;
      saveUsers(users);

      const updatedUser = { ...user, termsAccepted: true };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signUpWithProvider,
        verifyEmail,
        signIn,
        acceptTerms,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
