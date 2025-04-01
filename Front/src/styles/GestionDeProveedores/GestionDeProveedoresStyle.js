import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--sapFontFamily, "72", "72full", Arial, Helvetica, sans-serif);
  }
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.isDarkTheme ? '#1c1c1c' : theme.background};
  color: ${({ theme }) => theme.isDarkTheme ? '#ffffff' : theme.text};
  min-height: 100vh;
  width: 100%;
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: column;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.isDarkTheme ? '#444444' : theme.borderColor};
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.isDarkTheme ? '#ffffff' : theme.text};
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.isDarkTheme ? '#2d2d2d' : theme.cardBg};
  border-radius: 0.25rem;
  box-shadow: ${({ theme }) => theme.isDarkTheme ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '0 0 0.5rem rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.isDarkTheme ? '#444444' : theme.borderColor};
`;

export const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  border-bottom: 1px solid ${({ theme }) => theme.isDarkTheme ? '#444444' : theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.isDarkTheme ? '#ffffff' : 'inherit'};
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const ToolbarSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  
  & > div {
    display: flex;
    gap: 0.5rem;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 18rem;
  max-width: 100%;
  
  svg {
    position: absolute;
    left: 0.75rem;
    color: ${({ theme }) => theme.isDarkTheme ? '#8a8d91' : 'var(--sapContent_IconColor, #0854a0)'};
  }
`;

export const SearchInput = styled.input`
  border: 1px solid ${({ theme }) => theme.isDarkTheme ? '#444444' : theme.borderColor};
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem 0.5rem 2.25rem;
  font-size: 0.875rem;
  width: 100%;
  background-color: ${({ theme }) => theme.isDarkTheme ? '#3d3d3d' : theme.inputBg};
  color: ${({ theme }) => theme.isDarkTheme ? '#ffffff' : theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.isDarkTheme ? '#0854a0' : theme.focusBorder};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.isDarkTheme ? 'rgba(8, 84, 160, 0.3)' : theme.focusShadow};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.isDarkTheme ? '#8a8d91' : '#767676'};
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.primary && `
    background-color: ${props.theme.name === 'dark' ? '#0A6ED1' : '#0854a0'};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props.theme.name === 'dark' ? '#085caf' : '#074888'};
    }
  `}
  
  ${props => !props.primary && `
    background-color: transparent;
    color: ${props.theme.name === 'dark' ? '#f5f5f5' : '#333'};
    border: 1px solid ${props.theme.name === 'dark' ? '#555' : '#d9d9d9'};
    
    &:hover {
      background-color: ${props.theme.name === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
    }
  `}
  
  ${props => props.danger && `
    background-color: ${props.theme.name === 'dark' ? '#d9364f' : '#bb0000'};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props.theme.name === 'dark' ? '#c13146' : '#a30000'};
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(10, 110, 209, 0.2);
  }
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.isDarkTheme ? '#ffffff' : theme.text};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.isDarkTheme ? 'rgba(59, 130, 246, 0.5)' : 'rgba(8, 84, 160, 0.3)'};
  }
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
  }
  
  th {
    font-weight: 600;
    background-color: ${({ theme }) => theme.isDarkTheme ? '#252525' : 'var(--sapList_HeaderBackground, #f5f6f7)'};
    color: ${({ theme }) => theme.isDarkTheme ? '#ffffff' : 'var(--sapList_HeaderTextColor, #32363a)'};
    border-bottom: 2px solid ${({ theme }) => theme.isDarkTheme ? '#444444' : theme.borderColor};
  }
  
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.isDarkTheme ? '#444444' : theme.borderColor};
    
    &:hover td {
      background-color: ${({ theme }) => theme.isDarkTheme ? '#3d3d3d' : 'var(--sapList_Hover_Background, #f5f6f7)'};
    }
  }
  
  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.isDarkTheme ? '#333333' : 'var(--sapList_AlternatingBackground, #fafafa)'};
  }
