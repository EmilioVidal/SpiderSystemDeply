import React, { useState, useContext } from "react";
import { ThemeContext } from "../App";
import UI5ThemeProvider from "../components/UI5ThemeProvider";
import styled from "styled-components";
import {
  Container,
  PageHeader,
  PageTitle,
  ContentArea,
  FiltersArea,
  FilterItem,
  FilterSelect,
  AnalyticsGrid,
  AnalyticsCard,
  CardHeader,
  CardTitle,
  CardContent,
  MetricValue,
  MetricLabel,
  ChartContainer,
  ProductTable,
  StatusBadge,
  CategoryPill,
  TableActions,
  TrendIndicator,
  TabsContainer,
  TabButton,
  LowStockList,
  LowStockItem,
  LowStockName,
  LowStockDetails,
  LowStockAction,
  InfoText,
  MovementsList,
  MovementItem,
  MovementIcon,
  MovementDetails,
  MovementType,
  MovementInfo,
  MovementDate,
  PerformanceBar,
  PerformanceLabel,
  ChartLegend,
  LegendItem
} from "../styles/Inventario/Analisis_InvStyle.js";
import { MdTrendingUp, MdTrendingDown, MdOutlineInventory2, MdOutlineShoppingCart, MdLocalShipping, MdWarning, MdOutlineStorefront, MdTimer, MdCalendarToday, MdFilterList } from "react-icons/md";

