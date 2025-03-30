import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

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

export const ContentArea = styled.div`
  flex: 1;
  padding: 0 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StepIndicator = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.name === 'dark' ? '#2d3239' : '#e5e5e5'};
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  border-radius: 4px;
`;

export const StepItem = styled.div`
  display: flex;
  align-items: center;
  color: ${({ active, theme }) => 
    active ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') : theme.textColor};
  font-weight: ${({ active }) => active ? '600' : '400'};
  font-size: 0.875rem;
  
  &:after {
    content: ">>";
    margin: 0 0.5rem;
    font-weight: 400;
    color: ${({ theme }) => theme.name === 'dark' ? '#6a6d70' : '#a6a6a6'};
    font-size: 0.75rem;
  }
  
  &:last-child:after {
    content: "";
    margin: 0;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.name === 'dark' ? '#1e2329' : 'white'};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.name === 'dark' ? '0 1px 4px rgba(0, 0, 0, 0.3)' : '0 1px 4px rgba(0, 0, 0, 0.1)'};
  width: 100%;
`;

export const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.name === 'dark' ? '#4d5358' : '#e5e5e5'};
  font-size: 1.125rem;
  font-weight: 600;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RadioItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${({ selected, theme }) => 
    selected 
      ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
      : (theme.name === 'dark' ? '#4d5358' : '#e5e5e5')};
  border-radius: 4px;
  background-color: ${({ selected, theme }) => 
    selected 
      ? (theme.name === 'dark' ? 'rgba(10, 110, 209, 0.08)' : 'rgba(8, 84, 160, 0.05)') 
      : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme, selected }) => 
      selected 
        ? (theme.name === 'dark' ? 'rgba(10, 110, 209, 0.12)' : 'rgba(8, 84, 160, 0.08)') 
        : (theme.name === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)')};
  }
`;

export const RadioButton = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid ${({ selected, theme }) => 
    selected 
      ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
      : (theme.name === 'dark' ? '#6a6d70' : '#a6a6a6')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
  
  &:after {
    content: "";
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background-color: ${({ selected, theme }) => 
      selected 
        ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
        : 'transparent'};
    display: block;
  }
`;

export const RadioLabel = styled.div`
  flex: 1;
`;

export const RadioTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const RadioSubtitle = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.name === 'dark' ? '#a6a6a6' : '#6a6d70'};
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
`;

export const ProductCard = styled.div`
  border: 1px solid ${({ selected, theme }) => 
    selected 
      ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
      : (theme.name === 'dark' ? '#4d5358' : '#e5e5e5')};
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background-color: ${({ selected, theme }) => 
    selected 
      ? (theme.name === 'dark' ? 'rgba(10, 110, 209, 0.08)' : 'rgba(8, 84, 160, 0.05)') 
      : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme, selected }) => 
      selected 
        ? (theme.name === 'dark' ? 'rgba(10, 110, 209, 0.12)' : 'rgba(8, 84, 160, 0.08)') 
        : (theme.name === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)')};
  }
`;

export const ProductImage = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const ProductName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
`;

export const ProductPrice = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.name === 'dark' ? '#a6a6a6' : '#6a6d70'};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.name === 'dark' ? '#2d3239' : '#f5f5f5'};
  
  th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.875rem;
    border-bottom: 1px solid ${({ theme }) => theme.name === 'dark' ? '#4d5358' : '#e5e5e5'};
  }
`;

export const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.name === 'dark' ? '#4d5358' : '#e5e5e5'};
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  td {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  padding: 0.25rem 0;
  
  &:last-child {
    font-weight: 600;
    font-size: 1rem;
    border-top: 1px solid ${({ theme }) => theme.name === 'dark' ? '#4d5358' : '#e5e5e5'};
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Button = styled.button`
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ primary, theme }) => 
    primary 
      ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
      : (theme.name === 'dark' ? 'transparent' : 'transparent')};
  color: ${({ primary, theme }) => 
    primary 
      ? 'white' 
      : theme.textColor};
  border: 1px solid ${({ primary, theme }) => 
    primary 
      ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
      : (theme.name === 'dark' ? '#4d5358' : '#d9d9d9')};
  
  &:hover {
    background-color: ${({ primary, theme }) => 
      primary 
        ? (theme.name === 'dark' ? '#085caf' : '#074888') 
        : (theme.name === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)')};
  }
  
  &:active {
    background-color: ${({ primary, theme }) => 
      primary 
        ? (theme.name === 'dark' ? '#074888' : '#053c72') 
        : (theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  div {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.25rem;
    border: 2px solid ${({ checked, theme }) => 
      checked 
        ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
        : (theme.name === 'dark' ? '#6a6d70' : '#a6a6a6')};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ checked, theme }) => 
      checked 
        ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
        : 'transparent'};
    transition: all 0.2s ease;
  }
  
  span {
    font-size: 0.875rem;
  }
`;

export const LocationItem = styled.div`
  display: flex;
  padding: 1rem;
  border: 1px solid ${({ selected, theme }) => 
    selected 
      ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
      : (theme.name === 'dark' ? '#4d5358' : '#e5e5e5')};
  border-radius: 4px;
  background-color: ${({ selected, theme }) => 
    selected 
      ? (theme.name === 'dark' ? 'rgba(10, 110, 209, 0.08)' : 'rgba(8, 84, 160, 0.05)') 
      : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;
  
  &:hover {
    background-color: ${({ theme, selected }) => 
      selected 
        ? (theme.name === 'dark' ? 'rgba(10, 110, 209, 0.12)' : 'rgba(8, 84, 160, 0.08)') 
        : (theme.name === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)')};
  }
`;

export const LocationIcon = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: flex-start;
  color: ${({ theme }) => theme.name === 'dark' ? '#a6a6a6' : '#6a6d70'};
`;

export const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LocationTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const LocationAddress = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.name === 'dark' ? '#a6a6a6' : '#6a6d70'};
`;

export const StatusIndicator = styled.div`
  margin-left: auto;
  color: ${({ theme }) => theme.name === 'dark' ? '#0a6ed1' : '#0854a0'};
`;

export const PaymentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${({ selected, theme }) => 
    selected 
      ? (theme.name === 'dark' ? '#0a6ed1' : '#0854a0') 
      : (theme.name === 'dark' ? '#4d5358' : '#e5e5e5')};
  border-radius: 4px;
  background-color: ${({ selected, theme }) => 
    selected 
      ? (theme.name === 'dark' ? 'rgba(10, 110, 209, 0.08)' : 'rgba(8, 84, 160, 0.05)') 
      : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;
  
  &:hover {
    background-color: ${({ theme, selected }) => 
      selected 
        ? (theme.name === 'dark' ? 'rgba(10, 110, 209, 0.12)' : 'rgba(8, 84, 160, 0.08)') 
        : (theme.name === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)')};
  }
`;

export const PaymentIcon = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

export const PaymentLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  flex: 1;
`;

export const PaymentLogo = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  
  img {
    height: 24px;
    max-width: 60px;
    object-fit: contain;
  }
`;

export const GlobalStyle = createGlobalStyle`
  .checkmark {
    width: 12px;
    height: 8px;
    display: block;
    transform: rotate(-45deg);
    
    &:before {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background-color: white;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    
    &:after {
      content: "";
      display: block;
      width: 2px;
      height: 100%;
      background-color: white;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
`;
