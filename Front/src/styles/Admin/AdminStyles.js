import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 1rem;
  height: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: ${props => props.theme === 'dark' ? '#2d2d2d' : '#ffffff'};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px ${props => props.theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'};
`;

export const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  background-color: ${props => props.theme === 'dark' ? '#2d2d2d' : '#ffffff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#404040' : '#f0f0f0'};
  }

  &.negative {
    color: #ff4d4f;
    border-color: #ff4d4f;
    background-color: transparent;

    &:hover {
      background-color: #ff4d4f;
      color: white;
    }
  }

  &.emphasized {
    background-color: #0a6ed1;
    color: white;
    border-color: #0a6ed1;

    &:hover {
      background-color: #085caa;
    }
  }
`;

export const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

export const UserCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.theme === 'dark' ? '#2d2d2d' : '#ffffff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#404040' : '#f0f0f0'};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #0a6ed1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const UserName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

export const UserRole = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#b3b3b3' : '#666666'};
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)'};
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#2d2d2d' : '#ffffff'};
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 30rem;
  box-shadow: 0 4px 6px ${props => props.theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'};

  h2 {
    font-size: 1.25rem;
    font-weight: 400;
    color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
    margin: 0 0 1.5rem 0;
  }

  p {
    color: ${props => props.theme === 'dark' ? '#b3b3b3' : '#666666'};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  label {
    font-size: 0.875rem;
    color: ${props => props.theme === 'dark' ? '#b3b3b3' : '#666666'};
  }

  input, select {
    padding: 0.5rem;
    border: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
    border-radius: 0.375rem;
    background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
    color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
    font-size: 0.875rem;

    &:focus {
      border-color: #0a6ed1;
      outline: none;
    }

    &::placeholder {
      color: ${props => props.theme === 'dark' ? '#666666' : '#999999'};
    }
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
`;

export const MessageStrip = styled.div`
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;

  &.success {
    background-color: ${props => props.theme === 'dark' ? '#163832' : '#ebf9f0'};
    color: ${props => props.theme === 'dark' ? '#4cd964' : '#1e7e34'};
    border: 1px solid ${props => props.theme === 'dark' ? '#4cd964' : '#1e7e34'};
  }

  &.error {
    background-color: ${props => props.theme === 'dark' ? '#381616' : '#fdf1f1'};
    color: ${props => props.theme === 'dark' ? '#ff4d4f' : '#dc3545'};
    border: 1px solid ${props => props.theme === 'dark' ? '#ff4d4f' : '#dc3545'};
  }
`;
