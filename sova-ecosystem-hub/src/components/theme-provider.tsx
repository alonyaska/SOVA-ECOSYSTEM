import { ScriptOnce } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Theme = "hardcore" | "soft";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "sova-theme";

// Runs before hydration to avoid flash
const preHydrationScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}")||"hardcore";if(t==="soft"){document.documentElement.classList.add("soft");}}catch(e){}})();`;

export function ThemeBootScript() {
  return <ScriptOnce>{preHydrationScript}</ScriptOnce>;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("hardcore");

  useEffect(() => {
    try {
      const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "hardcore";
      setThemeState(stored);
      document.documentElement.classList.toggle("soft", stored === "soft");
    } catch {
      /* ignore */
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
    document.documentElement.classList.toggle("soft", t === "soft");
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "hardcore" ? "soft" : "hardcore");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
