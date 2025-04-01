import styled from "styled-components";

// Contenedor principal
export const Container = styled.div`
  height: 100%;
  padding: 16px;
  overflow-y: auto;
`;

// Estilos del encabezado
export const PageHeader = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--sapTextColor, #32363a);
`;

// Estilos de los filtros
export const FiltersArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  span {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.875rem;
    color: var(--sapContent_LabelColor, #6a6d70);
  }
`;

export const FilterSelect = styled.select`
  padding: 6px 12px;
  border: 1px solid var(--sapField_BorderColor, #89919a);
  border-radius: 4px;
  background-color: var(--sapField_Background, #fff);
  color: var(--sapTextColor, #32363a);
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: var(--sapField_Hover_BorderColor, #0854a0);
  }
`;

// Estilos del área de contenido
export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Estilos para las tarjetas de métricas
export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  background-color: var(--sapTile_Background, #fff);
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--sapTile_TitleTextColor, #32363a);
`;

export const CardContent = styled.div`
  padding: 16px;
  flex: 1;
`;

export const CardFooter = styled.div`
  padding: 8px 16px;
  background-color: var(--sapTile_FooterBackground, #f5f5f5);
  border-top: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
`;

export const FooterText = styled.div`
  font-size: 0.75rem;
  color: var(--sapContent_LabelColor, #6a6d70);
`;

export const MetricValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--sapTile_TextColor, #32363a);
  margin-bottom: 8px;
`;

export const MetricInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: ${props => props.positive ? 'var(--sapPositiveTextColor, #107e3e)' : 'var(--sapNegativeTextColor, #bb0000)'};
  
  svg {
    font-size: 1rem;
  }
`;

// Estilos para las filas de contenido
export const RowContainer = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

// Estilos para las tarjetas de gráficos
export const ChartCard = styled.div`
  background-color: var(--sapTile_Background, #fff);
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ChartContent = styled.div`
  padding: 16px;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

// Estilos para tablas
export const TableContent = styled.div`
  padding: 0;
  overflow-x: auto;
`;

export const StoreTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  
  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
  }
  
  th {
    background-color: var(--sapList_HeaderBackground, #f2f2f2);
    font-weight: 500;
    color: var(--sapContent_LabelColor, #6a6d70);
  }
`;

// Estilos para barras de progreso
export const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--sapContent_ForegroundBorderColor, #e5e5e5);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.width >= 100 ? 'var(--sapPositiveElementColor, #107e3e)' : 'var(--sapHighlightColor, #0854a0)'};
  border-radius: 4px;
  position: relative;
`;

export const ProgressLabel = styled.span`
  position: absolute;
  right: -25px;
  top: -3px;
  font-size: 0.75rem;
  color: var(--sapTextColor, #32363a);
`;

// Estilos para gráficos de barras
export const BarChart = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BarGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const BarLabel = styled.div`
  width: 150px;
  font-size: 0.875rem;
  color: var(--sapContent_LabelColor, #6a6d70);
`;

export const BarContainer = styled.div`
  flex: 1;
  height: 24px;
  background-color: var(--sapContent_ForegroundBorderColor, #e5e5e5);
  border-radius: 4px;
  overflow: hidden;
`;

export const Bar = styled.div`
  height: 100%;
  width: ${props => props.width};
  background-color: ${props => props.color || 'var(--sapHighlightColor, #0854a0)'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

export const BarValue = styled.div`
  font-size: 0.875rem;
  color: white;
  font-weight: 500;
`;

// Estilos para gráficos de dona
export const DonutContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 24px;
`;

export const Donut = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: var(--sapContent_ForegroundBorderColor, #e5e5e5);
`;

export const DonutSegment = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  clip: rect(0, 180px, 180px, 90px);
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    clip: rect(0, 90px, 180px, 0);
    transform: ${props => `rotate(${props.index * (360 / props.count)}deg)`};
    background-color: ${props => props.color};
  }
`;

export const DonutLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const DonutValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--sapTile_TextColor, #32363a);
`;

export const DonutText = styled.div`
  font-size: 0.75rem;
  color: var(--sapContent_LabelColor, #6a6d70);
`;

// Estilos para leyendas
export const DonutLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${props => props.color};
`;

export const LegendText = styled.div`
  font-size: 0.875rem;
  color: var(--sapContent_LabelColor, #6a6d70);
`;

// Estilos para gráficos de línea
export const LineChart = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const LineChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: var(--sapContent_LabelColor, #6a6d70);
  font-weight: 500;
`;

export const LineChartContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// Estilos para tendencias
export const TrendRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const TrendName = styled.div`
  width: 180px;
  font-size: 0.875rem;
  color: var(--sapTextColor, #32363a);
`;

export const TrendBarContainer = styled.div`
  flex: 1;
  height: 24px;
  background-color: var(--sapContent_ForegroundBorderColor, #e5e5e5);
  border-radius: 4px;
  overflow: hidden;
  margin-right: 16px;
`;

export const TrendBar = styled.div`
  height: 100%;
  width: ${props => props.width};
  background-color: ${props => props.color || 'var(--sapHighlightColor, #0854a0)'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

export const TrendValue = styled.div`
  font-size: 0.875rem;
  color: white;
  font-weight: 500;
`;

export const TrendChange = styled.div`
  width: 70px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: ${props => props.positive ? 'var(--sapPositiveTextColor, #107e3e)' : 'var(--sapNegativeTextColor, #bb0000)'};
  font-weight: 500;
`;

// Estilos para KPIs
export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  height: 100%;
`;

export const KpiItem = styled.div`
  background-color: var(--sapTile_Background, #fff);
  border: 1px solid var(--sapContent_ForegroundBorderColor, #e5e5e5);
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const KpiLabel = styled.div`
  font-size: 0.875rem;
  color: var(--sapContent_LabelColor, #6a6d70);
  margin-bottom: 8px;
`;

export const KpiValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--sapTile_TextColor, #32363a);
  margin-bottom: 4px;
`;

export const KpiTrend = styled.div`
  font-size: 0.875rem;
  color: ${props => props.positive ? 'var(--sapPositiveTextColor, #107e3e)' : 'var(--sapNegativeTextColor, #bb0000)'};
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
`;
