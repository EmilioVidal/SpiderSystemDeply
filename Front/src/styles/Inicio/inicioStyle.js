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
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  color: var(--sapTitleColor, #32363a);
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const MetricCard = styled.div`
  background-color: var(--sapTile_Background, #fff);
  border-radius: 0.25rem;
  padding: 1.25rem;
  box-shadow: var(--sapContent_Shadow0, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1));
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &:hover {
    box-shadow: var(--sapContent_Shadow1, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px 0 rgba(0, 0, 0, 0.1));
  }
`;

export const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--sapTitleColor, #32363a);
`;

export const MetricTitle = styled.div`
  font-size: 0.875rem;
  color: var(--sapContent_LabelColor, #6a6d70);
`;

export const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  margin: 1rem 0 0.75rem 0;
  color: var(--sapTitleColor, #32363a);
`;

export const ChartContainer = styled.div`
  background-color: var(--sapTile_Background, #fff);
  border-radius: 0.25rem;
  padding: 1.25rem;
  box-shadow: var(--sapContent_Shadow0, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1));
  height: 100%;
`;

export const RecentOrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: var(--sapTile_Background, #fff);
  border-radius: 0.25rem;
  box-shadow: var(--sapContent_Shadow0, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1));
  
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
  }
  
  th {
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--sapContent_LabelColor, #6a6d70);
  }
  
  td {
    font-size: 0.85rem;
  }
  
  thead tr {
    border-bottom: 2px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
  }
  
  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const OrderRow = styled.tr`
  &:hover {
    background-color: var(--sapList_Hover_Background, #f5f5f5);
  }
  
  td.status {
    position: relative;
    
    &::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 6px;
      background-color: ${props => 
        props.status === 'warning' ? 'var(--sapCriticalColor, #e9730c)' :
        props.status === 'info' ? 'var(--sapInformationColor, #0a6ed1)' :
        props.status === 'success' ? 'var(--sapPositiveColor, #107e3e)' :
        'var(--sapNeutralColor, #6a6d70)'
      };
    }
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const ProductCard = styled.div`
  background-color: var(--sapTile_Background, #fff);
  border-radius: 0.25rem;
  box-shadow: var(--sapContent_Shadow0, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1));
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: var(--sapContent_Shadow1, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px 0 rgba(0, 0, 0, 0.1));
  }
`;

export const ProductImage = styled.div`
  height: 160px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }
  
  ${ProductCard}:hover & img {
    transform: scale(1.05);
  }
`;

export const ProductInfo = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--sapTitleColor, #32363a);
  line-height: 1.4;
`;

export const ProductAmount = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  color: var(--sapNeutralTextColor, #6a6d70);
`;

export const InventoryBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: var(--sapContent_ForegroundBorderColor, #e5e5e5);
  border-radius: 4px;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

export const InventoryLabel = styled.div`
  font-size: 0.75rem;
  color: var(--sapContent_LabelColor, #6a6d70);
`;

export const LocationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const LocationCard = styled.div`
  background-color: var(--sapTile_Background, #fff);
  border-radius: 0.25rem;
  padding: 1rem;
  box-shadow: var(--sapContent_Shadow0, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1));
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: var(--sapContent_Shadow1, 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px 0 rgba(0, 0, 0, 0.1));
  }
`;

export const LocationName = styled.h3`
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--sapTitleColor, #32363a);
`;

export const LocationAddress = styled.div`
  font-size: 0.8125rem;
  color: var(--sapContent_LabelColor, #6a6d70);
`;

export const ThemeToggle = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid var(--sapButton_BorderColor, #ababab);
  color: var(--sapButton_TextColor, #32363a);
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--sapButton_Hover_Background, #e5e5e5);
  }
`;
