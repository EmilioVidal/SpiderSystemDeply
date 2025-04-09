import React, { useState, useEffect } from "react";
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
  Card,
  CardHeader,
  SegmentedButton,
  SegmentedButtonItem,
  Icon,
  Label,
  Grid,
  MessageStrip,
  IllustratedMessage,
  IllustrationMessageType,
  ValueState,
  Button,
  List,
  StandardListItem,
  BusyIndicator,
  AnalyticalTable,
  ObjectStatus
} from "@ui5/webcomponents-react";
import {
  LineChart,
  BarChart,
  ComposedChart,
  MicroBarChart,
  ScatterChart
} from "@ui5/webcomponents-react-charts";
import { useUI5Theme } from "../components/UI5ThemeProvider";

// Importar íconos necesarios
import "@ui5/webcomponents-icons/dist/AllIcons.js";

// Datos históricos y predicciones
const dataset = [
  {
    articulo: 'Nike Air Max 270', 
    ventas: 145, 
    prediccion: 160,
    historico: [120, 135, 145, 150, 145],
    perdidas: 15,
    meses: ["Ene", "Feb", "Mar", "Abr", "May"]
  },
  { 
    articulo: 'Adidas Ultraboost', 
    ventas: 132, 
    prediccion: 140,
    historico: [110, 125, 132, 138, 132],
    perdidas: 8,
    meses: ["Ene", "Feb", "Mar", "Abr", "May"]
  },
  { 
    articulo: 'Nike Air Force 1', 
    ventas: 168, 
    prediccion: 175,
    historico: [150, 160, 168, 172, 168],
    perdidas: 7,
    meses: ["Ene", "Feb", "Mar", "Abr", "May"]
  },
  { 
    articulo: 'Puma RS-X', 
    ventas: 89, 
    prediccion: 95,
    historico: [80, 85, 89, 92, 89],
    perdidas: 6,
    meses: ["Ene", "Feb", "Mar", "Abr", "May"]
  },
  { 
    articulo: 'New Balance 574', 
    ventas: 110, 
    prediccion: 120,
    historico: [95, 105, 110, 115, 110],
    perdidas: 10,
    meses: ["Ene", "Feb", "Mar", "Abr", "May"]
  },
  { 
    articulo: 'Vans Old Skool', 
    ventas: 95, 
    prediccion: 100,
    historico: [85, 90, 95, 98, 95],
    perdidas: 5,
    meses: ["Ene", "Feb", "Mar", "Abr", "May"]
  }
];

// Transformar datos para la visualización
const transformDataForCharts = () => {
  const lineChartData = [];
  
  // Para cada mes en el histórico
  for (let i = 0; i < 5; i++) {
    const ventasMes = dataset.reduce((sum, product) => sum + product.historico[i], 0);
    lineChartData.push({
      mes: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"][i],
      ventas: ventasMes,
      prediccion: i === 4 ? null : (i === 3 ? ventasMes * 1.1 : null)
    });
  }
  
  // Añadir predicción para el próximo mes
  lineChartData.push({
    mes: "Junio",
    ventas: null,
    prediccion: dataset.reduce((sum, product) => sum + product.prediccion, 0)
  });
  
  return lineChartData;
};

// Datos para gráficos de barras de productos individuales
const getProductChartData = (product) => {
  const result = [];
  
  for (let i = 0; i < product.meses.length; i++) {
    result.push({
      mes: product.meses[i],
      ventas: product.historico[i]
    });
  }
  
  // Añadir predicción
  result.push({
    mes: "Jun",
    prediccion: product.prediccion
  });
  
  return result;
};

// Datos de métricas
const metricas = {
  precision: '95%',
  tendencia: '+15%',
  margenError: '±3%',
  confianza: '92%'
};

