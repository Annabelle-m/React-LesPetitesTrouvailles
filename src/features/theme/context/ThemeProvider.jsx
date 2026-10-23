import { useLayoutEffect, useState } from "react";
import { THEME, THEME_STORAGE_KEY } from "../constants/theme";
import { ThemeContext } from "./ThemeContext";

function getInitialTheme() {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme === THEME.dark ? THEME.dark : THEME.light;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === THEME.dark ? THEME.light : THEME.dark,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider };
