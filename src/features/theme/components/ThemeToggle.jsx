import { Moon, Sun } from "lucide-react";
import { THEME, THEME_LABEL, THEME_NAME } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === THEME.dark;
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={THEME_LABEL[isDark ? THEME.dark : THEME.light]}
      aria-pressed={isDark}
    >
      <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
      <span>{THEME_NAME[isDark ? THEME.dark : THEME.light]}</span>
    </button>
  );
}

export default ThemeToggle;
