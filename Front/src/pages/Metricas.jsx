import React, { useState, useContext, useMemo } from "react";
import { ThemeContext } from "../App";
import UI5ThemeProvider from "../components/UI5ThemeProvider";
import { MdOutlineInsights, MdCalendarToday, MdFilterList, MdTrendingUp, MdTrendingDown, MdPerson, MdShoppingBag, MdAttachMoney, MdStore, MdBarChart } from "react-icons/md";
import {
  Container,
  PageHeader,
  PageTitle,
  FiltersArea,
  FilterItem,
  FilterSelect,
  ContentArea,
  MetricsGrid,
  MetricCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  FooterText,
  MetricValue,
  MetricInfo,
  RowContainer,
  ChartCard,
  ChartContent,
  TableContent,
  StoreTable,
  ProgressContainer,
  ProgressBar,
  ProgressLabel,
  BarChart,
  BarGroup,
  BarLabel,
  BarContainer,
  Bar,
  BarValue,
  DonutContainer,
  Donut,
  DonutSegment,
  DonutLabel,
  DonutValue,
  DonutText,
  DonutLegend,
  LegendItem,
  LegendColor,
  LegendText,
  LineChart,
  LineChartHeader,
  LineChartContent,
  TrendRow,
  TrendName,
  TrendBarContainer,
  TrendBar,
  TrendValue,
  TrendChange,
  KpiGrid,
  KpiItem,
  KpiLabel,
  KpiValue,
  KpiTrend
} from "../styles/Metricas/MetricasStyle.js";

