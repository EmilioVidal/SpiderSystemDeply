import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  DynamicPageTitle, 
  DynamicPageHeader,
  Title,
  Text,
  FlexBox,
  FlexBoxDirection,
  FlexBoxAlignItems, 
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Button,
  Bar,
  BarDesign,
  Panel,
  Icon,
  Card,
  CardHeader,
  List,
  StandardListItem,
  ValueState,
  Badge,
  SegmentedButton,
  SegmentedButtonItem,
  MessageStrip,
  Dialog,
  IllustratedMessage,
  IllustrationMessageType,
  BusyIndicator,
  FilterBar,
  FilterGroupItem,
  MultiComboBox,
  MultiComboBoxItem,
  Popover,
  ToolbarSpacer,
  Avatar,
  ButtonDesign
} from "@ui5/webcomponents-react";
import { useUI5Theme } from "../components/UI5ThemeProvider";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/refresh.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/message-success.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/warning.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/inventory.js";
import "@ui5/webcomponents-icons/dist/line-chart.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";
import "@ui5/webcomponents-icons/dist/check-availability.js";
import "@ui5/webcomponents-icons/dist/circle-task.js";
import { styles } from "../Styles/AlertasStyle";
import "@ui5/webcomponents-icons/dist/AllIcons.js";

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

// Lista de productos de ejemplo
const SAMPLE_PRODUCTS = [
  { id: 1, producto: "Zapatillas Deportivas Premium", cantidad: 3, demanda: "alta", categoria: "deportivo" },
  { id: 2, producto: "Mocasines Elegance", cantidad: 0, demanda: "media", categoria: "formal" },
  { id: 3, producto: "Botas de Cuero Importadas", cantidad: 8, demanda: "alta", categoria: "casual" },
  { id: 4, producto: "Zapatos Formales Modelo Ejecutivo", cantidad: 12, demanda: "baja", categoria: "formal" },
  { id: 5, producto: "Sandalias de Playa Tropical", cantidad: 22, demanda: "alta", categoria: "playa" },
  { id: 6, producto: "Tenis Urbanos Street Style", cantidad: 4, demanda: "alta", categoria: "casual" },
  { id: 7, producto: "Botines Chelsea Premium", cantidad: 7, demanda: "media", categoria: "casual" },
  { id: 8, producto: "Zapatos Náuticos Marinero", cantidad: 9, demanda: "baja", categoria: "casual" },
  { id: 9, producto: "Zapatillas Running Pro", cantidad: 0, demanda: "alta", categoria: "deportivo" },
  { id: 10, producto: "Alpargatas Verano Essential", cantidad: 15, demanda: "media", categoria: "playa" },
  { id: 11, producto: "Pantuflas Comfort Home", cantidad: 11, demanda: "baja", categoria: "hogar" },
  { id: 12, producto: "Zapatillas Skate Extreme", cantidad: 5, demanda: "alta", categoria: "deportivo" },
  { id: 13, producto: "Zapatos Oxford Classic", cantidad: 2, demanda: "media", categoria: "formal" },
  { id: 14, producto: "Sandalias Outdoor Adventure", cantidad: 18, demanda: "alta", categoria: "deportivo" },
  { id: 15, producto: "Botas de Lluvia Waterproof", cantidad: 7, demanda: "baja", categoria: "casual" },
];

// Datos de envíos de ejemplo
const SAMPLE_SHIPMENTS = [
  { id: 101, producto: "Zapatillas Deportivas Premium", fecha: "2025-02-15", estado: "retrasado", destino: "Tienda Norte" },
  { id: 102, producto: "Mocasines Elegance", fecha: "2025-02-16", estado: "pendiente", destino: "Tienda Centro" },
  { id: 103, producto: "Botas de Cuero Importadas", fecha: "2025-02-14", estado: "retrasado", destino: "Tienda Sur" },
];

// Reemplazar el componente de paginación con botones
const PaginationBar = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <FlexBox 
      justifyContent={FlexBoxJustifyContent.Center} 
      alignItems={FlexBoxAlignItems.Center}
      style={{ marginTop: "1rem" }}
    >
      <Button
        icon="nav-back"
        disabled={currentPage === 1}
        onClick={() => onPageChange({ detail: { page: currentPage - 1 }})}
        design={ButtonDesign.Transparent}
      />
      <Text style={{ margin: "0 1rem" }}>
        Página {currentPage} de {totalPages}
      </Text>
      <Button
        icon="navigation-right-arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange({ detail: { page: currentPage + 1 }})}
        design={ButtonDesign.Transparent}
      />
    </FlexBox>
  );
};

