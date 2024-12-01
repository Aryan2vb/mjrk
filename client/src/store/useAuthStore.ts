import { create } from "zustand";

interface User {
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const mockUsers = [
  { email: "mjrk@gmail.com", password: "manu" },
  { email: "user2@example.com", password: "password2" },
];

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(localStorage.getItem("isAuthenticated")), // Initialize from localStorage
  user: JSON.parse(localStorage.getItem("user") || "null"),

  login: async (email: string, password: string) => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Persist state in localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify({ email }));

    set({ isAuthenticated: true, user: { email } });
  },

  logout: () => {
    // Clear state from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    set({ isAuthenticated: false, user: null });
  },
}));