// Componente para mostrar distribución en tarjetas
const DistributionCards = ({ data, total, label, getColor }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  return (
    <div style={{ 
      padding: '1rem',
      height: '100%',
      overflow: 'auto'
    }}>
      <div style={{ 
        marginBottom: '1.5rem',
        textAlign: 'center',
        color: isDarkTheme ? '#ffffff' : '#333333'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '500' }}>{total}</div>
        <div style={{ fontSize: '0.9rem' }}>{label}</div>
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.75rem',
        padding: '0.25rem'
      }}>
        {data.map((item) => (
          <div key={item.name} style={{
            backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            borderRadius: '8px',
            padding: '0.75rem',
            border: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: getColor(item)
              }} />
              <div style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '0.85rem',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{item.name}</div>
            </div>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: getColor(item)
            }}>
              {item.value}
            </div>
            {item.secondaryInfo && (
              <div style={{
                fontSize: '0.8rem',
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
              }}>
                {item.secondaryInfo}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para mostrar ranking en tarjetas
const RankingCards = ({ data, title, getColor }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  return (
    <div style={{ 
      padding: '1rem',
      height: '100%',
      overflow: 'auto'
    }}>
      <div style={{ 
        marginBottom: '1rem',
        color: isDarkTheme ? '#ffffff' : '#333333',
        fontSize: '1.1rem',
        fontWeight: '500'
      }}>{title}</div>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {data.map((item, index) => (
          <div key={item.name} style={{
            backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            borderRadius: '8px',
            padding: '0.75rem',
            border: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              minWidth: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: getColor(item),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '0.8rem'
            }}>{index + 1}</div>
            <div style={{ 
              flex: 1,
              minWidth: 0
            }}>
              <div style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '0.85rem',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{item.name}</div>
              <div style={{
                fontSize: '0.8rem',
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                marginTop: '0.25rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {item.secondaryInfo}
              </div>
            </div>
            <div style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: getColor(item),
              whiteSpace: 'nowrap'
            }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function Metricas() {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const [timeRange, setTimeRange] = useState("mesActual");
  const [selectedView, setSelectedView] = useState("general");

  // Datos por período
  const metricsDataByPeriod = {
    mesActual: {
      ventasTotales: 1254780,
      ganancias: 376434,
      clientesNuevos: 842,
      ticketPromedio: 85.40,
      ventasDia: 42850,
      ventasOnline: 18420,
      ventasTienda: 24430,
      devoluciones: 2450,
      stockTotal: 12450,
      stockCritico: 45,
      rotacionStock: 3.2,
      devolucionesPorcentaje: 2.4,
      pedidosPendientes: 24,
      tiempoPromedio: 4.2,
      calidad: 98.5,
      costos: 245680,
      ventasPorCategoria: [
        { name: "Calzado Deportivo", sales: 425640, color: "#4caf50", unidades: "426k en ventas este mes" },
        { name: "Calzado Casual", sales: 338790, color: "#2196f3", unidades: "339k en ventas este mes" },
        { name: "Calzado Formal", sales: 287320, color: "#673ab7", unidades: "287k en ventas este mes" },
        { name: "Calzado para Playa", sales: 203030, color: "#ff9800", unidades: "203k en ventas este mes" }
      ],
      distribucionVentas: {
        total: 14680,
        canales: [
          { name: "Tienda Física", ventas: 9102, monto: 778000, percentage: 62 },
          { name: "Online", ventas: 4110, monto: 351300, percentage: 28 },
          { name: "Mayoristas", ventas: 1468, monto: 125500, percentage: 10 }
        ]
      },
      rendimientoSucursales: [
        { name: "Tienda Principal", sales: 542680, conversionRate: 8.4, avgTicket: 92.50, goalCompletion: 98 },
        { name: "Tienda Polanco", sales: 327450, conversionRate: 7.6, avgTicket: 88.30, goalCompletion: 87 },
        { name: "Tienda Santa Fe", sales: 215240, conversionRate: 6.8, avgTicket: 78.40, goalCompletion: 76 },
        { name: "Outlet Perisur", sales: 169410, conversionRate: 9.2, avgTicket: 75.20, goalCompletion: 105 }
      ],
      inventarioPorCategoria: [
        { name: "Calzado Deportivo", stock: 5602, productos: 380 },
        { name: "Calzado Casual", stock: 3735, productos: 252 },
        { name: "Calzado Formal", stock: 1867, productos: 126 },
        { name: "Accesorios", stock: 1246, productos: 84 }
      ],
      productosTop: [
        { name: "Nike Air Max", sales: 245, category: "Deportivo" },
        { name: "Adidas Ultraboost", sales: 198, category: "Deportivo" },
        { name: "Vans Classic", sales: 156, category: "Casual" },
        { name: "Converse Chuck", sales: 142, category: "Casual" },
        { name: "Oxford Classic", sales: 98, category: "Formal" }
      ],
      rendimientoProveedores: [
        { name: "Calzado Deportivo Premium", orders: 45, avgTime: 3.2, quality: 99.2, costs: 125000 },
        { name: "Zapatos Casuales SA", orders: 38, avgTime: 4.1, quality: 98.5, costs: 85000 },
        { name: "Formal Shoes Inc", orders: 25, avgTime: 4.8, quality: 98.8, costs: 65000 },
        { name: "Accesorios Pro", orders: 15, avgTime: 3.5, quality: 99.0, costs: 25000 }
      ],
      distribucionCostos: [
        { name: "Calzado Deportivo", percentage: 45, pedidos: 18 },
        { name: "Calzado Casual", percentage: 30, pedidos: 12 },
        { name: "Calzado Formal", percentage: 15, pedidos: 6 },
        { name: "Accesorios", percentage: 10, pedidos: 4 }
      ]
    },
    mesPasado: {
      ventasTotales: 1156780,
      ganancias: 335234,
      clientesNuevos: 798,
      ticketPromedio: 87.20,
      ventasDia: 37200,
      ventasOnline: 15050,
      ventasTienda: 22150,
      devoluciones: 2670,
      stockTotal: 11850,
      stockCritico: 37,
      rotacionStock: 2.9,
      devolucionesPorcentaje: 2.9,
      pedidosPendientes: 19,
      tiempoPromedio: 4.7,
      calidad: 98.2,
      costos: 238000,
      ventasPorCategoria: [
        { name: "Calzado Deportivo", sales: 398450, color: "#4caf50", unidades: "398k en ventas el mes pasado" },
        { name: "Calzado Casual", sales: 312560, color: "#2196f3", unidades: "313k en ventas el mes pasado" },
        { name: "Calzado Formal", sales: 265890, color: "#673ab7", unidades: "266k en ventas el mes pasado" },
        { name: "Calzado para Playa", sales: 179880, color: "#ff9800", unidades: "180k en ventas el mes pasado" }
      ],
      distribucionVentas: {
        total: 13580,
        canales: [
          { name: "Tienda Física", ventas: 8420, monto: 715000, percentage: 60 },
          { name: "Online", ventas: 3800, monto: 323000, percentage: 29 },
          { name: "Mayoristas", ventas: 1360, monto: 118000, percentage: 11 }
        ]
      },
      rendimientoSucursales: [
        { name: "Tienda Principal", sales: 498240, conversionRate: 7.8, avgTicket: 90.20, goalCompletion: 92 },
        { name: "Tienda Polanco", sales: 298650, conversionRate: 7.2, avgTicket: 85.60, goalCompletion: 82 },
        { name: "Tienda Santa Fe", sales: 198450, conversionRate: 6.5, avgTicket: 76.80, goalCompletion: 72 },
        { name: "Outlet Perisur", sales: 161440, conversionRate: 8.8, avgTicket: 73.50, goalCompletion: 98 }
      ],
      inventarioPorCategoria: [
        { name: "Calzado Deportivo", stock: 5320, productos: 375 },
        { name: "Calzado Casual", stock: 3550, productos: 248 },
        { name: "Calzado Formal", stock: 1780, productos: 122 },
        { name: "Accesorios", stock: 1200, productos: 82 }
      ],
      productosTop: [
        { name: "Nike Air Max", sales: 228, category: "Deportivo" },
        { name: "Adidas Ultraboost", sales: 185, category: "Deportivo" },
        { name: "Vans Classic", sales: 148, category: "Casual" },
        { name: "Converse Chuck", sales: 135, category: "Casual" },
        { name: "Oxford Classic", sales: 92, category: "Formal" }
      ],
      rendimientoProveedores: [
        { name: "Calzado Deportivo Premium", orders: 42, avgTime: 3.4, quality: 99.0, costs: 120000 },
        { name: "Zapatos Casuales SA", orders: 35, avgTime: 4.3, quality: 98.3, costs: 82000 },
        { name: "Formal Shoes Inc", orders: 23, avgTime: 5.0, quality: 98.6, costs: 62000 },
        { name: "Accesorios Pro", orders: 14, avgTime: 3.7, quality: 98.8, costs: 24000 }
      ],
      distribucionCostos: [
        { name: "Calzado Deportivo", percentage: 44, pedidos: 17 },
        { name: "Calzado Casual", percentage: 31, pedidos: 11 },
        { name: "Calzado Formal", percentage: 15, pedidos: 6 },
        { name: "Accesorios", percentage: 10, pedidos: 4 }
      ]
    },
    añoActual: {
      ventasTotales: 14567800,
      ganancias: 4370340,
      clientesNuevos: 10100,
      ticketPromedio: 86.80,
      ventasDia: 45200,
      ventasOnline: 19500,
      ventasTienda: 25700,
      devoluciones: 2280,
      stockTotal: 13200,
      stockCritico: 42,
      rotacionStock: 3.5,
      devolucionesPorcentaje: 2.2,
      pedidosPendientes: 22,
      tiempoPromedio: 4.0,
      calidad: 98.8,
      costos: 252000,
      ventasPorCategoria: [
        { name: "Calzado Deportivo", sales: 4950000, color: "#4caf50", unidades: "4.95M en ventas este año" },
        { name: "Calzado Casual", sales: 3920000, color: "#2196f3", unidades: "3.92M en ventas este año" },
        { name: "Calzado Formal", sales: 3280000, color: "#673ab7", unidades: "3.28M en ventas este año" },
        { name: "Calzado para Playa", sales: 2417800, color: "#ff9800", unidades: "2.42M en ventas este año" }
      ],
      distribucionVentas: {
        total: 168500,
        canales: [
          { name: "Tienda Física", ventas: 104470, monto: 8890000, percentage: 61 },
          { name: "Online", ventas: 47180, monto: 4012000, percentage: 30 },
          { name: "Mayoristas", ventas: 16850, monto: 1432000, percentage: 9 }
        ]
      },
      rendimientoSucursales: [
        { name: "Tienda Principal", sales: 6250000, conversionRate: 8.6, avgTicket: 94.30, goalCompletion: 96 },
        { name: "Tienda Polanco", sales: 3850000, conversionRate: 7.8, avgTicket: 89.50, goalCompletion: 89 },
        { name: "Tienda Santa Fe", sales: 2580000, conversionRate: 7.0, avgTicket: 79.80, goalCompletion: 78 },
        { name: "Outlet Perisur", sales: 1887800, conversionRate: 9.4, avgTicket: 76.40, goalCompletion: 102 }
      ],
      inventarioPorCategoria: [
        { name: "Calzado Deportivo", stock: 5950, productos: 385 },
        { name: "Calzado Casual", stock: 3960, productos: 258 },
        { name: "Calzado Formal", stock: 1980, productos: 129 },
        { name: "Accesorios", stock: 1310, productos: 86 }
      ],
      productosTop: [
        { name: "Nike Air Max", sales: 2850, category: "Deportivo" },
        { name: "Adidas Ultraboost", sales: 2320, category: "Deportivo" },
        { name: "Vans Classic", sales: 1850, category: "Casual" },
        { name: "Converse Chuck", sales: 1680, category: "Casual" },
        { name: "Oxford Classic", sales: 1150, category: "Formal" }
      ],
      rendimientoProveedores: [
        { name: "Calzado Deportivo Premium", orders: 520, avgTime: 3.1, quality: 99.3, costs: 1450000 },
        { name: "Zapatos Casuales SA", orders: 445, avgTime: 4.0, quality: 98.7, costs: 980000 },
        { name: "Formal Shoes Inc", orders: 290, avgTime: 4.6, quality: 99.0, costs: 750000 },
        { name: "Accesorios Pro", orders: 175, avgTime: 3.3, quality: 99.2, costs: 290000 }
      ],
      distribucionCostos: [
        { name: "Calzado Deportivo", percentage: 46, pedidos: 210 },
        { name: "Calzado Casual", percentage: 29, pedidos: 140 },
        { name: "Calzado Formal", percentage: 16, pedidos: 75 },
        { name: "Accesorios", percentage: 9, pedidos: 45 }
      ]
    },
    añoPasado: {
      ventasTotales: 13245600,
      ganancias: 3973680,
      clientesNuevos: 9500,
      ticketPromedio: 84.90,
      ventasDia: 41200,
      ventasOnline: 17500,
      ventasTienda: 23700,
      devoluciones: 2580,
      stockTotal: 12100,
      stockCritico: 48,
      rotacionStock: 3.0,
      devolucionesPorcentaje: 2.6,
      pedidosPendientes: 26,
      tiempoPromedio: 4.5,
      calidad: 98.3,
      costos: 240000,
      ventasPorCategoria: [
        { name: "Calzado Deportivo", sales: 4480000, color: "#4caf50", unidades: "4.48M en ventas año pasado" },
        { name: "Calzado Casual", sales: 3570000, color: "#2196f3", unidades: "3.57M en ventas año pasado" },
        { name: "Calzado Formal", sales: 2980000, color: "#673ab7", unidades: "2.98M en ventas año pasado" },
        { name: "Calzado para Playa", sales: 2215600, color: "#ff9800", unidades: "2.22M en ventas año pasado" }
      ],
      distribucionVentas: {
        total: 156200,
        canales: [
          { name: "Tienda Física", ventas: 96844, monto: 8230000, percentage: 63 },
          { name: "Online", ventas: 43736, monto: 3718000, percentage: 27 },
          { name: "Mayoristas", ventas: 15620, monto: 1327000, percentage: 10 }
        ]
      },
      rendimientoSucursales: [
        { name: "Tienda Principal", sales: 5680000, conversionRate: 8.2, avgTicket: 91.80, goalCompletion: 94 },
        { name: "Tienda Polanco", sales: 3420000, conversionRate: 7.4, avgTicket: 86.90, goalCompletion: 85 },
        { name: "Tienda Santa Fe", sales: 2340000, conversionRate: 6.6, avgTicket: 77.60, goalCompletion: 74 },
        { name: "Outlet Perisur", sales: 1805600, conversionRate: 9.0, avgTicket: 74.80, goalCompletion: 100 }
      ],
      inventarioPorCategoria: [
        { name: "Calzado Deportivo", stock: 5580, productos: 372 },
        { name: "Calzado Casual", stock: 3720, productos: 248 },
        { name: "Calzado Formal", stock: 1860, productos: 124 },
        { name: "Accesorios", stock: 1240, productos: 83 }
      ],
      productosTop: [
        { name: "Nike Air Max", sales: 2650, category: "Deportivo" },
        { name: "Adidas Ultraboost", sales: 2150, category: "Deportivo" },
        { name: "Vans Classic", sales: 1720, category: "Casual" },
        { name: "Converse Chuck", sales: 1560, category: "Casual" },
        { name: "Oxford Classic", sales: 1080, category: "Formal" }
      ],
      rendimientoProveedores: [
        { name: "Calzado Deportivo Premium", orders: 485, avgTime: 3.3, quality: 99.1, costs: 1380000 },
        { name: "Zapatos Casuales SA", orders: 415, avgTime: 4.2, quality: 98.4, costs: 920000 },
        { name: "Formal Shoes Inc", orders: 275, avgTime: 4.9, quality: 98.7, costs: 710000 },
        { name: "Accesorios Pro", orders: 165, avgTime: 3.6, quality: 99.0, costs: 275000 }
      ],
      distribucionCostos: [
        { name: "Calzado Deportivo", percentage: 45, pedidos: 195 },
        { name: "Calzado Casual", percentage: 30, pedidos: 130 },
        { name: "Calzado Formal", percentage: 15, pedidos: 70 },
        { name: "Accesorios", percentage: 10, pedidos: 42 }
      ]
    }
  };

  // Función para obtener los datos según el período
  const getCurrentMetricsData = () => {
    return metricsDataByPeriod[timeRange];
  };

  // Actualizar los estilos base
  const styles = {
    chartLabel: {
      value: {
        fontSize: '1.5rem',
        fontWeight: '500',
        color: isDarkTheme ? '#ffffff' : '#333333'
      },
      text: {
        fontSize: '0.9rem',
        fontWeight: '400',
        color: isDarkTheme ? '#ffffff' : '#333333'
      }
    },
    footerText: {
      fontSize: '0.85rem',
      color: isDarkTheme ? 'rgba(255,255,255,0.85)' : 'var(--sapContent_LabelColor)',
      marginTop: '8px'
    },
    legend: {
      text: {
        color: isDarkTheme ? 'rgba(255,255,255,0.9)' : '#333333',
        fontSize: '0.9rem'
      }
    },
    tableCell: {
      number: {
        textAlign: 'right'
      }
    },
    metricCard: {
      backgroundColor: isDarkTheme ? 'rgba(30, 30, 30, 0.95)' : '#ffffff',
      border: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      borderRadius: '8px',
      overflow: 'hidden'
    },
    cardHeader: {
      backgroundColor: isDarkTheme ? 'rgba(40, 40, 40, 0.95)' : '#f8f9fa',
      borderBottom: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      padding: '1rem'
    },
    cardContent: {
      padding: '1rem',
      backgroundColor: isDarkTheme ? 'rgba(30, 30, 30, 0.95)' : '#ffffff'
    },
    cardFooter: {
      padding: '0.75rem 1rem',
      backgroundColor: isDarkTheme ? 'rgba(25, 25, 25, 0.95)' : '#f8f9fa',
      borderTop: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
    }
  };

  // Función para renderizar la vista general
  const renderGeneralView = () => {
    const currentData = getCurrentMetricsData();
    return (
      <>
        <MetricsGrid>
          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Ventas Totales</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>${currentData.ventasTotales.toLocaleString()}</MetricValue>
              <MetricInfo positive={currentData.ventasTotales > metricsDataByPeriod.mesPasado.ventasTotales}>
                <MdTrendingUp />
                <span>{((currentData.ventasTotales - metricsDataByPeriod.mesPasado.ventasTotales) / metricsDataByPeriod.mesPasado.ventasTotales * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Modelo más vendido: <strong>Zapatillas Runner Pro</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Ganancias</CardTitle>
              <MdAttachMoney size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>${currentData.ganancias.toLocaleString()}</MetricValue>
              <MetricInfo positive={currentData.ganancias > metricsDataByPeriod.mesPasado.ganancias}>
                <MdTrendingUp />
                <span>{((currentData.ganancias - metricsDataByPeriod.mesPasado.ganancias) / metricsDataByPeriod.mesPasado.ganancias * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Margen promedio: <strong>30.0%</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Clientes Nuevos</CardTitle>
              <MdPerson size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>{currentData.clientesNuevos}</MetricValue>
              <MetricInfo positive={currentData.clientesNuevos > metricsDataByPeriod.mesPasado.clientesNuevos}>
                <MdTrendingUp />
                <span>{((currentData.clientesNuevos - metricsDataByPeriod.mesPasado.clientesNuevos) / metricsDataByPeriod.mesPasado.clientesNuevos * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Tasa de conversión: <strong>4.8%</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Ticket Promedio</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>${currentData.ticketPromedio.toFixed(2)}</MetricValue>
              <MetricInfo positive={currentData.ticketPromedio > metricsDataByPeriod.mesPasado.ticketPromedio}>
                <MdTrendingUp />
                <span>{((currentData.ticketPromedio - metricsDataByPeriod.mesPasado.ticketPromedio) / metricsDataByPeriod.mesPasado.ticketPromedio * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Productos por venta: <strong>1.8</strong></FooterText>
            </CardFooter>
          </MetricCard>
        </MetricsGrid>

        <RowContainer>
          <ChartCard style={{ flex: 2 }}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Ventas por Categoría</CardTitle>
            </CardHeader>
            <ChartContent style={styles.cardContent}>
              <RankingCards 
                data={currentData.ventasPorCategoria.map(cat => ({
                  name: cat.name,
                  value: `MXN $${cat.sales.toLocaleString()}`,
                  secondaryInfo: cat.unidades,
                  color: cat.color
                }))}
                title="Top Categorías por Ventas"
                getColor={(item) => item.color}
              />
            </ChartContent>
          </ChartCard>

          <ChartCard style={{ flex: 1 }}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Distribución de Ventas</CardTitle>
            </CardHeader>
            <ChartContent style={styles.cardContent}>
              <DistributionCards 
                data={currentData.distribucionVentas.canales.map(channel => ({
                  name: channel.name,
                  value: `${channel.ventas.toLocaleString()} ventas`,
                  secondaryInfo: `MXN $${(channel.monto / 1000).toFixed(1)}k`,
                  color: getChannelColor(channel.name)
                }))}
                total={`${currentData.distribucionVentas.total.toLocaleString()} ventas totales`}
                label="Distribución por Canal"
                getColor={(item) => item.color}
              />
            </ChartContent>
          </ChartCard>
        </RowContainer>
      </>
    );
  };

  // Función para renderizar la vista de ventas
  const renderVentasView = () => {
    const currentData = getCurrentMetricsData();
    return (
      <>
        <MetricsGrid>
          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Ventas del Día</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>${currentData.ventasDia.toLocaleString()}</MetricValue>
              <MetricInfo positive={currentData.ventasDia > metricsDataByPeriod.mesPasado.ventasDia}>
                <MdTrendingUp />
                <span>{((currentData.ventasDia - metricsDataByPeriod.mesPasado.ventasDia) / metricsDataByPeriod.mesPasado.ventasDia * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Transacciones: <strong>486</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Ventas Online</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>${currentData.ventasOnline.toLocaleString()}</MetricValue>
              <MetricInfo positive={currentData.ventasOnline > metricsDataByPeriod.mesPasado.ventasOnline}>
                <MdTrendingUp />
                <span>{((currentData.ventasOnline - metricsDataByPeriod.mesPasado.ventasOnline) / metricsDataByPeriod.mesPasado.ventasOnline * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Pedidos: <strong>215</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Ventas en Tienda</CardTitle>
              <MdStore size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>${currentData.ventasTienda.toLocaleString()}</MetricValue>
              <MetricInfo positive={currentData.ventasTienda > metricsDataByPeriod.mesPasado.ventasTienda}>
                <MdTrendingUp />
                <span>{((currentData.ventasTienda - metricsDataByPeriod.mesPasado.ventasTienda) / metricsDataByPeriod.mesPasado.ventasTienda * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Visitas: <strong>842</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Devoluciones</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>${currentData.devoluciones.toLocaleString()}</MetricValue>
              <MetricInfo positive={currentData.devoluciones < metricsDataByPeriod.mesPasado.devoluciones}>
                <MdTrendingDown />
                <span>{((currentData.devoluciones - metricsDataByPeriod.mesPasado.devoluciones) / metricsDataByPeriod.mesPasado.devoluciones * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Cantidad: <strong>12</strong></FooterText>
            </CardFooter>
          </MetricCard>
        </MetricsGrid>

        <RowContainer>
          <ChartCard style={{
            ...styles.metricCard,
            flex: 1
          }}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Rendimiento por Sucursal</CardTitle>
            </CardHeader>
            <TableContent style={styles.cardContent}>
              <StoreTable style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: isDarkTheme ? '#ffffff' : '#333333'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: isDarkTheme ? 'rgba(40, 40, 40, 0.95)' : '#f8f9fa'
                  }}>
                    <th>Sucursal</th>
                    <th style={styles.tableCell.number}>Ventas</th>
                    <th style={styles.tableCell.number}>Conversión</th>
                    <th style={styles.tableCell.number}>Ticket Promedio</th>
                    <th>Meta {timeRange.includes('año') ? 'Anual' : 'Mensual'}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.rendimientoSucursales.map(store => (
                    <tr key={store.name} style={{
                      borderBottom: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                    }}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MdStore size={18} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
                          {store.name}
                        </div>
                      </td>
                      <td style={styles.tableCell.number}>MXN ${store.sales.toLocaleString()}</td>
                      <td style={styles.tableCell.number}>{store.conversionRate.toFixed(1)} ventas/hora</td>
                      <td style={styles.tableCell.number}>MXN ${store.avgTicket.toFixed(2)}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ProgressContainer style={{ flex: 1 }}>
                            <ProgressBar width={store.goalCompletion} />
                          </ProgressContainer>
                          <span style={{ 
                            minWidth: '48px', 
                            textAlign: 'right',
                            color: isDarkTheme ? '#ffffff' : '#333333'
                          }}>{store.goalCompletion}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StoreTable>
            </TableContent>
          </ChartCard>
        </RowContainer>
      </>
    );
  };

  // Función para renderizar la vista de inventario
  const renderInventarioView = () => {
    const currentData = getCurrentMetricsData();
    return (
      <>
        <MetricsGrid>
          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Stock Total</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>{currentData.stockTotal.toLocaleString()}</MetricValue>
              <MetricInfo positive={currentData.stockTotal > metricsDataByPeriod.mesPasado.stockTotal}>
                <MdTrendingUp />
                <span>{((currentData.stockTotal - metricsDataByPeriod.mesPasado.stockTotal) / metricsDataByPeriod.mesPasado.stockTotal * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Productos únicos: <strong>842</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Stock Crítico</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>{currentData.stockCritico}</MetricValue>
              <MetricInfo positive={currentData.stockCritico < metricsDataByPeriod.mesPasado.stockCritico}>
                <MdTrendingDown />
                <span>{((currentData.stockCritico - metricsDataByPeriod.mesPasado.stockCritico) / metricsDataByPeriod.mesPasado.stockCritico * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Productos afectados: <strong>12</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Rotación de Stock</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>{currentData.rotacionStock}</MetricValue>
              <MetricInfo positive={currentData.rotacionStock > metricsDataByPeriod.mesPasado.rotacionStock}>
                <MdTrendingUp />
                <span>{((currentData.rotacionStock - metricsDataByPeriod.mesPasado.rotacionStock) / metricsDataByPeriod.mesPasado.rotacionStock * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Días promedio: <strong>92</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Devoluciones</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>{currentData.devolucionesPorcentaje}%</MetricValue>
              <MetricInfo positive={currentData.devolucionesPorcentaje < metricsDataByPeriod.mesPasado.devolucionesPorcentaje}>
                <MdTrendingDown />
                <span>{((currentData.devolucionesPorcentaje - metricsDataByPeriod.mesPasado.devolucionesPorcentaje) / metricsDataByPeriod.mesPasado.devolucionesPorcentaje * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Unidades: <strong>298</strong></FooterText>
            </CardFooter>
          </MetricCard>
        </MetricsGrid>

        <RowContainer>
          <ChartCard style={{
            ...styles.metricCard,
            flex: 1
          }}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Stock por Categoría</CardTitle>
            </CardHeader>
            <ChartContent style={styles.cardContent}>
              <DistributionCards 
                data={currentData.inventarioPorCategoria.map(cat => ({
                  name: cat.name,
                  value: `${cat.stock.toLocaleString()} unidades`,
                  secondaryInfo: `${cat.productos} productos en catálogo`,
                  color: getCategoryColor(cat.name)
                }))}
                total={`${currentData.stockTotal.toLocaleString()} unidades`}
                label="Inventario Total"
                getColor={(item) => item.color}
              />
            </ChartContent>
          </ChartCard>

          <ChartCard style={{
            ...styles.metricCard,
            flex: 1
          }}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Productos más Vendidos</CardTitle>
            </CardHeader>
            <ChartContent style={styles.cardContent}>
              <RankingCards 
                data={currentData.productosTop.map(prod => ({
                  name: prod.name,
                  value: `${prod.sales} vendidos`,
                  secondaryInfo: `Stock actual: ${Math.round(prod.sales * 1.2)} unidades`,
                  color: getProductColor(prod.category)
                }))}
                title="Top Productos por Ventas"
                getColor={(item) => item.color}
              />
            </ChartContent>
          </ChartCard>
        </RowContainer>
      </>
    );
  };

  // Función para renderizar la vista de proveedores
  const renderProveedoresView = () => {
    const currentData = getCurrentMetricsData();
    return (
      <>
        <MetricsGrid>
          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Pedidos Pendientes</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>{currentData.pedidosPendientes}</MetricValue>
              <MetricInfo positive={currentData.pedidosPendientes < metricsDataByPeriod.mesPasado.pedidosPendientes}>
                <MdTrendingDown />
                <span>{((currentData.pedidosPendientes - metricsDataByPeriod.mesPasado.pedidosPendientes) / metricsDataByPeriod.mesPasado.pedidosPendientes * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Proveedores: <strong>8</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Tiempo Promedio</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>{currentData.tiempoPromedio} días</MetricValue>
              <MetricInfo positive={currentData.tiempoPromedio < metricsDataByPeriod.mesPasado.tiempoPromedio}>
                <MdTrendingDown />
                <span>{((currentData.tiempoPromedio - metricsDataByPeriod.mesPasado.tiempoPromedio) / metricsDataByPeriod.mesPasado.tiempoPromedio * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Entrega promedio: <strong>3.8 días</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Calidad</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>{currentData.calidad}%</MetricValue>
              <MetricInfo positive={currentData.calidad > metricsDataByPeriod.mesPasado.calidad}>
                <MdTrendingUp />
                <span>{((currentData.calidad - metricsDataByPeriod.mesPasado.calidad) / metricsDataByPeriod.mesPasado.calidad * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Productos defectuosos: <strong>{100 - currentData.calidad}%</strong></FooterText>
            </CardFooter>
          </MetricCard>

          <MetricCard style={styles.metricCard}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Costos</CardTitle>
              <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <MetricValue style={{
                color: isDarkTheme ? '#ffffff' : '#333333',
                fontSize: '1.75rem',
                fontWeight: '600'
              }}>${currentData.costos.toLocaleString()}</MetricValue>
              <MetricInfo positive={currentData.costos < metricsDataByPeriod.mesPasado.costos}>
                <MdTrendingDown />
                <span>{((currentData.costos - metricsDataByPeriod.mesPasado.costos) / metricsDataByPeriod.mesPasado.costos * 100).toFixed(1)}% vs período anterior</span>
              </MetricInfo>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <FooterText style={{
                ...styles.footerText,
                color: isDarkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              }}>Margen promedio: <strong>32%</strong></FooterText>
            </CardFooter>
          </MetricCard>
        </MetricsGrid>

        <RowContainer>
          <ChartCard style={{
            ...styles.metricCard,
            flex: 1
          }}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Rendimiento por Proveedor</CardTitle>
            </CardHeader>
            <TableContent style={styles.cardContent}>
              <StoreTable style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: isDarkTheme ? '#ffffff' : '#333333'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: isDarkTheme ? 'rgba(40, 40, 40, 0.95)' : '#f8f9fa'
                  }}>
                    <th>Proveedor</th>
                    <th style={styles.tableCell.number}>Pedidos</th>
                    <th style={styles.tableCell.number}>Tiempo Promedio</th>
                    <th style={styles.tableCell.number}>Productos OK</th>
                    <th style={styles.tableCell.number}>Costos</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.rendimientoProveedores.map(supplier => (
                    <tr key={supplier.name} style={{
                      borderBottom: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                    }}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MdStore size={18} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
                          {supplier.name}
                        </div>
                      </td>
                      <td style={styles.tableCell.number}>{supplier.orders} pedidos</td>
                      <td style={styles.tableCell.number}>{supplier.avgTime.toFixed(1)} días</td>
                      <td style={styles.tableCell.number}>{Math.round(supplier.quality * supplier.orders)} productos</td>
                      <td style={styles.tableCell.number}>MXN ${supplier.costs.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </StoreTable>
            </TableContent>
          </ChartCard>

          <ChartCard style={{
            ...styles.metricCard,
            flex: 1
          }}>
            <CardHeader style={styles.cardHeader}>
              <CardTitle>Distribución de Costos</CardTitle>
            </CardHeader>
            <ChartContent style={styles.cardContent}>
              <DistributionCards 
                data={currentData.distribucionCostos.map(item => ({
                  name: item.name,
                  value: `MXN $${Math.round(currentData.costos * (item.percentage / 100)).toLocaleString()}`,
                  secondaryInfo: `${item.pedidos} pedidos activos`,
                  color: getCostColor(item.name)
                }))}
                total={`MXN $${currentData.costos.toLocaleString()}`}
                label={`Costos del ${timeRange.includes('año') ? 'Año' : 'Mes'}`}
                getColor={(item) => item.color}
              />
            </ChartContent>
          </ChartCard>
        </RowContainer>
      </>
    );
  };

  return (
    <UI5ThemeProvider>
      <Container style={{
        maxWidth: '100%',
        padding: '1rem',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isDarkTheme ? '#121212' : '#ffffff'
      }}>
        <PageHeader style={{ flex: '0 0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MdOutlineInsights size={28} />
            <PageTitle>Métricas de Rendimiento</PageTitle>
          </div>
        </PageHeader>

        <FiltersArea style={{ flex: '0 0 auto' }}>
          <FilterItem>
            <span><MdCalendarToday /> Período:</span>
            <FilterSelect value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="mesActual">Mes Actual</option>
              <option value="mesPasado">Mes Pasado</option>
              <option value="añoActual">Año Actual</option>
              <option value="añoPasado">Año Pasado</option>
            </FilterSelect>
          </FilterItem>
          <FilterItem>
            <span><MdFilterList /> Vista:</span>
            <FilterSelect value={selectedView} onChange={(e) => setSelectedView(e.target.value)}>
              <option value="general">General</option>
              <option value="ventas">Ventas</option>
              <option value="inventario">Inventario</option>
              <option value="proveedores">Proveedores</option>
            </FilterSelect>
          </FilterItem>
        </FiltersArea>

        <ContentArea style={{ 
          flex: '1 1 auto',
          overflow: 'auto',
          padding: '1rem 0'
        }}>
          {selectedView === "general" && renderGeneralView()}
          {selectedView === "ventas" && renderVentasView()}
          {selectedView === "inventario" && renderInventarioView()}
          {selectedView === "proveedores" && renderProveedoresView()}
        </ContentArea>
      </Container>
    </UI5ThemeProvider>
  );
}

// Datos de ejemplo
const salesByCategory = [
  { name: "Calzado Deportivo", sales: 425640, color: "#4caf50" },
  { name: "Calzado Casual", sales: 338790, color: "#2196f3" },
  { name: "Calzado Formal", sales: 287320, color: "#673ab7" },
  { name: "Calzado para Playa", sales: 203030, color: "#ff9800" }
];

const maxCategorySales = Math.max(...salesByCategory.map(cat => cat.sales));

const salesChannels = [
  { name: "Tienda Física", percentage: 62 },
  { name: "Online", percentage: 28 },
  { name: "Mayoristas", percentage: 10 }
];

const storePerformance = [
  { name: "Tienda Principal", sales: 542680, conversionRate: 8.4, avgTicket: 92.50, goalCompletion: 98 },
  { name: "Tienda Polanco", sales: 327450, conversionRate: 7.6, avgTicket: 88.30, goalCompletion: 87 },
  { name: "Tienda Santa Fe", sales: 215240, conversionRate: 6.8, avgTicket: 78.40, goalCompletion: 76 },
  { name: "Outlet Perisur", sales: 169410, conversionRate: 9.2, avgTicket: 75.20, goalCompletion: 105 }
];

const seasonalTrends = [
  { name: "Zapatillas Minimalistas", interest: 78, change: 12 },
  { name: "Sandalias Ecológicas", interest: 65, change: 24 },
  { name: "Calzado Deportivo Ligero", interest: 82, change: 8 },
  { name: "Botas Impermeables", interest: 45, change: -5 },
  { name: "Mocasines Casuales", interest: 58, change: 3 }
];

// Datos adicionales para las nuevas vistas
const inventoryCategories = [
  { name: "Calzado Deportivo", percentage: 45 },
  { name: "Calzado Casual", percentage: 30 },
  { name: "Calzado Formal", percentage: 15 },
  { name: "Accesorios", percentage: 10 }
];

const topProducts = [
  { name: "Nike Air Max", sales: 245, category: "Deportivo" },
  { name: "Adidas Ultraboost", sales: 198, category: "Deportivo" },
  { name: "Vans Classic", sales: 156, category: "Casual" },
  { name: "Converse Chuck", sales: 142, category: "Casual" },
  { name: "Oxford Classic", sales: 98, category: "Formal" }
];

const maxProductSales = Math.max(...topProducts.map(product => product.sales));

const supplierPerformance = [
  { name: "Calzado Deportivo Premium", orders: 45, avgTime: 3.2, quality: 99.2, costs: 125000 },
  { name: "Zapatos Casuales SA", orders: 38, avgTime: 4.1, quality: 98.5, costs: 85000 },
  { name: "Formal Shoes Inc", orders: 25, avgTime: 4.8, quality: 98.8, costs: 65000 },
  { name: "Accesorios Pro", orders: 15, avgTime: 3.5, quality: 99.0, costs: 25000 }
];

const costDistribution = [
  { name: "Calzado Deportivo", percentage: 45 },
  { name: "Calzado Casual", percentage: 30 },
  { name: "Calzado Formal", percentage: 15 },
  { name: "Accesorios", percentage: 10 }
];

// Funciones auxiliares para colores
const getCategoryColor = (categoryName) => {
  switch(categoryName) {
    case "Calzado Deportivo": return "#4caf50";
    case "Calzado Casual": return "#2196f3";
    case "Calzado Formal": return "#673ab7";
    case "Calzado para Playa": return "#ff9800";
    default: return "#9e9e9e";
  }
};

const getChannelColor = (channelName) => {
  switch(channelName) {
    case "Tienda Física": return "#4caf50";
    case "Online": return "#2196f3";
    case "Mayoristas": return "#ff9800";
    default: return "#9e9e9e";
  }
};

const getTrendColor = (interest) => {
  if (interest >= 75) return "#4caf50";
  if (interest >= 50) return "#2196f3";
  return "#ff9800";
};

// Funciones auxiliares adicionales para colores
const getProductColor = (category) => {
  switch(category) {
    case "Deportivo": return "#4caf50";
    case "Casual": return "#2196f3";
    case "Formal": return "#673ab7";
    default: return "#9e9e9e";
  }
};

const getCostColor = (name) => {
  switch(name) {
    case "Calzado Deportivo": return "#4caf50";
    case "Calzado Casual": return "#2196f3";
    case "Calzado Formal": return "#673ab7";
    case "Accesorios": return "#ff9800";
    default: return "#9e9e9e";
  }
};