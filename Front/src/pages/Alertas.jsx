import React, { useState, useRef, useEffect, useContext, useCallback, useMemo } from "react";
import { ThemeContext } from "../App";
import {
  Container,
  PageHeader,
  PageTitle,
  AlertsContainer,
  FilterToolbar,
  PaginationContainer,
  PaginationButton,
  NavigationButton
} from "../styles/Alertas/AlertasStyle";
import UI5ThemeProvider from "../components/UI5ThemeProvider";
import { MdSync } from "react-icons/md";

// Theme icons
const SunIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MoonIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79C20.8426 14.4922 20.2043 16.1144 19.1581 17.4668C18.1119 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41102 20.3741 6.88299 19.5345 5.67423 18.3258C4.46546 17.117 3.62594 15.589 3.25391 13.9205C2.88188 12.252 2.99272 10.5121 3.57346 8.9043C4.1542 7.29651 5.18083 5.88813 6.53321 4.84194C7.88559 3.79576 9.5078 3.15731 11.21 3C10.2134 4.34827 9.73385 6.00945 9.85853 7.68141C9.98321 9.35338 10.7039 10.9251 11.8894 12.1106C13.0749 13.2961 14.6466 14.0168 16.3186 14.1415C17.9906 14.2662 19.6517 13.7866 21 12.79Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SVG icons for alerts
const AlertIcons = {
  error: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
    </svg>
  ),
  warning: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="currentColor"/>
    </svg>
  ),
  success: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
    </svg>
  ),
};

// Product/Alert type icons
const ProductIcons = {
  stock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4C3 2 2 2.9 2 4V7.01C2 7.73 2.43 8.35 3 8.7V20C3 21.1 4.1 22 5 22H19C19.9 22 21 21.1 21 20V8.7C21.57 8.35 22 7.73 22 7.01V4C22 2.9 21 2 20 2ZM19 20H5V9H19V20ZM20 7H4V4H20V7Z" fill="#0854a0"/>
      <path d="M15 12H9V14H15V12Z" fill="#0854a0"/>
    </svg>
  ),
  demand: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 18.49L9.5 12.48L13.5 16.48L22 6.92L20.59 5.51L13.5 13.48L9.5 9.48L2 16.99L3.5 18.49Z" fill="#0854a0"/>
    </svg>
  ),
  shipping: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8H17V4H3C1.9 4 1 4.9 1 6V17H3C3 18.66 4.34 20 6 20C7.66 20 9 18.66 9 17H15C15 18.66 16.34 20 18 20C19.66 20 21 18.66 21 17H23V12L20 8ZM19.5 9.5L21.46 12H17V9.5H19.5ZM6 18C5.45 18 5 17.55 5 17C5 16.45 5.45 16 6 16C6.55 16 7 16.45 7 17C7 17.55 6.55 18 6 18ZM8.22 15C7.67 14.39 6.89 14 6 14C5.11 14 4.33 14.39 3.78 15H3V6H15V15H8.22ZM18 18C17.45 18 17 17.55 17 17C17 16.45 17.45 16 18 16C18.55 16 19 16.45 19 17C19 17.55 18.55 18 18 18Z" fill="#0854a0"/>
    </svg>
  ),
};

// Filter icon
const FilterIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 12h-5c-.28 0-.5.22-.5.5s.22.5.5.5h5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zm9-9h-14c-.28 0-.5.22-.5.5s.22.5.5.5h14c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zm-3 3h-11c-.28 0-.5.22-.5.5s.22.5.5.5h11c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zm-6 3h-5c-.28 0-.5.22-.5.5s.22.5.5.5h5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zm9.5.5c0 .28-.22.5-.5.5h-5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h5c.28 0 .5.22.5.5z" fill="currentColor"/>
  </svg>
);

// Navigation icons
const ChevronLeft = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 3.5L6 8L10.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 12.5L10 8L5.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDoubleLeft = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 3.5L4 8L8.5 12.5M12.5 3.5L8 8L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDoubleRight = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 12.5L12 8L7.5 3.5M3.5 12.5L8 8L3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Dropdown/Chevron icons
const ChevronDown = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 6L8 10.5L12.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Configuración de umbrales para alertas
const STOCK_THRESHOLDS = {
  CRITICAL: 5,  // Nivel crítico de stock
  WARNING: 10,  // Nivel de advertencia de stock
  REORDER: 15,  // Punto de reorden
  HIGH_DEMAND: 20  // Umbral para alta demanda
};

