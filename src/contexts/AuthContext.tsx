import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("learnhub_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("learnhub_user");
      }
    }
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - in production, call API
    const emailLower = email.toLowerCase();
    const isAdminEmail = emailLower === "admin@learnhub.com" || emailLower === "admin";
    const isAdminPassword = password === "admin123";
    
    // Check admin credentials
    if (isAdminEmail && isAdminPassword) {
      const userData: User = {
        id: "admin-1",
        name: "Admin User",
        email: email,
        role: "admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
      };
      setUser(userData);
      localStorage.setItem("learnhub_user", JSON.stringify(userData));
      return true;
    }
    
    // Regular user login (any email/password combination works for demo)
    if (!isAdminEmail) {
      const userData: User = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0],
        email: email,
        role: "user",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      setUser(userData);
      localStorage.setItem("learnhub_user", JSON.stringify(userData));
      return true;
    }
    
    // Invalid admin credentials
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("learnhub_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("learnhub_user", JSON.stringify(updatedUser));
    } else {
      // If no user but we're updating, create a basic user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: data.name || "User",
        email: data.email || "",
        role: "user",
        avatar: data.avatar,
      };
      setUser(newUser);
      localStorage.setItem("learnhub_user", JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isInitialized,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

