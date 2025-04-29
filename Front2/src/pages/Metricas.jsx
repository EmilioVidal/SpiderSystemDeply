import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Title, 
  Text, 
  FlexBox, 
  FlexBoxJustifyContent, 
  FlexBoxAlignItems, 
  FlexBoxDirection, 
  AnalyticalTable, 
  Button, 
  Icon, 
  Label, 
  ObjectStatus, 
  ValueState,
  Select,
  Option
} from '@ui5/webcomponents-react';
import { LineChart, BarChart, PieChart } from '@ui5/webcomponents-react-charts';
import { spacing } from '@ui5/webcomponents-react-base';
import { useNavigate } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/AllIcons.js";

const Metricas = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState("mesActual");
  const [vista, setVista] = useState("general");
  const [metrics, setMetrics] = useState({
    ventasTotales: {
      valor: 1254780,
      cambio: 8.5,
      modeloMasVendido: "Zapatillas Runner Pro"
    },
    ganancias: {
      valor: 376434,
      cambio: 12.3,
      margenPromedio: 30.0
    },
    clientesNuevos: {
      valor: 842,
      cambio: 5.5,
      tasaConversion: 4.8
    },
    ticketPromedio: {
      valor: 85.40,
      cambio: -2.1,
      productosPorVenta: 1.8
    },
    ventasPorCategoria: [
      {
        categoria: "Calzado Deportivo",
        porcentaje: "42%",
        valor: 425640,
        ranking: 1
      },
      {
        categoria: "Calzado Casual",
        porcentaje: "33%",
        valor: 338790,
        ranking: 2
      },
      {
        categoria: "Calzado Formal",
        porcentaje: "25%",
        valor: 287320,
        ranking: 3
      }
    ],
    distribucionVentas: {
      total: 14680,
      canales: [
        {
          nombre: "Tienda Física",
          ventas: 9102,
          valor: "MXN $778.0k"
        },
        {
          nombre: "Online",
          ventas: 4110,
          valor: "MXN $351.3k"
        },
        {
          nombre: "Mayoristas",
          ventas: 1468,
          valor: "MXN $125.5k"
        }
      ]
    }
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleExport = () => {
    console.log('Exportando métricas...');
  };

  const getValueStateFromChange = (change) => {
    if (change > 0) return ValueState.Success;
    if (change < 0) return ValueState.Error;
    return ValueState.None;
  };

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
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        backgroundColor: 'white',
        boxShadow: 'var(--sapContent_Shadow0)',
        borderRadius: '0.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <Icon 
            name="business-objects-experience" 
            style={{
              fontSize: '1.25rem',
              color: 'var(--sapContent_IconColor)'
            }}
          />
          <Title level="H1" style={{
            fontSize: '1.75rem',
            margin: 0,
            color: 'var(--sapTextColor)'
          }}>
            Métricas de Rendimiento
          </Title>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Icon 
            name="map" 
            style={{
              color: 'var(--sapContent_IconColor)',
              fontSize: '1rem'
            }}
          />
          <Text style={{
            color: 'var(--sapContent_LabelColor)',
            fontSize: '0.875rem'
          }}>
            Plaza Comercial Reforma, Local 42B, CDMX
          </Text>
        </div>
      </div>

      {/* Filtros */}
      <div style={{
        padding: "1rem",
        backgroundColor: "var(--sapList_Background)",
        borderRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        boxShadow: "var(--sapContent_Shadow0)"
      }}>
        <FlexBox alignItems={FlexBoxAlignItems.Center} gap="1rem">
          <Label>Período:</Label>
          <Select value={periodo} onChange={(e) => setPeriodo(e.detail.selectedOption.value)}>
            <Option value="mesActual">Mes Actual</Option>
            <Option value="mesAnterior">Mes Anterior</Option>
          </Select>
          <Label>Vista:</Label>
          <Select value={vista} onChange={(e) => setVista(e.detail.selectedOption.value)}>
            <Option value="general">General</Option>
            <Option value="detallada">Detallada</Option>
          </Select>
        </FlexBox>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Icon name="loading" />
          <Text>Cargando métricas...</Text>
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '1rem' 
          }}>
            {/* Ventas Totales */}
            <Card>
              <div style={{ padding: '1rem' }}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                  <Text>Ventas Totales</Text>
                  <Icon name="retail-store" />
                </FlexBox>
                <Title level="H2" style={{ margin: '0.5rem 0', fontSize: '1.75rem' }}>
                  ${metrics.ventasTotales.valor.toLocaleString()}
                </Title>
                <ObjectStatus 
                  state={getValueStateFromChange(metrics.ventasTotales.cambio)}
                  style={{ marginBottom: '0.5rem' }}
                >
                  {metrics.ventasTotales.cambio}% vs periodo anterior
                </ObjectStatus>
                <Text style={{ color: 'var(--sapContent_LabelColor)', fontSize: '0.875rem' }}>
                  Modelo más vendido: {metrics.ventasTotales.modeloMasVendido}
                </Text>
              </div>
            </Card>

            {/* Ganancias */}
            <Card>
              <div style={{ padding: '1rem' }}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                  <Text>Ganancias</Text>
                  <Icon name="money-bills" />
                </FlexBox>
                <Title level="H2" style={{ margin: '0.5rem 0', fontSize: '1.75rem' }}>
                  ${metrics.ganancias.valor.toLocaleString()}
                </Title>
                <ObjectStatus 
                  state={getValueStateFromChange(metrics.ganancias.cambio)}
                  style={{ marginBottom: '0.5rem' }}
                >
                  {metrics.ganancias.cambio}% vs periodo anterior
                </ObjectStatus>
                <Text style={{ color: 'var(--sapContent_LabelColor)', fontSize: '0.875rem' }}>
                  Margen promedio: {metrics.ganancias.margenPromedio}%
                </Text>
              </div>
            </Card>

            {/* Clientes Nuevos */}
            <Card>
              <div style={{ padding: '1rem' }}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                  <Text>Clientes Nuevos</Text>
                  <Icon name="customer" />
                </FlexBox>
                <Title level="H2" style={{ margin: '0.5rem 0', fontSize: '1.75rem' }}>
                  {metrics.clientesNuevos.valor}
                </Title>
                <ObjectStatus 
                  state={getValueStateFromChange(metrics.clientesNuevos.cambio)}
                  style={{ marginBottom: '0.5rem' }}
                >
                  {metrics.clientesNuevos.cambio}% vs periodo anterior
                </ObjectStatus>
                <Text style={{ color: 'var(--sapContent_LabelColor)', fontSize: '0.875rem' }}>
                  Tasa de conversión: {metrics.clientesNuevos.tasaConversion}%
                </Text>
              </div>
            </Card>

            {/* Ticket Promedio */}
            <Card>
              <div style={{ padding: '1rem' }}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                  <Text>Ticket Promedio</Text>
                  <Icon name="cart" />
                </FlexBox>
                <Title level="H2" style={{ margin: '0.5rem 0', fontSize: '1.75rem' }}>
                  ${metrics.ticketPromedio.valor}
                </Title>
                <ObjectStatus 
                  state={getValueStateFromChange(metrics.ticketPromedio.cambio)}
                  style={{ marginBottom: '0.5rem' }}
                >
                  {metrics.ticketPromedio.cambio}% vs periodo anterior
                </ObjectStatus>
                <Text style={{ color: 'var(--sapContent_LabelColor)', fontSize: '0.875rem' }}>
                  Productos por venta: {metrics.ticketPromedio.productosPorVenta}
                </Text>
              </div>
            </Card>
          </div>

          {/* Ventas por Categoría y Distribución */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr', 
            gap: '1rem' 
          }}>
            {/* Ventas por Categoría */}
            <Card>
              <div style={{ padding: '1rem' }}>
                <Title level="H2" style={{ marginBottom: '1rem' }}>Ventas por Categoría</Title>
                {metrics.ventasPorCategoria.map((categoria, index) => (
                  <div key={index} style={{ 
                    padding: '1rem',
                    borderBottom: index < metrics.ventasPorCategoria.length - 1 ? '1px solid var(--sapList_BorderColor)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--sapButton_Background)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--sapButton_TextColor)'
                    }}>
                      {categoria.ranking}
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text style={{ fontWeight: 'bold' }}>{categoria.categoria}</Text>
                      <Text style={{ color: 'var(--sapContent_LabelColor)', fontSize: '0.875rem' }}>
                        {categoria.porcentaje} en ventas este mes
                      </Text>
                    </div>
                    <Text style={{ color: 'var(--sapPositiveColor)' }}>
                      MXN ${categoria.valor.toLocaleString()}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>

            {/* Distribución de Ventas */}
            <Card>
              <div style={{ padding: '1rem' }}>
                <Title level="H2" style={{ marginBottom: '1rem' }}>Distribución de Ventas</Title>
                <Text style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {metrics.distribucionVentas.total.toLocaleString()}
                </Text>
                <Text style={{ color: 'var(--sapContent_LabelColor)', marginBottom: '1rem' }}>
                  ventas totales
                </Text>
                <Text style={{ marginBottom: '0.5rem' }}>Distribución por Canal</Text>
                {metrics.distribucionVentas.canales.map((canal, index) => (
                  <div key={index} style={{ 
                    marginBottom: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                      <Text>{canal.nombre}</Text>
                      <Text style={{ color: 'var(--sapPositiveColor)' }}>{canal.valor}</Text>
                    </FlexBox>
                    <Text style={{ color: 'var(--sapContent_LabelColor)', fontSize: '0.875rem' }}>
                      {canal.ventas.toLocaleString()} ventas
                    </Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Metricas; 