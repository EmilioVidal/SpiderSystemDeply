import React, { useState, useContext } from "react";
import { ThemeContext } from "../App";
import { MdPersonAdd, MdPerson, MdDelete, MdWarning, MdCheck, MdClose } from "react-icons/md";
import {
  PageContainer,
  PageHeader,
  HeaderTitle,
  ActionButton,
  UsersList,
  UserCard,
  UserInfo,
  UserAvatar,
  UserDetails,
  UserName,
  UserRole,
  UserActions,
  Modal,
  ModalContent,
  FormGroup,
  ModalActions,
  MessageStrip
} from "../styles/Admin/AdminStyles";

export function Admin() {
  const { theme } = useContext(ThemeContext);
  
  // Estados
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    rol: 'Analista',
    password: ''
  });
  
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Emilio Vidal", email: "emilio@spidershoes.com", rol: "Dueño" },
    { id: 2, nombre: "Alejandro Charles", email: "alex@spidershoes.com", rol: "Administrador" },
    { id: 3, nombre: "Mauricio Perea", email: "mauricio@spidershoes.com", rol: "Analista" }
  ]);

  const ROLES = ["Dueño", "Administrador", "Analista", "Proveedor"];

  // Manejadores
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.nombre || !newUser.email || !newUser.password) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos requeridos.' });
      return;
    }

    const userExists = usuarios.some(u => u.email === newUser.email);
    if (userExists) {
      setMessage({ type: 'error', text: 'Ya existe un usuario con este correo electrónico.' });
      return;
    }

    setUsuarios([...usuarios, { 
      id: usuarios.length + 1, 
      ...newUser 
    }]);
    setMessage({ type: 'success', text: 'Usuario creado exitosamente.' });
    setNewUser({ nombre: '', email: '', rol: 'Analista', password: '' });
    setTimeout(() => {
      setShowAddModal(false);
      setMessage(null);
    }, 1500);
  };

  const handleDeleteUser = () => {
    if (selectedUser.rol === "Dueño") {
      setMessage({ type: 'error', text: 'No se puede eliminar al Dueño del sistema.' });
      return;
    }

    if (selectedUser.rol === "Administrador" && usuarios.filter(u => u.rol === "Administrador").length === 1) {
      setMessage({ type: 'error', text: 'No se puede eliminar el último administrador del sistema.' });
      return;
    }

    setUsuarios(usuarios.filter(u => u.id !== selectedUser.id));
    setMessage({ type: 'success', text: 'Usuario eliminado exitosamente.' });
    setTimeout(() => {
      setShowDeleteModal(false);
      setSelectedUser(null);
      setMessage(null);
    }, 1500);
  };

  const initiateDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <PageContainer theme={theme}>
      {message && (
        <MessageStrip className={message.type} theme={theme}>
          {message.type === 'success' && <MdCheck size={20} />}
          {message.type === 'error' && <MdWarning size={20} />}
          {message.text}
        </MessageStrip>
      )}

      <PageHeader theme={theme}>
        <HeaderTitle theme={theme}>
          <MdPerson size={24} />
          Gestión de Usuarios
        </HeaderTitle>
        <ActionButton 
          className="emphasized"
          onClick={() => setShowAddModal(true)}
          theme={theme}
        >
          <MdPersonAdd size={20} />
          Crear Usuario
        </ActionButton>
      </PageHeader>

      <UsersList>
        {usuarios.map((usuario) => (
          <UserCard key={usuario.id} theme={theme}>
            <UserInfo>
              <UserAvatar theme={theme}>
                <MdPerson size={20} />
              </UserAvatar>
              <UserDetails>
                <UserName theme={theme}>{usuario.nombre}</UserName>
                <UserRole theme={theme}>{usuario.email}</UserRole>
                <UserRole theme={theme}>{usuario.rol}</UserRole>
              </UserDetails>
            </UserInfo>
            <UserActions>
              {usuario.rol !== "Dueño" && (
                <ActionButton 
                  className="negative"
                  onClick={() => initiateDelete(usuario)}
                  theme={theme}
                >
                  <MdDelete size={18} />
                  Eliminar
                </ActionButton>
              )}
            </UserActions>
          </UserCard>
        ))}
      </UsersList>

      {/* Modal para agregar usuario */}
      {showAddModal && (
        <Modal theme={theme}>
          <ModalContent theme={theme}>
            <h2>Crear Nuevo Usuario</h2>
            <form onSubmit={handleAddUser}>
              <FormGroup theme={theme}>
                <label htmlFor="nombre">Nombre Completo</label>
                <input
                  type="text"
                  id="nombre"
                  value={newUser.nombre}
                  onChange={(e) => setNewUser({...newUser, nombre: e.target.value})}
                  placeholder="Ej: Juan Pérez"
                />
              </FormGroup>
              <FormGroup theme={theme}>
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="correo@spidershoes.com"
                />
              </FormGroup>
              <FormGroup theme={theme}>
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="Mínimo 8 caracteres"
                />
              </FormGroup>
              <FormGroup theme={theme}>
                <label htmlFor="rol">Rol</label>
                <select
                  id="rol"
                  value={newUser.rol}
                  onChange={(e) => setNewUser({...newUser, rol: e.target.value})}
                >
                  {ROLES.filter(rol => rol !== "Dueño").map(rol => (
                    <option key={rol} value={rol}>{rol}</option>
                  ))}
                </select>
              </FormGroup>
              <ModalActions theme={theme}>
                <ActionButton type="button" onClick={() => setShowAddModal(false)} theme={theme}>
                  <MdClose size={18} />
                  Cancelar
                </ActionButton>
                <ActionButton type="submit" className="emphasized" theme={theme}>
                  <MdCheck size={18} />
                  Crear Usuario
                </ActionButton>
              </ModalActions>
            </form>
          </ModalContent>
        </Modal>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <Modal theme={theme}>
          <ModalContent theme={theme}>
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar al usuario <strong>{selectedUser?.nombre}</strong>?</p>
            <p>Esta acción no se puede deshacer.</p>
            <ModalActions theme={theme}>
              <ActionButton onClick={() => setShowDeleteModal(false)} theme={theme}>
                <MdClose size={18} />
                Cancelar
              </ActionButton>
              <ActionButton className="negative" onClick={handleDeleteUser} theme={theme}>
                <MdDelete size={18} />
                Eliminar
              </ActionButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
}