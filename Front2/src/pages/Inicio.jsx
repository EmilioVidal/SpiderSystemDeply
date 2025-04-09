import React, { useState, useEffect } from "react";
import {
  DynamicPageHeader,
  DynamicPageTitle,
  FlexBox,
  FlexBoxDirection,
  FlexBoxAlignItems,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Title,
  Text,
  Card,
  CardHeader,
  ObjectStatus,
  AnalyticalTable,
  Grid,
  IllustratedMessage,
  IllustrationMessageType,
  Icon,
  ValueState,
  ProgressIndicator,
  Bar,
  Avatar
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import { spacing } from "@ui5/webcomponents-react-base";

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
      trend: "up",
      trendValue: "+12%"
    },
    {
      title: "Ventas del Mes",
      value: "$48,500",
      subtitle: "Ventas del Mes",
      icon: "sales-order",
      state: "Success",
      trend: "up",
      trendValue: "+15.2%"
    },
    {
      title: "Productos en Inventario",
      value: "850",
      subtitle: "Productos en Inventario",
      icon: "product",
      state: "Information",
      trend: "down",
      trendValue: "-3%"
    },
    {
      title: "Crecimiento en Ventas",
      value: "+15.2%",
      subtitle: "vs Mes Anterior",
      icon: "trend-up",
      state: "Success",
      trend: "up",
      trendValue: "+2.3%"
    }
  ];

  const recentOrders = [
    {
      id: "OC-2025-001",
      fecha: "15/02/2025",
      producto: "Nike Air Max 2024",
      cantidad: 50,
      estado: "Pendiente",
      total: 6000
    },
    {
      id: "OC-2025-002",
      fecha: "14/02/2025",
      producto: "Adidas Ultraboost",
      cantidad: 30,
      estado: "En proceso",
      total: 4500
    },
    {
      id: "OC-2025-003",
      fecha: "13/02/2025",
      producto: "Puma RS-X",
      cantidad: 25,
      estado: "Completada",
      total: 5250
    },
    {
      id: "OC-2025-004",
      fecha: "12/02/2025",
      producto: "Nike Zoom Elite",
      cantidad: 40,
      estado: "En tránsito",
      total: 7200
    }
  ];

  const ventasPorCategoria = [
    { categoria: "Calzado Deportivo", valor: 18500, porcentaje: 38 },
    { categoria: "Calzado Casual", valor: 12000, porcentaje: 25 },
    { categoria: "Calzado Formal", valor: 10500, porcentaje: 22 },
    { categoria: "Calzado para Playa", valor: 7500, porcentaje: 15 }
  ];

  const productosDestacados = [
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
  ];

  if (isLoading) {
    return (
      <FlexBox
        direction={FlexBoxDirection.Column}
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
        style={{ height: "100vh" }}
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
    <div className="dashboard-container" style={{ padding: "1rem" }}>
      <DynamicPageTitle
        header={
          <Title
            level="H1"
            style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}
          >
            Dashboard Super Shoes
          </Title>
        }
        subHeader={
          <FlexBox
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
            alignItems={FlexBoxAlignItems.Center}
            style={{ width: "100%" }}
          >
            <Text>Tienda Principal</Text>
            <Text>Plaza Comercial Reforma, Local 42B, CDMX</Text>
          </FlexBox>
        }
      />

      {/* KPI Cards */}
      <Grid defaultSpan="XL3 L3 M6 S12" style={{ marginBottom: "1rem" }}>
        {kpiCards.map((card, index) => (
          <Card
            key={index}
            style={{
              ...spacing.sapUiContentPadding,
              height: "100%"
            }}
          >
            <FlexBox
              direction={FlexBoxDirection.Column}
              style={{ height: "100%" }}
            >
              <FlexBox
                justifyContent={FlexBoxJustifyContent.SpaceBetween}
                alignItems={FlexBoxAlignItems.Center}
                style={{ marginBottom: "1rem" }}
              >
                <Icon
                  name={card.icon}
                  style={{
                    width: "2rem",
                    height: "2rem",
                    color: `var(--sapIndicationColor_${card.state})`
                  }}
                />
                <ObjectStatus state={card.state}>{card.trend}</ObjectStatus>
              </FlexBox>
              <Title level="H2" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {card.value}
              </Title>
              <Text style={{ color: "var(--sapContent_LabelColor)" }}>
                {card.subtitle}
              </Text>
              <Text
                style={{
                  color: `var(--sapIndicationColor_${card.state})`,
                  marginTop: "0.5rem"
                }}
              >
                {card.trendValue} vs mes anterior
              </Text>
            </FlexBox>
          </Card>
        ))}
      </Grid>

      {/* Recent Orders */}
      <Card
        header={
          <CardHeader
            titleText="Órdenes Recientes"
            subtitleText="Últimas órdenes registradas"
            avatar={<Icon name="sales-order" />}
            style={{ padding: "1rem" }}
          />
        }
        style={{ marginBottom: "1rem" }}
      >
        <AnalyticalTable
          data={recentOrders}
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
                let state = "None";
                switch (value) {
                  case "Pendiente":
                    state = "Warning";
                    break;
                  case "En proceso":
                    state = "Information";
                    break;
                  case "Completada":
                    state = "Success";
                    break;
                  case "En tránsito":
                    state = "Information";
                    break;
                  default:
                    state = "None";
                }
                return <ObjectStatus state={state}>{value}</ObjectStatus>;
              }
            },
            {
              Header: "Total",
              accessor: "total",
              Cell: ({ value }) => `$${value.toLocaleString()}`
            }
          ]}
          visibleRows={4}
          minRows={4}
          alternateRowColor
          scaleWidthMode="Smart"
          selectionMode="None"
        />
      </Card>

      {/* Ventas por Categoría */}
      <Card
        header={
          <CardHeader
            titleText="Ventas por Categoría"
            subtitleText="Distribución actual"
            avatar={<Icon name="pie-chart" />}
          />
        }
        style={{ marginBottom: "1rem" }}
      >
        <div style={{ padding: "1rem" }}>
          {ventasPorCategoria.map((categoria, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <FlexBox
                justifyContent={FlexBoxJustifyContent.SpaceBetween}
                alignItems={FlexBoxAlignItems.Center}
                style={{ marginBottom: "0.5rem" }}
              >
                <Text>{categoria.categoria}</Text>
                <Text>${categoria.valor.toLocaleString()}</Text>
              </FlexBox>
              <ProgressIndicator
                value={categoria.porcentaje}
                valueState={index === 0 ? "Success" : index === 1 ? "Information" : "None"}
                style={{ height: "0.5rem" }}
              />
              <Text style={{ fontSize: "0.875rem", color: "var(--sapContent_LabelColor)" }}>
                {categoria.porcentaje}% del total
              </Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Productos Más Vendidos */}
      <Card
        header={
          <CardHeader
            titleText="Productos Más Vendidos"
            subtitleText="Top productos del mes"
            avatar={<Icon name="product" />}
          />
        }
      >
        <Grid defaultSpan="XL4 L4 M6 S12" style={{ padding: "1rem" }}>
          {productosDestacados.map((producto, index) => (
            <Card
              key={index}
              style={{
                ...spacing.sapUiContentPadding,
                height: "100%"
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${producto.imagen})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem"
                }}
              />
              <Title level="H3" style={{ marginBottom: "0.5rem" }}>
                {producto.nombre}
              </Title>
              <FlexBox
                justifyContent={FlexBoxJustifyContent.SpaceBetween}
                style={{ marginBottom: "0.5rem" }}
              >
                <Text style={{ fontWeight: "bold" }}>{producto.precio}</Text>
                <ObjectStatus
                  state={producto.estado === "Stock Alto" ? "Success" : "Warning"}
                >
                  {producto.estado}
                </ObjectStatus>
              </FlexBox>
              <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                <Text>Vendidos: {producto.vendidos}</Text>
                <Text>Stock: {producto.stock}</Text>
              </FlexBox>
            </Card>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default Inicio; 