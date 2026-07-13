"use client";

import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Theme is pre-detected and applied via inline script before React hydrates
  // This state just tracks the current theme for toggle functionality
  const [theme, setTheme] = useState<Theme>(() => {
    // Get the theme from DOM (already set by inline script)
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }
    return "light";
  });

  const applyTheme = (nextTheme: Theme) => {
    const root = document.documentElement;

    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;

    const runThemeChange = () => {
      root.classList.add("theme-transitioning");
      applyTheme(newTheme);

      window.setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 350);
    };

    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(runThemeChange);
    } else {
      runThemeChange();
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
