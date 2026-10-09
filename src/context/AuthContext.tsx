import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/seedData';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  allUsers: User[];
  isStudent: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
  switchUser: (userId: string) => void;
  switchRole: (role: UserRole) => void;
  login: (email: string, password?: string) => boolean;
  register: (data: { name: string; email: string; role: UserRole; entityName?: string }) => User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'pocketintern_users';
const ACTIVE_USER_ID_KEY = 'pocketintern_active_user_id';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch (e) {
      return INITIAL_USERS;
    }
  });

  const [activeUserId, setActiveUserId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_USER_ID_KEY);
      if (saved && users.some((u) => u.id === saved)) {
        return saved;
      }
      return 'student-1'; // Default to Aarav Sharma
    } catch (e) {
      return 'student-1';
    }
  });

  // Save users on change
  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  // Save active user ID on change
  useEffect(() => {
    localStorage.setItem(ACTIVE_USER_ID_KEY, activeUserId);
  }, [activeUserId]);

  const currentUser = users.find((u) => u.id === activeUserId) || users[0] || null;
  const currentRole = currentUser?.role || 'student';

  const switchUser = (userId: string) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setActiveUserId(found.id);
    }
  };

  const switchRole = (role: UserRole) => {
    // Switch to first user matching role
    const matching = users.find((u) => u.role === role);
    if (matching) {
      setActiveUserId(matching.id);
    }
  };

  const login = (email: string, _password?: string) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setActiveUserId(existing.id);
      return true;
    }
    return false;
  };

  const register = (data: { name: string; email: string; role: UserRole; entityName?: string }): User => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: data.role === 'student' 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'
        : 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=256&q=80',
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setActiveUserId(newUser.id);
    return newUser;
  };

  const logout = () => {
    // In demo mode, reset to unauthenticated or back to student
    setActiveUserId('student-1');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        allUsers: users,
        isStudent: currentRole === 'student',
        isBusiness: currentRole === 'business',
        isAdmin: currentRole === 'admin',
        switchUser,
        switchRole,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
