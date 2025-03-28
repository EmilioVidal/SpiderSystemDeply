import React, { useState, useContext, useEffect, useRef } from "react";
import { Card, Button, Title } from "@ui5/webcomponents-react";
import { LineChart, BarChart } from "@ui5/webcomponents-react-charts";
import lineChartIcon from "@ui5/webcomponents-icons/dist/line-chart.js";
import barChartIcon from "@ui5/webcomponents-icons/dist/horizontal-bar-chart.js";
import styled from "styled-components";
import {
  Container,
  ChartWrapper,
  ChartContainer,
  ChartTitle,
  UI5ChartGlobalStyles,
  StyledCard,
  ChartBottomCover,
  CardBottomFix
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
  z-index: 5;
  pointer-events: none;
  
  /* Create a curve that matches the chart's bottom curve but with correct background */
  &::before {
    content: "";
    position: absolute;
    top: -15px;
    left: 0;
    right: 0;
    height: 30px;
    background: ${({ theme }) => theme.bgtotal};
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  }
`;

// Sample data for the chart
const dataset = [
  {
    month: "Laptops",
    ventas_reales: 1.0,
    ventas_pronosticadas: 1.2
  },
  {
    month: "Smartphones",
    ventas_reales: 1.5,
    ventas_pronosticadas: 1.6
  },
  {
    month: "Tablets",
    ventas_reales: 2.8,
    ventas_pronosticadas: 2.5
  },
  {
    month: "Monitores",
    ventas_reales: 3.2,
    ventas_pronosticadas: 3.5
  },
  {
    month: "Teclados",
    ventas_reales: 6.5,
    ventas_pronosticadas: 6.2
  },
  {
    month: "Ratones",
    ventas_reales: 7.2,
    ventas_pronosticadas: 7.8
  },
  {
    month: "Auriculares",
    ventas_reales: 11.5,
    ventas_pronosticadas: 12.0
  },
  {
    month: "Impresoras",
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
        const elements = chartContainerRef.current.querySelectorAll('svg, svg rect, div[class*="chart"], div[class*="Chart"], canvas, .ui5-chart-canvas, .recharts-surface');
        elements.forEach(el => {
          if (el.tagName === 'rect') {
            // Handle SVG rect elements
            try {
              el.setAttribute('fill', theme.bgtotal);
            } catch (e) {
              console.warn('Unable to set fill attribute:', e);
            }
          } else if (el.tagName === 'canvas') {
            // Handle canvas elements
            try {
              const ctx = el.getContext('2d');
              if (ctx) {
                ctx.fillStyle = theme.bgtotal;
                ctx.fillRect(0, 0, el.width, el.height);
              }
              // Also set the background color of the canvas element
              el.style.backgroundColor = theme.bgtotal;
            } catch (e) {
              console.warn('Unable to set canvas background:', e);
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
        
        // Target UI5 specific elements - these might have inline styles
        document.querySelectorAll('.ui5-chart-popover, .ui5-chart-canvas, .ui5-chart-legend, .recharts-surface').forEach(el => {
          el.style.backgroundColor = theme.bgtotal;
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
      setTimeout(fixChartBackgrounds, 2000),
      setTimeout(fixChartBackgrounds, 3000) // Add an extra timeout for delayed rendering
    ];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [theme, toggleCharts]);

  // Add a simplified global style
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('id', 'chart-background-fix');
    
    // More comprehensive CSS to target all chart elements
    styleEl.innerHTML = `
      /* Basic background fixes for chart elements */
      .ui5-chart-container,
      svg,
      rect,
      canvas,
      .highcharts-background,
      .highcharts-plot-background,
      .recharts-surface,
      .recharts-wrapper {
        background-color: ${theme.bgtotal} !important;
        fill: ${theme.bgtotal} !important;
      }
      
      /* Target UI5 specific elements */
      .ui5-chart-popover,
      .ui5-chart-canvas,
      .ui5-chart-legend,
      [data-component-name="ChartLegend"],
      [data-component-name="ChartContainer"],
      .ui5-content-density-compact {
        background-color: ${theme.bgtotal} !important;
      }
      
      /* Target specific white elements */
      rect[fill="white"],
      rect[fill="#ffffff"],
      rect[fill="#FFFFFF"],
      *[fill="white"],
      *[fill="#ffffff"],
      *[fill="#FFFFFF"] {
        fill: ${theme.bgtotal} !important;
      }
      
      /* Target UI5 card inner elements */
      .ui5-card-root,
      .ui5-card-inner,
      div[ui5-card],
      div[class*="ui5-card"],
      .ui5-card-header,
      .ui5-card-content,
      div[class*="ui5-card-inner"] {
        background-color: ${theme.bgtotal} !important;
      }
      
      /* Handle white bottom border specifically */
      div[class*="ui5-busy-indicator"],
      div[class*="ui5-busy-indicator-root"],
      div[part="root"],
      div[part="content"],
      div[class="ui5-card-inner"] {
        background-color: ${theme.bgtotal} !important;
        border-bottom-color: ${theme.bgtotal} !important;
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

  // Effect to directly manipulate UI5 Card inner elements
  useEffect(() => {
    const fixCardWhiteBackground = () => {
      try {
        // Directly target the UI5 card inner elements by class name pattern
        const cardElements = document.querySelectorAll('.ui5-card-inner, div[class*="ui5-card-inner"], div[ui5-card]');
        cardElements.forEach(el => {
          el.style.backgroundColor = theme.bgtotal;
          el.style.borderBottomColor = theme.bgtotal;
          el.style.borderRadius = '8px';
          
          // Try to find any child elements that might have white backgrounds
          const childElements = el.querySelectorAll('*');
          childElements.forEach(child => {
            if (window.getComputedStyle(child).backgroundColor === 'rgb(255, 255, 255)') {
              child.style.backgroundColor = theme.bgtotal;
            }
            if (window.getComputedStyle(child).borderBottomColor === 'rgb(255, 255, 255)') {
              child.style.borderBottomColor = theme.bgtotal;
            }
          });
        });
      } catch (e) {
        console.warn('Error fixing card backgrounds:', e);
      }
    };
    
    // Run after component mount and whenever the theme changes
    const timeouts = [
      setTimeout(fixCardWhiteBackground, 100),
      setTimeout(fixCardWhiteBackground, 500),
      setTimeout(fixCardWhiteBackground, 1000),
      setTimeout(fixCardWhiteBackground, 2000)
    ];
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [theme]);

  // Add a new effect to find and fix the white border issue
  useEffect(() => {
    const fixWhiteBorder = () => {
      try {
        // Target the main element identified in the screenshot
        const dgykElements = document.querySelectorAll('div[class*="sc-dgykE"], div[class*="ffoNMw"], div[class*="sc-"], [class*="busy-indicator"]');
        
        dgykElements.forEach(el => {
          // Forcefully override border colors
          el.style.borderBottomColor = theme.bgtotal;
          el.style.backgroundColor = theme.bgtotal;
          el.style.borderRadius = '8px';
          
          // Create a cover element as a child
          const coverElement = document.createElement('div');
          coverElement.style.position = 'absolute';
          coverElement.style.bottom = '0';
          coverElement.style.left = '0';
          coverElement.style.right = '0';
          coverElement.style.height = '5px';
          coverElement.style.backgroundColor = theme.bgtotal;
          coverElement.style.zIndex = '9999';
          coverElement.style.pointerEvents = 'none';
          coverElement.style.borderBottomLeftRadius = '8px';
          coverElement.style.borderBottomRightRadius = '8px';
          
          // Only append if the element is positioned
          const position = window.getComputedStyle(el).position;
          if (position === 'relative' || position === 'absolute' || position === 'fixed') {
            el.appendChild(coverElement);
          }
          
          // Also check for any children with white borders
          const allChildren = el.querySelectorAll('*');
          allChildren.forEach(child => {
            const style = window.getComputedStyle(child);
            
            // Check for white borders
            if (style.borderBottomColor === 'rgb(255, 255, 255)' || 
                style.borderColor === 'rgb(255, 255, 255)') {
              child.style.borderBottomColor = theme.bgtotal;
              child.style.borderColor = theme.bg3;
            }
          });
        });
        
        // Direct approach to target the problematic div from the screenshot
        const mainCard = document.querySelector('div.ui5-card-fix');
        if (mainCard) {
          const coverElement = document.createElement('div');
          coverElement.style.position = 'absolute';
          coverElement.style.bottom = '0';
          coverElement.style.left = '0';
          coverElement.style.right = '0';
          coverElement.style.height = '5px';
          coverElement.style.backgroundColor = theme.bgtotal;
          coverElement.style.zIndex = '9999';
          
          mainCard.appendChild(coverElement);
        }
      } catch (e) {
        console.error('Error fixing white borders:', e);
      }
    };
    
    // Execute multiple times to catch any delayed rendering
    const timeouts = [
      setTimeout(fixWhiteBorder, 100),
      setTimeout(fixWhiteBorder, 500),
      setTimeout(fixWhiteBorder, 1000),
      setTimeout(fixWhiteBorder, 2000)
    ];
    
    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [theme]);

  // Add a specific effect for the eTZCsLbYuLVA element
  useEffect(() => {
    const fixSpecificElement = () => {
      try {
        // Target the specific element seen in the screenshot
        const specificElements = document.querySelectorAll('div[class*="eTZCsL"], div[class*="bYuLVA"], div[class*="eTZCsLbYuLVA"]');
        
        specificElements.forEach(el => {
          // Direct style overrides
          el.style.borderBottomColor = theme.bgtotal;
          el.style.borderColor = theme.bg3;
          el.style.backgroundColor = theme.bgtotal;
          el.style.borderBottomLeftRadius = '8px';
          el.style.borderBottomRightRadius = '8px';
          
          // Create cover element
          const coverElement = document.createElement('div');
          coverElement.style.position = 'absolute';
          coverElement.style.bottom = '0';
          coverElement.style.left = '0';
          coverElement.style.right = '0';
          coverElement.style.height = '5px';
          coverElement.style.backgroundColor = theme.bgtotal;
          coverElement.style.zIndex = '9999';
          
          // Use computed style to check if positioned
          const position = window.getComputedStyle(el).position;
          if (position !== 'static') {
            el.appendChild(coverElement);
          } else {
            // If not positioned, try to make it positioned and then append
            el.style.position = 'relative';
            el.appendChild(coverElement);
          }
          
          // Also try to fix any invisible after/before elements
          const styleEl = document.createElement('style');
          styleEl.textContent = `
            [class*="eTZCsL"]::after,
            [class*="bYuLVA"]::after,
            [class*="eTZCsLbYuLVA"]::after {
              content: '';
              display: block;
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 5px;
              background-color: ${theme.bgtotal} !important;
              border-color: ${theme.bgtotal} !important;
              border-bottom-color: ${theme.bgtotal} !important;
              z-index: 9999;
            }
          `;
          document.head.appendChild(styleEl);
        });
      } catch (e) {
        console.error('Error fixing specific element:', e);
      }
    };
    
    // Run multiple times to catch any dynamically rendered elements
    const timeouts = [
      setTimeout(fixSpecificElement, 100),
      setTimeout(fixSpecificElement, 500),
      setTimeout(fixSpecificElement, 1000),
      setTimeout(fixSpecificElement, 2000)
    ];
    
    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [theme]);

  // Base chart options
  const getChartOptions = () => ({
    legendPosition: "right",
    legendHorizontalAlign: "right",
    showLegend: true,
    legend: {
      display: true,
      position: "right",
      align: "center",
      labels: {
        boxWidth: 20,
        padding: 10
      }
    },
    legendItemSize: 10,
    legendItemPosition: "horizontal",
    legendLayout: "horizontal",
    gridHorizontal: true,
    gridVertical: true,
    tooltipBackgroundColor: theme.bg2,
    tooltipBorderColor: theme.bg3,
    tooltipTextColor: theme === 'dark' ? '#ffffff' : theme.textColor,
    margin: { left: 40, right: 100, top: 20, bottom: 40 },
    gridStroke: theme === 'dark' ? '#4a5568' : '#e0e0e0',
    xAxisColor: theme === 'dark' ? '#718096' : '#666666',
    yAxisColor: theme === 'dark' ? '#718096' : '#666666',
    xAxisTextColor: theme === 'dark' ? '#ffffff' : theme.textColor,
    yAxisTextColor: theme === 'dark' ? '#ffffff' : theme.textColor,
    legendStyle: {
      color: theme === 'dark' ? '#ffffff' : theme.textColor,
      fontSize: '0.875rem',
      padding: '0.5rem',
      backgroundColor: 'transparent',
      fontWeight: theme === 'dark' ? 500 : 400,
      textShadow: theme === 'dark' ? '0px 1px 2px rgba(0, 0, 0, 0.5)' : 'none'
    }
  });

  // Base chart styles
  const chartStyle = {
    width: "100%",
    height: "calc(100vh - 290px)",
    paddingBottom: "20px",
    background: theme.bgtotal
  };

  // Add a specific handler for the charts that runs after load
  const handleChartLoad = (chart) => {
    if (!chart) return;
    
    // Find all SVG path elements and fix their background colors
    setTimeout(() => {
      try {
        const chartContainer = document.querySelector('.highcharts-container');
        if (chartContainer) {
          // Target the background path specifically
          const paths = chartContainer.querySelectorAll('path');
          paths.forEach(path => {
            path.setAttribute('fill', theme.bgtotal);
            path.setAttribute('stroke', 'none');
          });
          
          // Also target the background rect
          const rects = chartContainer.querySelectorAll('rect');
          rects.forEach(rect => {
            rect.setAttribute('fill', theme.bgtotal);
          });
        }
      } catch (e) {
        console.warn('Error fixing chart backgrounds:', e);
      }
    }, 200);
  };

  return (
    <Container>
      <UI5ChartGlobalStyles theme={theme} />
      <CardBottomFix theme={theme} />
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
                boxShadow: theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                "--_ui5-v1-18-0-card-header-background": theme.bgtotal,
                "--_ui5-v1-18-0-card-content-background": theme.bgtotal,
                "--_ui5-v1-18-0-card-background": theme.bgtotal,
                "--_ui5-v1-18-0-card-border-color": theme.bg3,
                "--_ui5-v1-18-0-card-border-bottom-color": theme.bgtotal,
                "--_ui5-v1-18-0-card-border-radius": "8px",
                "borderBottomColor": theme.bgtotal,
                "borderBottomLeftRadius": "8px",
                "borderBottomRightRadius": "8px",
                "overflow": "hidden",
                "position": "relative"
              }}
              className="ui5-card-fix"
            >
              {/* Add an absolute-positioned element to cover any white border */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '5px',
                backgroundColor: theme.bgtotal,
                zIndex: 9999,
                pointerEvents: 'none'
              }} />
              <ChartTitle>
                <Title 
                  level="H4"
                  style={{
                    color: theme === 'dark' ? '#ffffff' : theme.textColor,
                    fontWeight: 500,
                    textShadow: theme === 'dark' ? '0px 1px 2px rgba(0, 0, 0, 0.8)' : 'none'
                  }}
                >
                  Ventas Reales vs Ventas Pronosticadas
                </Title>
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
                  background: theme.bgtotal,
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px'
                }}
              >
                {/* Background layer with curved corners */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: theme.bgtotal,
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px',
                  zIndex: 0
                }} />
                
                <ErrorBoundary>
                  {toggleCharts === "lineChart" ? (
                    <LineChart
                      dimensions={[{
                        accessor: "month",
                        label: "Producto"
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
                      style={{
                        ...chartStyle,
                        backgroundColor: theme.bgtotal,
                        "--sapChart_BackgroundColor": theme.bgtotal,
                        "--ui5-chart-background": theme.bgtotal,
                      }}
                      options={{
                        ...getChartOptions(),
                        legendDisplay: true,
                        legend: {
                          display: true,
                          position: "right",
                          align: "center"
                        },
                        chartConfig: {
                          backgroundColor: theme.bgtotal,
                          plotBackgroundColor: theme.bgtotal,
                          chart: {
                            backgroundColor: theme.bgtotal,
                            plotBackgroundColor: theme.bgtotal,
                            events: {
                              load: handleChartLoad
                            },
                            style: {
                              fontFamily: 'inherit'
                            }
                          },
                          legend: {
                            enabled: true,
                            layout: 'horizontal',
                            align: 'right',
                            verticalAlign: 'middle',
                            backgroundColor: theme.bgtotal,
                            itemStyle: {
                              color: theme === 'dark' ? '#ffffff' : theme.textColor
                            },
                            itemMarginTop: 0,
                            itemMarginBottom: 0,
                            itemDistance: 20
                          }
                        }
                      }}
                    />
                  ) : (
                    <BarChart
                      dimensions={[{
                        accessor: "month",
                        label: "Producto"
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
                      style={{
                        ...chartStyle,
                        backgroundColor: theme.bgtotal,
                        "--sapChart_BackgroundColor": theme.bgtotal,
                        "--ui5-chart-background": theme.bgtotal,
                      }}
                      options={{
                        ...getChartOptions(),
                        legendDisplay: true,
                        barGap: 4,
                        barWidth: "30px",
                        legend: {
                          display: true,
                          position: "right",
                          align: "center"
                        },
                        chartConfig: {
                          backgroundColor: theme.bgtotal,
                          plotBackgroundColor: theme.bgtotal,
                          chart: {
                            backgroundColor: theme.bgtotal,
                            plotBackgroundColor: theme.bgtotal,
                            events: {
                              load: handleChartLoad
                            },
                            style: {
                              fontFamily: 'inherit'
                            }
                          },
                          legend: {
                            enabled: true,
                            layout: 'horizontal',
                            align: 'right',
                            verticalAlign: 'middle',
                            backgroundColor: theme.bgtotal,
                            itemStyle: {
                              color: theme === 'dark' ? '#ffffff' : theme.textColor
                            },
                            itemMarginTop: 0,
                            itemMarginBottom: 0,
                            itemDistance: 20
                          }
                        }
                      }}
                    />
                  )}
                </ErrorBoundary>
                
                {/* Simple overlay to hide any white spaces */}
                <ChartOverlay theme={theme} />
                
                {/* Bottom Overlay with curved corners */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: theme.bgtotal,
                    zIndex: 4,
                    pointerEvents: 'none',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px'
                  }}
                />
                
                {/* Additional curved corner masking element */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '16px',
                    background: theme.bgtotal,
                    zIndex: 10,
                    pointerEvents: 'none',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px'
                  }}
                />
              </ChartContainer>
            </Card>
          </StyledCard>
        </UI5ThemeProvider>
      </ChartWrapper>
    </Container>
  );
}