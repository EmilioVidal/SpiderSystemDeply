import React, { useContext, useEffect } from 'react';
import { ThemeProvider } from '@ui5/webcomponents-react';
import { ThemeContext } from '../App';

// This component provides proper theme configuration for UI5 components
const UI5ThemeProvider = ({ children }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === 'dark';
  
  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };
  
  // Set UI5 theme based on app theme
  useEffect(() => {
    // Apply minimal UI5 theming
    document.documentElement.style.setProperty('--sapBackgroundColor', isDarkTheme ? '#121212' : '#f7f7f7');
    document.documentElement.style.setProperty('--sapTextColor', isDarkTheme ? '#ffffff' : '#32363a');
    document.documentElement.style.setProperty('--sapContent_GridBackground', isDarkTheme ? '#121212' : '#f7f7f7');
    document.documentElement.style.setProperty('--sapChart_BackgroundColor', isDarkTheme ? '#121212' : '#f7f7f7');
    
    // More specific variables for chart elements
    document.documentElement.style.setProperty('--sapVizChart_Background', isDarkTheme ? '#121212' : '#f7f7f7');
    document.documentElement.style.setProperty('--sapUiChartBackgroundColor', isDarkTheme ? '#121212' : '#f7f7f7');
  }, [isDarkTheme]);
  
  // Pass isDarkTheme and toggleTheme as properties of the children
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isDarkTheme, toggleTheme });
    }
    return child;
  });
  
  return (
    <ThemeProvider theme={isDarkTheme ? 'sap_horizon_dark' : 'sap_horizon'}>
      {enhancedChildren}
    </ThemeProvider>
  );
};

export default UI5ThemeProvider; 