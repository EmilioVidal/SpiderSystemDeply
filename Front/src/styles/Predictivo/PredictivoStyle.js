import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  padding: 24px;
  background-color: ${props => props.theme === 'dark' ? 'var(--sapBackgroundColor)' : '#f5f5f5'};
  min-height: 100vh;
  color: ${props => props.theme === 'dark' ? 'var(--sapTextColor)' : '#1d2d3e'};
`;

export const PageHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: ${({ theme }) => theme === 'dark' ? 'var(--sapContent_IconColor)' : '#1d2d3e'};
  }
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme === 'dark' ? 'var(--sapTextColor)' : '#1d2d3e'};
  margin: 0;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

export const StatCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'var(--sapTile_Background)' : '#ffffff'};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: ${props => props.theme === 'dark' 
    ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
    : '0 1px 3px rgba(0, 0, 0, 0.1)'};
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'var(--sapTile_BorderColor)' 
    : '#e5e7eb'};

  .icon-container {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;

    &.precision {
      background: ${props => props.theme === 'dark' ? '#5856d6' : '#1976d2'};
    }

    &.tendencia {
      background: ${props => props.theme === 'dark' ? '#2e7d32' : '#388e3c'};
    }

    &.diferencia {
      background: ${props => props.theme === 'dark' ? '#d32f2f' : '#f44336'};
    }

    &.confianza {
      background: ${props => props.theme === 'dark' ? '#ed6c02' : '#f57c00'};
    }
  }

  .stat-info {
    flex: 1;
  }

  .stat-value {
    font-size: 24px;
    font-weight: 600;
    color: ${props => props.theme === 'dark' ? 'var(--sapTextColor)' : '#1d2d3e'};
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 14px;
    color: ${props => props.theme === 'dark' ? 'var(--sapContent_LabelColor)' : '#6b7280'};
  }
`;

export const ChartCard = styled.div`
  background: ${({ theme }) => theme === 'dark' ? 'var(--sapTile_Background)' : '#fff'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: ${({ theme }) => 
    theme === 'dark' 
      ? 'var(--sapContent_Shadow0)' 
      : '0 2px 4px rgba(0, 0, 0, 0.1)'};
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  h4 {
    margin: 0;
    color: ${({ theme }) => theme === 'dark' ? 'var(--sapTextColor)' : '#1d2d3e'};
  }
`;

export const ChartDescription = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme === 'dark' ? 'var(--sapContent_LabelColor)' : '#6b7280'};
  font-size: 0.875rem;
`;

export const ChartContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme === 'dark' ? 'var(--sapList_Background)' : '#fff'};
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
`;

// Estilos globales para los gráficos UI5
export const UI5ChartGlobalStyles = styled.div`
  .ui5-chart-popover,
  .ui5-chart-canvas,
  .ui5-chart-legend,
  [data-component-name="ChartLegend"],
  [data-component-name="ChartContainer"] {
    background-color: ${({ theme }) => 
      theme === 'dark' 
        ? 'var(--sapList_Background)' 
        : '#fff'} !important;
  }

  .ui5-chart-container svg,
  .ui5-chart svg,
  .highcharts-container svg,
  .recharts-wrapper svg {
    background-color: ${({ theme }) => 
      theme === 'dark' 
        ? 'var(--sapList_Background)' 
        : '#fff'};
  }

  .ui5-chart-container rect[fill="white"],
  .ui5-chart-container rect[fill="#ffffff"],
  .ui5-chart-container rect[fill="#FFFFFF"] {
    fill: ${({ theme }) => 
      theme === 'dark' 
        ? 'var(--sapList_Background)' 
        : '#fff'} !important;
  }
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

/* Override the UI5 Card bottom radius */
export const CardBottomFix = createGlobalStyle`
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
  div[class*="sc-dgykE"]::after {
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
`;

export const AlertContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AlertCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'var(--sapTile_Background)' : '#ffffff'};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  box-shadow: ${props => props.theme === 'dark' 
    ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
    : '0 1px 3px rgba(0, 0, 0, 0.1)'};
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'var(--sapTile_BorderColor)' 
    : '#e5e7eb'};

  .alert-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme === 'dark' ? '#d32f2f' : '#f44336'};
    color: #ffffff;
  }

  .alert-content {
    flex: 1;
  }

  .alert-title {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme === 'dark' ? 'var(--sapTextColor)' : '#1d2d3e'};
    margin-bottom: 8px;
  }

  .alert-details {
    display: flex;
    gap: 16px;
    margin-bottom: 8px;
    font-size: 14px;
    color: ${props => props.theme === 'dark' ? 'var(--sapContent_LabelColor)' : '#6b7280'};

    span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .alert-recommendation {
    font-size: 14px;
    color: ${props => props.theme === 'dark' ? 'var(--sapContent_LabelColor)' : '#6b7280'};
    padding: 8px;
    background: ${props => props.theme === 'dark' 
      ? 'rgba(244, 67, 54, 0.1)' 
      : 'rgba(244, 67, 54, 0.05)'};
    border-radius: 8px;
    border: 1px solid ${props => props.theme === 'dark' 
      ? 'rgba(244, 67, 54, 0.2)' 
      : 'rgba(244, 67, 54, 0.1)'};
  }
`; 