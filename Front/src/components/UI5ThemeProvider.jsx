import React, { useContext, useEffect } from 'react';
import { ThemeProvider } from '@ui5/webcomponents-react';
import { ThemeContext } from '../App';

// This component provides proper theme configuration for UI5 components
const UI5ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  
  // Set UI5 theme based on app theme
  useEffect(() => {
    // Apply minimal UI5 theming
    document.documentElement.style.setProperty('--sapBackgroundColor', theme === 'dark' ? '#121212' : '#f7f7f7');
    document.documentElement.style.setProperty('--sapTextColor', theme === 'dark' ? '#ffffff' : '#32363a');
    document.documentElement.style.setProperty('--sapContent_GridBackground', theme === 'dark' ? '#121212' : '#f7f7f7');
    document.documentElement.style.setProperty('--sapChart_BackgroundColor', theme === 'dark' ? '#121212' : '#f7f7f7');
    
    // More specific variables for chart elements
    document.documentElement.style.setProperty('--sapVizChart_Background', theme === 'dark' ? '#121212' : '#f7f7f7');
    document.documentElement.style.setProperty('--sapUiChartBackgroundColor', theme === 'dark' ? '#121212' : '#f7f7f7');
  }, [theme]);
  
  return (
    <ThemeProvider theme={theme === 'dark' ? 'sap_horizon_dark' : 'sap_horizon'}>
      {children}
    </ThemeProvider>
  );
};

export default UI5ThemeProvider; 