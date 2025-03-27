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
  position: relative;
  
  & > div {
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
  .ui5-card__header,
  .ui5-card__content {
    background-color: ${({ theme }) => theme.bgtotal} !important;
    border-color: ${({ theme }) => theme.bg3} !important;
    color: ${({ theme }) => theme.textColor} !important;
  }
`;

// Simple global styles that won't cause rendering issues
export const UI5ChartGlobalStyles = createGlobalStyle`
  /* Basic styling for chart elements */
  .ui5-chart-container,
  svg,
  rect {
    background-color: ${({ theme }) => theme.bgtotal} !important;
    fill: ${({ theme }) => theme.bgtotal} !important;
  }
  
  /* Title and text colors */
  text {
    fill: ${({ theme }) => theme.textColor} !important;
  }
`; 