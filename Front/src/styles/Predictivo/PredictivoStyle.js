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
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : theme.textColor};
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  
  h4 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme === 'dark' ? '#ffffff' : theme.textColor};
    text-shadow: ${({ theme }) => theme === 'dark' ? '0px 1px 2px rgba(0, 0, 0, 0.8)' : 'none'};
  }
  
  button {
    color: ${({ theme }) => theme === 'dark' ? '#ffffff' : theme.textColor};
  }
`;

export const ChartContainer = styled.div`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  border-radius: 8px;
  padding: 16px;
  color: ${({ theme }) => theme.textColor};
  position: relative;
  
  /* Ensure all direct children have the correct background */
  & > div {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Fix for layered backgrounds */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.bgtotal};
    z-index: 0;
  }
`;

// Add a bottom cover component to hide any remaining white space
export const ChartBottomCover = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: ${({ theme }) => theme.bgtotal};
  z-index: 2;
  pointer-events: none;
  
  /* Create a curved top edge to match the chart curve */
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

// Add these styles to override the UI5 Card component
export const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  
  /* Target all UI5 card elements */
  .ui5-card-root,
  .ui5-card__header,
  .ui5-card__content,
  div[ui5-card],
  .ui5-card-inner,
  [class*="ui5-card-inner"],
  [class*="ui5-busy-indicator"],
  div[part="root"],
  div[part="content"] {
    background-color: ${({ theme }) => theme.bgtotal} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
    border-bottom-color: ${({ theme }) => theme.bg3} !important;
    border-radius: 8px !important;
    color: ${({ theme }) => theme.textColor} !important;
  }
  
  /* Override any UI5 web component's default styles */
  ::part(root),
  ::part(content),
  ::part(header) {
    background-color: ${({ theme }) => theme.bgtotal} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
  }
`;

