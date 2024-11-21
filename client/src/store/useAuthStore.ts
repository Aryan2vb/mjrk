import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // In a real app, you would make an API call here
    if (email && password) {
      set({ isAuthenticated: true, user: { email } });
    }
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));