export default function Alertas() {
  const { isDarkMode } = useUI5Theme();
  const [allAlerts, setAllAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Generar alertas basadas en datos
  useEffect(() => {
    const generateAlerts = () => {
      setIsLoading(true);
      
      // Tiempo de retardo simulado para carga de datos
      setTimeout(() => {
        const newAlerts = [];
        let alertId = 1;
        
        // Generar alertas de stock
        SAMPLE_PRODUCTS.forEach(product => {
          if (product.cantidad === 0) {
            newAlerts.push({
              id: alertId++,
              type: "error",
              status: "Agotado",
              title: `${product.producto} - Sin Stock`,
              details: "0 unidades disponibles en todas las ubicaciones",
              category: "stock",
              timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
              product: product,
              isResolved: false
            });
          } else if (product.cantidad <= STOCK_THRESHOLDS.CRITICAL) {
            newAlerts.push({
              id: alertId++,
              type: "error",
              status: "Crítico",
              title: `${product.producto} - Stock Crítico`,
              details: `Stock actual: ${product.cantidad} unidades (Por debajo del umbral crítico de ${STOCK_THRESHOLDS.CRITICAL})`,
              category: "stock",
              timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
              product: product,
              isResolved: false
            });
          } else if (product.cantidad <= STOCK_THRESHOLDS.WARNING) {
            newAlerts.push({
              id: alertId++,
              type: "warning",
              status: "Bajo Stock",
              title: `${product.producto} - Stock Bajo`,
              details: `Stock actual: ${product.cantidad} unidades (Por debajo del umbral de advertencia de ${STOCK_THRESHOLDS.WARNING})`,
              category: "stock",
              timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
              product: product,
              isResolved: false
            });
          }
        });
        
        // Generar alertas de demanda
        SAMPLE_PRODUCTS.filter(p => p.demanda === "alta" && p.cantidad > 0 && p.cantidad < 20).forEach(product => {
          newAlerts.push({
            id: alertId++,
            type: "warning",
            status: "Alta Demanda",
            title: `${product.producto} - Alta Demanda`,
            details: `Stock actual: ${product.cantidad} unidades. Considere aumentar el inventario debido a la alta demanda.`,
            category: "demand",
            timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            product: product,
            isResolved: false
          });
        });
        
        // Generar alertas de envíos
        SAMPLE_SHIPMENTS.filter(s => s.estado === "retrasado").forEach(shipment => {
          newAlerts.push({
            id: alertId++,
            type: "warning",
            status: "Envío Retrasado",
            title: `${shipment.producto} - Envío Retrasado`,
            details: `Envío con destino a ${shipment.destino} programado para ${new Date(shipment.fecha).toLocaleDateString()} se encuentra retrasado.`,
            category: "shipping",
            timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            shipment: shipment,
            isResolved: false
          });
        });
        
        // Agregar algunas alertas resueltas para ejemplo
        for (let i = 0; i < 3; i++) {
          if (i < SAMPLE_PRODUCTS.length) {
            const product = SAMPLE_PRODUCTS[i];
            newAlerts.push({
              id: alertId++,
              type: "success",
              status: "Resuelto",
              title: `${product.producto} - Stock Normalizado`,
              details: `El nivel de stock ha sido normalizado a ${product.cantidad + 20} unidades.`,
              category: "stock",
              timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
              product: product,
              isResolved: true,
              resolvedAt: new Date(Date.now() - Math.random() * 43200000).toISOString()
            });
          }
        }
        
        // Ordenar alertas por tiempo y severidad
        newAlerts.sort((a, b) => {
          // Primero ordenar por si está resuelto
          if (a.isResolved !== b.isResolved) {
            return a.isResolved ? 1 : -1;
          }
          
          // Luego por tipo de alerta (error > warning > info)
          const typePriority = { error: 0, warning: 1, success: 2 };
          if (typePriority[a.type] !== typePriority[b.type]) {
            return typePriority[a.type] - typePriority[b.type];
          }
          
          // Finalmente por timestamp, más reciente primero
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        
        setAllAlerts(newAlerts);
        setIsLoading(false);
      }, 1000);
    };
    
    generateAlerts();
    
    // Configurar actualización periódica
    const intervalId = setInterval(() => {
      setRefreshTrigger(prev => prev + 1);
    }, UPDATE_INTERVAL);
    
    return () => clearInterval(intervalId);
  }, [refreshTrigger]);
  
  // Filtrar alertas según el filtro seleccionado y actualizar paginación
  useEffect(() => {
    let filtered = [...allAlerts];
    
    // Aplicar filtro
    if (selectedFilter !== "all") {
      filtered = filtered.filter(alert => {
        if (selectedFilter === "success") {
          return alert.isResolved;
        } else {
          return alert.type === selectedFilter && !alert.isResolved;
        }
      });
    }
    
    setFilteredAlerts(filtered);
    setCurrentPage(1);
  }, [allAlerts, selectedFilter]);
  
  // Obtener alertas para la página actual
  const currentAlerts = useMemo(() => {
    const startIndex = (currentPage - 1) * ALERTS_PER_PAGE;
    return filteredAlerts.slice(startIndex, startIndex + ALERTS_PER_PAGE);
  }, [filteredAlerts, currentPage]);
  
  // Calcular total de páginas
  const totalPages = Math.ceil(filteredAlerts.length / ALERTS_PER_PAGE);
  
  // Manejar cambio de página
  const handlePageChange = (event) => {
    setCurrentPage(event.detail.page);
  };
  
  // Manejar click en alerta para ver detalles
  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setIsDetailDialogOpen(true);
  };
  
  // Marcar alerta como resuelta
  const handleResolveAlert = (alertId) => {
    setAllAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId 
          ? { 
              ...alert, 
              isResolved: true, 
              type: "success", 
              status: "Resuelto", 
              resolvedAt: new Date().toISOString() 
            } 
          : alert
      )
    );
    setIsDetailDialogOpen(false);
  };
  
  // Forzar actualización manual
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  // Mapear tipos de alerta a estados de UI5
  const getValueState = (type) => {
    switch (type) {
      case "error": return ValueState.Error;
      case "warning": return ValueState.Warning;
      case "success": return ValueState.Success;
      default: return ValueState.Information;
    }
  };
  
  // Mapear categorías a iconos
  const getCategoryIcon = (category) => {
    switch (category) {
      case "stock": return "inventory";
      case "demand": return "line-chart";
      case "shipping": return "shipping-status";
      default: return "check-availability";
    }
  };
  
  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <Icon 
            name="alert" 
            style={styles.headerIcon}
          />
          <Title level="H1" style={styles.headerTitle}>
            Sistema de Alertas
          </Title>
        </div>
        <div style={styles.headerLocation}>
          <Icon 
            name="map" 
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>
            Plaza Comercial Reforma, Local 42B, CDMX
          </Text>
        </div>
      </div>

      <div style={styles.filterBar}>
        <FlexBox 
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          alignItems={FlexBoxAlignItems.Center}
          wrap={FlexBoxWrap.Wrap}
        >
          <FlexBox alignItems={FlexBoxAlignItems.Center}>
            <SegmentedButton
              style={{ marginRight: "1rem" }}
              onSelectionChange={(e) => setSelectedFilter(e.detail.selectedItem.getAttribute("data-key"))}
            >
              <SegmentedButtonItem data-key="all" icon="circle-task" selected={selectedFilter === "all"}>
                Todas
              </SegmentedButtonItem>
              <SegmentedButtonItem data-key="error" icon="message-error" selected={selectedFilter === "error"}>
                Críticas
              </SegmentedButtonItem>
              <SegmentedButtonItem data-key="warning" icon="message-warning" selected={selectedFilter === "warning"}>
                Advertencias
              </SegmentedButtonItem>
              <SegmentedButtonItem data-key="success" icon="message-success" selected={selectedFilter === "success"}>
                Resueltas
              </SegmentedButtonItem>
            </SegmentedButton>
          </FlexBox>
          
          <FlexBox>
            <Button 
              icon="refresh" 
              onClick={handleRefresh}
              tooltip="Actualizar alertas"
            >
              Actualizar
            </Button>
          </FlexBox>
        </FlexBox>
      </div>

      <div style={styles.alertList}>
        {isLoading ? (
          <FlexBox 
            direction={FlexBoxDirection.Column}
            justifyContent={FlexBoxJustifyContent.Center}
            alignItems={FlexBoxAlignItems.Center}
            style={{ height: "400px" }}
          >
            <BusyIndicator size="Large" />
            <Text style={{ marginTop: "1rem" }}>Cargando alertas...</Text>
          </FlexBox>
        ) : filteredAlerts.length === 0 ? (
          <Card>
            <IllustratedMessage
              name={IllustrationMessageType.NoData}
              titleText="No hay alertas que mostrar"
              subtitleText="No se encontraron alertas con los filtros seleccionados"
              style={{ margin: "2rem 0" }}
            />
          </Card>
        ) : (
          <>
            <Text style={{ marginBottom: "1rem" }}>
              Mostrando {Math.min(filteredAlerts.length, ALERTS_PER_PAGE)} de {filteredAlerts.length} alertas
            </Text>
            
            <List>
              {currentAlerts.map(alert => (
                <StandardListItem
                  key={alert.id}
                  icon={getCategoryIcon(alert.category)}
                  iconEnd={alert.isResolved ? <Icon name="message-success" /> : null}
                  info={alert.status}
                  infoState={getValueState(alert.type)}
                  style={{ 
                    ...styles.alertItem,
                    ...(alert.type === "error" ? styles.alertItemError : 
                       alert.type === "warning" ? styles.alertItemWarning : 
                       alert.type === "success" ? styles.alertItemSuccess : {}),
                    opacity: alert.isResolved ? 0.7 : 1
                  }}
                  onClick={() => handleAlertClick(alert)}
                >
                  {alert.title}
                </StandardListItem>
              ))}
            </List>
            
            {totalPages > 1 && (
              <div style={styles.paginationBar}>
                <PaginationBar
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
      
      {selectedAlert && (
        <Dialog
          open={isDetailDialogOpen}
          onAfterClose={() => setIsDetailDialogOpen(false)}
          headerText={selectedAlert.title}
          className="alert-detail-dialog"
          style={{ width: "600px" }}
          footer={
            <Bar 
              design={BarDesign.Footer}
              endContent={
                <FlexBox>
                  {!selectedAlert.isResolved && (
                    <Button 
                      design="Emphasized" 
                      onClick={() => handleResolveAlert(selectedAlert.id)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      Marcar como resuelto
                    </Button>
                  )}
                  <Button 
                    onClick={() => setIsDetailDialogOpen(false)}
                  >
                    Cerrar
                  </Button>
                </FlexBox>
              }
            />
          }
        >
          <FlexBox direction={FlexBoxDirection.Column} style={{ padding: "1rem" }}>
            <MessageStrip
              design={getValueState(selectedAlert.type)}
              icon={selectedAlert.type === "error" ? "error" : selectedAlert.type === "warning" ? "warning" : "sys-enter-2"}
              style={{ 
                marginBottom: "1rem",
                ...styles[`statusBadge${selectedAlert.type.charAt(0).toUpperCase() + selectedAlert.type.slice(1)}`]
              }}
              hideCloseButton
            >
              {selectedAlert.status}
            </MessageStrip>
            
            <Title level="H5" style={{ marginBottom: "0.5rem" }}>Detalles</Title>
            <Text style={{ marginBottom: "1rem" }}>{selectedAlert.details}</Text>
            
            <FlexBox direction={FlexBoxDirection.Column} style={{ marginBottom: "1rem" }}>
              <Text style={{ marginBottom: "0.5rem" }}>
                <strong>Categoría:</strong> {selectedAlert.category === "stock" ? "Inventario" : 
                                        selectedAlert.category === "demand" ? "Demanda" : 
                                        selectedAlert.category === "shipping" ? "Envíos" : 
                                        "Otro"}
              </Text>
              <Text style={{ marginBottom: "0.5rem" }}>
                <strong>Fecha de alerta:</strong> {formatDate(selectedAlert.timestamp)}
              </Text>
              {selectedAlert.isResolved && (
                <Text style={{ marginBottom: "0.5rem" }}>
                  <strong>Fecha de resolución:</strong> {formatDate(selectedAlert.resolvedAt)}
                </Text>
              )}
            </FlexBox>
          </FlexBox>
        </Dialog>
      )}
    </div>
  );
} 