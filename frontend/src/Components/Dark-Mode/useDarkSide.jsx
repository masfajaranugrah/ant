import { useState, useEffect } from "react";

export default function useDarkSide() {
  // Initialize the theme based on localStorage or default to "light"
  const initialTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(initialTheme);

  // Set the colorTheme based on the current theme
  const colorTheme = theme === "dark" ? "light" : "dark";

  // Update localStorage when the theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply the theme to the document root
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
