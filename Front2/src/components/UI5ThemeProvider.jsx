import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider } from '@ui5/webcomponents-react';
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';

// Context for theme management
export const UI5ThemeContext = createContext({
  theme: 'sap_horizon',
  setUITheme: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {}
});

// Hook for using theme context
export const useUI5Theme = () => useContext(UI5ThemeContext);

// Available UI5 themes
const UI5_THEMES = {
  LIGHT: 'sap_horizon',
  DARK: 'sap_horizon_dark'
};

export default function UI5ThemeProvider({ children }) {
  const [theme, setUITheme] = useState(UI5_THEMES.LIGHT);
  const isDarkMode = theme === UI5_THEMES.DARK;

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? UI5_THEMES.LIGHT : UI5_THEMES.DARK;
    setUITheme(newTheme);
    localStorage.setItem('ui5Theme', newTheme);
  };

  // Apply theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('ui5Theme');
    if (savedTheme && (savedTheme === UI5_THEMES.LIGHT || savedTheme === UI5_THEMES.DARK)) {
      setUITheme(savedTheme);
    }
  }, []);

  // Apply theme change to UI5 components
  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const themeContextValue = {
    theme,
    setUITheme,
    isDarkMode,
    toggleDarkMode
  };

  return (
    <UI5ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={{ theme }}>
        {children}
      </ThemeProvider>
    </UI5ThemeContext.Provider>
  );
} 