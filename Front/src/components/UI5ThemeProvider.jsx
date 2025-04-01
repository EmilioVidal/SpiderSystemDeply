import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import { ThemeProvider } from 'styled-components';
import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents/dist/Assets.js";

// This ensures all UI5 web components are correctly initialized
import "@ui5/webcomponents-base/dist/Render.js";

// Import UI5 themes
import "@ui5/webcomponents-theming/dist/Assets.js";
import { getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

// Base theme object
const lightTheme = {
  background: '#f7f7f7',
  text: '#32363a',
  borderColor: '#e0e0e0',
  cardBg: '#ffffff',
  inputBg: '#ffffff',
  tableHeaderBg: '#f5f6f7',
  tableHoverBg: '#f5f6f7',
  primaryColor: '#0854a0',
  primaryColorHover: '#073a6f',
  statusGreen: '#107e3e',
  statusYellow: '#e9730c',
  statusRed: '#bb0000',
  statusGray: '#6a6d70',
  buttonBg: '#f7f7f7',
  buttonText: '#32363a',
  backgroundHover: '#f5f5f5',
  focusBorder: '#0854a0',
  focusShadow: 'rgba(8, 84, 160, 0.3)',
  iconColor: '#6a6d70',
  tooltipBg: '#333333',
  tooltipText: '#ffffff',
  backgroundLight: '#eeeeee',
  isDarkTheme: false
};

const darkTheme = {
  ...lightTheme,
  background: '#1c1c1c',
  text: '#ffffff',
  borderColor: '#444444',
  cardBg: '#2d2d2d',
  inputBg: '#3d3d3d',
  tableHeaderBg: '#252525',
  tableHoverBg: '#3d3d3d',
  primaryColor: '#4c9aff',
  primaryColorHover: '#2684ff',
  statusGreen: '#36b37e',
  statusYellow: '#ffab00',
  statusRed: '#ef5350',
  statusGray: '#a0a0a0',
  buttonBg: '#3d3d3d',
  buttonText: '#ffffff',
  backgroundHover: '#4d4d4d',
  focusBorder: '#4c9aff',
  focusShadow: 'rgba(59, 130, 246, 0.5)',
  iconColor: '#a0a0a0',
  tooltipBg: '#4d4d4d',
  tooltipText: '#ffffff',
  backgroundLight: '#333333',
  isDarkTheme: true
};

// This component provides proper theme configuration for UI5 components
const UI5ThemeProvider = ({ children }) => {
  const { theme, setTheme: setAppTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  useEffect(() => {
    // Set the theme based on the current theme context
    const ui5Theme = isDarkTheme ? "sap_horizon_dark" : "sap_horizon";
    setTheme(ui5Theme);
    
    // Apply theme CSS variables
    if (isDarkTheme) {
      document.documentElement.style.setProperty('--sapBackgroundColor', '#1c1c1c');
      document.documentElement.style.setProperty('--sapGroup_ContentBackground', '#2d2d2d');
      document.documentElement.style.setProperty('--sapTile_Background', '#2d2d2d');
      document.documentElement.style.setProperty('--sapContent_LabelColor', '#a0a0a0');
      document.documentElement.style.setProperty('--sapGroup_ContentBorderColor', '#444444');
      document.documentElement.style.setProperty('--sapIndicator', '#4c9aff');
    } else {
      document.documentElement.style.setProperty('--sapBackgroundColor', '#f7f7f7');
      document.documentElement.style.setProperty('--sapGroup_ContentBackground', '#ffffff');
      document.documentElement.style.setProperty('--sapTile_Background', '#ffffff');
      document.documentElement.style.setProperty('--sapContent_LabelColor', '#6a6d70');
      document.documentElement.style.setProperty('--sapGroup_ContentBorderColor', '#d9d9d9');
      document.documentElement.style.setProperty('--sapIndicator', '#0854a0');
    }
    
    // Optional: Log the theme for debugging
    console.log(`UI5 theme set to: ${getTheme()}`);
  }, [isDarkTheme]);

  return (
    <ThemeProvider theme={{...currentTheme, isDarkTheme}}>
      {children}
    </ThemeProvider>
  );
};

export default UI5ThemeProvider; 