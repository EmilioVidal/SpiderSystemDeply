import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { ThemeContext } from "../App";

const AgregarUsuarioModal = ({ onClose, onAgregar }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    rol: "Administrador" // Valor por defecto
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({
      ...nuevoUsuario,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple
    if (!nuevoUsuario.nombre.trim()) {
      setError("Por favor, ingresa el nombre del usuario");
      return;
    }
    
    // Generamos un ID aleatorio para el nuevo usuario
    const nuevoUsuarioConId = {
      ...nuevoUsuario,
      id: Date.now() // Usamos timestamp como ID único
    };
    
    onAgregar(nuevoUsuarioConId);
    onClose();
  };

  return (
    <ModalOverlay className={isDarkMode ? 'dark-overlay' : 'light-overlay'}>
      <ModalContent className={isDarkMode ? 'dark-modal' : 'light-modal'}>
        <ModalHeader>
          <h3>Agregar nuevo usuario</h3>
          <CloseButton onClick={onClose}>
            <FiX size={20} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Nombre completo
            </Label>
            <Input
              type="text"
              name="nombre"
              value={nuevoUsuario.nombre}
              onChange={handleChange}
              placeholder="Nombre completo del usuario"
              className={isDarkMode ? 'dark-input' : 'light-input'}
            />
          </FormGroup>

          <FormGroup>
            <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Rol
            </Label>
            <Select
              name="rol"
              value={nuevoUsuario.rol}
              onChange={handleChange}
              className={isDarkMode ? 'dark-input' : 'light-input'}
            >
              <option value="Administrador">Administrador</option>
              <option value="Proveedor">Proveedor</option>
              <option value="Dueño">Dueño</option>
            </Select>
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ButtonGroup>
            <CancelarButton type="button" onClick={onClose}>
              Cancelar
            </CancelarButton>
            <GuardarButton type="submit">
              Guardar
            </GuardarButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  &.dark-overlay {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  &.light-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ModalContent = styled.div`
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  
  &.dark-modal {
    background-color: #1f2937;
    color: #f9fafb;
    border: 1px solid #374151;
  }
  
  &.light-modal {
    background-color: white;
    color: #1f2937;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: currentColor;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  
  &.dark-input {
    background-color: #374151;
    border: 1px solid #4b5563;
    color: #f9fafb;
    
    &:focus {
      border-color: #60a5fa;
      outline: none;
    }
  }
  
  &.light-input {
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    color: #1f2937;
    
    &:focus {
      border-color: #3b82f6;
      outline: none;
    }
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  
  &.dark-input {
    background-color: #374151;
    border: 1px solid #4b5563;
    color: #f9fafb;
    
    &:focus {
      border-color: #60a5fa;
      outline: none;
    }
  }
  
  &.light-input {
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    color: #1f2937;
    
    &:focus {
      border-color: #3b82f6;
      outline: none;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 14px;
  margin-top: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

const CancelarButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  background-color: #6b7280;
  color: white;
  border: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #4b5563;
  }
`;

const GuardarButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  background-color: #3b82f6;
  color: white;
  border: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #2563eb;
  }
`;

export default AgregarUsuarioModal; 