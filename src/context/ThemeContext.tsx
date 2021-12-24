import React, { createContext, useEffect } from "react";
import { LocalStorageKeys } from "../constants/localStorage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ThemeType } from "../model/Theme";

interface ThemeContext {
  theme: ThemeType;
  setTheme: (type: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const { storedValue, setValue } = useLocalStorage<ThemeType>(
    LocalStorageKeys.Theme,
    "light"
  );

  useEffect(() => {
    const rootEl = window.document.documentElement;
    if (storedValue === "dark") {
      rootEl.classList.add("dark");
    }
    if (storedValue === "light" && rootEl.classList.contains("dark")) {
      rootEl.classList.remove("dark");
    }
  }, [storedValue]);

  return (
    <ThemeContext.Provider value={{ theme: storedValue, setTheme: setValue }}>
      {children}
    </ThemeContext.Provider>
  );
};
