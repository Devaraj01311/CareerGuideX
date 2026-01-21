import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn) {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle(
          "dark",
          savedTheme === "dark"
        );
      }
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [isLoggedIn]);

  const toggleTheme = () => {
    if (!isLoggedIn) return; 

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const resetTheme = () => {
    setTheme("light");
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, resetTheme, isLoggedIn }}>
      {children}
    </ThemeContext.Provider>
  );
};