`;

export const StatusIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${({ status, theme }) => {
    if (theme.isDarkTheme) {
      return status === 'active' 
        ? 'rgba(54, 179, 126, 0.2)' 
        : status === 'pending' 
          ? 'rgba(10, 110, 209, 0.2)'
          : status === 'inactive' 
            ? 'rgba(239, 83, 80, 0.2)'
            : 'rgba(150, 150, 150, 0.2)';
    }
    return status === 'active' 
      ? 'var(--sapPositiveBackground, #e5f5e5)' 
      : status === 'pending' 
        ? 'var(--sapInformationBackground, #e9f2fd)'
        : status === 'inactive' 
          ? 'var(--sapNegativeBackground, #ffe4e1)'
          : 'var(--sapNeutralBackground, #f5f5f5)';
  }};
  color: ${({ status, theme }) => {
    if (theme.isDarkTheme) {
      return status === 'active' 
        ? '#36b37e' 
        : status === 'pending' 
          ? '#4c9aff'
          : status === 'inactive' 
            ? '#ef5350'
            : '#a0a0a0';
    }
    return status === 'active' 
      ? 'var(--sapPositiveColor, #107e3e)' 
      : status === 'pending' 
        ? 'var(--sapInformativeColor, #0a6ed1)'
        : status === 'inactive' 
          ? 'var(--sapNegativeColor, #bb0000)'
          : 'var(--sapNeutralColor, #6a6d70)';
  }};
  
  svg {
    font-size: 0.875rem;
  }
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.isDarkTheme ? '#444444' : theme.borderColor};
  margin-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.isDarkTheme ? '#252525' : 'transparent'};
`;

