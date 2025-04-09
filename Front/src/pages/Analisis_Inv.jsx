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
  CategoryPill,
  TrendIndicator,
  InfoText,
  ChartLegend,
  LegendItem,
  ResetButton,
  ActionButton
} from "../styles/Inventario/Analisis_InvStyle.js";
import { MdTrendingUp, MdTrendingDown, MdOutlineInventory2, MdOutlineShoppingCart, MdLocalShipping, MdWarning, MdOutlineStorefront, MdTimer, MdCalendarToday, MdFilterList, MdOutlineRefresh } from "react-icons/md";

// Datos de ejemplo para diferentes períodos y categorías
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
  },
  añoActual: {
    totalProducts: 2620,
    lowStockProducts: 198,
    outOfStockProducts: 88,
    inventoryValue: 268900,
    rotationIndex: 4.5,
    avgDaysInStock: 26,
    stockAccuracy: 98.1,
    forecastAccuracy: 89.7,
    orderFulfillment: 94.6,
    carryCost: 13200,
    receiptProcessingTime: 1.6,
    trend: {
      value: 7.5,
      direction: 'up'
    }
  },
  añoPasado: {
    totalProducts: 2150,
    lowStockProducts: 145,
    outOfStockProducts: 65,
    inventoryValue: 215600,
    rotationIndex: 3.8,
    avgDaysInStock: 32,
    stockAccuracy: 95.9,
    forecastAccuracy: 86.4,
    orderFulfillment: 91.2,
    carryCost: 10800,
    receiptProcessingTime: 2.2,
    trend: {
      value: 2.1,
      direction: 'down'
    }
  }
};