// Configuración de actualización y paginación
const UPDATE_INTERVAL = 30000; // 30 segundos
const ALERTS_PER_PAGE = 10;
const MAX_RESOLVED_ALERTS = 10;

function AlertasContent() {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const alertsContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [estimatedAlertHeight, setEstimatedAlertHeight] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [allAlerts, setAllAlerts] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef(null);

  const availableFilters = [
    { id: "error", label: "Stock Crítico/Agotado", color: "#bb0000" },
    { id: "warning", label: "Advertencias", color: "#e9730c" },
    { id: "success", label: "Resueltos", color: "#107e3e" }
  ];

  // Función para manejar los filtros
  const toggleFilter = (filterId) => {
    setActiveFilters(prev => {
      const newFilters = prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId];
      
      // Resetear a la primera página cuando cambian los filtros
      setCurrentPage(1);
      return newFilters;
    });
  };

  // Filtrar las alertas según los filtros activos
  const filteredAlerts = useMemo(() => {
    if (activeFilters.length === 0) return allAlerts;
    return allAlerts.filter(alert => activeFilters.includes(alert.type));
  }, [allAlerts, activeFilters]);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Definir las funciones de generación de alertas primero
  const generateStockAlert = useCallback((product) => {
    if (!product) return null;
    
    if (product.cantidad === 0) {
      return {
        type: "error",
        status: "Agotado",
        title: `${product.producto} - Sin Stock`,
        details: "0 unidades disponibles en todas las ubicaciones"
      };
    } else if (product.cantidad <= STOCK_THRESHOLDS.CRITICAL) {
      return {
        type: "error",
        status: "Crítico",
        title: `${product.producto} - Stock Crítico`,
        details: `Stock actual: ${product.cantidad} unidades (Por debajo del umbral crítico de ${STOCK_THRESHOLDS.CRITICAL})`
      };
    } else if (product.cantidad <= STOCK_THRESHOLDS.WARNING) {
      return {
        type: "warning",
        status: "Bajo Stock",
        title: `${product.producto} - Stock Bajo`,
        details: `Stock actual: ${product.cantidad} unidades (Por debajo del umbral de advertencia de ${STOCK_THRESHOLDS.WARNING})`
      };
    } else if (product.cantidad <= STOCK_THRESHOLDS.REORDER) {
      return {
        type: "warning",
        status: "Punto de Reorden",
        title: `${product.producto} - Punto de Reorden`,
        details: `Stock actual: ${product.cantidad} unidades (Punto de reorden: ${STOCK_THRESHOLDS.REORDER})`
      };
    }
    return null;
  }, []);

  const generateDemandAlert = useCallback((product) => {
    if (!product) return null;
    
    if (product.ventas24h >= STOCK_THRESHOLDS.HIGH_DEMAND) {
      return {
        type: "warning",
        status: "Alta Demanda",
        title: `Alta demanda - ${product.producto}`,
        details: `Ventas últimas 24h: ${product.ventas24h} unidades`
      };
    }
    return null;
  }, []);

  // Función para calcular el número total de páginas
  const calculateTotalPages = useCallback((alerts) => {
    return Math.ceil(alerts.length / ALERTS_PER_PAGE);
  }, []);

  // Función para obtener las alertas de la página actual
  const getCurrentPageAlerts = useCallback((alerts, page) => {
    const startIndex = (page - 1) * ALERTS_PER_PAGE;
    const endIndex = startIndex + ALERTS_PER_PAGE;
    return alerts.slice(startIndex, endIndex);
  }, []);

  // Inicializar las alertas al montar el componente
  useEffect(() => {
    const initialProducts = [
      {
        producto: "Nike Air Max 270",
        cantidad: 3,
        proveedor: "Calzado Deportivo Premium",
        ventas24h: 25,
        ultimaActualizacion: new Date()
      },
      {
        producto: "Adidas Ultraboost",
        cantidad: 8,
        proveedor: "Calzado Deportivo Premium",
        ventas24h: 18,
        ultimaActualizacion: new Date()
      }
    ];

    const initialAlerts = [];
    initialProducts.forEach(product => {
      const stockAlert = generateStockAlert(product);
      if (stockAlert) {
        initialAlerts.push({
          id: Date.now() + Math.random(),
          ...stockAlert,
          resolved: false,
          productIcon: "stock",
          timestamp: new Date()
        });
      }

      const demandAlert = generateDemandAlert(product);
      if (demandAlert) {
        initialAlerts.push({
          id: Date.now() + Math.random(),
          ...demandAlert,
          resolved: false,
          productIcon: "demand",
          timestamp: new Date()
        });
      }
    });

    setAllAlerts(initialAlerts);
  }, [generateStockAlert, generateDemandAlert]);

  // Efecto para actualizar las alertas periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedProducts = [
        {
          producto: "Nike Air Max 270",
          cantidad: Math.floor(Math.random() * 20),
          proveedor: "Calzado Deportivo Premium",
          ventas24h: Math.floor(Math.random() * 30),
          ultimaActualizacion: new Date()
        },
        {
          producto: "Adidas Ultraboost",
          cantidad: Math.floor(Math.random() * 20),
          proveedor: "Calzado Deportivo Premium",
          ventas24h: Math.floor(Math.random() * 30),
          ultimaActualizacion: new Date()
        }
      ];

      setAllAlerts(prevAlerts => {
        const resolvedAlerts = prevAlerts.filter(alert => alert.resolved);
        const existingAlerts = prevAlerts.filter(alert => !alert.resolved);
        const newAlerts = [];

        updatedProducts.forEach(product => {
          const stockAlert = generateStockAlert(product);
          if (stockAlert) {
            const existingStockAlert = existingAlerts.find(
              alert => alert.title.includes(product.producto) && 
                      alert.type === stockAlert.type &&
                      alert.status === stockAlert.status
            );
            
            if (!existingStockAlert) {
              newAlerts.push({
                id: Date.now() + Math.random(),
                ...stockAlert,
                resolved: false,
                productIcon: "stock",
                timestamp: new Date()
              });
            }
          }

          const demandAlert = generateDemandAlert(product);
          if (demandAlert) {
            const existingDemandAlert = existingAlerts.find(
              alert => alert.title.includes(product.producto) && 
                      alert.type === demandAlert.type &&
                      alert.status === demandAlert.status
            );
            
            if (!existingDemandAlert) {
              newAlerts.push({
                id: Date.now() + Math.random(),
                ...demandAlert,
                resolved: false,
                productIcon: "demand",
                timestamp: new Date()
              });
            }
          }
        });

        const allUpdatedAlerts = [
          ...newAlerts,
          ...existingAlerts,
          ...resolvedAlerts.slice(0, MAX_RESOLVED_ALERTS)
        ].sort((a, b) => {
          if (a.resolved === b.resolved) {
            return (b.timestamp || 0) - (a.timestamp || 0);
          }
          return a.resolved ? 1 : -1;
        });

        return allUpdatedAlerts;
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [generateStockAlert, generateDemandAlert]);

  // Obtener alertas para la página actual usando las alertas filtradas
  const currentAlerts = useMemo(() => {
    const startIndex = (currentPage - 1) * ALERTS_PER_PAGE;
    const endIndex = startIndex + ALERTS_PER_PAGE;
    return filteredAlerts.slice(startIndex, endIndex);
  }, [filteredAlerts, currentPage]);

  // Calcular el total de páginas basado en las alertas filtradas
  const totalPages = useMemo(() => {
    return Math.ceil(filteredAlerts.length / ALERTS_PER_PAGE);
  }, [filteredAlerts]);

  // Calcular altura del contenedor y de cada alerta para ajustar el número de alertas por página
  useEffect(() => {
    const updateDimensions = () => {
      if (alertsContainerRef.current) {
        const containerHeight = alertsContainerRef.current.clientHeight;
        setContainerHeight(containerHeight);
      }
    };

    // Calcular altura estimada de una alerta después de que el DOM se haya cargado
    const calculateAlertHeight = () => {
      const firstAlertItem = document.querySelector('.alert-item');
      if (firstAlertItem) {
        // Añadir margen entre alertas
        const actualHeight = firstAlertItem.offsetHeight + 8; // 8px for gap
        setEstimatedAlertHeight(actualHeight);
      }
    };

    updateDimensions();
    
    // Observar cambios en las dimensiones
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
      calculateAlertHeight();
    });
    
    if (alertsContainerRef.current) {
      resizeObserver.observe(alertsContainerRef.current);
    }
    
    // Calcular altura de alerta después del primer render
    setTimeout(calculateAlertHeight, 100);
    
    return () => {
      if (alertsContainerRef.current) {
        resizeObserver.unobserve(alertsContainerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  const handleResolveAlert = (id) => {
    setAllAlerts(
      allAlerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              resolved: true,
              status: "Resuelto",
              type: "success"
            }
          : alert
      )
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Estilos para el botón de resolver más redondeado
  const roundedButtonStyle = {
    borderRadius: '18px',
    padding: '0.25rem 1rem',
    backgroundColor: isDarkTheme ? '#2d3239' : 'white',
    border: isDarkTheme ? '1px solid #4d5358' : '1px solid #d9d9d9',
    color: isDarkTheme ? '#e5e5e5' : '#32363a',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: '400',
    height: '2rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
    boxShadow: isDarkTheme ? '0 1px 2px rgba(0, 0, 0, 0.2)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
  };

  // Update filter dropdown styles for dark mode
  const filterDropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '4px',
    backgroundColor: isDarkTheme ? '#2d3239' : 'white',
    border: isDarkTheme ? '1px solid #4d5358' : '1px solid #d9d9d9',
    borderRadius: '4px',
    boxShadow: isDarkTheme ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 10,
    minWidth: '200px'
  };

  // Update styles for dark mode
  const getStatusColor = (type) => {
    if (isDarkTheme) {
      return type === "success" ? "#107e3e" : type === "warning" ? "#e9730c" : "#bb0000";
    }
    return type === "success" ? "#107e3e" : type === "warning" ? "#e9730c" : "#bb0000";
  };

  const getStatusBackgroundColor = (type) => {
    if (isDarkTheme) {
      return type === "success" ? "#132f1e" : type === "warning" ? "#3a2806" : "#380000";
    }
    return type === "success" ? "#f5faf6" : type === "warning" ? "#fffaf0" : "#fff0f0";
  };

  return (
    <Container>
      <PageHeader>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: '20px'  // Añadir espacio entre elementos
        }}>
          <PageTitle>Sistema de alertas de inventario</PageTitle>
          <div style={{ 
            fontSize: '0.85rem', 
            color: 'var(--sapContent_LabelColor)',
            backgroundColor: isDarkTheme ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            padding: '4px 12px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <MdSync size={14} />
            Actualizando cada {UPDATE_INTERVAL / 1000} segundos
          </div>
        </div>
      </PageHeader>

      <FilterToolbar>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }} ref={filterDropdownRef}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              padding: '4px 12px',
              border: isDarkTheme ? '1px solid #4d5358' : '1px solid #d9d9d9',
              borderRadius: '4px',
              backgroundColor: activeFilters.length > 0 
                ? (isDarkTheme ? '#3d4249' : '#f0f0f0') 
                : 'transparent',
              gap: '8px'
            }}
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            {FilterIcon}
            <span>Filtros ({activeFilters.length})</span>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {ChevronDown}
            </span>
          </div>
          
          {isFilterDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '4px',
              backgroundColor: isDarkTheme ? '#2d3239' : 'white',
              border: isDarkTheme ? '1px solid #4d5358' : '1px solid #d9d9d9',
              borderRadius: '4px',
              boxShadow: isDarkTheme ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.15)',
              zIndex: 10,
              minWidth: '200px'
            }}>
              <div style={{ 
                padding: '8px 12px', 
                borderBottom: isDarkTheme ? '1px solid #4d5358' : '1px solid #e5e5e5',
                fontWeight: 'bold',
                color: isDarkTheme ? '#e5e5e5' : '#32363a'
              }}>
                Filtrar por estado
              </div>
              {availableFilters.map(filter => (
                <div 
                  key={filter.id}
                  style={{ 
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: activeFilters.includes(filter.id) 
                      ? (isDarkTheme ? '#3d4249' : '#f0f0f0') 
                      : 'transparent',
                    color: isDarkTheme ? '#e5e5e5' : '#32363a',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => toggleFilter(filter.id)}
                >
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '2px',
                    border: isDarkTheme ? '1px solid #4d5358' : '1px solid #d9d9d9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: activeFilters.includes(filter.id) ? filter.color : 'transparent'
                  }}>
                    {activeFilters.includes(filter.id) && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 3.5L5 8L2.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ marginLeft: '8px' }}>{filter.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <NavigationButton disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
            {ChevronDoubleLeft}
          </NavigationButton>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <PaginationButton 
              key={page} 
              active={currentPage === page} 
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationButton>
          ))}
          
          <NavigationButton disabled={currentPage === totalPages || totalPages === 0} onClick={() => handlePageChange(totalPages)}>
            {ChevronDoubleRight}
          </NavigationButton>
        </div>
      </FilterToolbar>

      <AlertsContainer ref={alertsContainerRef}>
        {currentAlerts.length > 0 ? (
          <div style={{ 
            width: "100%", 
            backgroundColor: isDarkTheme ? "var(--sapList_Background)" : "white",
            borderRadius: "8px",
            boxShadow: "var(--sapContent_Shadow0)",
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              padding: "0.75rem 1rem",
              borderBottom: "1px solid var(--sapContent_ForegroundBorderColor)",
              fontWeight: "bold",
              fontSize: "1rem",
              color: "var(--sapTextColor)"
            }}>
              Alertas
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {currentAlerts.map((alert) => (
                <li 
                  key={alert.id}
                  className="alert-item"
                  style={{ 
                    padding: "1rem",
                    borderBottom: "1px solid var(--sapContent_ForegroundBorderColor)",
                    backgroundColor: getStatusBackgroundColor(alert.type),
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: isDarkTheme ? "var(--sapList_Hover_Background)" : "var(--sapList_Hover_Background)",
                    }
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ color: getStatusColor(alert.type) }}>
                        {AlertIcons[alert.type]}
                      </div>
                      <div>
                        <div style={{ 
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "var(--sapTextColor)"
                        }}>{alert.title}</div>
                        <div style={{ 
                          fontSize: "0.8rem",
                          color: "var(--sapContent_LabelColor)",
                          marginTop: "4px"
                        }}>{alert.details}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        backgroundColor: getStatusBackgroundColor(alert.type),
                        color: getStatusColor(alert.type),
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        {alert.status}
                      </span>
                      {!alert.resolved && (
                        <button 
                          style={{
                            ...roundedButtonStyle,
                            backgroundColor: isDarkTheme ? "var(--sapButton_Background)" : "white",
                            border: "1px solid var(--sapButton_BorderColor)",
                            color: "var(--sapButton_TextColor)"
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResolveAlert(alert.id);
                          }}
                        >
                          Marcar como resuelta
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* Información de paginación integrada */}
            <div style={{ 
              padding: '0.5rem 2rem',
              borderTop: '1px solid var(--sapContent_ForegroundBorderColor)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ 
                fontSize: '0.75rem',
                color: 'var(--sapContent_LabelColor)'
              }}>
                Mostrando {currentAlerts ? currentAlerts.length : 0} de {filteredAlerts ? filteredAlerts.length : 0} alertas
              </span>
              
              <PaginationContainer>
                <NavigationButton disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
                  {ChevronDoubleLeft}
                </NavigationButton>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationButton 
                    key={page} 
                    active={currentPage === page} 
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationButton>
                ))}
                
                <NavigationButton disabled={currentPage === totalPages || totalPages === 0} onClick={() => handlePageChange(totalPages)}>
                  {ChevronDoubleRight}
                </NavigationButton>
              </PaginationContainer>

              <span style={{ 
                fontSize: '0.75rem',
                color: 'var(--sapContent_LabelColor)'
              }}>
                {currentPage === 1 ? 'Primera Página' : 
                currentPage === 2 ? 'Segunda Página' : 
                currentPage === 3 ? 'Tercera Página' : 
                `Página ${currentPage}`}
              </span>
            </div>
          </div>
        ) : (
          <div style={{ 
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--sapContent_LabelColor)',
            backgroundColor: isDarkTheme ? "var(--sapList_Background)" : "white",
            borderRadius: '4px',
            boxShadow: "var(--sapContent_Shadow0)"
          }}>
            {activeFilters.length > 0 
              ? "No se encontraron alertas con los filtros seleccionados"
              : "No hay alertas disponibles"}
          </div>
        )}
      </AlertsContainer>

      <div style={{ 
        padding: '0.5rem 1rem',
        fontSize: '0.8rem',
        color: 'var(--sapContent_LabelColor)',
        textAlign: 'right'
      }}>
        Mostrando {currentAlerts.length} de {allAlerts.length} alertas | 
        Página {currentPage} de {totalPages}
      </div>
    </Container>
  );
}

export function Alertas() {
  return (
    <UI5ThemeProvider>
      <AlertasContent />
    </UI5ThemeProvider>
  );
}