export const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  font-size: 0.875rem;
  font-weight: ${({ active }) => active ? '600' : '400'};
  color: ${({ active, theme }) => {
    if (theme.isDarkTheme) {
      return active ? '#4c9aff' : '#a0a0a0';
    }
    return active ? 'var(--sapSelectedColor, #0854a0)' : 'var(--sapContent_LabelColor, #6a6d70)';
  }};
  border-bottom: 2px solid ${({ active, theme }) => {
    if (theme.isDarkTheme) {
      return active ? '#4c9aff' : 'transparent';
    }
    return active ? 'var(--sapSelectedColor, #0854a0)' : 'transparent';
  }};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.isDarkTheme ? '#78b6ff' : 'var(--sapSelectedColor, #0854a0)'};
    background-color: ${({ theme }) => theme.isDarkTheme ? '#3d3d3d' : 'transparent'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.isDarkTheme ? 'rgba(59, 130, 246, 0.5)' : theme.focusShadow};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.isDarkTheme ? '#a0a0a0' : 'var(--sapContent_LabelColor, #6a6d70)'};
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: var(--sapField_Focus_BorderColor, #0854a0);
    box-shadow: 0 0 0 1px var(--sapField_Focus_BorderColor, #0854a0);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  
  &:focus {
    outline: none;
    border-color: var(--sapField_Focus_BorderColor, #0854a0);
    box-shadow: 0 0 0 1px var(--sapField_Focus_BorderColor, #0854a0);
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 0.25rem;
`;

export const PageButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  border: 1px solid ${({ active, theme }) => {
    if (theme.isDarkTheme) {
      return active ? '#4c9aff' : '#444444';
    }
    return active ? 'var(--sapSelectedColor, #0854a0)' : theme.borderColor;
  }};
  border-radius: 0.25rem;
  background-color: ${({ active, theme }) => {
    if (theme.isDarkTheme) {
      return active ? '#4c9aff' : 'transparent';
    }
    return active ? 'var(--sapSelectedColor, #0854a0)' : 'transparent';
  }};
  color: ${({ active, theme }) => {
    if (theme.isDarkTheme) {
      return active ? 'white' : '#e0e0e0';
    }
    return active ? 'white' : theme.text;
  }};
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background-color: ${({ active, theme }) => {
      if (theme.isDarkTheme) {
        return active ? '#4c9aff' : '#3d3d3d';
      }
      return active ? 'var(--sapSelectedColor, #0854a0)' : theme.backgroundHover;
    }};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.isDarkTheme ? 'rgba(59, 130, 246, 0.5)' : theme.focusShadow};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ActionMenu = styled.div`
  position: relative;
`;

export const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.isDarkTheme ? '#e0e0e0' : theme.text};
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.isDarkTheme ? '#3d3d3d' : theme.backgroundHover};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.isDarkTheme ? 'rgba(59, 130, 246, 0.5)' : theme.focusShadow};
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.isDarkTheme ? '#3d3d3d' : theme.cardBg};
  border: 1px solid ${({ theme }) => theme.isDarkTheme ? '#444444' : theme.borderColor};
  border-radius: 0.25rem;
  box-shadow: ${({ theme }) => theme.isDarkTheme ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)'};
  min-width: 10rem;
  z-index: 10;
  display: ${({ open }) => open ? 'block' : 'none'};
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.isDarkTheme ? '#e0e0e0' : theme.text};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.isDarkTheme ? '#4d4d4d' : theme.backgroundHover};
  }
  
  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.isDarkTheme ? '#4d4d4d' : theme.backgroundHover};
  }
  
  svg {
    font-size: 1rem;
    color: ${({ theme }) => theme.isDarkTheme ? '#a0a0a0' : theme.iconColor};
  }
  
  span {
    color: ${({ theme }) => theme.isDarkTheme ? '#a0a0a0' : 'inherit'};
  }
`;

export const DialogBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.isDarkTheme ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const Dialog = styled.div`
  background-color: ${({ theme }) => theme.isDarkTheme ? '#2d2d2d' : theme.cardBg};
  border-radius: 0.25rem;
  box-shadow: ${({ theme }) => theme.isDarkTheme ? '0 10px 25px rgba(0, 0, 0, 0.5)' : '0 0.5rem 1rem rgba(0, 0, 0, 0.2)'};
  width: 100%;
  max-width: ${({ size }) => 
    size === 'sm' ? '30rem' : 
    size === 'lg' ? '60rem' : 
    '45rem'};
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const DialogHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.isDarkTheme ? '#444444' : theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DialogTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.isDarkTheme ? '#ffffff' : theme.text};
`;

export const DialogContent = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  color: ${({ theme }) => theme.isDarkTheme ? '#e0e0e0' : 'inherit'};
`;

export const DialogFooter = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.isDarkTheme ? '#444444' : theme.borderColor};
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  background-color: ${({ color, theme }) => {
    if (theme.isDarkTheme) {
      switch (color) {
        case 'success': return '#36b37e';
        case 'warning': return '#ffab00';
        case 'error': return '#ef5350';
        case 'info': return '#4c9aff';
        default: return '#a0a0a0';
      }
    }
    switch (color) {
      case 'success': return 'var(--sapPositiveColor, #107e3e)';
      case 'warning': return 'var(--sapCriticalColor, #e9730c)';
      case 'error': return 'var(--sapNegativeColor, #bb0000)';
      case 'info': return 'var(--sapInformativeColor, #0a6ed1)';
      default: return 'var(--sapNeutralColor, #6a6d70)';
    }
  }};
`;

export const ProgressBar = styled.div`
  height: 0.5rem;
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: 0.25rem;
  overflow: hidden;
  margin: 0.5rem 0;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background-color: ${({ color }) => 
    color === 'success' ? 'var(--sapPositiveColor, #107e3e)' :
    color === 'warning' ? 'var(--sapCriticalColor, #e9730c)' :
    color === 'error' ? 'var(--sapNegativeColor, #bb0000)' :
    color === 'info' ? 'var(--sapInformativeColor, #0a6ed1)' :
    'var(--sapIndicator, #0854a0)'};
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.3s ease;
`;

export const Tooltip = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.tooltipBg};
  color: ${({ theme }) => theme.tooltipText};
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  z-index: 20;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  max-width: 16rem;
  word-wrap: break-word;
  
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px;
    border-color: transparent;
  }
`;

export const Avatar = styled.div`
  width: ${({ size }) => 
    size === 'sm' ? '1.5rem' : 
    size === 'lg' ? '3rem' : 
    '2rem'};
  height: ${({ size }) => 
    size === 'sm' ? '1.5rem' : 
    size === 'lg' ? '3rem' : 
    '2rem'};
  border-radius: 50%;
  background-color: ${({ color, theme }) => 
    color === 'success' ? 'var(--sapPositiveColor, #107e3e)' :
    color === 'warning' ? 'var(--sapCriticalColor, #e9730c)' :
    color === 'error' ? 'var(--sapNegativeColor, #bb0000)' :
    color === 'info' ? 'var(--sapInformativeColor, #0a6ed1)' :
    'var(--sapAccentColor4, #0854a0)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => 
    size === 'sm' ? '0.625rem' : 
    size === 'lg' ? '1.25rem' : 
    '0.875rem'};
  font-weight: 600;
  text-transform: uppercase;
`; 