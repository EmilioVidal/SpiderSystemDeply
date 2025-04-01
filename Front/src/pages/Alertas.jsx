import React, { useState, useRef, useEffect } from "react";
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

function AlertasContent({ isDarkTheme, toggleTheme }) {
  const alertsContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [estimatedAlertHeight, setEstimatedAlertHeight] = useState(100); // Default height estimation in pixels
  
  const [allAlerts, setAllAlerts] = useState([
    {
      id: 1,
      title: "Stock bajo en Producto A",
      type: "error",
      status: "Crítico",
      resolved: false,
      productIcon: "stock"
    },
    {
      id: 2,
      title: "Alta demanda en Producto B",
      type: "success",
      status: "Resuelto",
      resolved: true,
      productIcon: "demand"
    },
    {
      id: 3,
      title: "Pedido retrasado de Proveedor X",
      type: "warning",
      status: "Advertencia",
      resolved: false,
      productIcon: "shipping"
    },
    {
      id: 4,
      title: "Actualización de inventario pendiente",
      type: "warning",
      status: "Advertencia",
      resolved: false,
      productIcon: "stock"
    },
    {
      id: 5,
      title: "Producto C sin stock",
      type: "error",
      status: "Crítico",
      resolved: false,
      productIcon: "stock"
    },
    {
      id: 6,
      title: "Reabastecimiento programado",
      type: "success",
      status: "Resuelto",
      resolved: true,
      productIcon: "stock"
    },
    {
      id: 7,
      title: "Entrega retrasada de Producto D",
      type: "warning",
      status: "Advertencia",
      resolved: false,
      productIcon: "shipping"
    },
    {
      id: 8,
      title: "Incremento de demanda Producto E",
      type: "warning",
      status: "Advertencia",
      resolved: false,
      productIcon: "demand"
    },
    {
      id: 9,
      title: "Producto F agotado en tienda principal",
      type: "error",
      status: "Crítico",
      resolved: false,
      productIcon: "stock"
    },
    {
      id: 10,
      title: "Reposición de Producto G completada",
      type: "success",
      status: "Resuelto",
      resolved: true,
      productIcon: "stock"
    }
  ]);

  // Filtrado
  const [activeFilters, setActiveFilters] = useState([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef(null);
  
  const availableFilters = [
    { id: "error", label: "Crítico", color: "#bb0000" },
    { id: "warning", label: "Advertencia", color: "#e9730c" },
    { id: "success", label: "Resuelto", color: "#107e3e" }
  ];
  
  // Cierra el dropdown al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const toggleFilter = (filterId) => {
    setActiveFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };
  
  // Filtrar las alertas según los filtros activos
  const filteredAlerts = activeFilters.length > 0
    ? allAlerts.filter(alert => activeFilters.includes(alert.type))
    : allAlerts;

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calcular cuántas alertas mostrar por página basado en el espacio disponible
  const calculateItemsPerPage = () => {
    if (containerHeight <= 0 || estimatedAlertHeight <= 0) {
      return 5; // Valor predeterminado
    }
    
    // Calcular cuántas alertas caben en el contenedor con un margen de seguridad
    const safetyMargin = 20; // Píxeles extra para evitar overflow
    const availableHeight = containerHeight - safetyMargin;
    const calculatedItemsPerPage = Math.floor(availableHeight / estimatedAlertHeight);
    
    // Asegurar un mínimo de elementos por página y añadir uno más para aprovechar mejor el espacio
    const baseItemsPerPage = Math.max(calculatedItemsPerPage, 4);
    
    // Para la segunda página, mostrar aproximadamente la mitad de elementos
    if (filteredAlerts.length > baseItemsPerPage && currentPage > 1) {
      return Math.ceil(baseItemsPerPage / 2);
    }
    
    return baseItemsPerPage;
  };
  
  const alertsPerPage = calculateItemsPerPage();
  
  // Recalcular el número total de páginas basado en si hay contenido para la segunda página
  const calculateTotalPages = () => {
    if (filteredAlerts.length === 0) return 0;
    
    const firstPageItemCount = Math.min(
      Math.floor(containerHeight / estimatedAlertHeight) + 1,
      filteredAlerts.length
    );
    
    // Si todos los elementos caben en la primera página, solo hay una página
    if (firstPageItemCount >= filteredAlerts.length) {
      return 1;
    }
    
    // Calcular cuántas páginas adicionales se necesitan para los elementos restantes
    const remainingItems = filteredAlerts.length - firstPageItemCount;
    const itemsPerSubsequentPage = Math.max(Math.ceil(firstPageItemCount / 2), 2);
    return 1 + Math.ceil(remainingItems / itemsPerSubsequentPage);
  };
  
  const totalPages = calculateTotalPages();
  
  // Resetear a la página 1 cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);
  
  // Obtener alertas de la página actual
  const getPageItems = (page) => {
    // Para la primera página, mostrar más elementos
    if (page === 1) {
      const firstPageItemCount = Math.min(
        Math.floor(containerHeight / estimatedAlertHeight) + 1, // Un elemento más de los que cabrían exactamente
        filteredAlerts.length // No más del total disponible
      );
      return filteredAlerts.slice(0, firstPageItemCount);
    } 
    // Para las siguientes páginas, mostrar elementos restantes
    else {
      const firstPageItemCount = Math.min(
        Math.floor(containerHeight / estimatedAlertHeight) + 1,
        filteredAlerts.length
      );
      
      // Asegurarse de que queden elementos para páginas siguientes
      if (firstPageItemCount >= filteredAlerts.length) {
        return []; // No hay más elementos para mostrar
      }
      
      const itemsPerSubsequentPage = Math.max(Math.ceil(firstPageItemCount / 2), 2);
      
      const start = firstPageItemCount + (page - 2) * itemsPerSubsequentPage;
      const end = Math.min(start + itemsPerSubsequentPage, filteredAlerts.length);
      
      return filteredAlerts.slice(start, end);
    }
  };
  
  const currentAlerts = getPageItems(currentPage);

  // Actualizar si hay alertas en cada página para una mejor paginación
  const hasAlertsInPage = (page) => {
    if (page === 1) {
      return filteredAlerts.length > 0;
    } else {
      const firstPageItemCount = Math.min(
        Math.floor(containerHeight / estimatedAlertHeight) + 1,
        filteredAlerts.length
      );
      return firstPageItemCount < filteredAlerts.length;
    }
  };

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

  return (
    <Container>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <PageTitle>Sistema de alertas</PageTitle>
          <button 
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isDarkTheme ? '#fff' : '#32363a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '50%',
              transition: 'background-color 0.2s ease'
            }}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? SunIcon : MoonIcon}
          </button>
        </div>
      </PageHeader>

      <FilterToolbar>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }} ref={filterDropdownRef}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              padding: '4px 8px',
              border: isDarkTheme ? '1px solid #4d5358' : '1px solid #d9d9d9',
              borderRadius: '4px',
              backgroundColor: activeFilters.length > 0 
                ? (isDarkTheme ? '#3d4249' : '#f0f0f0') 
                : 'transparent'
            }}
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            {FilterIcon}
            <span style={{ marginLeft: '8px' }}>
              Filtros ({activeFilters.length})
            </span>
            <span style={{ marginLeft: '4px', display: 'flex', alignItems: 'center' }}>
              {ChevronDown}
            </span>
          </div>
          
          {isFilterDropdownOpen && (
            <div style={filterDropdownStyle}>
              <div style={{ 
                padding: '8px 12px', 
                borderBottom: isDarkTheme ? '1px solid #4d5358' : '1px solid #e5e5e5', 
                fontWeight: 'bold' 
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
                      : 'transparent'
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
                    backgroundColor: activeFilters.includes(filter.id) ? filter.color : (isDarkTheme ? '#2d3239' : 'white')
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
            backgroundColor: isDarkTheme ? "#1e2329" : "white", 
            borderRadius: "8px", 
            boxShadow: isDarkTheme ? "0 1px 4px rgba(0, 0, 0, 0.3)" : "0 1px 4px rgba(0, 0, 0, 0.1)" 
          }}>
            <div style={{ 
              padding: "0.75rem 1rem", 
              borderBottom: isDarkTheme ? "1px solid #4d5358" : "1px solid #e5e5e5", 
              fontWeight: "bold", 
              fontSize: "1rem",
              color: isDarkTheme ? "#e5e5e5" : "#32363a"
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
                    borderBottom: isDarkTheme ? "1px solid #2d3239" : "1px solid #f0f0f0",
                    transition: "background-color 0.1s",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ color: alert.type === "error" ? "#bb0000" : alert.type === "warning" ? "#e9730c" : "#107e3e" }}>
                        {AlertIcons[alert.type]}
                      </div>
                      <div>
                        <div style={{ 
                          fontSize: "0.875rem", 
                          fontWeight: "500",
                          color: isDarkTheme ? "#e5e5e5" : "#32363a"
                        }}>{alert.title}</div>
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "4px", 
                          fontSize: "0.8rem", 
                          color: isDarkTheme ? "#a6a6a6" : "#6a6d70", 
                          marginTop: "4px" 
                        }}>
                          {ProductIcons[alert.productIcon]} {alert.productIcon.charAt(0).toUpperCase() + alert.productIcon.slice(1)}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        backgroundColor: alert.type === "error" 
                          ? (isDarkTheme ? "#3a0000" : "#ffebeb") 
                          : alert.type === "warning" 
                            ? (isDarkTheme ? "#3a2806" : "#fff8d6") 
                            : (isDarkTheme ? "#0d2e16" : "#ebf5cb"),
                        color: alert.type === "error" ? "#bb0000" : alert.type === "warning" ? "#e9730c" : "#107e3e",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        {alert.status}
                      </span>
                      {!alert.resolved && (
                        <button 
                          style={roundedButtonStyle}
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
          </div>
        ) : (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            color: isDarkTheme ? '#a6a6a6' : '#666',
            backgroundColor: isDarkTheme ? '#1e2329' : 'white',
            borderRadius: '4px',
            boxShadow: isDarkTheme ? '0 1px 4px rgba(0, 0, 0, 0.3)' : '0 1px 4px rgba(0, 0, 0, 0.1)'
          }}>
            No se encontraron alertas con los filtros seleccionados
          </div>
        )}
      </AlertsContainer>
      
      {/* Panel de información sobre paginación */}
      <div style={{ 
        padding: '0.5rem 2rem', 
        fontSize: '0.75rem', 
        color: isDarkTheme ? '#a6a6a6' : '#666',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: isDarkTheme ? '1px solid #4d5358' : '1px solid #e5e5e5'
      }}>
        <span>
          Mostrando {currentAlerts ? currentAlerts.length : 0} de {filteredAlerts ? filteredAlerts.length : 0} alertas
        </span>
        <span>
          {currentPage === 1 ? 'Primera Página' : 
           currentPage === 2 ? 'Segunda Página' : 
           currentPage === 3 ? 'Tercera Página' : 
           `Página ${currentPage}`}
        </span>
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