// Alertas de pérdidas potenciales
const alertasPerdidas = [
  {
    articulo: 'Nike Air Max 270',
    perdida: 15,
    tendencia: 'Decreciente',
    recomendacion: 'Realizar pedido urgente de 30 unidades para cubrir la demanda actual. Las ventas muestran que este modelo tiene alta rotación y el stock está por debajo del mínimo requerido.'
  },
  {
    articulo: 'Adidas Ultraboost',
    perdida: 8,
    tendencia: 'Estable',
    recomendacion: 'Programar pedido de 20 unidades para la próxima semana. El nivel de inventario actual permite mantener las ventas por 2 semanas más.'
  },
  {
    articulo: 'Nike Air Force 1',
    perdida: 7,
    tendencia: 'Creciente',
    recomendacion: 'Solicitar 25 unidades adicionales. La tendencia de ventas está aumentando y se proyecta un incremento del 15% en la demanda del próximo mes.'
  }
];

export default function Predictivo() {
  const { isDarkMode } = useUI5Theme();
  const [chartType, setChartType] = useState("line");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predicciones, setPredicciones] = useState([]);
  const [tendencias, setTendencias] = useState([]);
  
  // Inicializar datos de gráficos
  useEffect(() => {
    setChartData(transformDataForCharts());
    setLoading(true);

    // Simulación de carga de datos
    setTimeout(() => {
      setPredicciones([
        {
          id: 1,
          producto: 'Producto A',
          demandaActual: 100,
          demandaPredicha: 120,
          tendencia: 'Aumento',
          confianza: 85
        },
        {
          id: 2,
          producto: 'Producto B',
          demandaActual: 150,
          demandaPredicha: 130,
          tendencia: 'Disminución',
          confianza: 78
        }
      ]);

      setTendencias([
        { mes: 'Enero', valor: 100 },
        { mes: 'Febrero', valor: 120 },
        { mes: 'Marzo', valor: 110 },
        { mes: 'Abril', valor: 130 },
        { mes: 'Mayo', valor: 125 }
      ]);

      setLoading(false);
    }, 1000);
  }, []);
  
  // Función para cambiar el tipo de gráfico
  const handleChartTypeChange = (event) => {
    setChartType(event.detail.selectedItem.getAttribute("data-key"));
  };
  
  // Función para seleccionar un producto para análisis detallado
  const handleProductSelect = (product) => {
    setIsLoading(true);
    
    // Simular carga de datos
    setTimeout(() => {
      setSelectedProduct(product);
      setIsLoading(false);
    }, 1000);
  };
  
  // Función para volver a la vista general
  const handleBackToOverview = () => {
    setSelectedProduct(null);
  };
  
  // Obtener el estado de valor basado en la tendencia
  const getTendenciaValueState = (tendencia) => {
    switch (tendencia) {
      case 'Creciente':
        return ValueState.Success;
      case 'Decreciente':
        return ValueState.Error;
      case 'Estable':
      default:
        return ValueState.Neutral;
    }
  };
  
  // Obtener icono basado en la tendencia
  const getTendenciaIcon = (tendencia) => {
    switch (tendencia) {
      case 'Creciente':
        return "trend-up";
      case 'Decreciente':
        return "trend-down";
      case 'Estable':
      default:
        return "pending";
    }
  };
  
  const getTendenciaColor = (tendencia) => {
    return tendencia === 'Aumento' ? ValueState.Success : ValueState.Error;
  };
  
  return (
    <>
      <DynamicPageTitle
        header={<Title>Análisis Predictivo</Title>}
        subHeader={<Text>Pronósticos de ventas y recomendaciones basadas en inteligencia artificial</Text>}
      />
      
      <DynamicPageHeader>
        <FlexBox 
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          alignItems={FlexBoxAlignItems.Center}
          wrap={FlexBoxWrap.Wrap}
        >
          <SegmentedButton
            onSelectionChange={handleChartTypeChange}
          >
            <SegmentedButtonItem data-key="line" icon="line-chart" selected={chartType === "line"}>
              Tendencia
            </SegmentedButtonItem>
            <SegmentedButtonItem data-key="bar" icon="horizontal-bar-chart" selected={chartType === "bar"}>
              Comparativa
            </SegmentedButtonItem>
          </SegmentedButton>
          
          {selectedProduct && (
            <Button onClick={handleBackToOverview} icon="nav-back">
              Volver al Resumen
            </Button>
          )}
        </FlexBox>
      </DynamicPageHeader>
      
      <div style={{ padding: "1rem" }}>
        {/* Métricas de rendimiento del modelo */}
        {!selectedProduct && (
          <Grid defaultSpan="XL3 L3 M6 S12" style={{ marginBottom: "1rem" }}>
            <Card>
              <CardHeader
                titleText="Precisión del Modelo"
                avatar={<Icon name="status-positive" />}
              />
              <div style={{ padding: "1rem", textAlign: "center" }}>
                <Title style={{ fontSize: "2rem", color: "var(--sapPositiveColor)" }}>
                  {metricas.precision}
                </Title>
                <Text>
                  La precisión de nuestras predicciones en los últimos 3 meses
                </Text>
              </div>
            </Card>
            
            <Card>
              <CardHeader
                titleText="Tendencia de Ventas"
                avatar={<Icon name="increase" />}
              />
              <div style={{ padding: "1rem", textAlign: "center" }}>
                <Title style={{ fontSize: "2rem", color: "var(--sapPositiveColor)" }}>
                  {metricas.tendencia}
                </Title>
                <Text>
                  Crecimiento proyectado para el próximo mes
                </Text>
              </div>
            </Card>
            
            <Card>
              <CardHeader
                titleText="Margen de Error"
                avatar={<Icon name="alert" />}
              />
              <div style={{ padding: "1rem", textAlign: "center" }}>
                <Title style={{ fontSize: "2rem" }}>
                  {metricas.margenError}
                </Title>
                <Text>
                  Margen de error de nuestras predicciones
                </Text>
              </div>
            </Card>
            
            <Card>
              <CardHeader
                titleText="Nivel de Confianza"
                avatar={<Icon name="bullet-text" />}
              />
              <div style={{ padding: "1rem", textAlign: "center" }}>
                <Title style={{ fontSize: "2rem", color: "var(--sapAccentColor4)" }}>
                  {metricas.confianza}
                </Title>
                <Text>
                  Intervalo de confianza del modelo predictivo
                </Text>
              </div>
            </Card>
          </Grid>
        )}
        
        {/* Principal chart or product detail */}
        {isLoading ? (
          <FlexBox 
            direction={FlexBoxDirection.Column}
            justifyContent={FlexBoxJustifyContent.Center}
            alignItems={FlexBoxAlignItems.Center}
            style={{ height: "400px" }}
          >
            <BusyIndicator size="Large" />
            <Text style={{ marginTop: "1rem" }}>Analizando datos...</Text>
          </FlexBox>
        ) : selectedProduct ? (
          // Vista detallada de producto
          <>
            <Card style={{ marginBottom: "1rem" }}>
              <CardHeader titleText={`Análisis Detallado: ${selectedProduct.articulo}`} />
              <div style={{ padding: "1rem" }}>
                <Grid defaultSpan="XL6 L6 M12 S12">
                  <div>
                    <Title level="H4" style={{ marginBottom: "1rem" }}>Tendencia Histórica y Proyección</Title>
                    <div style={{ height: "400px" }}>
                      {chartType === "line" ? (
                        <LineChart 
                          dataset={getProductChartData(selectedProduct)}
                          dimensions={[{ accessor: "mes", label: "Mes" }]}
                          measures={[
                            { accessor: "ventas", label: "Ventas" },
                            { accessor: "prediccion", label: "Predicción", type: "line" }
                          ]}
                          chartConfig={{
                            zoomingTool: true,
                            legendPosition: "bottom",
                            legendHorizontalAlign: "center"
                          }}
                        />
                      ) : (
                        <BarChart 
                          dataset={getProductChartData(selectedProduct)}
                          dimensions={[{ accessor: "mes" }]}
                          measures={[
                            { accessor: "ventas", label: "Ventas Reales" },
                            { accessor: "prediccion", label: "Predicción" }
                          ]}
                          chartConfig={{
                            zoomingTool: true,
                            legendPosition: "bottom",
                            legendHorizontalAlign: "center"
                          }}
                        />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Title level="H4" style={{ marginBottom: "1rem" }}>Métricas del Producto</Title>
                    <List>
                      <StandardListItem 
                        info={`${selectedProduct.ventas} unidades`} 
                        infoState={ValueState.Information}
                        icon="cart"
                      >
                        Ventas Actuales (Mayo)
                      </StandardListItem>
                      <StandardListItem 
                        info={`${selectedProduct.prediccion} unidades`} 
                        infoState={ValueState.Success}
                        icon="increase"
                      >
                        Predicción (Junio)
                      </StandardListItem>
                      <StandardListItem 
                        info={`${Math.round((selectedProduct.prediccion - selectedProduct.ventas) / selectedProduct.ventas * 100)}%`} 
                        infoState={ValueState.Success}
                        icon="trend-up"
                      >
                        Crecimiento Proyectado
                      </StandardListItem>
                      <StandardListItem 
                        info={`${selectedProduct.perdidas} unidades`} 
                        infoState={selectedProduct.perdidas > 10 ? ValueState.Error : ValueState.Warning}
                        icon="alert"
                      >
                        Pérdidas Potenciales
                      </StandardListItem>
                    </List>
                  </div>
                </Grid>
              </div>
            </Card>
            
            {/* Recomendaciones */}
            <Card>
              <CardHeader 
                titleText="Recomendaciones" 
                avatar={<Icon name="learning-assistant" />}
              />
              <div style={{ padding: "1rem" }}>
                <MessageStrip
                  design="Information"
                  hideCloseButton
                  icon="business-objects-experience"
                  style={{ marginBottom: "1rem" }}
                >
                  Recomendaciones basadas en análisis de tendencias y patrones de comportamiento
                </MessageStrip>
                
                {alertasPerdidas.filter(alerta => alerta.articulo === selectedProduct.articulo).map((alerta, index) => (
                  <div key={index} style={{ marginBottom: "1rem" }}>
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{ marginBottom: "0.5rem" }}>
                      <Icon name={getTendenciaIcon(alerta.tendencia)} style={{ marginRight: "0.5rem" }} />
                      <Text style={{ fontWeight: "bold" }}>
                        Tendencia: {alerta.tendencia}
                      </Text>
                    </FlexBox>
                    <Text style={{ marginBottom: "0.5rem" }}>
                      {alerta.recomendacion}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>
          </>
        ) : (
          // Vista general
          <>
            <Card style={{ marginBottom: "1rem" }}>
              <CardHeader titleText={`Tendencia de Ventas y Predicción ${chartType === "line" ? "Lineal" : "Comparativa"}`} />
              <div style={{ height: "400px", padding: "1rem" }}>
                {chartType === "line" ? (
                  <LineChart 
                    dataset={chartData}
                    dimensions={[{ accessor: "mes" }]}
                    measures={[
                      { accessor: "ventas", label: "Ventas Reales" },
                      { accessor: "prediccion", label: "Predicción", type: "line" }
                    ]}
                    chartConfig={{
                      zoomingTool: true,
                      legendPosition: "bottom",
                      legendHorizontalAlign: "center"
                    }}
                  />
                ) : (
                  <BarChart 
                    dataset={chartData}
                    dimensions={[{ accessor: "mes" }]}
                    measures={[
                      { accessor: "ventas", label: "Ventas Reales" },
                      { accessor: "prediccion", label: "Predicción" }
                    ]}
                    chartConfig={{
                      zoomingTool: true,
                      legendPosition: "bottom",
                      legendHorizontalAlign: "center"
                    }}
                  />
                )}
              </div>
            </Card>
            
            <Card>
              <CardHeader 
                titleText="Productos con Potencial de Pérdidas" 
                subtitle="Seleccione un producto para un análisis detallado" 
                avatar={<Icon name="alert" />}
              />
              <div style={{ maxHeight: "400px", overflow: "auto" }}>
                <List>
                  {dataset.sort((a, b) => b.perdidas - a.perdidas).map((producto, index) => (
                    <StandardListItem
                      key={index}
                      info={`${producto.perdidas} unidades`}
                      infoState={producto.perdidas > 10 ? ValueState.Error : producto.perdidas > 5 ? ValueState.Warning : ValueState.Success}
                      description={`Ventas: ${producto.ventas} | Predicción: ${producto.prediccion}`}
                      icon={producto.perdidas > 10 ? "status-critical" : "cart"}
                      onClick={() => handleProductSelect(producto)}
                    >
                      {producto.articulo}
                    </StandardListItem>
                  ))}
                </List>
              </div>
            </Card>
          </>
        )}
      </div>
    </>
  );
} 