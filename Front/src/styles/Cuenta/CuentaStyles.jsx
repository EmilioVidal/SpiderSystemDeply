import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

export const InfoContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 20px;
  min-height: 250px; /* Asegura que haya suficiente espacio para la imagen de perfil */
`;

export const InfoTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
`;

export const InfoRow = styled.div`
  margin-bottom: 15px;
  max-width: calc(100% - 150px); /* Evita que el texto se superponga con la imagen */
`;

export const InfoLabel = styled.span`
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 5px;
  text-decoration: underline;
`;

export const InfoValue = styled.span`
  font-size: 1rem;
  color: #333;
`;

export const ProfileImageContainer = styled.div`
  position: absolute;
  top: 75px;
  right: 50px;
  width: 150px;
  height: 150px;
`;

export const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f0f0f0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 3px solid #3498db;
  
  &:hover {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
    
    button {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    width: 60%;
    height: 60%;
    color: #ccc;
  }
`;

export const EditProfileButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3498db;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  opacity: 0;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
  }
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 30px;
  right: 200px;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #555;
  
  &:hover {
    color: #007bff;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const ChangePasswordButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2c5282;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #1a365d;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

export const Col = styled.div`
  flex: ${props => props.width || '1'};
  padding: 0 15px;
`;

// Estilos para el Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #777;
  
  &:hover {
    color: #333;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #444;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    border-color: #2c5282;
    outline: none;
    box-shadow: 0 0 0 2px rgba(44, 82, 130, 0.2);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const CancelButton = styled(Button)`
  background-color: #f1f1f1;
  color: #333;
  
  &:hover {
    background-color: #ddd;
  }
`;

export const SaveButton = styled(Button)`
  background-color: #2c5282;
  color: white;
  
  &:hover {
    background-color: #1a365d;
  }
`;

export const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease-out forwards;
  max-width: 350px;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  background-color: ${props => props.type === "error" ? "#ff5252" : "#4caf50"};
  color: white;
  font-weight: 500;
  
  svg {
    font-size: 20px;
  }
`; 