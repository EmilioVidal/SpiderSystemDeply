import React, { createContext, useState, useEffect } from 'react';
import { Light, Dark } from './Themes';

// Crear el contexto del tema
export const ThemeContext = createContext();

// Componente proveedor del tema
export const ThemeProvider = ({ children }) => {
  // Estado para controlar el tema actual
  const [theme, setTheme] = useState('light');
  
  // Para cargar el tema guardado en localStorage al inicio
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Función para cambiar entre temas
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Obtener el objeto de tema actual
  const currentTheme = theme === 'light' ? Light : Dark;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 