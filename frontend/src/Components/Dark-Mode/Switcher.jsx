// Filename - Components/Switcher.js

import React, { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "./useDarkSide";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === "dark" ? false : true);

  const toggleDarkMode = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    setDarkSide(checked);
    localStorage.setItem("darkMode", newTheme);
  };

  // Use useEffect to set dark mode based on localStorage on component mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkSide(storedDarkMode === "dark");
      setTheme(storedDarkMode);
    }
  }, [setDarkSide, setTheme]);

  return (
    <>
      <DarkModeSwitch
        style={{ marginBottom: "2rem", color: "white" }}
        checked={darkSide}
        onChange={toggleDarkMode}
        size={30}
      />
    </>
  );
}
