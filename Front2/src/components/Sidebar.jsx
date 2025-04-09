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
    if (isMobile) {
      setIsOpen(false);
    }
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
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: isDarkMode ? '#fff' : '#000'
            }}
          >
            ☰
          </button>
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

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: '60px',
        left: isOpen ? 0 : '-250px',
        width: '250px',
        height: 'calc(100vh - 60px)',
        backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
        borderRight: '1px solid ' + (isDarkMode ? '#333' : '#e0e0e0'),
        transition: 'left 0.3s ease',
        overflowY: 'auto',
        zIndex: 999
      }}>
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
                transition: 'background-color 0.2s'
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
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay para móvil */}
      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998
          }}
        />
      )}
    </>
  );
} 