// Define el componente ActionButton localmente para evitar problemas de importación
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: var(--sapButton_Background, #0854a0);
  color: var(--sapButton_TextColor, #fff);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--sapButton_Hover_Background, #066bbf);
  }
`;

// Datos de ejemplo para el inventario
const inventoryData = {
  totalProducts: 2450,
  lowStockProducts: 184,
  outOfStockProducts: 76,
  inventoryValue: 248750,
  rotationIndex: 4.2,
  avgDaysInStock: 28,
  stockAccuracy: 97.2,
  forecastAccuracy: 88.5,
  orderFulfillment: 93.8,
  carryCost: 12350,
  receiptProcessingTime: 1.8
};

// Datos para el gráfico de distribución por categoría
const categoryDistribution = [
  { name: "Calzado Deportivo", count: 845, percentage: 34.5, color: "#4caf50" },
  { name: "Calzado Casual", count: 680, percentage: 27.8, color: "#2196f3" },
  { name: "Calzado Formal", count: 520, percentage: 21.2, color: "#673ab7" },
  { name: "Calzado para Playa", count: 405, percentage: 16.5, color: "#ff9800" }
];

// Datos para productos con bajo stock
const lowStockProducts = [
  { id: 1, name: "Zapatillas Running Pro", sku: "ZAP-RUN-001", category: "Calzado Deportivo", stock: 5, minStock: 15, reorderPoint: 10 },
  { id: 2, name: "Zapatos Oxford Classic", sku: "ZAP-OXF-023", category: "Calzado Formal", stock: 3, minStock: 10, reorderPoint: 8 },
  { id: 3, name: "Botas Trekking Outdoor", sku: "BOT-TRK-017", category: "Calzado Deportivo", stock: 7, minStock: 20, reorderPoint: 15 },
  { id: 4, name: "Mocasines Premium", sku: "MOC-PRE-005", category: "Calzado Casual", stock: 4, minStock: 12, reorderPoint: 8 }
];

// Datos para movimientos recientes
const recentMovements = [
  { id: 1, type: "entrada", product: "Zapatos Casual Comfort S34", quantity: 120, date: "2025-02-15", location: "Almacén Central" },
  { id: 2, type: "salida", product: "Botas Hiking Terrain B20", quantity: 25, date: "2025-02-14", location: "Tienda Principal" },
  { id: 3, type: "entrada", product: "Zapatillas Deportivas Runner", quantity: 80, date: "2025-02-13", location: "Almacén Central" },
  { id: 4, type: "traslado", product: "Sandalias Verano Fresh", quantity: 40, date: "2025-02-12", location: "Tienda Polanco" },
  { id: 5, type: "salida", product: "Zapatos Formales Executive", quantity: 15, date: "2025-02-10", location: "Tienda Santa Fe" }
];

// Datos para el rendimiento por ubicación
const locationPerformance = [
  { 
    name: "Tienda Principal", 
    stockTurnover: 4.8, 
    daysInStock: 24, 
    efficiency: 92,
    inventoryValue: 94500,
    lowStockProducts: 42,
    outOfStockProducts: 18,
    stockAccuracy: 98.2,
    forecastAccuracy: 91.5,
    orderFulfillment: 95.8,
    carryCost: 3650,
    topProducts: [
      { name: "Zapatillas Runner Pro", sales: 85, inventory: 45 },
      { name: "Zapatos Formales Classic", sales: 62, inventory: 30 },
      { name: "Botas Outdoor Adventure", sales: 48, inventory: 25 }
    ],
    categoryDistribution: [
      { name: "Calzado Deportivo", percentage: 42 },
      { name: "Calzado Casual", percentage: 28 },
      { name: "Calzado Formal", percentage: 18 },
      { name: "Calzado para Playa", percentage: 12 }
    ]
  },
  { 
    name: "Tienda Polanco", 
    stockTurnover: 4.5, 
    daysInStock: 26, 
    efficiency: 88,
    inventoryValue: 78200,
    lowStockProducts: 38,
    outOfStockProducts: 22,
    stockAccuracy: 96.5,
    forecastAccuracy: 87.2,
    orderFulfillment: 92.4,
    carryCost: 2950,
    topProducts: [
      { name: "Mocasines Premium", sales: 72, inventory: 35 },
      { name: "Zapatillas Casual Urban", sales: 54, inventory: 28 },
      { name: "Botines Chelsea", sales: 41, inventory: 18 }
    ],
    categoryDistribution: [
      { name: "Calzado Deportivo", percentage: 30 },
      { name: "Calzado Casual", percentage: 40 },
      { name: "Calzado Formal", percentage: 22 },
      { name: "Calzado para Playa", percentage: 8 }
    ]
  },
  { 
    name: "Tienda Santa Fe", 
    stockTurnover: 3.9, 
    daysInStock: 30, 
    efficiency: 84,
    inventoryValue: 65400,
    lowStockProducts: 56,
    outOfStockProducts: 24,
    stockAccuracy: 95.8,
    forecastAccuracy: 85.4,
    orderFulfillment: 90.2,
    carryCost: 3150,
    topProducts: [
      { name: "Zapatos de Vestir Executive", sales: 58, inventory: 22 },
      { name: "Sandalias Premium Resort", sales: 45, inventory: 36 },
      { name: "Zapatillas Deportivas Elite", sales: 40, inventory: 18 }
    ],
    categoryDistribution: [
      { name: "Calzado Deportivo", percentage: 25 },
      { name: "Calzado Casual", percentage: 30 },
      { name: "Calzado Formal", percentage: 35 },
      { name: "Calzado para Playa", percentage: 10 }
    ]
  },
  { 
    name: "Outlet Perisur", 
    stockTurnover: 5.2, 
    daysInStock: 22, 
    efficiency: 94,
    inventoryValue: 52600,
    lowStockProducts: 48,
    outOfStockProducts: 12,
    stockAccuracy: 97.6,
    forecastAccuracy: 89.8,
    orderFulfillment: 96.5,
    carryCost: 2600,
    topProducts: [
      { name: "Zapatillas Running Discount", sales: 95, inventory: 42 },
      { name: "Sandalias Verano Basic", sales: 82, inventory: 58 },
      { name: "Zapatos Casuales Outlet", sales: 76, inventory: 34 }
    ],
    categoryDistribution: [
      { name: "Calzado Deportivo", percentage: 45 },
      { name: "Calzado Casual", percentage: 25 },
      { name: "Calzado Formal", percentage: 10 },
      { name: "Calzado para Playa", percentage: 20 }
    ]
  }
];

// Datos para métricas por categoría
const categoryMetrics = [
  { 
    category: "Calzado Deportivo", 
    inventory: 845, 
    sales: 420, 
    returnsRate: 4.2, 
    turnoverRate: 4.8,
    profit: 32450,
    trend: 8.5
  },
  { 
    category: "Calzado Casual", 
    inventory: 680, 
    sales: 385, 
    returnsRate: 3.8, 
    turnoverRate: 4.2,
    profit: 28600,
    trend: 5.2
  },
  { 
    category: "Calzado Formal", 
    inventory: 520, 
    sales: 210, 
    returnsRate: 2.5, 
    turnoverRate: 3.5,
    profit: 24800,
    trend: -2.1
  },
  { 
    category: "Calzado para Playa", 
    inventory: 405, 
    sales: 320, 
    returnsRate: 5.1, 
    turnoverRate: 5.2,
    profit: 18900,
    trend: 12.4
  }
];

export function Analisis_Inv() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeRange, setTimeRange] = useState("month");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // Función para renderizar las métricas de inventario específicas de una sucursal
  const renderLocationInventoryMetrics = () => {
    if (selectedLocation === "all") {
      return null;
    }

    const locationData = locationPerformance.find(loc => 
      loc.name === selectedLocation
    );

    if (!locationData) return null;

    return (
      <>
        <div style={{ 
          backgroundColor: 'var(--sapHighlightColor, #0854a0)', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '0.25rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MdOutlineStorefront size={24} />
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '500' }}>
              Análisis de Inventario: {locationData.name}
            </h2>
          </div>
          <button 
            onClick={() => setSelectedLocation("all")}
            style={{
              background: 'transparent',
              border: '1px solid white',
              borderRadius: '0.25rem',
              padding: '0.5rem 0.75rem',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem'
            }}
          >
            Volver a Vista General
          </button>
        </div>

        <AnalyticsGrid>
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Valor del Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>${locationData.inventoryValue.toLocaleString()}</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Rotación de Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{locationData.stockTurnover}</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Días en Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{locationData.daysInStock} días</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Eficiencia</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{locationData.efficiency}%</MetricValue>
            </CardContent>
          </AnalyticsCard>
        </AnalyticsGrid>

        <AnalyticsGrid>
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Precisión de Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{locationData.stockAccuracy}%</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Cumplimiento de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{locationData.orderFulfillment}%</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Productos Bajo Mínimos</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{locationData.lowStockProducts}</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Costo de Mantenimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>${locationData.carryCost.toLocaleString()}</MetricValue>
            </CardContent>
          </AnalyticsCard>
        </AnalyticsGrid>

        <AnalyticsGrid style={{ gridTemplateColumns: '1fr 1fr' }}>
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Distribución por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {locationData.categoryDistribution.map((category) => (
                    <div key={category.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span>{category.name}</span>
                        <span>{category.percentage}%</span>
                      </div>
                      <div style={{ height: '12px', backgroundColor: 'var(--sapContent_ForegroundBorderColor, #e5e5e5)', borderRadius: '6px', overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            width: `${category.percentage}%`, 
                            backgroundColor: getCategoryColor(category.name),
                            borderRadius: '6px'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ChartContainer>
            </CardContent>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Productos Más Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductTable>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Ventas</th>
                    <th>Inventario</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {locationData.topProducts.map((product) => (
                    <tr key={product.name}>
                      <td>{product.name}</td>
                      <td>{product.sales} unidades</td>
                      <td>{product.inventory} unidades</td>
                      <td>
                        <div style={{ 
                          width: '100%', 
                          height: '8px', 
                          backgroundColor: 'var(--sapContent_ForegroundBorderColor, #e5e5e5)',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${(product.inventory / (product.inventory + product.sales * 0.2)) * 100}%`,
                            height: '100%',
                            backgroundColor: getStockLevelColor(product.inventory, product.sales),
                            borderRadius: '4px'
                          }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ProductTable>
            </CardContent>
          </AnalyticsCard>
        </AnalyticsGrid>
      </>
    );
  };

  // Función auxiliar para obtener el color de una categoría
  const getCategoryColor = (categoryName) => {
    switch(categoryName) {
      case "Calzado Deportivo": return "#4caf50";
      case "Calzado Casual": return "#2196f3";
      case "Calzado Formal": return "#673ab7";
      case "Calzado para Playa": return "#ff9800";
      default: return "#9e9e9e";
    }
  };

  // Función auxiliar para obtener el color según el nivel de stock
  const getStockLevelColor = (inventory, sales) => {
    const ratio = inventory / sales;
    if (ratio < 0.3) return "#e57373"; // bajo
    if (ratio < 0.7) return "#ffb74d"; // medio
    return "#81c784"; // adecuado
  };

  // Función para renderizar los datos de distribución de categorías como un gráfico de barras horizontal
  const renderCategoryChart = () => {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categoryDistribution.map((category) => (
          <div key={category.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>{category.name}</span>
              <span>{category.count} productos</span>
            </div>
            <div style={{ height: '12px', backgroundColor: 'var(--sapContent_ForegroundBorderColor, #e5e5e5)', borderRadius: '6px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${category.percentage}%`, 
                  backgroundColor: category.color,
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>
        ))}
        
        <ChartLegend>
          {categoryDistribution.map((category) => (
            <LegendItem key={category.name}>
              <span style={{ 
                display: 'inline-block', 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: category.color,
                marginRight: '6px'
              }}></span>
              <span>{category.percentage}%</span>
            </LegendItem>
          ))}
        </ChartLegend>
      </div>
    );
  };

  // Función para renderizar el estado del inventario
  const renderInventoryStatus = () => {
    // Calcular porcentajes para el gráfico
    const inStockPercent = ((inventoryData.totalProducts - inventoryData.lowStockProducts - inventoryData.outOfStockProducts) / inventoryData.totalProducts) * 100;
    const lowStockPercent = (inventoryData.lowStockProducts / inventoryData.totalProducts) * 100;
    const outOfStockPercent = (inventoryData.outOfStockProducts / inventoryData.totalProducts) * 100;

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ 
          height: '24px', 
          display: 'flex', 
          borderRadius: '12px', 
          overflow: 'hidden',
          marginBottom: '12px'
        }}>
          <div style={{ width: `${inStockPercent}%`, backgroundColor: '#4caf50' }} />
          <div style={{ width: `${lowStockPercent}%`, backgroundColor: '#ffab40' }} />
          <div style={{ width: `${outOfStockPercent}%`, backgroundColor: '#e57373' }} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4caf50', display: 'inline-block' }}></span>
            <span>En stock: {inventoryData.totalProducts - inventoryData.lowStockProducts - inventoryData.outOfStockProducts}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffab40', display: 'inline-block' }}></span>
            <span>Stock bajo: {inventoryData.lowStockProducts}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e57373', display: 'inline-block' }}></span>
            <span>Sin stock: {inventoryData.outOfStockProducts}</span>
          </div>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <InfoText>
            El {Math.round((inventoryData.lowStockProducts + inventoryData.outOfStockProducts) / inventoryData.totalProducts * 100)}% de productos requieren atención en el inventario.
          </InfoText>
        </div>
      </div>
    );
  };
  
  // Función para renderizar las métricas por categoría
  const renderCategoryMetrics = () => {
    return (
      <div style={{ width: '100%' }}>
        <ProductTable>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Ventas</th>
              <th>% Devoluciones</th>
              <th>Rotación</th>
              <th>Beneficio</th>
              <th>Tendencia</th>
            </tr>
          </thead>
          <tbody>
            {categoryMetrics.map(metric => (
              <tr key={metric.category}>
                <td style={{ fontWeight: '500' }}>{metric.category}</td>
                <td>{metric.sales} unidades</td>
                <td>{metric.returnsRate}%</td>
                <td>{metric.turnoverRate}</td>
                <td>${metric.profit.toLocaleString()}</td>
                <td>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: metric.trend >= 0 ? 'var(--sapPositiveTextColor, #107e3e)' : 'var(--sapNegativeTextColor, #bb0000)', 
                    fontWeight: '500' 
                  }}>
                    {metric.trend >= 0 ? <MdTrendingUp size={16} style={{ marginRight: '4px' }} /> : <MdTrendingDown size={16} style={{ marginRight: '4px' }} />}
                    {metric.trend >= 0 ? '+' : ''}{metric.trend}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </div>
    );
  };

  return (
    <UI5ThemeProvider>
      <Container>
        <PageHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MdOutlineInventory2 size={28} />
            <PageTitle>Análisis de Inventario</PageTitle>
          </div>
        </PageHeader>

        <FiltersArea>
          <FilterItem>
            <span><MdFilterList /> Categoría:</span>
            <FilterSelect value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="all">Todas las categorías</option>
              <option value="deportivo">Calzado Deportivo</option>
              <option value="casual">Calzado Casual</option>
              <option value="formal">Calzado Formal</option>
              <option value="playa">Calzado para Playa</option>
            </FilterSelect>
          </FilterItem>
          <FilterItem>
            <span><MdCalendarToday /> Período:</span>
            <FilterSelect value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="quarter">Último trimestre</option>
              <option value="year">Último año</option>
            </FilterSelect>
          </FilterItem>
          <FilterItem>
            <span><MdOutlineStorefront /> Sucursal:</span>
            <FilterSelect 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                minWidth: '200px'
              }}
            >
              <option value="all">Todas las sucursales</option>
              {locationPerformance.map(location => (
                <option key={location.name} value={location.name}>{location.name}</option>
              ))}
            </FilterSelect>
          </FilterItem>
        </FiltersArea>

        {selectedLocation !== 'all' ? (
          <ContentArea>
            {renderLocationInventoryMetrics()}
          </ContentArea>
        ) : (
          <>
            <TabsContainer>
              <TabButton 
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
              >
                Visión General
              </TabButton>
              <TabButton
                active={activeTab === "lowStock"}
                onClick={() => setActiveTab("lowStock")}
              >
                Productos Bajo Stock
              </TabButton>
              <TabButton
                active={activeTab === "movements"}
                onClick={() => setActiveTab("movements")}
              >
                Movimientos Recientes
              </TabButton>
              <TabButton
                active={activeTab === "performance"}
                onClick={() => setActiveTab("performance")}
              >
                Rendimiento
              </TabButton>
            </TabsContainer>

            <ContentArea>
              {activeTab === "overview" && (
                <>
                  <AnalyticsGrid>
                    {/* Valor Total de Inventario */}
                    <AnalyticsCard>
                      <CardHeader>
                        <CardTitle>Valor Total del Inventario</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <MetricValue>${inventoryData.inventoryValue.toLocaleString()}</MetricValue>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <TrendIndicator positive>
                            <MdTrendingUp />
                            +5.2%
                          </TrendIndicator>
                          <MetricLabel>vs. mes anterior</MetricLabel>
                        </div>
                      </CardContent>
                    </AnalyticsCard>

                    {/* Rotación de Inventario */}
                    <AnalyticsCard>
                      <CardHeader>
                        <CardTitle>Índice de Rotación</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <MetricValue>{inventoryData.rotationIndex}</MetricValue>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <TrendIndicator positive>
                            <MdTrendingUp />
                            +0.3
                          </TrendIndicator>
                          <MetricLabel>vs. mes anterior</MetricLabel>
                        </div>
                      </CardContent>
                    </AnalyticsCard>

                    {/* Promedio de Días en Inventario */}
                    <AnalyticsCard>
                      <CardHeader>
                        <CardTitle>Días Promedio en Inventario</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <MetricValue>{inventoryData.avgDaysInStock} días</MetricValue>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <TrendIndicator positive={false}>
                            <MdTrendingDown />
                            -2.5
                          </TrendIndicator>
                          <MetricLabel>vs. mes anterior</MetricLabel>
                        </div>
                      </CardContent>
                    </AnalyticsCard>

                    {/* Productos Bajo Mínimos */}
                    <AnalyticsCard>
                      <CardHeader>
                        <CardTitle>Productos Bajo Mínimos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <MetricValue>{inventoryData.lowStockProducts}</MetricValue>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <TrendIndicator positive={false}>
                            <MdTrendingUp />
                            +12
                          </TrendIndicator>
                          <MetricLabel>vs. mes anterior</MetricLabel>
                        </div>
                      </CardContent>
                    </AnalyticsCard>
                  </AnalyticsGrid>

                  {/* Segunda fila de métricas para aprovechar espacio */}
                  <AnalyticsGrid>
                    {/* Precisión de inventario */}
                    <AnalyticsCard>
                      <CardHeader>
                        <CardTitle>Precisión de Inventario</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <MetricValue>{inventoryData.stockAccuracy}%</MetricValue>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <TrendIndicator positive>
                            <MdTrendingUp />
                            +0.8%
                          </TrendIndicator>
                          <MetricLabel>vs. mes anterior</MetricLabel>
                        </div>
                      </CardContent>
                    </AnalyticsCard>

                    {/* Precisión de pronóstico */}
                    <AnalyticsCard>
                      <CardHeader>
                        <CardTitle>Precisión de Pronóstico</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <MetricValue>{inventoryData.forecastAccuracy}%</MetricValue>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <TrendIndicator positive>
                            <MdTrendingUp />
                            +2.3%
                          </TrendIndicator>
                          <MetricLabel>vs. mes anterior</MetricLabel>
                        </div>
                      </CardContent>
                    </AnalyticsCard>

                    {/* Tasa de cumplimiento de pedidos */}
                    <AnalyticsCard>
                      <CardHeader>
                        <CardTitle>Tasa de Cumplimiento</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <MetricValue>{inventoryData.orderFulfillment}%</MetricValue>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <TrendIndicator positive>
                            <MdTrendingUp />
                            +1.5%
                          </TrendIndicator>
                          <MetricLabel>vs. mes anterior</MetricLabel>
                        </div>
                      </CardContent>
                    </AnalyticsCard>

                    {/* Costo de mantenimiento */}
                    <AnalyticsCard>
                      <CardHeader>
                        <CardTitle>Costo de Mantenimiento</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <MetricValue>${inventoryData.carryCost.toLocaleString()}</MetricValue>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <TrendIndicator positive={false}>
                            <MdTrendingUp />
                            +3.1%
                          </TrendIndicator>
                          <MetricLabel>vs. mes anterior</MetricLabel>
                        </div>
                      </CardContent>
                    </AnalyticsCard>
                  </AnalyticsGrid>

                  {/* Gráficos y datos adicionales */}
                  <AnalyticsGrid style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {/* Distribución por Categoría */}
                    <AnalyticsCard>
                      <CardHeader>
                        <CardTitle>Distribución por Categoría</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer>
                          {renderCategoryChart()}
                        </ChartContainer>
                      </CardContent>
                    </AnalyticsCard>

                    {/* Estado del Inventario */}
                    <AnalyticsCard>
                      <CardHeader>
                        <CardTitle>Estado del Inventario</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer>
                          {renderInventoryStatus()}
                        </ChartContainer>
                      </CardContent>
                    </AnalyticsCard>
                  </AnalyticsGrid>

                  {/* Indicadores por categoría */}
                  <AnalyticsCard>
                    <CardHeader>
                      <CardTitle>Métricas por Categoría</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderCategoryMetrics()}
                    </CardContent>
                  </AnalyticsCard>
                </>
              )}

              {activeTab === "lowStock" && (
                <AnalyticsCard style={{ marginBottom: '20px' }}>
                  <CardHeader>
                    <CardTitle>Productos con Stock Bajo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LowStockList>
                      {lowStockProducts.map(product => (
                        <LowStockItem key={product.id}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <MdWarning size={18} color="#f57c00" style={{ marginRight: '12px' }} />
                            <div>
                              <LowStockName>{product.name}</LowStockName>
                              <LowStockDetails>
                                <span>SKU: {product.sku}</span>
                                <CategoryPill>{product.category}</CategoryPill>
                              </LowStockDetails>
                            </div>
                          </div>
                          <LowStockDetails style={{ textAlign: 'center' }}>
                            <div>Stock Actual</div>
                            <div style={{ fontWeight: 'bold', color: product.stock < product.reorderPoint ? 'var(--sapErrorColor, #bb0000)' : 'var(--sapWarningColor, #e9730c)' }}>
                              {product.stock}
                            </div>
                          </LowStockDetails>
                          <LowStockDetails style={{ textAlign: 'center' }}>
                            <div>Stock Mínimo</div>
                            <div>{product.minStock}</div>
                          </LowStockDetails>
                          <LowStockDetails style={{ textAlign: 'center' }}>
                            <div>Punto de Reorden</div>
                            <div>{product.reorderPoint}</div>
                          </LowStockDetails>
                          <LowStockAction>
                            <ActionButton>
                              <MdOutlineShoppingCart size={16} style={{ marginRight: '4px' }} /> Crear Pedido
                            </ActionButton>
                          </LowStockAction>
                        </LowStockItem>
                      ))}
                    </LowStockList>
                  </CardContent>
                </AnalyticsCard>
              )}

              {activeTab === "movements" && (
                <AnalyticsCard style={{ marginBottom: '20px' }}>
                  <CardHeader>
                    <CardTitle>Movimientos Recientes de Inventario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MovementsList>
                      {recentMovements.map(movement => (
                        <MovementItem key={movement.id}>
                          <MovementIcon type={movement.type}>
                            {movement.type === 'entrada' && <MdOutlineInventory2 size={18} />}
                            {movement.type === 'salida' && <MdOutlineShoppingCart size={18} />}
                            {movement.type === 'traslado' && <MdLocalShipping size={18} />}
                          </MovementIcon>
                          <MovementDetails>
                            <MovementType type={movement.type}>
                              {movement.type === 'entrada' ? 'Entrada' : 
                               movement.type === 'salida' ? 'Salida' : 'Traslado'}
                            </MovementType>
                            <div>{movement.product}</div>
                          </MovementDetails>
                          <MovementInfo>
                            <div>Cantidad: <strong>{movement.quantity}</strong></div>
                            <div>Ubicación: {movement.location}</div>
                          </MovementInfo>
                          <MovementDate>
                            <MdTimer size={14} style={{ marginRight: '4px' }} />
                            {new Date(movement.date).toLocaleDateString()}
                          </MovementDate>
                        </MovementItem>
                      ))}
                    </MovementsList>
                  </CardContent>
                </AnalyticsCard>
              )}

              {activeTab === "performance" && (
                <AnalyticsCard style={{ marginBottom: '20px' }}>
                  <CardHeader>
                    <CardTitle>Rendimiento de Inventario por Ubicación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProductTable>
                      <thead>
                        <tr>
                          <th>Ubicación</th>
                          <th>Rotación de Inventario</th>
                          <th>Días en Inventario</th>
                          <th>Eficiencia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {locationPerformance.map(location => (
                          <tr key={location.name}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <MdOutlineStorefront size={18} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
                                {location.name}
                              </div>
                            </td>
                            <td>{location.stockTurnover}</td>
                            <td>{location.daysInStock}</td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <PerformanceBar>
                                  <div style={{ width: `${location.efficiency}%` }}></div>
                                </PerformanceBar>
                                <PerformanceLabel>{location.efficiency}%</PerformanceLabel>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </ProductTable>
                  </CardContent>
                </AnalyticsCard>
              )}
            </ContentArea>
          </>
        )}
      </Container>
    </UI5ThemeProvider>
  );
}