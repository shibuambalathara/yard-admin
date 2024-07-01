"use client";

import { create } from 'zustand';
import { devtools, persist, PersistStorage } from 'zustand/middleware';

// Define the User interface with type safety
interface User {
    name: string;
    email: string;
    contact?: string;
    designation: string;
    role: string;
    organisation:string;
    Type:string;
}

// Define the AuthState interface
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    role: string | null;
  

}

// Define the AuthActions interface
interface AuthActions {
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    login: (user: User, token: string, role: string) => void;
    logout: () => void;
    register: (user: User, token: string, role: string) => void;
    getToken: () => string | null;
}

// Combine state and actions
type AuthStoreType = AuthState & AuthActions;

// Define the storage type for persistence
// Define the storage type for persistence
const storage: PersistStorage<AuthStoreType> = {
  getItem: (key) => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
  },
  setItem: (key, value) => {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
  },
  removeItem: (key) => localStorage.removeItem(key),
};

// Use `create` function with `AuthStoreType` generic parameter
const useAuthStore = create<AuthStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                isAuthenticated: false,
                token: null,
                role: null,
                setUser: (user) => set((state) => ({ ...state, user })),
                setToken: (token) => set((state) => ({ ...state, token })),
                login: (user, token, role) => set((state) => ({
                    ...state,
                    user,
                    isAuthenticated: true,
                    token,
                    role,
                })),
                logout: () => {
                    storage.removeItem('AuthStore'); // Remove persisted state on logout
                    set(() => ({
                        user: null,
                        isAuthenticated: false,
                        token: null,
                        role: null,
                    }));
                },
                register: (user, token, role) => set((state) => ({
                    ...state,
                    user,
                    isAuthenticated: true,
                    token,
                    role,
                })),
                getToken: () => get().token,
            }),
            {
                name: 'AuthStore',
                storage,
            }
        ),
        { name: 'auth-store' }
    )
);

export default useAuthStore;
