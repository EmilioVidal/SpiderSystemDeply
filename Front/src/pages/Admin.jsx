import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiUserPlus, FiUser, FiTrash2 } from "react-icons/fi";
import { ThemeContext } from "../App";
import AgregarUsuarioModal from "../components/AgregarUsuarioModal";

export function Admin() {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  
  // Estado para el modal de agregar usuario
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Emilio Vidal Cavazos Paez", rol: "Dueño" },
    { id: 2, nombre: "Alejandro Charles Gonzalez", rol: "Proveedor" },
    { id: 3, nombre: "Mauricio Perea Gonzalez", rol: "Administrador" }
  ]);

  // Estado para el modal de confirmación de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  // Función para mostrar el modal de confirmación
  const handleEliminarClick = (usuario) => {
    setUsuarioAEliminar(usuario);
    setShowDeleteModal(true);
  };

  // Función para eliminar un usuario
  const confirmarEliminacion = () => {
    setUsuarios(usuarios.filter(u => u.id !== usuarioAEliminar.id));
    setShowDeleteModal(false);
    setUsuarioAEliminar(null);
  };

  // Función para cancelar la eliminación
  const cancelarEliminacion = () => {
    setShowDeleteModal(false);
    setUsuarioAEliminar(null);
  };
  
  // Función para agregar un nuevo usuario
  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios([...usuarios, nuevoUsuario]);
  };

  return (
    <Container className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Header className={isDarkMode ? 'dark-header' : 'light-header'}>
        <h1>Gestionar usuarios</h1>
        <AgregarButton 
          className={isDarkMode ? 'dark-button' : 'light-button'}
          onClick={() => setShowAddModal(true)}
        >
          <FiUserPlus size={18} />
          <span>Agregar</span>
        </AgregarButton>
      </Header>

      <UsuariosList>
        {usuarios.map((usuario) => (
          <UsuarioItem key={usuario.id} className={isDarkMode ? 'dark-item' : 'light-item'}>
            <UsuarioInfo>
              <IconContainer>
                <FiUser size={24} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
              </IconContainer>
              <NombreUsuario className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                {usuario.nombre}
              </NombreUsuario>
            </UsuarioInfo>

            <UsuarioAcciones>
              <RolUsuario className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {usuario.rol}
              </RolUsuario>
              <EliminarButton 
                onClick={() => handleEliminarClick(usuario)}
                className="eliminar-button"
              >
                Eliminar
              </EliminarButton>
            </UsuarioAcciones>
          </UsuarioItem>
        ))}
      </UsuariosList>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <ModalOverlay className={isDarkMode ? 'dark-overlay' : 'light-overlay'}>
          <ModalContent className={isDarkMode ? 'dark-modal' : 'light-modal'}>
            <h3>Confirmar eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar a <strong>{usuarioAEliminar?.nombre}</strong>?</p>
            <p>Esta acción no se puede deshacer.</p>
            <ModalButtons>
              <CancelarButton onClick={cancelarEliminacion}>Cancelar</CancelarButton>
              <ConfirmarButton onClick={confirmarEliminacion}>Eliminar</ConfirmarButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* Modal para agregar usuario */}
      {showAddModal && (
        <AgregarUsuarioModal
          onClose={() => setShowAddModal(false)}
          onAgregar={agregarUsuario}
        />
      )}
    </Container>
  );
}

// Estilos con compatibilidad con modo oscuro
const Container = styled.div`
  padding: 24px;
  height: 100%;
  min-height: 100vh;
  
  &.dark-mode {
    background-color: #1f2937;
    color: #f9fafb;
  }
  
  &.light-mode {
    background-color: #f3f4f6;
    color: #1f2937;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  h1 {
    font-size: 24px;
    font-weight: 600;
  }
  
  &.dark-header h1 {
    color: #f9fafb;
  }
  
  &.light-header h1 {
    color: #1f2937;
  }
`;

const AgregarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &.dark-button {
    background-color: #4b5563;
    color: #f9fafb;
    border: 1px solid #374151;
    
    &:hover {
      background-color: #374151;
    }
  }
  
  &.light-button {
    background-color: #374151;
    color: white;
    border: none;
    
    &:hover {
      background-color: #4b5563;
    }
  }
`;

const UsuariosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UsuarioItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &.dark-item {
    background-color: #374151;
    border: 1px solid #4b5563;
    
    &:hover {
      background-color: #4b5563;
    }
  }
  
  &.light-item {
    background-color: #e5e7eb;
    border: 1px solid #d1d5db;
    
    &:hover {
      background-color: #d1d5db;
    }
  }
`;

const UsuarioInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6b7280;
`;

const NombreUsuario = styled.span`
  font-weight: 500;
  font-size: 16px;
`;

const UsuarioAcciones = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RolUsuario = styled.span`
  font-size: 14px;
`;

const EliminarButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #dc2626;
  }
`;

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
  max-width: 400px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  
  p {
    margin-bottom: 8px;
  }
  
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

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
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

const ConfirmarButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  background-color: #ef4444;
  color: white;
  border: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #dc2626;
  }
`;