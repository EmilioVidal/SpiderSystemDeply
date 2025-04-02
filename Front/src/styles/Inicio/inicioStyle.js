import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: var(--sapBackgroundColor);
  color: var(--sapTextColor);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--sapContent_ForegroundBorderColor);
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  color: var(--sapTitleColor);
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1rem;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const MetricCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--sapTile_Background);
  border-radius: 0.5rem;
  box-shadow: var(--sapContent_Shadow0);
`;

export const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--sapTitleColor);
`;

export const MetricTitle = styled.div`
  font-size: 0.875rem;
  color: var(--sapContent_LabelColor);
  margin-top: 0.25rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--sapTitleColor);
  margin: 0 0 1rem 0;
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
  background-color: var(--sapList_Background);
  border-radius: 0.5rem;
  box-shadow: var(--sapContent_Shadow0);

  th {
    text-align: left;
    padding: 1rem;
    font-weight: 600;
    color: var(--sapTitleColor);
    border-bottom: 1px solid var(--sapList_BorderColor);
  }

  td {
    padding: 1rem;
    color: var(--sapTextColor);
    border-bottom: 1px solid var(--sapList_BorderColor);

    &.status {
      font-weight: 500;
    }
  }
`;

export const OrderRow = styled.tr`
  &:hover {
    background-color: var(--sapList_Hover_Background);
  }

  td.status {
    color: ${({ status }) => 
      status === 'success' ? 'var(--sapSuccessColor)' :
      status === 'warning' ? 'var(--sapWarningColor)' :
      status === 'info' ? 'var(--sapInformationColor)' :
      'var(--sapNeutralColor)'};
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

export const LocationCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background-color: var(--sapTile_Background);
  border-radius: 0.5rem;
  box-shadow: var(--sapContent_Shadow0);
`;

export const LocationName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: var(--sapTitleColor);
  margin-bottom: 0.25rem;
`;

export const LocationAddress = styled.div`
  font-size: 0.875rem;
  color: var(--sapContent_LabelColor);
  line-height: 1.4;
`;

export const StoreSelector = styled.div`
  position: relative;
  z-index: 100;
`;

export const StoreSelectorButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--sapTile_Background);
  border: 1px solid var(--sapContent_ForegroundBorderColor);
  border-radius: 8px;
  cursor: pointer;
  min-width: 320px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--sapList_Hover_Background);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--sapContent_FocusColor);
  }
`;
