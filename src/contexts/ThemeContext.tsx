import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  saveTheme: () => Promise<void>;
  revertTheme: () => void;
  isDirty: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const local = localStorage.getItem("learnhub_theme");
      return (local as Theme) || "dark";
    } catch {
      return "dark";
    }
  });
  const [savedTheme, setSavedTheme] = useState<Theme | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // Apply theme to document for immediate preview
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    setIsDirty(savedTheme !== null && theme !== savedTheme);
  }, [theme, savedTheme]);

  useEffect(() => {
    // If user is logged in, load theme from profiles table
    let mounted = true;
    const load = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("theme")
          .eq("id", user.id)
          .single();
        if (!error && data && mounted) {
          const remoteTheme = (data.theme as Theme) || "dark";
          setThemeState(remoteTheme);
          setSavedTheme(remoteTheme);
          localStorage.setItem("learnhub_theme", remoteTheme);
        }
      } catch (err) {
        console.error("Error loading theme:", err);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("learnhub_theme", t);
    } catch {}
  };

  const saveTheme = async () => {
    // Persist to supabase profiles table when logged in
    try {
      if (user) {
        const { error } = await supabase
          .from("profiles")
          .upsert({ id: user.id, theme })
          .select();
        if (error) throw error;
        setSavedTheme(theme);
        setIsDirty(false);
      } else {
        // No user: just keep in localStorage
        setSavedTheme(theme);
        setIsDirty(false);
      }
    } catch (err) {
      console.error("Error saving theme:", err);
      throw err;
    }
  };

  const revertTheme = () => {
    if (savedTheme) setThemeState(savedTheme);
    else {
      const local = (localStorage.getItem("learnhub_theme") as Theme) || "dark";
      setThemeState(local);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, saveTheme, revertTheme, isDirty }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
