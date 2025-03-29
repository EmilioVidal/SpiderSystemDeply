import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.textColor};
  font-family: "72", "72full", Arial, Helvetica, sans-serif;
  transition: all 0.3s ease;
`;

export const PageHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.625rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textColor};
`;

export const AlertsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.bgtotal};
  
  /* Custom scrollbar that adapts to theme */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.name === 'dark' ? '#2d3239' : '#f0f0f0'};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.name === 'dark' ? '#6a6d70' : '#c4c4c4'};
    border-radius: 4px;
  }
`;

export const AlertItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  width: 100%;
  border-radius: 0.25rem;
  background-color: ${({ theme, type }) => 
    type === "success" ? (theme.name === 'dark' ? '#132f1e' : '#f5faf6') : 
    type === "warning" ? (theme.name === 'dark' ? '#3a2806' : '#fffaf0') : 
    (theme.name === 'dark' ? '#380000' : '#fff0f0')};
  border-left: 4px solid ${({ type }) => 
    type === "success" ? "#107e3e" : 
    type === "warning" ? "#e9730c" : 
    "#bb0000"};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}, 
              0 1px 3px ${({ theme }) => theme.name === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
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
    type === "success" ? "#107e3e" : 
    type === "warning" ? "#e9730c" : 
    "#bb0000"};
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
  background-color: ${({ theme }) => theme.bgtotal};
  border-bottom: 1px solid ${({ theme }) => theme.name === 'dark' ? '#4d5358' : '#e5e5e5'};
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
  transition: all 0.3s ease;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: auto;
  padding: 1rem;
  background-color: ${({ theme }) => theme.name === 'dark' ? '#1c2228' : '#f5f5f5'};
`;

export const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  background-color: ${({ active, theme }) => active 
    ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
    : (theme.name === 'dark' ? 'transparent' : 'transparent')};
  color: ${({ active, theme }) => active 
    ? 'white' 
    : theme.textColor};
  border: ${({ active, theme }) => active 
    ? 'none' 
    : `1px solid ${theme.name === 'dark' ? '#4d5358' : '#d9d9d9'}`};
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.1s ease-in-out;
  
  &:hover {
    background-color: ${({ active, theme }) => active 
      ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
      : (theme.name === 'dark' ? '#2d3239' : '#f5f5f5')};
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
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.name === 'dark' ? '#4d5358' : '#d9d9d9'};
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  
  &:hover {
    background-color: ${({ theme }) => theme.name === 'dark' ? '#2d3239' : '#f5f5f5'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: ${({ theme }) => theme.name === 'dark' ? '#6a6d70' : '#a6a6a6'};
  }
`;
