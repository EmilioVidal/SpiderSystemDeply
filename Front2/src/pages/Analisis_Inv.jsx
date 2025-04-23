import React, { useState, useEffect } from 'react';
import {
  DynamicPageTitle,
  FlexBox,
  FlexBoxDirection,
  FlexBoxAlignItems,
  FlexBoxJustifyContent,
  Title,
  Text,
  Card,
  CardHeader,
  ObjectStatus,
  AnalyticalTable,
  IllustratedMessage,
  IllustrationMessageType,
  Icon,
  Select,
  Option,
  Button
} from '@ui5/webcomponents-react';
import {
  LineChart,
  BarChart,
  PieChart,
  DonutChart
} from '@ui5/webcomponents-react-charts';
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import { styles } from "../Styles/InicioStyle";
import { MdTrendingUp, MdTrendingDown, MdOutlineInventory2, MdOutlineShoppingCart, MdLocalShipping, MdWarning, MdOutlineStorefront, MdTimer, MdCalendarToday, MdFilterList, MdOutlineRefresh } from "react-icons/md";

// Datos de ejemplo para diferentes períodos
const inventoryDataByPeriod = {
  mesActual: {
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
    receiptProcessingTime: 1.8,
    trend: {
      value: 5.2,
      direction: 'up'
    }
  },
  mesPasado: {
    totalProducts: 2380,
    lowStockProducts: 165,
    outOfStockProducts: 82,
    inventoryValue: 235400,
    rotationIndex: 3.9,
    avgDaysInStock: 31,
    stockAccuracy: 96.8,
    forecastAccuracy: 87.2,
    orderFulfillment: 92.5,
    carryCost: 11980,
    receiptProcessingTime: 2.0,
    trend: {
      value: 3.8,
      direction: 'up'
    }
  }
};

// Datos para el gráfico de distribución por categoría
const categoryDistribution = [
  { name: "Calzado Deportivo", count: 845, percentage: 34.5, color: "#4caf50" },
  { name: "Calzado Casual", count: 680, percentage: 27.8, color: "#2196f3" },
  { name: "Calzado Formal", count: 520, percentage: 21.2, color: "#673ab7" },
  { name: "Calzado para Playa", count: 405, percentage: 16.5, color: "#ff9800" }
];

// Datos para la tabla de métricas por categoría
const categoryMetrics = [
  {
    category: "Calzado Deportivo",
    sales: 420,
    returnsRate: 4.2,
    turnoverRate: 4.8,
    profit: 32450,
    trend: 8.5
  },
  {
    category: "Calzado Casual",
    sales: 385,
    returnsRate: 3.8,
    turnoverRate: 4.2,
    profit: 28600,
    trend: 5.2
  },
  {
    category: "Calzado Formal",
    sales: 210,
    returnsRate: 2.5,
    turnoverRate: 3.5,
    profit: 24800,
    trend: -2.1
  },
  {
    category: "Calzado para Playa",
    sales: 320,
    returnsRate: 5.1,
    turnoverRate: 5.2,
    profit: 18900,
    trend: 12.4
  }
];

