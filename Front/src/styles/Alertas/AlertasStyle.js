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

export const AlertsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 2rem;
  background-color: var(--sapBackgroundColor);
  
  .alert-item {
    &:hover {
      background-color: var(--sapList_Hover_Background) !important;
    }
  }
`;

export const AlertItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  width: 100%;
  border-radius: 0.25rem;
  background-color: var(--sapList_Background);
  border-left: 4px solid ${({ type }) => 
    type === "success" ? "var(--sapSuccessColor)" : 
    type === "warning" ? "var(--sapWarningColor)" : 
    "var(--sapErrorColor)"};
  box-shadow: var(--sapContent_Shadow0);
  transition: background-color 0.3s ease;
`;

export const AlertLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AlertIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ type }) => 
    type === "success" ? "var(--sapSuccessColor)" : 
    type === "warning" ? "var(--sapWarningColor)" : 
    "var(--sapErrorColor)"};
`;

export const AlertContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const AlertTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
`;

export const AlertRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 400;
  background-color: ${({ theme, type }) => 
    type === "success" ? (theme.name === 'dark' ? '#0d5e2f' : '#107e3e') : 
    type === "warning" ? (theme.name === 'dark' ? '#d15700' : '#e9730c') : 
    (theme.name === 'dark' ? '#a10000' : '#bb0000')};
  color: white;
`;

export const ResolveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 400;
  background-color: ${({ theme }) => theme.name === 'dark' ? '#2d3239' : 'white'};
  border: 1px solid ${({ theme }) => theme.name === 'dark' ? '#4d5358' : '#d9d9d9'};
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  height: 2rem;
  transition: background-color 0.1s ease-in-out;
  
  &:hover {
    background-color: ${({ theme }) => theme.name === 'dark' ? '#3d4249' : '#f5f5f5'};
  }
  
  &:active {
    background-color: ${({ theme }) => theme.name === 'dark' ? '#4d5259' : '#e6e6e6'};
  }
`;

export const FilterToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  background-color: var(--sapToolbar_Background);
  border-bottom: 1px solid var(--sapContent_ForegroundBorderColor);
  color: var(--sapTextColor);
  font-size: 0.875rem;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem;
`;

export const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  background-color: ${({ active }) => active 
    ? 'var(--sapButton_Selected_Background)'
    : 'var(--sapButton_Background)'};
  color: ${({ active }) => active 
    ? 'var(--sapButton_Selected_TextColor)'
    : 'var(--sapButton_TextColor)'};
  border: 1px solid var(--sapButton_BorderColor);
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background-color: var(--sapButton_Hover_Background);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NavigationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  background-color: var(--sapButton_Background);
  border: 1px solid var(--sapButton_BorderColor);
  color: var(--sapButton_TextColor);
  cursor: pointer;
  
  &:hover {
    background-color: var(--sapButton_Hover_Background);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: var(--sapContent_DisabledTextColor);
  }
`;