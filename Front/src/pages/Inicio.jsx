import React, { useContext } from "react";
import { ThemeContext } from "../App";
import UI5ThemeProvider from "../components/UI5ThemeProvider";
import {
  Container,
  PageHeader,
  PageTitle,
  MainContent,
  MetricsGrid,
  MetricCard,
  MetricValue,
  MetricTitle,
  SectionTitle,
  RecentOrdersTable,
  LocationsGrid,
  LocationCard,
  LocationName,
  LocationAddress,
  ProductsGrid,
  ProductCard,
  ProductName,
  ProductImage,
  ProductInfo,
  ProductAmount,
  InventoryBar,
  InventoryLabel,
  OrderRow,
  ThemeToggle
} from "../styles/Inicio/inicioStyle";
import { MdOutlineShoppingCart, MdStorefront, MdInventory, MdAttachMoney, MdShoppingBag, MdTrendingUp } from 'react-icons/md';

// Icons for theme toggle
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

// Sample data for recent orders
const recentOrders = [
  {
    id: "OC-2025-001",
    date: "15/02/2025",
    product: "Zapatillas Deportivas Premium",
    quantity: 50,
    status: "pendiente",
    total: 6000
  },
  {
    id: "OC-2025-002",
    date: "14/02/2025",
    product: "Mocasines Elegance",
    quantity: 30,
    status: "en_proceso",
    total: 4500
  },
  {
    id: "OC-2025-003",
    date: "13/02/2025",
    product: "Botas de Cuero Importadas",
    quantity: 25,
    status: "en_transito",
    total: 5250
  },
  {
    id: "OC-2025-004",
    date: "12/02/2025",
    product: "Zapatos Formales Modelo Ejecutivo",
    quantity: 40,
    status: "pendiente",
    total: 7200
  }
];