// Simple global styles that won't cause rendering issues
export const UI5ChartGlobalStyles = createGlobalStyle`
  /* Fix for multiple background layers */
  body .ui5-content-density-compact *,
  body .sapUiSizeCompact *,
  body .sapUiBody *,
  .ui5-webcomponents-react-provider * {
    background-color: transparent;
  }
  
  /* Critical fix for border-bottom color */
  div, section, article, main, footer, header, aside, nav {
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Custom fix for the div.sc-dgykE element */
  div[class*="dgykE"],
  div[class*="ffoNMw"],
  div[class*="sc-"] {
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Custom fix for the element in screenshot */
  div[class*="dgykE"]:after,
  div[class*="ffoNMw"]:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background-color: ${({ theme }) => theme.bgtotal} !important;
    z-index: 9999;
  }
  
  /* Override Card bottom corners */
  ui5-card,
  ui5-card::part(root),
  ui5-card::part(content),
  ui5-card::shadow-root > .ui5-card-root,
  .ui5-card-root {
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
    overflow: hidden !important;
  }
  
  /* Override the UI5 component backgrounds */
  body .ui5-content-density-compact .ui5-chart-container,
  body .ui5-content-density-compact .ui5-chart-canvas,
  body .sapUiSizeCompact .ui5-chart-container,
  body .sapUiSizeCompact .ui5-chart-canvas {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Override card components specifically */
  div.ui5-card-root,
  div.ui5-card-inner,
  div[ui5-card],
  ui5-card,
  ui5-card::part(root),
  ui5-card::part(content),
  div[class*="ui5-card"],
  div[class*="ui5-card-inner"],
  div[part="root"],
  div[part="content"],
  [class*="ui5-busy-indicator"] {
    background-color: transparent !important;
    border-color: transparent !important;
    border-bottom-color: transparent !important;
  }
  
  /* Target the rounded corner container */
  [class*="ui5-busy-indicator-root"],
  [class*="ui5-card-root"] {
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    background-color: ${({ theme }) => theme.bgtotal} !important;
    overflow: hidden !important;
  }
  
  /* Target any container that might be causing a white background */
  .MuiPaper-root,
  .ui5-webcomponents-react-card-root,
  .ui5-webcomponents-react-card,
  .ui5-webcomponents-react-card-header,
  .ui5-webcomponents-react-card-content,
  [data-component-name="Card"],
  [data-component-name="CardHeader"],
  [data-component-name="CardContent"] {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Basic styling for chart elements */
  .ui5-chart-container,
  .ui5-chart,
  .ui5-chart-wrapper,
  .ui5-chart-canvas,
  svg,
  rect {
    background-color: ${({ theme }) => theme.bgtotal} !important;
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target the bottom rounded corner specifically */
  .highcharts-root svg > path,
  .highcharts-root > path,
  svg > path[fill="white"],
  svg > path[fill="#ffffff"],
  path[d*="A"],
  path.highcharts-background,
  .recharts-curve,
  rect.highcharts-background {
    fill: ${({ theme }) => theme.bgtotal} !important;
    stroke: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Fix for rounded corners at bottom */
  svg path {
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target SVG elliptical arc paths that might create rounded corners */
  path[d*="A"],
  path[d*="a"] {
    fill: ${({ theme }) => theme.bgtotal} !important;
    stroke: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target the chart background specifically */
  .ui5-chart-background,
  .ui5-chart-container .background,
  [data-component-name="ChartBackground"],
  .ui5-webcomponents-react-charts-background,
  .ui5-webcomponents-react-charts-canvas {
    background-color: ${({ theme }) => theme.bgtotal} !important;
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Also target any canvas elements */
  canvas {
    background-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target the specific white rounded corner element */
  .highcharts-container .highcharts-background,
  .highcharts-container svg > *:first-child,
  svg > path:first-of-type,
  g.highcharts-container path {
    fill: ${({ theme }) => theme.bgtotal} !important;
    stroke: none !important;
  }
  
  /* Override any hardcoded white backgrounds */
  [style*="background-color: white"],
  [style*="background-color: #fff"],
  [style*="background-color: #ffffff"],
  [style*="background-color: rgb(255, 255, 255)"],
  [style*="background: white"],
  [style*="background: #fff"],
  [style*="background: #ffffff"],
  [style*="background: rgb(255, 255, 255)"] {
    background-color: ${({ theme }) => theme.bgtotal} !important;
    background: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target the rect elements with white fill */
  rect[fill="white"],
  rect[fill="#fff"],
  rect[fill="#ffffff"],
  rect[fill="rgb(255, 255, 255)"],
  *[fill="white"],
  *[fill="#fff"],
  *[fill="#ffffff"],
  *[fill="rgb(255, 255, 255)"] {
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Title and text colors */
  text {
    fill: ${({ theme }) => theme === 'dark' ? '#ffffff' : theme.textColor} !important;
    font-weight: ${({ theme }) => theme === 'dark' ? 500 : 400} !important;
    text-shadow: ${({ theme }) => theme === 'dark' ? '0px 1px 1px rgba(0, 0, 0, 0.5)' : 'none'} !important;
  }
  
  /* Improve legend text visibility */
  .ui5-legend-item text,
  .recharts-legend-item-text,
  .highcharts-legend-item text,
  .highcharts-legend text,
  .recharts-default-legend,
  .ui5-chart-legend,
  .ui5-chart-legend-item,
  .ui5-chart-legend-item-text,
  .recharts-legend,
  .recharts-legend-item,
  .recharts-legend-wrapper,
  [data-component-name="ChartLegend"],
  .ui5-viz-legend,
  .ui5-chart-popover {
    fill: ${({ theme }) => theme === 'dark' ? '#ffffff' : theme.textColor} !important;
    color: ${({ theme }) => theme === 'dark' ? '#ffffff' : theme.textColor} !important;
    font-weight: ${({ theme }) => theme === 'dark' ? 500 : 400} !important;
    text-shadow: ${({ theme }) => theme === 'dark' ? '0px 1px 1px rgba(0, 0, 0, 0.5)' : 'none'} !important;
    visibility: visible !important;
    opacity: 1 !important;
    display: block !important;
    z-index: 50 !important;
  }
  
  /* Ensure legend container is visible */
  [data-component-name="ChartLegend"],
  .ui5-viz-legend,
  .ui5-chart-legend,
  .recharts-legend-wrapper,
  .highcharts-legend {
    visibility: visible !important;
    opacity: 1 !important;
    display: block !important;
    z-index: 50 !important;
    margin-right: 10px !important;
  }
  
  /* Improve legend layout and make items horizontal */
  .ui5-legend-item, 
  .highcharts-legend-item, 
  .recharts-default-legend, 
  .recharts-legend-item,
  .ui5-chart-legend-item {
    display: inline-block !important;
    margin-right: 15px !important;
    white-space: nowrap !important;
  }
  
  /* Target additional chart library legend containers */
  .highcharts-legend-item-group,
  .recharts-default-legend {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
  }
  
  /* Ensure legend items have proper spacing */
  .recharts-legend-item + .recharts-legend-item,
  .ui5-chart-legend-item + .ui5-chart-legend-item,
  .highcharts-legend-item + .highcharts-legend-item {
    margin-left: 10px !important;
  }
  
  /* Make sure chart right area doesn't cover the legend */
  .ChartOverlay,
  .ChartBottomCover {
    right: 120px !important;
    z-index: 1 !important;
  }
  
  /* Improve axis label visibility */
  .recharts-cartesian-axis-tick-value,
  .ui5-axis-label,
  .highcharts-axis-labels text {
    fill: ${({ theme }) => theme === 'dark' ? '#ffffff' : theme.textColor} !important;
    font-weight: ${({ theme }) => theme === 'dark' ? 500 : 400} !important;
    text-shadow: ${({ theme }) => theme === 'dark' ? '0px 1px 1px rgba(0, 0, 0, 0.5)' : 'none'} !important;
  }
`;

