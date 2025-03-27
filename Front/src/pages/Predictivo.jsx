import React, { useState, useContext, useEffect, useRef } from "react";
import { Card, Button, Title } from "@ui5/webcomponents-react";
import { LineChart, BarChart } from "@ui5/webcomponents-react-charts";
import lineChartIcon from "@ui5/webcomponents-icons/dist/line-chart.js";
import barChartIcon from "@ui5/webcomponents-icons/dist/horizontal-bar-chart.js";
import {
  Container,
  ChartWrapper,
  ChartContainer,
  ChartTitle,
  UI5ChartGlobalStyles,
  StyledCard,
  ChartBottomCover
} from "../styles/Predictivo/PredictivoStyle";
import { ThemeContext } from "../App";
import ErrorBoundary from "../components/ErrorBoundary";
import UI5ThemeProvider from "../components/UI5ThemeProvider";

// Overlay to cover any remaining white spaces
const ChartOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${({ theme }) => theme.bgtotal};
  z-index: 1;
  pointer-events: none;
`;

// Sample data for the chart
const dataset = [
  {
    month: "11.09",
    ventas_reales: 1.0,
    ventas_pronosticadas: 1.2
  },
  {
    month: "4.10",
    ventas_reales: 1.5,
    ventas_pronosticadas: 1.6
  },
  {
    month: "9.10",
    ventas_reales: 2.8,
    ventas_pronosticadas: 2.5
  },
  {
    month: "2.11",
    ventas_reales: 3.2,
    ventas_pronosticadas: 3.5
  },
  {
    month: "7.11",
    ventas_reales: 6.5,
    ventas_pronosticadas: 6.2
  },
  {
    month: "12.11",
    ventas_reales: 7.2,
    ventas_pronosticadas: 7.8
  },
  {
    month: "5.12",
    ventas_reales: 11.5,
    ventas_pronosticadas: 12.0
  },
  {
    month: "8.12",
    ventas_reales: 15.8,
    ventas_pronosticadas: 16.2
  }
];

export function Predictivo() {
  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const { theme } = useContext(ThemeContext);
  const chartContainerRef = useRef(null);

  // Define chart colors based on theme
  const realesColor = theme === 'dark' ? "#ff6b6b" : "#e41a1c";
  const pronosticadasColor = theme === 'dark' ? "#4dabf7" : "#377eb8";

  const handleToggleClick = () => {
    if (toggleCharts === "lineChart") {
      setToggleCharts("barChart");
    } else {
      setToggleCharts("lineChart");
    }
  };

  // Effect to directly manipulate chart elements after rendering
  useEffect(() => {
    // Simplified fix function to avoid complex DOM manipulations that might cause crashes
    const fixChartBackgrounds = () => {
      if (!chartContainerRef.current) return;
      
      try {
        // Apply background color to all chart SVG containers
        const elements = chartContainerRef.current.querySelectorAll('svg, svg rect, div[class*="chart"], div[class*="Chart"]');
        elements.forEach(el => {
          if (el.tagName === 'rect') {
            // Handle SVG rect elements
            try {
              el.setAttribute('fill', theme.bgtotal);
            } catch (e) {
              console.warn('Unable to set fill attribute:', e);
            }
          } else {
            // Handle other elements
            try {
              el.style.backgroundColor = theme.bgtotal;
            } catch (e) {
              console.warn('Unable to set background-color style:', e);
            }
          }
        });
      } catch (e) {
        console.error('Error in fixChartBackgrounds:', e);
      }
    };

    // Run once after initial render with delays
    const timeouts = [
      setTimeout(fixChartBackgrounds, 100),
      setTimeout(fixChartBackgrounds, 500),
      setTimeout(fixChartBackgrounds, 1000),
      setTimeout(fixChartBackgrounds, 2000)
    ];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [theme, toggleCharts]);

  // Add a simplified global style
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('id', 'chart-background-fix');
    
    // Keep the CSS simpler to avoid rendering issues
    styleEl.innerHTML = `
      /* Basic background fixes for chart elements */
      .ui5-chart-container,
      svg,
      rect {
        background-color: ${theme.bgtotal} !important;
        fill: ${theme.bgtotal} !important;
      }
    `;
    
    document.head.appendChild(styleEl);
    
    return () => {
      const existingStyle = document.getElementById('chart-background-fix');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [theme]);

  // Base chart options
  const getChartOptions = () => ({
    legendPosition: "bottom",
    legendHorizontalAlign: "center",
    showLegend: true,
    legendItemSize: 10,
    gridHorizontal: true,
    gridVertical: true,
    tooltipBackgroundColor: theme.bg2,
    tooltipBorderColor: theme.bg3,
    tooltipTextColor: theme.textColor,
    margin: { left: 40, right: 40, top: 20, bottom: 80 },
    gridStroke: theme === 'dark' ? '#4a5568' : '#e0e0e0',
    xAxisColor: theme === 'dark' ? '#718096' : '#666666',
    yAxisColor: theme === 'dark' ? '#718096' : '#666666',
    xAxisTextColor: theme.textColor,
    yAxisTextColor: theme.textColor
  });

  // Base chart styles
  const chartStyle = {
    width: "100%",
    height: "calc(100vh - 290px)",
    paddingBottom: "20px",
    background: theme.bgtotal
  };

  return (
    <Container>
      <UI5ChartGlobalStyles theme={theme} />
      <h1>Análisis Predictivo</h1>
      <ChartWrapper>
        <UI5ThemeProvider>
          <StyledCard theme={theme}>
            <Card
              style={{ 
                width: "100%",
                height: "100%",
                backgroundColor: theme.bgtotal,
                border: `1px solid ${theme.bg3}`,
                boxShadow: theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <ChartTitle>
                <Title level="H4">Ventas Reales vs Ventas Pronosticadas</Title>
                <Button
                  icon={toggleCharts === "lineChart" ? barChartIcon : lineChartIcon}
                  onClick={handleToggleClick}
                  design="Transparent"
                >
                  {toggleCharts === "lineChart" ? "Cambiar a Gráfico de Barras" : "Cambiar a Gráfico de Líneas"}
                </Button>
              </ChartTitle>
              
              <ChartContainer 
                ref={chartContainerRef} 
                style={{ 
                  position: 'relative', 
                  overflow: 'hidden',
                  background: theme.bgtotal 
                }}
              >
                {/* Background layer */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: theme.bgtotal,
                  zIndex: 0
                }} />
                
                <ErrorBoundary>
                  {toggleCharts === "lineChart" ? (
                    <LineChart
                      dimensions={[{
                        accessor: "month",
                        label: "Período"
                      }]}
                      measures={[
                        {
                          accessor: "ventas_reales",
                          label: "Ventas Reales",
                          color: realesColor
                        },
                        {
                          accessor: "ventas_pronosticadas",
                          label: "Ventas Pronosticadas",
                          color: pronosticadasColor
                        }
                      ]}
                      dataset={dataset}
                      style={chartStyle}
                      options={getChartOptions()}
                    />
                  ) : (
                    <BarChart
                      dimensions={[{
                        accessor: "month",
                        label: "Período"
                      }]}
                      measures={[
                        {
                          accessor: "ventas_reales",
                          label: "Ventas Reales",
                          color: realesColor
                        },
                        {
                          accessor: "ventas_pronosticadas",
                          label: "Ventas Pronosticadas",
                          color: pronosticadasColor
                        }
                      ]}
                      dataset={dataset}
                      style={chartStyle}
                      options={{
                        ...getChartOptions(),
                        barGap: 4,
                        barWidth: "30px"
                      }}
                    />
                  )}
                </ErrorBoundary>
                
                {/* Simple overlay to hide any white spaces */}
                <ChartOverlay theme={theme} />
              </ChartContainer>
            </Card>
          </StyledCard>
        </UI5ThemeProvider>
      </ChartWrapper>
    </Container>
  );
}