// Sample data for top selling products
const topProducts = [
  {
    id: 1,
    name: "Zapatillas Deportivas",
    sold: 120,
    inventory: 80,
    image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    name: "Zapatos de Vestir",
    sold: 85,
    inventory: 60,
    image: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "Botines de Cuero",
    sold: 95,
    inventory: 50,
    image: "https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 4,
    name: "Sandalias de Playa",
    sold: 75,
    inventory: 120,
    image: "https://images.pexels.com/photos/6046183/pexels-photo-6046183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

// Sample data for store locations
const locations = [
  { 
    id: 1, 
    name: "Super Shoes - Tienda Principal", 
    address: "Plaza Comercial Reforma, Local 42B, CDMX",
    sales: 48500
  },
  { 
    id: 2, 
    name: "Super Shoes - Polanco", 
    address: "Av. Presidente Masaryk 228, Polanco, CDMX",
    sales: 35200
  },
  { 
    id: 3, 
    name: "Super Shoes - Santa Fe", 
    address: "Centro Comercial Santa Fe, Nivel 2, Local 257",
    sales: 42800
  },
  { 
    id: 4, 
    name: "Super Shoes - Outlet Perisur", 
    address: "Centro Comercial Perisur, Planta Baja, Local A15",
    sales: 29600
  }
];

// Sample data for seasonal trends
const seasonalTrends = [
  {
    id: 1,
    category: "Calzado Deportivo",
    growth: 28,
    popularity: 95,
    seasonColor: "#4caf50", // Green
    icon: "🏃‍♂️",
    description: "Tendencia al alza para actividades fitness"
  },
  {
    id: 2,
    category: "Calzado Casual",
    growth: 15,
    popularity: 88,
    seasonColor: "#2196f3", // Blue
    icon: "👟",
    description: "Estilos urbanos para el día a día"
  },
  {
    id: 3,
    category: "Calzado Formal",
    growth: 5,
    popularity: 75,
    seasonColor: "#673ab7", // Purple
    icon: "👞",
    description: "Diseños clásicos y elegantes"
  },
  {
    id: 4,
    category: "Calzado para Playa",
    growth: 42,
    popularity: 90,
    seasonColor: "#ff9800", // Orange
    icon: "🩴",
    description: "En alta demanda para la temporada"
  }
];

// Sample data for inventory categories
const inventoryCategories = [
  {
    id: 1,
    name: "Calzado Deportivo",
    total: 845,
    inStock: 720,
    lowStock: 65,
    outOfStock: 60,
    color: "#4caf50" // Green
  },
  {
    id: 2,
    name: "Calzado Casual",
    total: 680,
    inStock: 532,
    lowStock: 108,
    outOfStock: 40,
    color: "#2196f3" // Blue
  },
  {
    id: 3,
    name: "Calzado Formal",
    total: 520,
    inStock: 395,
    lowStock: 90,
    outOfStock: 35,
    color: "#673ab7" // Purple
  },
  {
    id: 4,
    name: "Calzado para Playa",
    total: 405,
    inStock: 360,
    lowStock: 30,
    outOfStock: 15,
    color: "#ff9800" // Orange
  }
];

// Helper function to get status color
const getStatusColor = (status) => {
  switch(status) {
    case 'pendiente': return 'warning';
    case 'en_proceso': return 'info';
    case 'en_transito': return 'info';
    case 'completada': return 'success';
    default: return '';
  }
};

// Helper function to format status
const formatStatus = (status) => {
  switch(status) {
    case 'pendiente': return 'Pendiente';
    case 'en_proceso': return 'En proceso';
    case 'en_transito': return 'En tránsito';
    case 'completada': return 'Completada';
    default: return status;
  }
};

export function Inicio() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

  return (
    <UI5ThemeProvider>
      <Container>
        <PageHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MdStorefront size={28} />
            <PageTitle>Dashboard Super Shoes</PageTitle>
          </div>
          <div>
            <ThemeToggle onClick={toggleTheme} title={isDarkTheme ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}>
              {isDarkTheme ? <SunIcon /> : <MoonIcon />}
            </ThemeToggle>
          </div>
        </PageHeader>

        <MainContent>
          {/* Key Metrics */}
          <MetricsGrid>
            <MetricCard>
              <MdOutlineShoppingCart size={28} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
              <div>
                <MetricValue>135</MetricValue>
                <MetricTitle>Órdenes Pendientes</MetricTitle>
              </div>
            </MetricCard>
            <MetricCard>
              <MdAttachMoney size={28} color={isDarkTheme ? "#5CDB95" : "#2e7d32"} />
              <div>
                <MetricValue>$156,420</MetricValue>
                <MetricTitle>Ventas del Mes</MetricTitle>
              </div>
            </MetricCard>
            <MetricCard>
              <MdInventory size={28} color={isDarkTheme ? "#FFD166" : "#ed6c02"} />
              <div>
                <MetricValue>2,450</MetricValue>
                <MetricTitle>Productos en Inventario</MetricTitle>
              </div>
            </MetricCard>
            <MetricCard>
              <MdTrendingUp size={28} color={isDarkTheme ? "#FF6B6B" : "#d32f2f"} />
              <div>
                <MetricValue>+12.5%</MetricValue>
                <MetricTitle>Crecimiento en Ventas</MetricTitle>
              </div>
            </MetricCard>
          </MetricsGrid>

          {/* Recent Orders and Sales by Store */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <SectionTitle>Órdenes Recientes</SectionTitle>
              <RecentOrdersTable>
                <thead>
                  <tr>
                    <th>Orden #</th>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <OrderRow key={order.id} status={getStatusColor(order.status)}>
                      <td>{order.id}</td>
                      <td>{order.date}</td>
                      <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {order.product}
                      </td>
                      <td>{order.quantity}</td>
                      <td className="status">{formatStatus(order.status)}</td>
                      <td>${order.total.toLocaleString()}</td>
                    </OrderRow>
                  ))}
                </tbody>
              </RecentOrdersTable>
            </div>

            <div>
              <SectionTitle>Ventas por Tienda</SectionTitle>
              <div style={{
                backgroundColor: 'var(--sapTile_Background, #fff)',
                borderRadius: '0.25rem',
                padding: '1.25rem',
                boxShadow: 'var(--sapContent_Shadow0, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1))',
                height: 'calc(100% - 2.5rem)'
              }}>
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  gap: '12px'
                }}>
                  {locations.map(location => (
                    <div key={location.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {location.name.replace('Super Shoes - ', '')}
                      </div>
                      <div style={{
                        height: '28px',
                        background: isDarkTheme ? '#0A6ED1' : '#0854a0',
                        width: `${(location.sales / 50000) * 100}%`, 
                        minWidth: '40px',
                        maxWidth: 'calc(100% - 130px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}>
                        ${location.sales.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Replace Seasonal Trends with Inventory by Category */}
          <SectionTitle>Inventario por Categoría</SectionTitle>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {inventoryCategories.map(category => (
              <div key={category.id} style={{ 
                backgroundColor: 'var(--sapTile_Background, #fff)',
                borderRadius: '0.25rem',
                padding: '1.25rem',
                boxShadow: 'var(--sapContent_Shadow0, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1))',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ 
                    margin: '0',
                    fontSize: '1.125rem', 
                    fontWeight: 600,
                    color: 'var(--sapTitleColor, #32363a)'
                  }}>
                    {category.name}
                  </h3>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: category.color
                  }}></div>
                </div>
                
                {/* Circular visualization of stock status */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0.5rem 0 1rem'
                }}>
                  <div style={{
                    position: 'relative',
                    width: '120px',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: `conic-gradient(
                      ${category.color} 0%,
                      ${category.color} ${(category.inStock / category.total) * 100}%,
                      #ffab40 ${(category.inStock / category.total) * 100}%,
                      #ffab40 ${((category.inStock + category.lowStock) / category.total) * 100}%,
                      #e57373 ${((category.inStock + category.lowStock) / category.total) * 100}%,
                      #e57373 100%
                    )`,
                    boxShadow: 'inset 0 0 0 10px var(--sapTile_Background, #fff)'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--sapTile_Background, #fff)',
                    }}>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '600', 
                        lineHeight: '1',
                        color: 'var(--sapTitleColor, #32363a)'
                      }}>
                        {category.total}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: 'var(--sapContent_LabelColor, #6a6d70)',
                        marginTop: '0.25rem'
                      }}>
                        unidades
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status indicators */}
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        backgroundColor: category.color,
                        marginRight: '0.5rem'
                      }}></div>
                      <span style={{ fontSize: '0.875rem' }}>En stock</span>
                    </div>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '600',
                      color: 'var(--sapTitleColor, #32363a)'
                    }}>
                      {category.inStock}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        backgroundColor: '#ffab40',
                        marginRight: '0.5rem'
                      }}></div>
                      <span style={{ fontSize: '0.875rem' }}>Stock bajo</span>
                    </div>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '600',
                      color: 'var(--sapTitleColor, #32363a)'
                    }}>
                      {category.lowStock}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        backgroundColor: '#e57373',
                        marginRight: '0.5rem'
                      }}></div>
                      <span style={{ fontSize: '0.875rem' }}>Sin stock</span>
                    </div>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '600',
                      color: 'var(--sapTitleColor, #32363a)'
                    }}>
                      {category.outOfStock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Store Locations */}
          <SectionTitle>Nuestras Tiendas</SectionTitle>
          <LocationsGrid>
            {locations.map(location => (
              <LocationCard key={location.id}>
                <MdStorefront size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
                <div>
                  <LocationName>{location.name}</LocationName>
                  <LocationAddress>{location.address}</LocationAddress>
                </div>
              </LocationCard>
            ))}
          </LocationsGrid>
        </MainContent>
      </Container>
    </UI5ThemeProvider>
  );
}