import React, { useState, useContext, useEffect, useRef } from "react";
import { Card, Button, Title } from "@ui5/webcomponents-react";
import { LineChart, BarChart } from "@ui5/webcomponents-react-charts";
import lineChartIcon from "@ui5/webcomponents-icons/dist/line-chart.js";
import barChartIcon from "@ui5/webcomponents-icons/dist/horizontal-bar-chart.js";
import { ThemeContext } from "../App";
import {
  Container,
  ChartWrapper,
  ChartContainer,
  ChartTitle,
  UI5ChartGlobalStyles,
  StyledCard,
  ChartBottomCover,
  CardBottomFix,
  StatsContainer,
  StatCard,
  AlertContainer,
  AlertCard
} from "../styles/Predictivo/PredictivoStyle";
import ErrorBoundary from "../components/ErrorBoundary";
import UI5ThemeProvider from "../components/UI5ThemeProvider";
import { 
  MdInsights, 
  MdTrendingUp, 
  MdWarning, 
  MdVerified,
  MdQueryStats,
  MdHistory,
  MdTrendingDown
} from 'react-icons/md';

// Datos históricos y predicciones
const dataset = [
  {
    articulo: 'Nike Air Max 270', 
    ventas: 145, 
    prediccion: 160,
    historico: [120, 135, 145, 150, 145],
    perdidas: 15
  },
  { 
    articulo: 'Adidas Ultraboost', 
    ventas: 132, 
    prediccion: 140,
    historico: [110, 125, 132, 138, 132],
    perdidas: 8
  },
  { 
    articulo: 'Nike Air Force 1', 
    ventas: 168, 
    prediccion: 175,
    historico: [150, 160, 168, 172, 168],
    perdidas: 7
  },
  { 
    articulo: 'Puma RS-X', 
    ventas: 89, 
    prediccion: 95,
    historico: [80, 85, 89, 92, 89],
    perdidas: 6
  },
  { 
    articulo: 'New Balance 574', 
    ventas: 110, 
    prediccion: 120,
    historico: [95, 105, 110, 115, 110],
    perdidas: 10
  },
  { 
    articulo: 'Vans Old Skool', 
    ventas: 95, 
    prediccion: 100,
    historico: [85, 90, 95, 98, 95],
    perdidas: 5
  }
];

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

