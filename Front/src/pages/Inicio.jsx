import React, { useContext, useState } from "react";
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
  OrderRow
} from "../styles/Inicio/inicioStyle";
import { MdOutlineShoppingCart, MdStorefront, MdInventory, MdAttachMoney, MdShoppingBag, MdTrendingUp } from 'react-icons/md';

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
    seasonColor: "#4caf50",
    icon: "🏃‍♂️",
    description: "Tendencia al alza para actividades fitness"
  },
  {
    id: 2,
    category: "Calzado Casual",
    growth: 15,
    popularity: 88,
    seasonColor: "#2196f3",
    icon: "👟",
    description: "Estilos urbanos para el día a día"
  },
  {
    id: 3,
    category: "Calzado Formal",
    growth: 5,
    popularity: 75,
    seasonColor: "#673ab7",
    icon: "👞",
    description: "Diseños clásicos y elegantes"
  },
  {
    id: 4,
    category: "Calzado para Playa",
    growth: 42,
    popularity: 90,
    seasonColor: "#ff9800",
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
    color: "#4caf50"
  },
  {
    id: 2,
    name: "Calzado Casual",
    total: 680,
    inStock: 532,
    lowStock: 108,
    outOfStock: 40,
    color: "#2196f3"
  },
  {
    id: 3,
    name: "Calzado Formal",
    total: 520,
    inStock: 395,
    lowStock: 90,
    outOfStock: 35,
    color: "#673ab7"
  },
  {
    id: 4,
    name: "Calzado para Playa",
    total: 405,
    inStock: 360,
    lowStock: 30,
    outOfStock: 15,
    color: "#ff9800"
  }
];

