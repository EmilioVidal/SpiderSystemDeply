import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUI5Theme } from "./UI5ThemeProvider";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useUI5Theme();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const menuItems = [
    { path: '/home', label: 'Inicio', icon: '🏠' },
    { path: '/sistema_de_alertas', label: 'Sistema de Alertas', icon: '⚠️' },
    { path: '/analisis_predictivo', label: 'Análisis Predictivo', icon: '📊' },
    { path: '/inventario', label: 'Inventario', icon: '📦' },
    { path: '/analisis_de_inventario', label: 'Análisis de Inventario', icon: '📈' },
    { path: '/metricas', label: 'Métricas', icon: '📉' },
    { path: '/admin', label: 'Admin', icon: '⚙️' },
    { path: '/chat', label: 'Chat', icon: '💬' },
    { path: '/compras', label: 'Compras', icon: '🛒' },
    { path: '/gestion_proveedores', label: 'Gestión de Proveedores', icon: '🤝' },
    { path: '/ordenes', label: 'Órdenes', icon: '📋' }
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Header */}
      <div className="header" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
        borderBottom: '1px solid ' + (isDarkMode ? '#333' : '#e0e0e0'),
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div 
            onMouseEnter={() => setIsOpen(true)}
            style={{
              fontSize: '24px',
              cursor: 'pointer',
              color: isDarkMode ? '#fff' : '#000',
              padding: '8px'
            }}
          >
            ☰
          </div>
          <span style={{ 
            fontSize: '20px', 
            fontWeight: 'bold',
            color: isDarkMode ? '#fff' : '#000'
          }}>
            Spider System
          </span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={toggleDarkMode}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: isDarkMode ? '#fff' : '#000'
            }}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: isDarkMode ? '#fff' : '#000'
            }}
          >
            👤
          </button>
        </div>
      </div>

      {/* Contenedor principal que incluye sidebar y contenido */}
      <div style={{
        display: 'flex',
        marginTop: '60px',
        minHeight: 'calc(100vh - 60px)',
      }}>
        {/* Sidebar */}
        <div 
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          style={{
            width: isOpen ? '250px' : '60px',
            backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
            borderRight: '1px solid ' + (isDarkMode ? '#333' : '#e0e0e0'),
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            flexShrink: 0
          }}
        >
          <nav style={{ padding: '20px 0' }}>
            {menuItems.map((item) => (
              <div
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                style={{
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  backgroundColor: location.pathname === item.path 
                    ? (isDarkMode ? '#333' : '#f0f0f0')
                    : 'transparent',
                  color: isDarkMode ? '#fff' : '#000',
                  transition: 'background-color 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#444' : '#e0e0e0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 
                    location.pathname === item.path 
                      ? (isDarkMode ? '#333' : '#f0f0f0')
                      : 'transparent';
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ 
                  opacity: isOpen ? 1 : 0, 
                  transition: 'opacity 0.3s',
                  overflow: 'hidden'
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Contenedor del contenido principal */}
        <div style={{
          flex: 1,
          padding: '8px',
          backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
          transition: 'margin-left 0.3s ease',
          overflow: 'auto'
        }}>
          {/* Aquí irá el contenido de la página */}
        </div>
      </div>
    </>
  );
} 