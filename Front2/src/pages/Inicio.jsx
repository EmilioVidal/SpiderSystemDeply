import React, { useState, useEffect } from "react";
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
  Icon
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import { styles } from "../Styles/InicioStyle";

const Inicio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const kpiCards = [
    {
      title: "Órdenes Pendientes",
      value: "45",
      subtitle: "Órdenes Pendientes",
      icon: "cart",
      state: "Warning",
      trend: "+12% vs mes anterior"
    },
    {
      title: "Ventas del Mes",
      value: "$48,500",
      subtitle: "Ventas del Mes",
      icon: "sales-order",
      state: "Success",
      trend: "+15.2% vs mes anterior"
    },
    {
      title: "Productos en Inventario",
      value: "850",
      subtitle: "Productos en Inventario",
      icon: "product",
      state: "Information",
      trend: "-3% vs mes anterior"
    },
    {
      title: "Crecimiento en Ventas",
      value: "+15.2%",
      subtitle: "vs Mes Anterior",
      icon: "trend-up",
      state: "Success",
      trend: "+2.3% vs mes anterior"
    }
  ];

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
          titleText="Cargando Dashboard"
          subtitleText="Por favor espere..."
        />
      </FlexBox>
    );
  }

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
            name="retail-store" 
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
            Dashboard Super Shoes
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
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%"
      }}>
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
                <Text style={styles.kpiValue}>{card.value}</Text>
                <Text style={styles.kpiLabel}>{card.subtitle}</Text>
              </div>
            ))}
          </div>

          <Card
            style={styles.ordersCard}
            header={
              <CardHeader
                titleText="Órdenes Recientes"
                subtitleText="Últimas órdenes registradas"
                avatar={<Icon name="sales-order" />}
              />
            }
          >
            <AnalyticalTable
              data={[
                {
                  id: "OC-2025-001",
                  fecha: "15/02/2025",
                  producto: "Nike Air Max 2024",
                  cantidad: 50,
                  estado: "Pendiente",
                  total: "$6,000"
                },
                {
                  id: "OC-2025-002",
                  fecha: "14/02/2025",
                  producto: "Adidas Ultraboost",
                  cantidad: 30,
                  estado: "En proceso",
                  total: "$4,500"
                },
                {
                  id: "OC-2025-003",
                  fecha: "13/02/2025",
                  producto: "Puma RS-X",
                  cantidad: 25,
                  estado: "Completada",
                  total: "$5,250"
                },
                {
                  id: "OC-2025-004",
                  fecha: "12/02/2025",
                  producto: "Nike Zoom Elite",
                  cantidad: 40,
                  estado: "En tránsito",
                  total: "$7,200"
                }
              ]}
              columns={[
                {
                  Header: "Orden #",
                  accessor: "id",
                  width: 120
                },
                {
                  Header: "Fecha",
                  accessor: "fecha",
                  width: 100
                },
                {
                  Header: "Producto",
                  accessor: "producto"
                },
                {
                  Header: "Cantidad",
                  accessor: "cantidad",
                  width: 100
                },
                {
                  Header: "Estado",
                  accessor: "estado",
                  Cell: ({ value }) => {
                    const getStatusStyle = (status) => {
                      switch (status) {
                        case "Pendiente":
                          return styles.pendiente;
                        case "En proceso":
                          return styles.enProceso;
                        case "Completada":
                          return styles.completada;
                        case "En tránsito":
                          return styles.enTransito;
                        default:
                          return {};
                      }
                    };
                    return (
                      <span style={{ ...styles.statusBadge, ...getStatusStyle(value) }}>
                        {value}
                      </span>
                    );
                  }
                },
                {
                  Header: "Total",
                  accessor: "total"
                }
              ]}
              visibleRows={4}
              minRows={4}
              alternateRowColor
              scaleWidthMode="Smart"
              selectionMode="None"
            />
          </Card>

          <Card style={styles.categoryCard}>
            <CardHeader
              titleText="Ventas por Categoría"
              subtitleText="Distribución actual"
              avatar={<Icon name="pie-chart" />}
            />
            {[
              { categoria: "Calzado Deportivo", valor: 18500, porcentaje: 38 },
              { categoria: "Calzado Casual", valor: 12000, porcentaje: 25 },
              { categoria: "Calzado Formal", valor: 10500, porcentaje: 22 },
              { categoria: "Calzado para Playa", valor: 7500, porcentaje: 15 }
            ].map((categoria, index) => (
              <div key={index} style={styles.categoryItem}>
                <FlexBox style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{categoria.categoria}</Text>
                  <Text style={styles.categoryValue}>
                    ${categoria.valor.toLocaleString()}
                  </Text>
                </FlexBox>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${categoria.porcentaje}%`,
                      backgroundColor: `var(--sapIndicationColor_${
                        index === 0 ? "1" : index === 1 ? "2" : index === 2 ? "3" : "4"
                      })`
                    }}
                  />
                </div>
                <Text style={styles.progressLabel}>{categoria.porcentaje}% del total</Text>
              </div>
            ))}
          </Card>

          <Title level="H4" style={styles.productsHeader}>Productos Más Vendidos</Title>
          <div style={styles.productsGrid}>
            {[
              {
                nombre: "Nike Air Max 2024",
                precio: "$2,499",
                vendidos: 145,
                stock: 80,
                estado: "Stock Alto",
                imagen: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              },
              {
                nombre: "Adidas Ultraboost",
                precio: "$2,899",
                vendidos: 128,
                stock: 65,
                estado: "Stock Alto",
                imagen: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              },
              {
                nombre: "Puma RS-X",
                precio: "$1,999",
                vendidos: 112,
                stock: 45,
                estado: "Stock Normal",
                imagen: "https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
            ].map((producto, index) => (
              <Card key={index} style={styles.productCard}>
                <div style={styles.productImageContainer}>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={styles.productImage}
                  />
                </div>
                <div style={styles.productInfo}>
                  <div style={styles.productHeader}>
                    <div>
                      <Text style={styles.productName}>{producto.nombre}</Text>
                      <Text style={styles.productPrice}>{producto.precio}</Text>
                    </div>
                  </div>
                  <div style={styles.productMetrics}>
                    <div style={styles.metricRow}>
                      <Text style={styles.metricLabel}>Vendidos</Text>
                      <Text style={styles.metricValue}>{producto.vendidos} unidades</Text>
                    </div>
                    <div style={styles.metricRow}>
                      <Text style={styles.metricLabel}>Disponibles</Text>
                      <Text style={styles.metricValue}>{producto.stock} unidades</Text>
                    </div>
                    <div style={styles.stockIndicator}>
                      <div 
                        style={{
                          ...styles.stockDot,
                          backgroundColor: producto.estado === "Stock Alto" 
                            ? "var(--sapIndicationColor_1)"
                            : "var(--sapIndicationColor_2)"
                        }}
                      />
                      <Text style={styles.stockText}>{producto.estado}</Text>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio; 