import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgtotal || "#f7f7f7"};
  color: ${({ theme }) => theme.textColor || "#32363a"};
  font-family: "72", "72full", Arial, Helvetica, sans-serif;
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
  color: #32363a;
`;

export const AlertsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.bgtotal || "#f5f5f5"};
`;

export const AlertItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  width: 100%;
  border-radius: 0.25rem;
  background-color: ${({ type }) => 
    type === "success" ? "#f5faf6" : 
    type === "warning" ? "#fffaf0" : 
    "#fff0f0"};
  border-left: 4px solid ${({ type }) => 
    type === "success" ? "#107e3e" : 
    type === "warning" ? "#e9730c" : 
    "#bb0000"};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
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
  color: #32363a;
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
  background-color: ${({ type }) => 
    type === "success" ? "#107e3e" : 
    type === "warning" ? "#e9730c" : 
    "#bb0000"};
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
  background-color: white;
  border: 1px solid #d9d9d9;
  color: #32363a;
  cursor: pointer;
  height: 2rem;
  transition: background-color 0.1s ease-in-out;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:active {
    background-color: #e6e6e6;
  }
`;

export const FilterToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  background-color: ${({ theme }) => theme.bgtotal || "#f5f5f5"};
  border-bottom: 1px solid #e5e5e5;
  color: #32363a;
  font-size: 0.875rem;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: auto;
  padding: 1rem;
  background-color: #f5f5f5;
`;

export const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  background-color: ${({ active }) => (active ? "#0854a0" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#32363a")};
  border: ${({ active }) => (active ? "none" : "1px solid #d9d9d9")};
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.1s ease-in-out;
  
  &:hover {
    background-color: ${({ active }) => (active ? "#0854a0" : "#f5f5f5")};
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
  border: 1px solid #d9d9d9;
  color: #32363a;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #a6a6a6;
  }
`;