// Sample data for stores with category sales
const stores = [
  { 
    id: 1, 
    name: "Tienda Principal",
    address: "Plaza Comercial Reforma, Local 42B, CDMX",
    metrics: {
      pendingOrders: 45,
      monthSales: 48500,
      inventory: 850,
      growth: 15.2
    },
    categorySales: [
      { name: "Calzado Deportivo", sales: 18500, percentage: 38 },
      { name: "Calzado Casual", sales: 12000, percentage: 25 },
      { name: "Calzado Formal", sales: 10500, percentage: 22 },
      { name: "Calzado para Playa", sales: 7500, percentage: 15 }
    ],
    topProducts: [
      {
        name: "Nike Air Max 2024",
        sold: 145,
        stock: 80,
        price: 2499,
        image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        name: "Adidas Ultraboost",
        sold: 128,
        stock: 65,
        price: 2899,
        image: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        name: "Puma RS-X",
        sold: 112,
        stock: 45,
        price: 1999,
        image: "https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ]
  },
  { 
    id: 2, 
    name: "Sucursal Polanco",
    address: "Av. Presidente Masaryk 228, Polanco, CDMX",
    metrics: {
      pendingOrders: 32,
      monthSales: 35200,
      inventory: 620,
      growth: 8.5
    },
    categorySales: [
      { name: "Calzado Deportivo", sales: 8800, percentage: 25 },
      { name: "Calzado Casual", sales: 14080, percentage: 40 },
      { name: "Calzado Formal", sales: 9856, percentage: 28 },
      { name: "Calzado para Playa", sales: 2464, percentage: 7 }
    ],
    topProducts: [
      {
        name: "Mocasines Italian",
        sold: 98,
        stock: 45,
        price: 3499,
        image: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        name: "Oxford Classic",
        sold: 85,
        stock: 30,
        price: 2999,
        image: "https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        name: "Loafers Premium",
        sold: 76,
        stock: 25,
        price: 2699,
        image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ]
  },
  { 
    id: 3, 
    name: "Sucursal Santa Fe",
    address: "Centro Comercial Santa Fe, Nivel 2, Local 257",
    metrics: {
      pendingOrders: 38,
      monthSales: 42800,
      inventory: 580,
      growth: 12.8
    },
    categorySales: [
      { name: "Calzado Deportivo", sales: 15408, percentage: 36 },
      { name: "Calzado Casual", sales: 11096, percentage: 26 },
      { name: "Calzado Formal", sales: 8560, percentage: 20 },
      { name: "Calzado para Playa", sales: 7736, percentage: 18 }
    ],
    topProducts: [
      {
        name: "Nike Zoom Elite",
        sold: 132,
        stock: 55,
        price: 2799,
        image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        name: "Adidas Runner Pro",
        sold: 118,
        stock: 28,
        price: 2599,
        image: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        name: "Skechers Memory Foam",
        sold: 95,
        stock: 42,
        price: 1899,
        image: "https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ]
  },
  { 
    id: 4, 
    name: "Outlet Perisur",
    address: "Centro Comercial Perisur, Planta Baja, Local A15",
    metrics: {
      pendingOrders: 20,
      monthSales: 29600,
      inventory: 400,
      growth: 5.5
    },
    categorySales: [
      { name: "Calzado Deportivo", sales: 11840, percentage: 40 },
      { name: "Calzado Casual", sales: 8880, percentage: 30 },
      { name: "Calzado Formal", sales: 5920, percentage: 20 },
      { name: "Calzado para Playa", sales: 2960, percentage: 10 }
    ],
    topProducts: [
      {
        name: "Nike Revolution",
        sold: 108,
        stock: 35,
        price: 1699,
        image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        name: "Puma Softride",
        sold: 92,
        stock: 18,
        price: 1499,
        image: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        name: "Adidas Advantage",
        sold: 85,
        stock: 12,
        price: 1299,
        image: "https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ]
  }
];

// Órdenes recientes específicas para cada tienda
const storeOrders = {
  1: [ // Tienda Principal
    {
      id: "OC-2025-001",
      date: "15/02/2025",
      product: "Nike Air Max 2024",
      quantity: 50,
      status: "pendiente",
      total: 6000
    },
    {
      id: "OC-2025-002",
      date: "14/02/2025",
      product: "Adidas Ultraboost",
      quantity: 30,
      status: "en_proceso",
      total: 4500
    },
    {
      id: "OC-2025-003",
      date: "13/02/2025",
      product: "Puma RS-X",
      quantity: 25,
      status: "completada",
      total: 5250
    },
    {
      id: "OC-2025-004",
      date: "12/02/2025",
      product: "Nike Zoom Elite",
      quantity: 40,
      status: "en_transito",
      total: 7200
    }
  ],
  2: [ // Sucursal Polanco
    {
      id: "OC-2025-101",
      date: "15/02/2025",
      product: "Mocasines Italian",
      quantity: 25,
      status: "pendiente",
      total: 8750
    },
    {
      id: "OC-2025-102",
      date: "14/02/2025",
      product: "Oxford Classic",
      quantity: 20,
      status: "en_proceso",
      total: 6000
    },
    {
      id: "OC-2025-103",
      date: "13/02/2025",
      product: "Loafers Premium",
      quantity: 15,
      status: "completada",
      total: 4050
    },
    {
      id: "OC-2025-104",
      date: "12/02/2025",
      product: "Zapatos Derby",
      quantity: 30,
      status: "en_transito",
      total: 8400
    }
  ],
  3: [ // Sucursal Santa Fe
    {
      id: "OC-2025-201",
      date: "15/02/2025",
      product: "Nike Zoom Elite",
      quantity: 35,
      status: "pendiente",
      total: 9800
    },
    {
      id: "OC-2025-202",
      date: "14/02/2025",
      product: "Adidas Runner Pro",
      quantity: 28,
      status: "en_proceso",
      total: 7280
    },
    {
      id: "OC-2025-203",
      date: "13/02/2025",
      product: "Skechers Memory Foam",
      quantity: 40,
      status: "completada",
      total: 7600
    },
    {
      id: "OC-2025-204",
      date: "12/02/2025",
      product: "Nike Revolution",
      quantity: 30,
      status: "en_transito",
      total: 5100
    }
  ],
  4: [ // Outlet Perisur
    {
      id: "OC-2025-301",
      date: "15/02/2025",
      product: "Nike Revolution",
      quantity: 45,
      status: "pendiente",
      total: 7650
    },
    {
      id: "OC-2025-302",
      date: "14/02/2025",
      product: "Puma Softride",
      quantity: 35,
      status: "en_proceso",
      total: 5250
    },
    {
      id: "OC-2025-303",
      date: "13/02/2025",
      product: "Adidas Advantage",
      quantity: 50,
      status: "completada",
      total: 6500
    },
    {
      id: "OC-2025-304",
      date: "12/02/2025",
      product: "Skechers Go Walk",
      quantity: 40,
      status: "en_transito",
      total: 5200
    }
  ]
};

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
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const [selectedStore] = useState(stores[0]);

  return (
    <UI5ThemeProvider>
      <Container>
        <PageHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MdStorefront size={28} />
            <PageTitle>Dashboard Super Shoes</PageTitle>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: 'var(--sapContent_LabelColor)',
            fontSize: '0.875rem'
          }}>
            <MdStorefront size={20} />
            <div>
              <div style={{ fontWeight: '500' }}>{selectedStore.name}</div>
              <div style={{ marginTop: '2px' }}>{selectedStore.address}</div>
            </div>
          </div>
        </PageHeader>

        <MainContent>
          <MetricsGrid>
            <MetricCard>
              <MdOutlineShoppingCart size={28} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
              <div>
                <MetricValue>{selectedStore.metrics.pendingOrders}</MetricValue>
                <MetricTitle>Órdenes Pendientes</MetricTitle>
              </div>
            </MetricCard>
            <MetricCard>
              <MdAttachMoney size={28} color={isDarkTheme ? "#5CDB95" : "#2e7d32"} />
              <div>
                <MetricValue>${selectedStore.metrics.monthSales.toLocaleString()}</MetricValue>
                <MetricTitle>Ventas del Mes</MetricTitle>
              </div>
            </MetricCard>
            <MetricCard>
              <MdInventory size={28} color={isDarkTheme ? "#FFD166" : "#ed6c02"} />
              <div>
                <MetricValue>{selectedStore.metrics.inventory}</MetricValue>
                <MetricTitle>Productos en Inventario</MetricTitle>
              </div>
            </MetricCard>
            <MetricCard>
              <MdTrendingUp size={28} color={isDarkTheme ? "#FF6B6B" : "#d32f2f"} />
              <div>
                <MetricValue>+{selectedStore.metrics.growth}%</MetricValue>
                <MetricTitle>Crecimiento en Ventas</MetricTitle>
              </div>
            </MetricCard>
          </MetricsGrid>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.5fr 1fr', 
            gap: '24px'
          }}>
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
                  {storeOrders[selectedStore.id].map(order => (
                    <OrderRow key={order.id} status={getStatusColor(order.status)}>
                      <td>{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.product}</td>
                      <td>{order.quantity}</td>
                      <td className="status">{formatStatus(order.status)}</td>
                      <td>${order.total.toLocaleString()}</td>
                    </OrderRow>
                  ))}
                </tbody>
              </RecentOrdersTable>
            </div>

            <div>
              <SectionTitle>Ventas por Categoría</SectionTitle>
              <div style={{
                backgroundColor: 'var(--sapTile_Background)',
                borderRadius: '0.5rem',
                padding: '1.25rem',
                boxShadow: 'var(--sapContent_Shadow0)',
                height: 'calc(100% - 3rem)'
              }}>
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {selectedStore.categorySales.map((category, index) => {
                    const colors = [
                      isDarkTheme ? '#0A6ED1' : '#0854a0',  // Azul
                      isDarkTheme ? '#5CDB95' : '#2e7d32',  // Verde
                      isDarkTheme ? '#FFB800' : '#ed6c02',  // Naranja
                      isDarkTheme ? '#FF6B6B' : '#d32f2f'   // Rojo
                    ];
                    
                    return (
                      <div key={category.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.875rem',
                          color: 'var(--sapContent_LabelColor)'
                        }}>
                          <span>{category.name}</span>
                          <span style={{ fontWeight: '500' }}>${category.sales.toLocaleString()}</span>
                      </div>
                      <div style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: 'var(--sapContent_ForegroundBorderColor)',
                        borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${category.percentage}%`,
                            height: '100%',
                            backgroundColor: colors[index],
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: 'var(--sapContent_LabelColor)',
                          textAlign: 'right'
                        }}>
                          {category.percentage}% del total
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div style={{ marginTop: '24px' }}>
            <SectionTitle>Productos Más Vendidos</SectionTitle>
          <div style={{ 
              backgroundColor: 'var(--sapTile_Background)',
              borderRadius: '0.5rem',
              padding: '1.25rem',
              boxShadow: 'var(--sapContent_Shadow0)'
            }}>
              <div style={{
                backgroundColor: 'var(--sapList_Background)',
                borderRadius: '8px',
                border: '1px solid var(--sapContent_ForegroundBorderColor)',
                overflow: 'hidden'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{
                      backgroundColor: 'var(--sapList_HeaderBackground)',
                      borderBottom: '1px solid var(--sapContent_ForegroundBorderColor)'
                    }}>
                      <th style={{ padding: '16px', textAlign: 'left', width: '60px' }}></th>
                      <th style={{ padding: '16px', textAlign: 'left' }}>Producto</th>
                      <th style={{ padding: '16px', textAlign: 'center' }}>Precio</th>
                      <th style={{ padding: '16px', textAlign: 'center' }}>Vendidos</th>
                      <th style={{ padding: '16px', textAlign: 'center' }}>Stock</th>
                      <th style={{ padding: '16px', textAlign: 'center' }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStore.topProducts.map((product, index) => {
                      let stockStatus;
                      let stockColor;
                      
                      if (product.stock >= 50) {
                        stockStatus = 'Stock Alto';
                        stockColor = '#5CDB95'; // verde
                      } else if (product.stock >= 30) {
                        stockStatus = 'Stock Normal';
                        stockColor = '#0A6ED1'; // azul
                      } else if (product.stock >= 15) {
                        stockStatus = 'Stock Bajo';
                        stockColor = '#FFB800'; // amarillo
                      } else {
                        stockStatus = 'Stock Crítico';
                        stockColor = '#FF6B6B'; // rojo
                      }
                      
                      return (
                        <tr key={product.name} style={{
                          backgroundColor: index % 2 === 0 ? 
                            'var(--sapList_Background)' : 
                            'var(--sapList_AlternatingBackground)',
                          borderBottom: '1px solid var(--sapContent_ForegroundBorderColor)'
                        }}>
                          <td style={{ padding: '16px' }}>
                            <img 
                              src={product.image} 
                              alt={product.name}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                borderRadius: '4px'
                              }}
                            />
                          </td>
                          <td style={{ 
                            padding: '16px',
                            fontWeight: '500'
                          }}>
                            {product.name}
                          </td>
                          <td style={{ 
                            padding: '16px',
                            textAlign: 'center',
                            color: isDarkTheme ? '#5CDB95' : '#2e7d32',
                            fontWeight: '500'
                          }}>
                            ${product.price.toLocaleString()}
                          </td>
                          <td style={{ 
                            padding: '16px',
                            textAlign: 'center'
                          }}>
                            <div style={{ fontWeight: '500' }}>{product.sold}</div>
                      <div style={{ 
                        fontSize: '0.75rem',
                              color: 'var(--sapContent_LabelColor)',
                              marginTop: '2px'
                      }}>
                        unidades
                      </div>
                          </td>
                          <td style={{ 
                            padding: '16px',
                            textAlign: 'center'
                          }}>
                            <div style={{ fontWeight: '500' }}>{product.stock}</div>
                      <div style={{ 
                              fontSize: '0.75rem',
                              color: 'var(--sapContent_LabelColor)',
                              marginTop: '2px'
                            }}>
                              disponibles
                  </div>
                          </td>
                          <td style={{ 
                            padding: '16px',
                            textAlign: 'center'
                          }}>
                      <div style={{ 
                              display: 'inline-block',
                              padding: '4px 12px',
                              borderRadius: '12px',
                              backgroundColor: `${stockColor}20`,
                              color: stockColor,
                              fontWeight: '500',
                              fontSize: '0.875rem'
                            }}>
                              {stockStatus}
                  </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </MainContent>
      </Container>
    </UI5ThemeProvider>
  );
}