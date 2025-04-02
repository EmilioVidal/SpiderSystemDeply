import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? 'var(--sapBackgroundColor)' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? 'var(--sapTextColor)' : '#1d2d3e'};
`;

export const PageHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: ${props => props.theme === 'dark' ? 'var(--sapTextColor)' : '#1d2d3e'};
  }
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? 'var(--sapTextColor)' : '#1d2d3e'};
  margin: 0;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

export const StatCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'var(--sapTile_Background)' : '#ffffff'};
  border-radius: 12px;
  padding: 20px;
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

    &.total {
      background: ${props => props.theme === 'dark' ? '#5856d6' : '#1976d2'};
    }

    &.available {
      background: ${props => props.theme === 'dark' ? '#2e7d32' : '#388e3c'};
    }

    &.warning {
      background: ${props => props.theme === 'dark' ? '#ed6c02' : '#f57c00'};
    }

    &.danger {
      background: ${props => props.theme === 'dark' ? '#d32f2f' : '#f44336'};
    }
  }

  .stat-info {
    flex: 1;

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
  }
`;

export const TableWrapper = styled.div`
  background: ${props => props.theme === 'dark' ? 'var(--sapTile_Background)' : '#ffffff'};
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${props => props.theme === 'dark' 
    ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
    : '0 1px 3px rgba(0, 0, 0, 0.1)'};
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'var(--sapTile_BorderColor)' 
    : '#e5e7eb'};
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.theme === 'dark' ? 'var(--sapField_Background)' : '#ffffff'};
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'var(--sapField_BorderColor)' 
    : '#e5e7eb'};
  border-radius: 8px;
  padding: 8px 12px;
  flex: 1;
  max-width: 400px;

  &:focus-within {
    border-color: ${props => props.theme === 'dark' 
      ? 'var(--sapField_Hover_BorderColor)' 
      : '#1976d2'};
  }
`;

export const TextField = styled.input`
  border: none;
  background: none;
  outline: none;
  width: 100%;
  color: ${props => props.theme === 'dark' ? 'var(--sapField_TextColor)' : '#1d2d3e'};
  font-size: 14px;

  &::placeholder {
    color: ${props => props.theme === 'dark' ? 'var(--sapContent_LabelColor)' : '#6b7280'};
  }
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? 'var(--sapContent_LabelColor)' : '#6b7280'};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  &:hover {
    color: ${props => props.theme === 'dark' ? '#ffffff' : '#1d2d3e'};
  }
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.theme === 'dark' ? '#5856d6' : '#1976d2'};
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#4a47d1' : '#1565c0'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const RealTimeIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${props => props.theme === 'dark' ? 'rgba(144, 202, 249, 0.15)' : '#e3f2fd'};
  border-radius: 20px;
  color: ${props => props.theme === 'dark' ? '#90caf9' : '#1976d2'};
  font-size: 14px;
  font-weight: 500;

  svg {
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const AlertsContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 24px;
  padding-right: 8px;
  
  /* Estilizar la barra de scroll */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f1f1f1'};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#888'};
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#555'};
    }
  }
`;

export const AlertBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;

  &:last-child {
    margin-bottom: 0;
  }

  background: ${props => props.tipo === 'error' 
    ? (props.theme === 'dark' ? 'rgba(239, 83, 80, 0.15)' : '#ffebee')
    : (props.theme === 'dark' ? 'rgba(255, 183, 77, 0.15)' : '#fff3e0')};

  color: ${props => props.tipo === 'error'
    ? (props.theme === 'dark' ? '#ef5350' : '#d32f2f')
    : (props.theme === 'dark' ? '#ffb74d' : '#ed6c02')};

  border: 1px solid ${props => props.tipo === 'error'
    ? (props.theme === 'dark' ? 'rgba(239, 83, 80, 0.3)' : 'rgba(239, 83, 80, 0.2)')
    : (props.theme === 'dark' ? 'rgba(255, 183, 77, 0.3)' : 'rgba(255, 183, 77, 0.2)')};

  @keyframes slideIn {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;