const categoryDataByPeriod = {
  deportivo: {
    mesActual: {
      inventory: 845,
      sales: 420,
      returnsRate: 4.2,
      turnoverRate: 4.8,
      profit: 32450,
      trend: 8.5
    },
    mesPasado: {
      inventory: 820,
      sales: 395,
      returnsRate: 4.5,
      turnoverRate: 4.6,
      profit: 30200,
      trend: 7.2
    },
    añoActual: {
      inventory: 890,
      sales: 450,
      returnsRate: 4.0,
      turnoverRate: 5.0,
      profit: 35600,
      trend: 9.8
    },
    añoPasado: {
      inventory: 780,
      sales: 380,
      returnsRate: 4.8,
      turnoverRate: 4.4,
      profit: 28900,
      trend: 6.5
    }
  },
  casual: {
    mesActual: {
      inventory: 680,
      sales: 385,
      returnsRate: 3.8,
      turnoverRate: 4.2,
      profit: 28600,
      trend: 5.2
    },
    mesPasado: {
      inventory: 650,
      sales: 360,
      returnsRate: 4.0,
      turnoverRate: 4.0,
      profit: 26800,
      trend: 4.8
    },
    añoActual: {
      inventory: 720,
      sales: 410,
      returnsRate: 3.6,
      turnoverRate: 4.4,
      profit: 30500,
      trend: 6.4
    },
    añoPasado: {
      inventory: 620,
      sales: 340,
      returnsRate: 4.2,
      turnoverRate: 3.8,
      profit: 25200,
      trend: 3.9
    }
  },
  formal: {
    mesActual: {
      inventory: 520,
      sales: 210,
      returnsRate: 2.5,
      turnoverRate: 3.5,
      profit: 24800,
      trend: -2.1
    },
    mesPasado: {
      inventory: 510,
      sales: 200,
      returnsRate: 2.7,
      turnoverRate: 3.3,
      profit: 23500,
      trend: -2.8
    },
    añoActual: {
      inventory: 540,
      sales: 225,
      returnsRate: 2.3,
      turnoverRate: 3.7,
      profit: 26200,
      trend: -1.5
    },
    añoPasado: {
      inventory: 490,
      sales: 190,
      returnsRate: 2.9,
      turnoverRate: 3.1,
      profit: 22100,
      trend: -3.2
    }
  },
  playa: {
    mesActual: {
      inventory: 405,
      sales: 320,
      returnsRate: 5.1,
      turnoverRate: 5.2,
      profit: 18900,
      trend: 12.4
    },
    mesPasado: {
      inventory: 380,
      sales: 290,
      returnsRate: 5.4,
      turnoverRate: 4.9,
      profit: 17200,
      trend: 11.5
    },
    añoActual: {
      inventory: 430,
      sales: 345,
      returnsRate: 4.8,
      turnoverRate: 5.5,
      profit: 20600,
      trend: 13.8
    },
    añoPasado: {
      inventory: 360,
      sales: 270,
      returnsRate: 5.6,
      turnoverRate: 4.7,
      profit: 16100,
      trend: 10.2
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

// Datos de ejemplo para diferentes ubicaciones y períodos
const locationDataByPeriod = {
  "Tienda Principal": {
    mesActual: {
      inventoryValue: 94500,
      stockTurnover: 4.8,
      daysInStock: 24,
      efficiency: 92,
      stockAccuracy: 98.2,
      orderFulfillment: 95.8,
      lowStockProducts: 42,
      carryCost: 3650,
      categoryDistribution: {
        deportivo: { percentage: 42, inventory: 356, sales: 180 },
        casual: { percentage: 28, inventory: 237, sales: 120 },
        formal: { percentage: 18, inventory: 152, sales: 75 },
        playa: { percentage: 12, inventory: 102, sales: 45 }
      }
    },
    mesPasado: {
      inventoryValue: 92000,
      stockTurnover: 4.6,
      daysInStock: 26,
      efficiency: 90,
      stockAccuracy: 97.8,
      orderFulfillment: 94.5,
      lowStockProducts: 45,
      carryCost: 3580,
      categoryDistribution: {
        deportivo: { percentage: 40, inventory: 340, sales: 165 },
        casual: { percentage: 30, inventory: 255, sales: 110 },
        formal: { percentage: 20, inventory: 170, sales: 70 },
        playa: { percentage: 10, inventory: 85, sales: 40 }
      }
    },
    añoActual: {
      inventoryValue: 98000,
      stockTurnover: 5.0,
      daysInStock: 22,
      efficiency: 94,
      stockAccuracy: 98.5,
      orderFulfillment: 96.2,
      lowStockProducts: 38,
      carryCost: 3750,
      categoryDistribution: {
        deportivo: { percentage: 44, inventory: 380, sales: 195 },
        casual: { percentage: 26, inventory: 225, sales: 130 },
        formal: { percentage: 17, inventory: 147, sales: 80 },
        playa: { percentage: 13, inventory: 112, sales: 50 }
      }
    },
    añoPasado: {
      inventoryValue: 88000,
      stockTurnover: 4.4,
      daysInStock: 28,
      efficiency: 88,
      stockAccuracy: 97.0,
      orderFulfillment: 93.5,
      lowStockProducts: 48,
      carryCost: 3450,
      categoryDistribution: {
        deportivo: { percentage: 38, inventory: 320, sales: 150 },
        casual: { percentage: 32, inventory: 270, sales: 100 },
        formal: { percentage: 19, inventory: 160, sales: 65 },
        playa: { percentage: 11, inventory: 93, sales: 35 }
      }
    }
  },
  "Tienda Polanco": {
    mesActual: {
      inventoryValue: 78200,
      stockTurnover: 4.5,
      daysInStock: 26,
      efficiency: 88,
      stockAccuracy: 96.5,
      orderFulfillment: 92.4,
      lowStockProducts: 38,
      carryCost: 2950,
      categoryDistribution: {
        deportivo: { percentage: 30, inventory: 254, sales: 125 },
        casual: { percentage: 40, inventory: 338, sales: 165 },
        formal: { percentage: 22, inventory: 186, sales: 90 },
        playa: { percentage: 8, inventory: 68, sales: 30 }
      }
    },
    mesPasado: {
      inventoryValue: 76500,
      stockTurnover: 4.3,
      daysInStock: 28,
      efficiency: 86,
      stockAccuracy: 96.0,
      orderFulfillment: 91.5,
      lowStockProducts: 42,
      carryCost: 2880,
      categoryDistribution: {
        deportivo: { percentage: 28, inventory: 238, sales: 115 },
        casual: { percentage: 42, inventory: 357, sales: 170 },
        formal: { percentage: 23, inventory: 195, sales: 85 },
        playa: { percentage: 7, inventory: 59, sales: 25 }
      }
    },
    añoActual: {
      inventoryValue: 81000,
      stockTurnover: 4.7,
      daysInStock: 24,
      efficiency: 90,
      stockAccuracy: 97.0,
      orderFulfillment: 93.8,
      lowStockProducts: 35,
      carryCost: 3100,
      categoryDistribution: {
        deportivo: { percentage: 32, inventory: 270, sales: 135 },
        casual: { percentage: 38, inventory: 321, sales: 160 },
        formal: { percentage: 21, inventory: 177, sales: 95 },
        playa: { percentage: 9, inventory: 76, sales: 35 }
      }
    },
    añoPasado: {
      inventoryValue: 74000,
      stockTurnover: 4.2,
      daysInStock: 30,
      efficiency: 84,
      stockAccuracy: 95.5,
      orderFulfillment: 90.5,
      lowStockProducts: 45,
      carryCost: 2800,
      categoryDistribution: {
        deportivo: { percentage: 27, inventory: 230, sales: 110 },
        casual: { percentage: 43, inventory: 365, sales: 175 },
        formal: { percentage: 24, inventory: 204, sales: 80 },
        playa: { percentage: 6, inventory: 51, sales: 20 }
      }
    }
  },
  "Tienda Santa Fe": {
    mesActual: {
      inventoryValue: 65400,
      stockTurnover: 3.9,
      daysInStock: 30,
      efficiency: 84,
      stockAccuracy: 95.8,
      orderFulfillment: 90.2,
      lowStockProducts: 56,
      carryCost: 3150,
      categoryDistribution: {
        deportivo: { percentage: 25, inventory: 212, sales: 105 },
        casual: { percentage: 30, inventory: 254, sales: 125 },
        formal: { percentage: 35, inventory: 296, sales: 145 },
        playa: { percentage: 10, inventory: 85, sales: 40 }
      }
    },
    mesPasado: {
      inventoryValue: 63800,
      stockTurnover: 3.7,
      daysInStock: 32,
      efficiency: 82,
      stockAccuracy: 95.0,
      orderFulfillment: 89.5,
      lowStockProducts: 60,
      carryCost: 3050,
      categoryDistribution: {
        deportivo: { percentage: 24, inventory: 204, sales: 100 },
        casual: { percentage: 32, inventory: 272, sales: 130 },
        formal: { percentage: 34, inventory: 289, sales: 140 },
        playa: { percentage: 10, inventory: 85, sales: 35 }
      }
    },
    añoActual: {
      inventoryValue: 68000,
      stockTurnover: 4.1,
      daysInStock: 28,
      efficiency: 86,
      stockAccuracy: 96.2,
      orderFulfillment: 91.5,
      lowStockProducts: 52,
      carryCost: 3250,
      categoryDistribution: {
        deportivo: { percentage: 26, inventory: 221, sales: 110 },
        casual: { percentage: 31, inventory: 263, sales: 130 },
        formal: { percentage: 34, inventory: 289, sales: 140 },
        playa: { percentage: 9, inventory: 76, sales: 35 }
      }
    },
    añoPasado: {
      inventoryValue: 62000,
      stockTurnover: 3.6,
      daysInStock: 34,
      efficiency: 80,
      stockAccuracy: 94.5,
      orderFulfillment: 88.5,
      lowStockProducts: 65,
      carryCost: 2950,
      categoryDistribution: {
        deportivo: { percentage: 23, inventory: 195, sales: 95 },
        casual: { percentage: 33, inventory: 280, sales: 135 },
        formal: { percentage: 35, inventory: 297, sales: 145 },
        playa: { percentage: 9, inventory: 76, sales: 30 }
      }
    }
  },
  "Outlet Perisur": {
    mesActual: {
      inventoryValue: 52600,
      stockTurnover: 5.2,
      daysInStock: 22,
      efficiency: 94,
      stockAccuracy: 97.6,
      orderFulfillment: 96.5,
      lowStockProducts: 48,
      carryCost: 2600,
      categoryDistribution: {
        deportivo: { percentage: 45, inventory: 380, sales: 190 },
        casual: { percentage: 25, inventory: 211, sales: 105 },
        formal: { percentage: 10, inventory: 84, sales: 42 },
        playa: { percentage: 20, inventory: 169, sales: 84 }
      }
    },
    mesPasado: {
      inventoryValue: 51000,
      stockTurnover: 5.0,
      daysInStock: 24,
      efficiency: 92,
      stockAccuracy: 97.2,
      orderFulfillment: 95.8,
      lowStockProducts: 52,
      carryCost: 2550,
      categoryDistribution: {
        deportivo: { percentage: 44, inventory: 374, sales: 185 },
        casual: { percentage: 26, inventory: 221, sales: 110 },
        formal: { percentage: 11, inventory: 93, sales: 46 },
        playa: { percentage: 19, inventory: 161, sales: 80 }
      }
    },
    añoActual: {
      inventoryValue: 55000,
      stockTurnover: 5.4,
      daysInStock: 20,
      efficiency: 96,
      stockAccuracy: 98.0,
      orderFulfillment: 97.2,
      lowStockProducts: 45,
      carryCost: 2700,
      categoryDistribution: {
        deportivo: { percentage: 46, inventory: 391, sales: 195 },
        casual: { percentage: 24, inventory: 204, sales: 102 },
        formal: { percentage: 10, inventory: 85, sales: 42 },
        playa: { percentage: 20, inventory: 170, sales: 85 }
      }
    },
    añoPasado: {
      inventoryValue: 49000,
      stockTurnover: 4.8,
      daysInStock: 26,
      efficiency: 90,
      stockAccuracy: 96.8,
      orderFulfillment: 94.5,
      lowStockProducts: 55,
      carryCost: 2450,
      categoryDistribution: {
        deportivo: { percentage: 43, inventory: 365, sales: 180 },
        casual: { percentage: 27, inventory: 229, sales: 115 },
        formal: { percentage: 12, inventory: 102, sales: 51 },
        playa: { percentage: 18, inventory: 153, sales: 76 }
      }
    }
  }
};

export function Analisis_Inv() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeRange, setTimeRange] = useState("mesActual");

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setTimeRange("mesActual");
  };

  // Obtener datos según los filtros seleccionados
  const getCurrentInventoryData = () => {
    let data = inventoryDataByPeriod[timeRange];
    
    if (selectedCategory !== "all") {
      // Ajustar datos según la categoría seleccionada
      const categoryData = categoryDataByPeriod[selectedCategory][timeRange];
      data = {
        ...data,
        totalProducts: categoryData.inventory,
        rotationIndex: categoryData.turnoverRate,
        inventoryValue: categoryData.profit * 2, // Valor aproximado
        orderFulfillment: 90 + (categoryData.trend > 0 ? 5 : -2)
      };
    }
    
    return data;
  };

  // Obtener datos de categoría según el período
  const getCurrentCategoryData = () => {
    return Object.entries(categoryDataByPeriod).map(([category, data]) => ({
      category: getCategoryName(category),
      ...data[timeRange]
    }));
  };

  // Función auxiliar para obtener el nombre completo de la categoría
  const getCategoryName = (categoryKey) => {
    const categories = {
      deportivo: "Calzado Deportivo",
      casual: "Calzado Casual",
      formal: "Calzado Formal",
      playa: "Calzado para Playa"
    };
    return categories[categoryKey] || categoryKey;
  };

  // Función para renderizar las métricas de inventario específicas de una sucursal
  const renderLocationInventoryMetrics = () => {
    // Obtener datos de la ubicación para el período seleccionado
    const locationData = locationDataByPeriod["Tienda Principal"]?.[timeRange];
    if (!locationData) return null;

    // Filtrar datos por categoría si está seleccionada
    let displayData = { ...locationData };
    if (selectedCategory !== "all") {
      const categoryData = locationData.categoryDistribution[selectedCategory];
      if (categoryData) {
        displayData = {
          ...displayData,
          inventoryValue: Math.round(locationData.inventoryValue * (categoryData.percentage / 100)),
          lowStockProducts: Math.round(locationData.lowStockProducts * (categoryData.percentage / 100)),
          carryCost: Math.round(locationData.carryCost * (categoryData.percentage / 100))
        };
      }
    }

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
              Análisis de Inventario: Tienda Principal
              {selectedCategory !== 'all' && ` - ${getCategoryName(selectedCategory)}`}
            </h2>
          </div>
        </div>

        <AnalyticsGrid>
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Valor del Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>${displayData.inventoryValue.toLocaleString()}</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Rotación de Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{displayData.stockTurnover}</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Días en Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{displayData.daysInStock} días</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Eficiencia</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{displayData.efficiency}%</MetricValue>
            </CardContent>
          </AnalyticsCard>
        </AnalyticsGrid>

        <AnalyticsGrid>
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Precisión de Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{displayData.stockAccuracy}%</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Cumplimiento de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{displayData.orderFulfillment}%</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Productos Bajo Mínimos</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>{displayData.lowStockProducts}</MetricValue>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardHeader>
              <CardTitle>Costo de Mantenimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricValue>${displayData.carryCost.toLocaleString()}</MetricValue>
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
                  {Object.entries(locationData.categoryDistribution)
                    .filter(([key]) => selectedCategory === 'all' || key === selectedCategory)
                    .map(([key, data]) => (
                      <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                          <span style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            color: 'var(--sapTextColor)'
                          }}>
                            <span style={{ 
                              display: 'inline-block', 
                              width: '12px', 
                              height: '12px', 
                              borderRadius: '3px', 
                              backgroundColor: getCategoryColor(key)
                            }}></span>
                            {getCategoryName(key)}
                          </span>
                          <span style={{ fontWeight: '500' }}>{data.inventory} productos</span>
                        </div>
                        <div style={{ 
                          height: '12px', 
                          backgroundColor: 'var(--sapContent_ForegroundBorderColor)',
                          borderRadius: '6px', 
                          overflow: 'hidden',
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                          <div 
                            style={{ 
                              height: '100%', 
                              width: `${selectedCategory === 'all' ? data.percentage : 100}%`, 
                              backgroundColor: getCategoryColor(key),
                              borderRadius: '6px',
                              transition: 'width 0.3s ease'
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
              <CardTitle>Ventas por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductTable>
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th>Ventas</th>
                    <th>Inventario</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(locationData.categoryDistribution)
                    .filter(([key]) => selectedCategory === 'all' || key === selectedCategory)
                    .map(([key, data]) => (
                      <tr key={key}>
                        <td>{getCategoryName(key)}</td>
                        <td>{data.sales} unidades</td>
                        <td>{data.inventory} unidades</td>
                        <td>
                          <div style={{ 
                            width: '100%', 
                            height: '8px', 
                            backgroundColor: 'var(--sapContent_ForegroundBorderColor)',
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${(data.inventory / (data.inventory + data.sales * 0.2)) * 100}%`,
                              height: '100%',
                              backgroundColor: getCategoryColor(key),
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
    const colors = {
      deportivo: 'var(--sapChart_OrderedColor_1, #0a6ed1)', // Azul vibrante
      casual: 'var(--sapChart_OrderedColor_2, #13a4b4)',    // Turquesa
      formal: 'var(--sapChart_OrderedColor_3, #6a2974)',    // Morado
      playa: 'var(--sapChart_OrderedColor_4, #cb1d69)'      // Rosa intenso
    };
    return colors[categoryName] || 'var(--sapChart_OrderedColor_11, #647987)';
  };

  // Función para renderizar el gráfico de categorías
  const renderCategoryChart = () => {
    let categories = [];
    
    if (selectedCategory === "all") {
      Object.entries(categoryDataByPeriod).forEach(([key, data]) => {
        const currentData = data[timeRange];
        categories.push({
          name: getCategoryName(key),
          count: currentData.inventory,
          percentage: (currentData.inventory / getCurrentInventoryData().totalProducts * 100).toFixed(1),
          color: getCategoryColor(key)
        });
      });
    } else {
      const categoryData = categoryDataByPeriod[selectedCategory][timeRange];
      categories = [{
        name: getCategoryName(selectedCategory),
        count: categoryData.inventory,
        percentage: 100,
        color: getCategoryColor(selectedCategory)
      }];
    }

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categories.map((category) => (
          <div key={category.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: 'var(--sapTextColor)'
              }}>
                <span style={{ 
                  display: 'inline-block', 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '3px', 
                  backgroundColor: category.color 
                }}></span>
                {category.name}
              </span>
              <span style={{ fontWeight: '500' }}>{category.count} productos</span>
            </div>
            <div style={{ 
              height: '12px', 
              backgroundColor: 'var(--sapContent_ForegroundBorderColor)',
              borderRadius: '6px', 
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${category.percentage}%`, 
                  backgroundColor: category.color,
                  borderRadius: '6px',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        ))}
        
        <ChartLegend>
          {categories.map((category) => (
            <LegendItem key={category.name}>
              <span style={{ 
                display: 'inline-block', 
                width: '12px', 
                height: '12px', 
                borderRadius: '3px', 
                backgroundColor: category.color,
                marginRight: '8px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
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
    const currentData = getCurrentInventoryData();
    let totalProducts, lowStock, outOfStock;

    if (selectedCategory === "all") {
      totalProducts = currentData.totalProducts;
      lowStock = currentData.lowStockProducts;
      outOfStock = currentData.outOfStockProducts;
    } else {
      const categoryData = categoryDataByPeriod[selectedCategory][timeRange];
      totalProducts = categoryData.inventory;
      // Calcular proporciones basadas en la categoría
      lowStock = Math.round(categoryData.inventory * (categoryData.returnsRate / 100));
      outOfStock = Math.round(categoryData.inventory * (1 - categoryData.turnoverRate / 5));
    }

    const inStock = totalProducts - lowStock - outOfStock;
    const inStockPercent = (inStock / totalProducts) * 100;
    const lowStockPercent = (lowStock / totalProducts) * 100;
    const outOfStockPercent = (outOfStock / totalProducts) * 100;

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
            <span>En stock: {inStock}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffab40', display: 'inline-block' }}></span>
            <span>Stock bajo: {lowStock}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e57373', display: 'inline-block' }}></span>
            <span>Sin stock: {outOfStock}</span>
          </div>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <InfoText>
            El {Math.round((lowStock + outOfStock) / totalProducts * 100)}% de productos requieren atención en el inventario.
          </InfoText>
        </div>
      </div>
    );
  };
  
  // Función para renderizar las métricas por categoría
  const renderCategoryMetrics = () => {
    let metricsToShow = [];

    if (selectedCategory === "all") {
      // Mostrar todas las categorías
      metricsToShow = Object.entries(categoryDataByPeriod).map(([key, data]) => ({
        category: getCategoryName(key),
        ...data[timeRange]
      }));
    } else {
      // Mostrar solo la categoría seleccionada
      metricsToShow = [{
        category: getCategoryName(selectedCategory),
        ...categoryDataByPeriod[selectedCategory][timeRange]
      }];
    }

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
            {metricsToShow.map(metric => (
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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: 'var(--sapContent_LabelColor)',
            fontSize: '0.875rem'
          }}>
            <MdOutlineStorefront size={20} />
            <div>
              <div style={{ fontWeight: '500' }}>Super Shoes - Tienda Principal</div>
              <div style={{ marginTop: '2px' }}>Plaza Comercial Reforma, Local 42B, CDMX</div>
            </div>
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
              <option value="mesActual">Mes Actual</option>
              <option value="mesPasado">Mes Pasado</option>
              <option value="añoActual">Año Actual</option>
              <option value="añoPasado">Año Pasado</option>
            </FilterSelect>
          </FilterItem>
          <ResetButton onClick={handleResetFilters}>
            <MdOutlineRefresh />
            Reiniciar Filtros
          </ResetButton>
        </FiltersArea>

        <ContentArea>
          {selectedCategory === "all" ? (
            <>
              <AnalyticsGrid>
                {/* Valor Total de Inventario */}
                <AnalyticsCard>
                  <CardHeader>
                    <CardTitle>Valor Total del Inventario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricValue>${getCurrentInventoryData().inventoryValue.toLocaleString()}</MetricValue>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <TrendIndicator positive={getCurrentInventoryData().trend.direction === 'up'}>
                        {getCurrentInventoryData().trend.direction === 'up' ? <MdTrendingUp /> : <MdTrendingDown />}
                        {getCurrentInventoryData().trend.value}%
                      </TrendIndicator>
                      <MetricLabel>vs. período anterior</MetricLabel>
                    </div>
                  </CardContent>
                </AnalyticsCard>

                {/* Rotación de Inventario */}
                <AnalyticsCard>
                  <CardHeader>
                    <CardTitle>Índice de Rotación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricValue>{getCurrentInventoryData().rotationIndex}</MetricValue>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <TrendIndicator positive>
                        <MdTrendingUp />
                        +0.3
                      </TrendIndicator>
                      <MetricLabel>vs. período anterior</MetricLabel>
                    </div>
                  </CardContent>
                </AnalyticsCard>

                {/* Promedio de Días en Inventario */}
                <AnalyticsCard>
                  <CardHeader>
                    <CardTitle>Días Promedio en Inventario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricValue>{getCurrentInventoryData().avgDaysInStock} días</MetricValue>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <TrendIndicator positive={false}>
                        <MdTrendingDown />
                        -2.5
                      </TrendIndicator>
                      <MetricLabel>vs. período anterior</MetricLabel>
                    </div>
                  </CardContent>
                </AnalyticsCard>

                {/* Productos Bajo Mínimos */}
                <AnalyticsCard>
                  <CardHeader>
                    <CardTitle>Productos Bajo Mínimos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricValue>{getCurrentInventoryData().lowStockProducts}</MetricValue>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <TrendIndicator positive={false}>
                        <MdTrendingUp />
                        +12
                      </TrendIndicator>
                      <MetricLabel>vs. período anterior</MetricLabel>
                    </div>
                  </CardContent>
                </AnalyticsCard>
              </AnalyticsGrid>

              {/* Segunda fila de métricas */}
              <AnalyticsGrid>
                <AnalyticsCard>
                  <CardHeader>
                    <CardTitle>Precisión de Inventario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricValue>{getCurrentInventoryData().stockAccuracy}%</MetricValue>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <TrendIndicator positive>
                        <MdTrendingUp />
                        +0.8%
                      </TrendIndicator>
                      <MetricLabel>vs. período anterior</MetricLabel>
                    </div>
                  </CardContent>
                </AnalyticsCard>

                <AnalyticsCard>
                  <CardHeader>
                    <CardTitle>Precisión de Pronóstico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricValue>{getCurrentInventoryData().forecastAccuracy}%</MetricValue>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <TrendIndicator positive>
                        <MdTrendingUp />
                        +2.3%
                      </TrendIndicator>
                      <MetricLabel>vs. período anterior</MetricLabel>
                    </div>
                  </CardContent>
                </AnalyticsCard>

                <AnalyticsCard>
                  <CardHeader>
                    <CardTitle>Tasa de Cumplimiento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricValue>{getCurrentInventoryData().orderFulfillment}%</MetricValue>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <TrendIndicator positive>
                        <MdTrendingUp />
                        +1.5%
                      </TrendIndicator>
                      <MetricLabel>vs. período anterior</MetricLabel>
                    </div>
                  </CardContent>
                </AnalyticsCard>

                <AnalyticsCard>
                  <CardHeader>
                    <CardTitle>Costo de Mantenimiento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricValue>${getCurrentInventoryData().carryCost.toLocaleString()}</MetricValue>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <TrendIndicator positive={false}>
                        <MdTrendingUp />
                        +3.1%
                      </TrendIndicator>
                      <MetricLabel>vs. período anterior</MetricLabel>
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

              {/* Métricas por categoría */}
              <AnalyticsCard>
                <CardHeader>
                  <CardTitle>Métricas por Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderCategoryMetrics()}
                </CardContent>
              </AnalyticsCard>
            </>
          ) : (
            renderLocationInventoryMetrics()
          )}
        </ContentArea>
      </Container>
    </UI5ThemeProvider>
  );
}