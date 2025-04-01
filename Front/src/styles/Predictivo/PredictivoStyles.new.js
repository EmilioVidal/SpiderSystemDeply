import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.textColor};
  padding: 20px;
  flex: 1;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  background: ${({ theme }) => theme.bgtotal};
  border-radius: 8px;
  box-shadow: ${({ theme }) => 
    theme === 'light' 
      ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
      : '0 4px 6px rgba(0, 0, 0, 0.3)'
  };
  padding: 16px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const ChartTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.textColor};
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  
  h4 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
  }
  
  button {
    color: ${({ theme }) => theme.textColor};
  }
`;

export const ChartContainer = styled.div`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  border-radius: 8px;
  padding: 16px;
  color: ${({ theme }) => theme.textColor};
  
  .recharts-wrapper {
    background: ${({ theme }) => theme.bgtotal};
  }
  
  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: ${({ theme }) => theme === 'light' ? '#e0e0e0' : '#4a5568'};
  }
  
  .recharts-cartesian-axis-line {
    stroke: ${({ theme }) => theme === 'light' ? '#e0e0e0' : '#4a5568'};
  }
  
  .recharts-cartesian-axis-tick-value {
    fill: ${({ theme }) => theme.textColor};
  }
  
  .recharts-legend-item-text {
    color: ${({ theme }) => theme.textColor} !important;
  }
  
  .recharts-tooltip-wrapper {
    background-color: ${({ theme }) => theme.bg2} !important;
    border: 1px solid ${({ theme }) => theme.bg3} !important;
    color: ${({ theme }) => theme.textColor} !important;
  }
  
  /* Fix white spaces in chart - more aggressive targeting */
  .ui5-linechart-root,
  .ui5-barchart-root,
  .ui5-chart-root,
  .ui5-chart-container,
  .ui5-linechart-container,
  .ui5-barchart-container,
  .ui5-viz-container,
  div[data-component-name="ChartContainer"],
  div[data-component-name="LineChart"],
  div[data-component-name="BarChart"],
  div[class*="chart-container"],
  div[class*="ChartContainer"],
  div[class*="LineChart"],
  div[class*="BarChart"] {
    background: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target SVG and canvas elements */
  svg,
  canvas,
  svg g,
  svg rect:not([fill]),
  .ui5-chart-canvas,
  .ui5-linechart-svg,
  .ui5-barchart-svg {
    background: ${({ theme }) => theme.bgtotal} !important;
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target background rectangles */
  rect[x="0"][y="0"],
  rect[width="100%"][height="100%"],
  rect.background,
  rect.plot-background,
  rect.plot-area,
  rect[height][width][x="0"][y="0"] {
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  g[clip-path] rect {
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Fix the popover and tooltip style */
  .ui5-chart-popover,
  .ui5-chart-tooltip,
  [role="tooltip"],
  div[data-component-name="ChartPopover"],
  div[data-component-name="ChartTooltip"] {
    background: ${({ theme }) => theme.bg2} !important;
    color: ${({ theme }) => theme.textColor} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
  }
  
  /* Fix axes */
  .ui5-viz-axis,
  g.axis,
  g.x-axis,
  g.y-axis {
    background: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* UI5 specific components */
  .ui5-content-density-compact,
  .sapUiSizeCompact,
  .sapWCChart,
  .sapMLIB {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Specific to UI5 web components */
  ui5-card, 
  ui5-card-header,
  ui5-chart,
  ui5-line-chart,
  ui5-bar-chart {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* MUI paper components */
  .MuiPaper-root,
  .MuiPopover-paper {
    background-color: ${({ theme }) => theme.bg2} !important;
    color: ${({ theme }) => theme.textColor} !important;
  }
  
  /* Hide any potential white backgrounds */
  rect[fill="white"],
  rect[fill="#ffffff"],
  rect[fill="#FFFFFF"],
  *[fill="white"],
  *[fill="#ffffff"],
  *[fill="#FFFFFF"] {
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Override all direct children backgrounds */
  & > * {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
`;

// Add a bottom cover component to hide any remaining white space
export const ChartBottomCover = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.bgtotal};
  z-index: 2;
  pointer-events: none;
`;

// Add these styles to override the UI5 Card component
export const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  
  .ui5-card-root,
  .ui5-card,
  .ui5-card__header,
  .ui5-card__content,
  .ui5-card-header,
  .ui5-card-content,
  .ui5-webcomponents-react-card-root,
  .ui5-webcomponents-react-card-content,
  [data-component-name="Card"],
  [data-component-name="CardHeader"],
  [data-component-name="CardContent"] {
    background-color: ${({ theme }) => theme.bgtotal} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
    color: ${({ theme }) => theme.textColor} !important;
  }
  
  /* Forcefully remove any white backgrounds */
  * {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target the chart container for good measure */
  .ui5-webcomponents-react-chart-container,
  .ui5-chart-container,
  .recharts-wrapper,
  .recharts-surface,
  .recharts-cartesian-grid {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
`;

// Add global styles for UI5 charts to ensure complete theme compliance
export const UI5ChartGlobalStyles = createGlobalStyle`
  /* Global styles to ensure all UI5 chart components respect theme colors */
  .ui5-line-chart-root,
  .ui5-bar-chart-root,
  .ui5-chart-root,
  .ui5__viz-plot-area,
  .ui5__viz-canvas,
  .ui5-viz-wrapper,
  .sapUiChartWrapper,
  .sapWCChartLib,
  .sapSuiteDTChartLib {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Force SVG backgrounds */
  svg {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target chart SVG elements */
  svg.ui5-chart-svg,
  g.ui5-chart-container > svg,
  g.highcharts-root > rect.highcharts-background,
  svg .background {
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Forcibly set all background rectangles in the chart */
  svg rect:first-child,
  g.highcharts-background,
  .highcharts-plot-background,
  .highcharts-plot-border {
    fill: ${({ theme }) => theme.bgtotal} !important;
    stroke: transparent !important;
  }
  
  /* Fix the legend visibility */
  .highcharts-legend,
  .highcharts-legend-item,
  g.highcharts-legend,
  g.highcharts-legend-item,
  .recharts-legend-wrapper,
  .ui5-chart-popover,
  .ui5-chart-legend,
  [data-component-name="ChartLegend"],
  [data-component-name="Legend"] {
    z-index: 50 !important;
    pointer-events: auto !important;
    visibility: visible !important;
    opacity: 1 !important;
    display: block !important;
  }
  
  /* Specifically target the UI5 chart legend */
  .ui5-webcomponents-react-charts-legend,
  .ui5-webcomponents-react-charts-legend-item,
  .ui5-webcomponents-react-charts-legend-item-text,
  div[class*="ui5-webcomponents-react-charts-legend"] {
    visibility: visible !important;
    opacity: 1 !important;
    display: block !important;
    z-index: 50 !important;
    color: ${({ theme }) => theme.textColor} !important;
  }

  /* Make sure the legend container isn't hidden */
  div[class*="ChartContainer"] > div:last-child,
  div[data-component-name="ChartContainer"] > div:last-child {
    visibility: visible !important;
    display: block !important;
    z-index: 100 !important;
  }
  
  /* Fix legend colors */
  .highcharts-legend-item text,
  .highcharts-legend text,
  .recharts-legend-item-text,
  .recharts-default-legend {
    fill: ${({ theme }) => theme.textColor} !important;
    color: ${({ theme }) => theme.textColor} !important;
  }
  
  /* Target the bottom curved area - specific to area/line charts */
  .highcharts-area {
    fill-opacity: 0.1 !important;
  }
  
  /* Important rule for white gradient fill at bottom */
  .highcharts-area-series path {
    fill: ${({ theme }) => theme.bgtotal} !important;
    fill-opacity: 0.1 !important;
  }
  
  /* Final white space at the bottom of the chart */
  .highcharts-root::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background-color: ${({ theme }) => theme.bgtotal} !important;
    z-index: 1;
  }
  
  /* WHITE SPACE BOTTOM SPECIFIC FIX */
  .highcharts-series path,
  .ui5-chart-container::after,
  .ui5-line-chart::after,
  .ui5-bar-chart::after,
  .ui5-viz-container::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px; /* Increased height to ensure it covers the white space */
    background-color: ${({ theme }) => theme.bgtotal} !important;
    z-index: 1;
  }
  
  /* More aggressive targeting for any potential background elements */
  .highcharts-background,
  .highcharts-plot-background,
  .highcharts-plot-border,
  .highcharts-root,
  .highcharts-container,
  .highcharts-plot-box,
  .highcharts-series-group,
  .highcharts-grid,
  .highcharts-grid-line,
  .highcharts-grid path,
  .highcharts-background rect,
  g.highcharts-grid-band,
  g.highcharts-plot-band,
  g.highcharts-plot-lines-0,
  g.highcharts-xaxis-grid,
  g.highcharts-yaxis-grid,
  .highcharts-plot-band,
  .highcharts-pane {
    fill: ${({ theme }) => theme.bgtotal} !important;
    stroke: ${({ theme }) => theme === 'dark' ? '#4a5568' : '#e0e0e0'} !important;
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target all SVG elements */
  svg,
  svg *,
  svg rect,
  svg g,
  svg path,
  svg text,
  svg line {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target all rect elements without specific fill attribute */
  rect:not([fill]),
  rect[fill="none"],
  rect[fill="transparent"] {
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target bottom curve/area white triangle */
  path[fill="url(#highcharts-default-pattern-0)"],
  path[fill^="url("],
  path.highcharts-area,
  path.highcharts-graph,
  .highcharts-area-series .highcharts-area,
  .highcharts-area-series .highcharts-point,
  .highcharts-series-0 path,
  .highcharts-series-1 path,
  .highcharts-area-series path,
  .highcharts-tracker path,
  .highcharts-tracker {
    fill-opacity: 0.2 !important;
    stroke: inherit !important;
    background-color: transparent !important;
  }
  
  /* Force background on card and specific UI5 chart containers */
  ui5-card,
  ui5-card::part(root),
  ui5-card::part(content),
  .ui5-card-root,
  .ui5-card__header,
  .ui5-card__content,
  .ui5-chart-container,
  .ui5-chart-canvas-container,
  .ui5-viz-container,
  .ui5-viz-controls {
    background-color: ${({ theme }) => theme.bgtotal} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
  }
  
  /* Target any classes or elements with explicit white backgrounds */
  *[style*="background-color: rgb(255, 255, 255)"],
  *[style*="background-color: white"],
  *[style*="background-color: #fff"],
  *[style*="background-color: #ffffff"],
  *[style*="background: rgb(255, 255, 255)"],
  *[style*="background: white"],
  *[style*="background: #fff"],
  *[style*="background: #ffffff"] {
    background-color: ${({ theme }) => theme.bgtotal} !important;
    background: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target tooltip and legend elements */
  .highcharts-tooltip-container,
  .highcharts-legend-box,
  .highcharts-tooltip,
  .highcharts-data-label,
  .highcharts-tooltip-box {
    fill: ${({ theme }) => theme.bg2} !important;
    stroke: ${({ theme }) => theme.bg3} !important;
    color: ${({ theme }) => theme.textColor} !important;
  }
  
  /* Force text colors */
  .highcharts-axis-labels text,
  .highcharts-legend-item text,
  .highcharts-title,
  .highcharts-subtitle,
  .highcharts-data-label text {
    fill: ${({ theme }) => theme.textColor} !important;
  }
`; 