export function Predictivo() {
  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const { theme } = useContext(ThemeContext);
  const chartContainerRef = useRef(null);
  const isDarkTheme = theme === "dark";

  const realesColor = isDarkTheme ? "#5856d6" : "#1976d2";
  const pronosticadasColor = isDarkTheme ? "#2e7d32" : "#388e3c";

  const handleToggleClick = () => {
    setToggleCharts(prev => prev === "lineChart" ? "barChart" : "lineChart");
  };

  const chartStyle = {
    width: "100%",
    height: "calc(100vh - 290px)",
    paddingBottom: "20px",
    '--sapChart_BackgroundColor': isDarkTheme ? 'var(--sapList_Background)' : '#fff',
    '--sapChart_OrderedColor_1': realesColor,
    '--sapChart_OrderedColor_2': pronosticadasColor
  };

  return (
    <Container theme={theme}>
      <UI5ChartGlobalStyles theme={theme} />
      <CardBottomFix theme={theme} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <MdInsights size={32} />
        <Title level="H1">Análisis Predictivo</Title>
      </div>

      <StatsContainer>
        <StatCard theme={theme}>
          <div className="icon-container precision">
            <MdQueryStats size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{metricas.precision}</div>
            <div className="stat-label">Precisión del Modelo</div>
          </div>
        </StatCard>

        <StatCard theme={theme}>
          <div className="icon-container tendencia">
            <MdTrendingUp size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{metricas.tendencia}</div>
            <div className="stat-label">Tendencia de Ventas</div>
          </div>
        </StatCard>

        <StatCard theme={theme}>
          <div className="icon-container diferencia">
            <MdWarning size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{metricas.margenError}</div>
            <div className="stat-label">Margen de Error</div>
          </div>
        </StatCard>

        <StatCard theme={theme}>
          <div className="icon-container confianza">
            <MdVerified size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{metricas.confianza}</div>
            <div className="stat-label">Nivel de Confianza</div>
          </div>
        </StatCard>
      </StatsContainer>

      <ChartWrapper theme={theme}>
        <UI5ThemeProvider>
          <StyledCard theme={theme}>
            <Card
              style={{ 
                width: "100%",
                height: "100%",
                backgroundColor: isDarkTheme ? 'var(--sapList_Background)' : '#fff',
                border: `1px solid ${isDarkTheme ? 'var(--sapList_BorderColor)' : '#e5e7eb'}`,
                boxShadow: isDarkTheme
                  ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                  : "0 1px 3px rgba(0, 0, 0, 0.1)",
                "--_ui5-card-background": isDarkTheme ? 'var(--sapList_Background)' : '#fff',
                "--_ui5-card-border-color": isDarkTheme ? 'var(--sapList_BorderColor)' : '#e5e7eb',
                overflow: "hidden",
                position: "relative"
              }}
              className="ui5-card-fix"
            >
              <ChartTitle theme={theme}>
                <Title 
                  level="H4"
                  style={{
                    color: isDarkTheme ? 'var(--sapTextColor)' : '#1d2d3e',
                    fontWeight: 500
                  }}
                >
                  Predicción de Ventas por Artículo
                </Title>
                <Button
                  icon={toggleCharts === "lineChart" ? barChartIcon : lineChartIcon}
                  onClick={handleToggleClick}
                  design="Transparent"
                >
                  {toggleCharts === "lineChart"
                    ? "Ver Gráfico de Barras"
                    : "Ver Gráfico de Líneas"}
                </Button>
              </ChartTitle>
              
              <ChartContainer ref={chartContainerRef} theme={theme} style={{ position: "relative", overflow: "hidden" }}>
                <ErrorBoundary>
                  {toggleCharts === "lineChart" ? (
                    <LineChart
                      dimensions={[{ accessor: "articulo", label: "Artículo" }]}
                      measures={[
                        { accessor: "ventas", label: "Ventas Actuales", color: realesColor },
                        { accessor: "prediccion", label: "Predicción de Ventas", color: pronosticadasColor }
                      ]}
                      dataset={dataset}
                      style={chartStyle}
                    />
                  ) : (
                    <BarChart
                      dimensions={[{ accessor: "articulo", label: "Artículo" }]}
                      measures={[
                        { accessor: "ventas", label: "Ventas Actuales", color: realesColor },
                        { accessor: "prediccion", label: "Predicción de Ventas", color: pronosticadasColor }
                      ]}
                      dataset={dataset}
                      style={chartStyle}
                    />
                  )}
                </ErrorBoundary>
                <ChartBottomCover theme={theme} />
              </ChartContainer>
            </Card>
          </StyledCard>
        </UI5ThemeProvider>
      </ChartWrapper>

      <AlertContainer>
        <Title level="H4" style={{ marginBottom: '16px', color: isDarkTheme ? 'var(--sapTextColor)' : '#1d2d3e' }}>
          Alertas de Pérdidas Potenciales
        </Title>
        {alertasPerdidas.map((alerta, index) => (
          <AlertCard key={index} theme={theme}>
            <div className="alert-icon">
              <MdTrendingDown size={24} />
            </div>
            <div className="alert-content">
              <div className="alert-title">{alerta.articulo}</div>
              <div className="alert-details">
                <span>Pérdida estimada: {alerta.perdida} unidades</span>
                <span>Tendencia: {alerta.tendencia}</span>
              </div>
              <div className="alert-recommendation">
                Recomendación: {alerta.recomendacion}
              </div>
            </div>
          </AlertCard>
        ))}
      </AlertContainer>
    </Container>
  );
}