/* Override the UI5 Card bottom radius */
export const CardBottomFix = createGlobalStyle`
  /* Target the specific elements from the screenshot */
  div[class*="eTZCsL"],
  div[class*="bYuLVA"],
  div[class*="eTZCsLbYuLVA"],
  div[class="sc-eTZCsL bYuLVA"] {
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
    background-color: ${({ theme }) => theme.bgtotal} !important;
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    overflow: hidden !important;
  }
  
  /* Target ui5-card border properties specifically */
  ui5-card,
  ui5-card-root,
  ui5-card-inner,
  .ui5-card-root,
  .ui5-card-inner {
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
    border-bottom: none !important;
  }
  
  /* Target all elements that might have rounded corners */
  .ui5-card-inner, 
  [class*="ui5-card-inner"],
  [class*="ui5-busy-indicator"],
  [class*="ui5-busy-indicator-root"],
  div[part="root"],
  div[part="content"],
  ui5-card::part(root),
  ui5-card::part(content),
  div[class*="sc-"],
  div[class*="sc-dgykE"],
  div[class*="ffoNMw"],
  div[class*="dgykE"] {
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    background-color: ${({ theme }) => theme.bgtotal} !important;
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
  }
  
  /* Force all border-bottoms to use theme color */
  .ui5-card-fix *,
  ui5-card *,
  .ui5-card-inner *,
  [class*="ui5-"] * {
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target specifically border properties */
  *, *::before, *::after {
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target the bottom border or curved element specifically */
  [style*="border-bottom-color: white"],
  [style*="border-bottom-color: #fff"],
  [style*="border-bottom-color: #ffffff"],
  [style*="border-bottom-color: rgb(255, 255, 255)"],
  [style*="border-bottom: 1px solid white"],
  [style*="border-bottom: 1px solid #fff"],
  [style*="border-bottom: 1px solid #ffffff"],
  [style*="border-bottom: 1px solid rgb(255, 255, 255)"] {
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
    border-bottom: 1px solid ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target any border property that might be white */
  [style*="border-color: white"],
  [style*="border-color: #fff"],
  [style*="border-color: #ffffff"],
  [style*="border-color: rgb(255, 255, 255)"],
  [style*="border: 1px solid white"],
  [style*="border: 1px solid #fff"],
  [style*="border: 1px solid #ffffff"],
  [style*="border: 1px solid rgb(255, 255, 255)"] {
    border-color: ${({ theme }) => theme.bg3} !important;
  }
  
  /* Target the specific part causing the white background */
  div[class="ui5-card-inner"]::after,
  [class*="ui5-card-inner"]::after,
  [class*="ui5-busy-indicator"]::after,
  ui5-card::after,
  div[class*="sc-"]::after,
  div[class*="sc-dgykE"]::after,
  div[class*="eTZCsLbYuLVA"]::after,
  div[class*="eTZCsL"]::after,
  div[class*="bYuLVA"]::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 16px;
    background-color: ${({ theme }) => theme.bgtotal} !important;
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    z-index: 100 !important;
  }
  
  /* Create a bottom cover that will hide any white borders */
  body::after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background-color: ${({ theme }) => theme.bgtotal};
    z-index: 9999;
  }
  
  /* Target before/after elements that might have a white background */
  div::before, div::after {
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
  }
  
  /* Target .sc-* classes which might be styled-components generated classes */
  [class^="sc-"],
  [class*=" sc-"] {
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Target specifically the styles seen in the DevTools */
  [style*="border-bottom-color: rgb(235, 235, 235)"],
  [style*="border-color: rgb(235, 235, 235)"] {
    border-bottom-color: ${({ theme }) => theme.bgtotal} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
  }
`; 