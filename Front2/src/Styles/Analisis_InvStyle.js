import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--sapBackgroundColor);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--sapBackgroundColor);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const AnalyticsCard = styled.div`
  background-color: var(--sapBackgroundColor);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  width: 100%;
  height: auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  margin-top: 1rem;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--sapContent_ForegroundBorderColor);
  }
  
  th {
    font-weight: 500;
    color: var(--sapTextColor);
    background-color: var(--sapBackgroundColor);
  }
  
  tbody tr:hover {
    background-color: var(--sapList_Hover_Background);
  }
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

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--sapButton_Background);
  color: var(--sapButton_TextColor);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--sapButton_Hover_Background);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--sapButton_Background);
  color: var(--sapButton_TextColor);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--sapButton_Hover_Background);
  }
`;
