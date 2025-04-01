import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
  background-color: var(--sapBackgroundColor, #f7f7f7);
  color: var(--sapTextColor, #32363a);
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  color: var(--sapTitleColor, #32363a);
`;

export const FiltersArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 0.75rem;
  background-color: var(--sapList_Background, #fff);
  border-radius: 0.25rem;
  box-shadow: var(--sapContent_Shadow0, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1));
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--sapContent_LabelColor, #6a6d70);
  }
`;

export const FilterSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--sapField_BorderColor, #bfbfbf);
  border-radius: 0.25rem;
  background-color: var(--sapField_Background, #fff);
  color: var(--sapField_TextColor, #32363a);
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: var(--sapField_Hover_BorderColor, #0854a0);
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.25rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? 'var(--sapSelectedColor, #0854a0)' : 'transparent'};
  color: ${props => props.active ? 'var(--sapSelectedColor, #0854a0)' : 'var(--sapContent_LabelColor, #6a6d70)'};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--sapList_Hover_Background, #f5f5f5);
  }
`;

export const ContentArea = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.25rem;
`;

export const AnalyticsCard = styled.div`
  background-color: var(--sapTile_Background, #fff);
  border-radius: 0.25rem;
  box-shadow: var(--sapContent_Shadow0, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1));
  overflow: hidden;
  
  &:hover {
    box-shadow: var(--sapContent_Shadow1, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px 0 rgba(0, 0, 0, 0.1));
  }
`;

export const CardHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--sapTitleColor, #32363a);
`;

export const CardContent = styled.div`
  padding: 1rem;
`;

export const MetricValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--sapTitleColor, #32363a);
  margin-bottom: 0.25rem;
`;

export const MetricLabel = styled.span`
  font-size: 0.8125rem;
  color: var(--sapContent_LabelColor, #6a6d70);
  margin-left: 0.5rem;
`;

export const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.positive ? 'var(--sapPositiveTextColor, #107e3e)' : 'var(--sapNegativeTextColor, #bb0000)'};
`;

export const ChartContainer = styled.div`
  height: 100%;
  min-height: 200px;
  padding: 0.5rem 0;
`;

export const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: var(--sapContent_LabelColor, #6a6d70);
`;

export const InfoText = styled.div`
  font-size: 0.875rem;
  color: var(--sapInformativeTextColor, #0070f2);
  font-weight: 500;
`;

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
  }
  
  th {
    font-weight: 600;
    font-size: 0.75rem;
    color: var(--sapContent_LabelColor, #6a6d70);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  td {
    font-size: 0.875rem;
  }
  
  tbody tr:hover {
    background-color: var(--sapList_Hover_Background, #f5f5f5);
  }
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch(props.status) {
      case 'success':
        return `
          background-color: var(--sapPositiveBackground, #e5f0e5);
          color: var(--sapPositiveTextColor, #107e3e);
        `;
      case 'warning':
        return `
          background-color: var(--sapWarningBackground, #fef7ed);
          color: var(--sapWarningTextColor, #e9730c);
        `;
      case 'error':
        return `
          background-color: var(--sapErrorBackground, #fae5e5);
          color: var(--sapErrorTextColor, #bb0000);
        `;
      default:
        return `
          background-color: var(--sapNeutralBackground, #f4f4f4);
          color: var(--sapNeutralTextColor, #6a6d70);
        `;
    }
  }}
`;

export const CategoryPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  background-color: var(--sapNeutralBackground, #f4f4f4);
  color: var(--sapNeutralTextColor, #6a6d70);
`;

export const TableActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: var(--sapButton_Background, #0854a0);
  color: var(--sapButton_TextColor, #fff);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--sapButton_Hover_Background, #066bbf);
  }
`;

export const LowStockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const LowStockItem = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr) 1.5fr;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
  
  &:hover {
    background-color: var(--sapList_Hover_Background, #f5f5f5);
  }
`;

export const LowStockName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const LowStockDetails = styled.div`
  font-size: 0.8125rem;
  color: var(--sapContent_LabelColor, #6a6d70);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LowStockAction = styled.div`
  text-align: right;
`;

export const MovementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MovementItem = styled.div`
  display: grid;
  grid-template-columns: auto 3fr 2fr 1fr;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
  
  &:hover {
    background-color: var(--sapList_Hover_Background, #f5f5f5);
  }
`;

export const MovementIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  
  ${props => {
    switch(props.type) {
      case 'entrada':
        return `
          background-color: var(--sapPositiveBackground, #e5f0e5);
          color: var(--sapPositiveTextColor, #107e3e);
        `;
      case 'salida':
        return `
          background-color: var(--sapNeutralBackground, #f4f4f4);
          color: var(--sapNeutralTextColor, #6a6d70);
        `;
      case 'traslado':
        return `
          background-color: var(--sapInformationBackground, #e8f2fc);
          color: var(--sapInformativeTextColor, #0070f2);
        `;
      default:
        return `
          background-color: var(--sapNeutralBackground, #f4f4f4);
          color: var(--sapNeutralTextColor, #6a6d70);
        `;
    }
  }}
`;

export const MovementDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const MovementType = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  
  ${props => {
    switch(props.type) {
      case 'entrada':
        return `color: var(--sapPositiveTextColor, #107e3e);`;
      case 'salida':
        return `color: var(--sapNeutralTextColor, #6a6d70);`;
      case 'traslado':
        return `color: var(--sapInformativeTextColor, #0070f2);`;
      default:
        return `color: var(--sapNeutralTextColor, #6a6d70);`;
    }
  }}
`;

export const MovementInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8125rem;
`;

export const MovementDate = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: var(--sapContent_LabelColor, #6a6d70);
`;

export const PerformanceBar = styled.div`
  height: 8px;
  width: 100%;
  background-color: var(--sapContent_ForegroundBorderColor, #e5e5e5);
  border-radius: 4px;
  overflow: hidden;
  
  > div {
    height: 100%;
    background-color: var(--sapChart_OrderedColor_1, #5899da);
    border-radius: 4px;
  }
`;

export const PerformanceLabel = styled.div`
  font-size: 0.75rem;
  color: var(--sapNeutralTextColor, #6a6d70);
  text-align: right;
`;