const Analisis_Inv = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeRange, setTimeRange] = useState("mesActual");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setTimeRange("mesActual");
  };

  const getCurrentInventoryData = () => {
    return inventoryDataByPeriod[timeRange];
  };

  const getFilteredCategoryDistribution = () => {
    if (selectedCategory === "all") {
      return categoryDistribution;
    }
    return categoryDistribution.filter(category => {
      const categoryKey = category.name.toLowerCase().replace("calzado ", "");
      return categoryKey.includes(selectedCategory.toLowerCase());
    });
  };

  const getFilteredCategoryMetrics = () => {
    if (selectedCategory === "all") {
      return categoryMetrics;
    }
    return categoryMetrics.filter(metric => {
      const categoryKey = metric.category.toLowerCase().replace("calzado ", "");
      return categoryKey.includes(selectedCategory.toLowerCase());
    });
  };

  const getTotalProducts = () => {
    if (selectedCategory === "all") {
      return getCurrentInventoryData().totalProducts;
    }
    const filteredCategories = getFilteredCategoryDistribution();
    return filteredCategories.reduce((total, category) => total + category.count, 0);
  };

  const getFilteredInventoryStatus = () => {
    const currentData = getCurrentInventoryData();
    const totalProducts = getTotalProducts();
    const ratio = totalProducts / currentData.totalProducts;

    return {
      inStock: Math.round((currentData.totalProducts - currentData.lowStockProducts - currentData.outOfStockProducts) * ratio),
      lowStock: Math.round(currentData.lowStockProducts * ratio),
      outOfStock: Math.round(currentData.outOfStockProducts * ratio)
    };
  };

  if (isLoading) {
    return (
      <FlexBox
        direction={FlexBoxDirection.Column}
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
        style={{ height: "100%" }}
      >
        <IllustratedMessage
          name={IllustrationMessageType.SapLogo}
          titleText="Cargando Análisis de Inventario"
          subtitleText="Por favor espere..."
        />
      </FlexBox>
    );
  }

  const kpiCards = [
    {
      title: "Valor Total del Inventario",
      value: `$${getCurrentInventoryData().inventoryValue.toLocaleString()}`,
      subtitle: "vs. período anterior",
      icon: "retail-store",
      state: getCurrentInventoryData().trend.direction === 'up' ? "Success" : "Error",
      trend: `${getCurrentInventoryData().trend.direction === 'up' ? '+' : '-'}${getCurrentInventoryData().trend.value}% vs período anterior`
    },
    {
      title: "Índice de Rotación",
      value: getCurrentInventoryData().rotationIndex.toString(),
      subtitle: "veces/mes",
      icon: "shipping-status",
      state: "Information",
      trend: "+0.3 vs mes anterior"
    },
    {
      title: "Días Promedio en Inventario",
      value: `${getCurrentInventoryData().avgDaysInStock}`,
      subtitle: "días",
      icon: "calendar",
      state: getCurrentInventoryData().avgDaysInStock < 30 ? "Success" : "Warning",
      trend: "-2.5 vs periodo anterior"
    },
    {
      title: "Productos Bajo Mínimos",
      value: getCurrentInventoryData().lowStockProducts.toString(),
      subtitle: "productos",
      icon: "alert",
      state: "Warning",
      trend: "-12 vs mes anterior"
    }
  ];

  const secondRowKPIs = [
    {
      title: "Precisión de Inventario",
      value: `${getCurrentInventoryData().stockAccuracy}%`,
      subtitle: "exactitud",
      icon: "checklist-item",
      state: "Success",
      trend: "+0.8% vs periodo anterior"
    },
    {
      title: "Precisión de Pronóstico",
      value: `${getCurrentInventoryData().forecastAccuracy}%`,
      subtitle: "exactitud",
      icon: "future",
      state: "Success",
      trend: "+2.3% vs periodo anterior"
    },
    {
      title: "Tasa de Cumplimiento",
      value: `${getCurrentInventoryData().orderFulfillment}%`,
      subtitle: "cumplimiento",
      icon: "complete",
      state: "Success",
      trend: "+1.5% vs periodo anterior"
    },
    {
      title: "Costo de Mantenimiento",
      value: `$${getCurrentInventoryData().carryCost.toLocaleString()}`,
      subtitle: "mensual",
      icon: "expense-report",
      state: "Error",
      trend: "+3.1% vs periodo anterior"
    }
  ];

  return (
    <div style={{ 
      width: "100%",
      minHeight: "100%",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      paddingTop: "2rem"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "var(--sapBackgroundColor)",
        padding: "1.25rem",
        borderRadius: "0.5rem",
        boxShadow: "var(--sapContent_Shadow0)",
        marginTop: "0.5rem",
        minHeight: "72px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem"
        }}>
          <Icon 
            name="inventory" 
            style={{
              fontSize: "1.75rem",
              color: "var(--sapContent_IconColor)"
            }}
          />
          <Title level="H1" style={{
            margin: 0,
            fontSize: "1.75rem",
            color: "var(--sapTextColor)",
            padding: "0.25rem 0"
          }}>
            Análisis de Inventario
          </Title>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <Icon 
            name="map" 
            style={{
              fontSize: "1rem",
              color: "var(--sapContent_IconColor)"
            }}
          />
          <Text style={{
            fontSize: "0.875rem",
            color: "var(--sapContent_LabelColor)"
          }}>
            Plaza Comercial Reforma, Local 42B, CDMX
          </Text>
        </div>
      </div>

      <div style={{
        padding: "0.5rem 1rem",
        backgroundColor: "var(--sapList_Background)",
        borderRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "var(--sapContent_Shadow0)",
        margin: "0.5rem 0"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <Icon name="filter" />
            <Text>Categoría:</Text>
            <Select
              onChange={(event) => setSelectedCategory(event.detail.selectedOption.value)}
            >
              <Option value="all" selected={selectedCategory === "all"}>Todas las categorías</Option>
              <Option value="deportivo" selected={selectedCategory === "deportivo"}>Calzado Deportivo</Option>
              <Option value="casual" selected={selectedCategory === "casual"}>Calzado Casual</Option>
              <Option value="formal" selected={selectedCategory === "formal"}>Calzado Formal</Option>
              <Option value="playa" selected={selectedCategory === "playa"}>Calzado para Playa</Option>
            </Select>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <Icon name="calendar" />
            <Text>Período:</Text>
            <Select
              onChange={(event) => setTimeRange(event.detail.selectedOption.value)}
            >
              <Option value="mesActual" selected={timeRange === "mesActual"}>Mes Actual</Option>
              <Option value="mesPasado" selected={timeRange === "mesPasado"}>Mes Pasado</Option>
            </Select>
          </div>
          <Button 
            icon="refresh"
            design="Transparent"
            onClick={handleResetFilters}
          >
            Reiniciar Filtros
          </Button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.kpiSection}>
          {kpiCards.map((card, index) => (
            <div key={index} style={styles.kpiCard}>
              <div style={styles.kpiHeader}>
                <Icon 
                  name={card.icon} 
                  style={{ 
                    color: `var(--sapIndicationColor_${card.state})`,
                    fontSize: "1.5rem"
                  }} 
                />
                <ObjectStatus state={card.state}>
                  {card.trend}
                </ObjectStatus>
              </div>
              <Text style={{
                fontSize: "0.875rem",
                color: "var(--sapContent_LabelColor)",
                marginBottom: "0.25rem"
              }}>{card.title}</Text>
              <Text style={styles.kpiValue}>{card.value}</Text>
              <Text style={styles.kpiLabel}>{card.subtitle}</Text>
            </div>
          ))}
        </div>

        <div style={styles.kpiSection}>
          {secondRowKPIs.map((card, index) => (
            <div key={index} style={styles.kpiCard}>
              <div style={styles.kpiHeader}>
                <Icon 
                  name={card.icon} 
                  style={{ 
                    color: `var(--sapIndicationColor_${card.state})`,
                    fontSize: "1.5rem"
                  }} 
                />
                <ObjectStatus state={card.state}>
                  {card.trend}
                </ObjectStatus>
              </div>
              <Text style={{
                fontSize: "0.875rem",
                color: "var(--sapContent_LabelColor)",
                marginBottom: "0.25rem"
              }}>{card.title}</Text>
              <Text style={styles.kpiValue}>{card.value}</Text>
              <Text style={styles.kpiLabel}>{card.subtitle}</Text>
            </div>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem"
        }}>
          <Card
            style={styles.categoryCard}
            header={
              <CardHeader
                titleText="Distribución por Categoría"
                subtitleText="Distribución actual del inventario"
                avatar={<Icon name="donut-chart" />}
              />
            }
          >
            {getFilteredCategoryDistribution().map((category, index) => (
              <div key={index} style={styles.categoryItem}>
                <FlexBox style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryValue}>
                    {category.count} productos
                  </Text>
                </FlexBox>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${category.percentage}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
                <Text style={styles.progressLabel}>{category.percentage}% del total</Text>
              </div>
            ))}
          </Card>

          <Card
            style={styles.categoryCard}
            header={
              <CardHeader
                titleText="Estado del Inventario"
                subtitleText="Distribución por estado"
                avatar={<Icon name="status-completed" />}
              />
            }
          >
            <div style={{ padding: "1rem" }}>
              {(() => {
                const status = getFilteredInventoryStatus();
                const total = status.inStock + status.lowStock + status.outOfStock;
                return (
                  <>
                    <div style={{
                      height: "24px",
                      display: "flex",
                      borderRadius: "12px",
                      overflow: "hidden",
                      marginBottom: "1rem"
                    }}>
                      <div style={{ 
                        width: `${(status.inStock / total) * 100}%`, 
                        backgroundColor: "var(--sapPositiveColor)" 
                      }} />
                      <div style={{ 
                        width: `${(status.lowStock / total) * 100}%`, 
                        backgroundColor: "var(--sapWarningColor)" 
                      }} />
                      <div style={{ 
                        width: `${(status.outOfStock / total) * 100}%`, 
                        backgroundColor: "var(--sapNegativeColor)" 
                      }} />
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.875rem"
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}>
                        <span style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: "var(--sapPositiveColor)"
                        }} />
                        <span>En stock: {status.inStock}</span>
                      </div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}>
                        <span style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: "var(--sapWarningColor)"
                        }} />
                        <span>Stock bajo: {status.lowStock}</span>
                      </div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}>
                        <span style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: "var(--sapNegativeColor)"
                        }} />
                        <span>Sin stock: {status.outOfStock}</span>
                      </div>
                    </div>

                    <Text
                      style={{
                        color: "var(--sapInformativeColor)",
                        fontSize: "0.875rem",
                        marginTop: "1rem"
                      }}
                    >
                      El {(((status.lowStock + status.outOfStock) / total) * 100).toFixed(1)}% de productos requieren atención en el inventario.
                    </Text>
                  </>
                );
              })()}
            </div>
          </Card>
        </div>

        <Card
          style={styles.ordersCard}
          header={
            <CardHeader
              titleText="Métricas por Categoría"
              subtitleText="Rendimiento por categoría"
              avatar={<Icon name="table-view" />}
            />
          }
        >
          <div style={{ padding: "0.5rem" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem"
            }}>
              <thead>
                <tr style={{
                  borderBottom: "1px solid var(--sapList_BorderColor)",
                  color: "var(--sapContent_LabelColor)"
                }}>
                  <th style={{ 
                    padding: "1rem",
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>Categoría</th>
                  <th style={{ 
                    padding: "1rem",
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>Ventas</th>
                  <th style={{ 
                    padding: "1rem",
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>% Devoluciones</th>
                  <th style={{ 
                    padding: "1rem",
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>Rotación</th>
                  <th style={{ 
                    padding: "1rem",
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>Beneficio</th>
                  <th style={{ 
                    padding: "1rem",
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>Tendencia</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredCategoryMetrics().map((metric, index) => (
                  <tr key={index} style={{
                    borderBottom: "1px solid var(--sapList_BorderColor)",
                    backgroundColor: index % 2 === 0 ? "var(--sapList_Background)" : "transparent"
                  }}>
                    <td style={{ padding: "1rem" }}>{metric.category}</td>
                    <td style={{ padding: "1rem" }}>{metric.sales} unidades</td>
                    <td style={{ padding: "1rem" }}>{metric.returnsRate}%</td>
                    <td style={{ padding: "1rem" }}>{metric.turnoverRate}</td>
                    <td style={{ padding: "1rem" }}>${metric.profit.toLocaleString()}</td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        color: metric.trend >= 0 ? "var(--sapPositiveColor)" : "var(--sapNegativeColor)"
                      }}>
                        <Icon 
                          name={metric.trend >= 0 ? "trend-up" : "trend-down"} 
                          style={{
                            width: "1rem",
                            height: "1rem"
                          }}
                        />
                        {metric.trend >= 0 ? "+" : ""}{metric.trend}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analisis_Inv; 