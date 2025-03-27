import React, { useState, useRef, useEffect } from "react";
import { 
  Container, 
  Title, 
  InfoContainer, 
  InfoTitle, 
  InfoRow, 
  InfoLabel, 
  InfoValue, 
  ProfileImage, 
  EditButton, 
  EditProfileButton,
  ChangePasswordButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  CancelButton,
  SaveButton,
  ProfileImageContainer,
  FileInput,
  NotificationContainer
} from "../styles/Cuenta/CuentaStyles";
import { FiEdit2, FiCheck, FiCamera, FiX } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";

export function Cuenta() {
  const [userData, setUserData] = useState({
    nombre: "Mauricio",
    apellidos: "Perea González",
    correo: "mauricio.perea@sap.mx",
    telefono: "81 4083 8756",
    rol: "Gerente de Compras",
    profileImage: null // Para guardar la URL de la imagen
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({...userData});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const fileInputRef = useRef(null);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "success" // "success" o "error"
  });

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification.visible]);

  const showNotification = (message, type = "success") => {
    setNotification({
      visible: true,
      message,
      type
    });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleEditClick = () => {
    setFormData({...userData});
    setShowEditModal(true);
  };

  const handleSaveClick = () => {
    // Aquí iría la lógica para guardar los cambios en el servidor
    setUserData(formData);
    setShowEditModal(false);
    showNotification("¡Información guardada con éxito! ✅", "success");
  };

  const handleCancelClick = () => {
    setFormData({...userData});
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePasswordClick = () => {
    setShowPasswordModal(true);
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setPasswordError("");
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification("Las contraseñas no coinciden.", "error");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      showNotification("La nueva contraseña debe tener al menos 6 caracteres.", "error");
      return;
    }
    
    // Aquí iría la lógica para cambiar la contraseña en el servidor
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setPasswordError("");
    showNotification("¡Contraseña actualizada exitosamente! 🔐", "success");
  };

  // Funciones para manejar la imagen de perfil
  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño del archivo (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        showNotification("El archivo es demasiado grande. El tamaño máximo es 2MB.", "error");
        return;
      }
      
      // Validar tipo de archivo (solo imágenes)
      if (!file.type.startsWith('image/')) {
        showNotification("Por favor, selecciona una imagen válida.", "error");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData({ ...userData, profileImage: event.target.result });
        showNotification("¡Imagen actualizada correctamente! 📸", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Title>Cuenta</Title>
      <InfoContainer>
        <EditButton onClick={handleEditClick}>
          <FiEdit2 /> Editar
        </EditButton>
        <InfoTitle>Información General</InfoTitle>
        <InfoRow>
          <InfoLabel>Nombre:</InfoLabel>
          <InfoValue>{userData.nombre}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Apellidos:</InfoLabel>
          <InfoValue>{userData.apellidos}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Correo electrónico:</InfoLabel>
          <InfoValue>{userData.correo}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Número de teléfono:</InfoLabel>
          <InfoValue>{userData.telefono}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Rol en la empresa:</InfoLabel>
          <InfoValue>{userData.rol}</InfoValue>
        </InfoRow>
        
        <ProfileImageContainer>
          <ProfileImage>
            {userData.profileImage ? (
              <img src={userData.profileImage} alt="Foto de perfil" />
            ) : (
              <VscAccount />
            )}
            <EditProfileButton onClick={handleProfileImageClick} title="Cambiar imagen">
              <FiCamera />
            </EditProfileButton>
          </ProfileImage>
          <FileInput 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
          />
        </ProfileImageContainer>
      </InfoContainer>
      
      <div style={{ marginTop: '30px' }}>
        <ChangePasswordButton onClick={handleChangePasswordClick}>
          Cambiar Contraseña
        </ChangePasswordButton>
      </div>
      
      {notification.visible && (
        <NotificationContainer type={notification.type}>
          {notification.type === "success" ? <FiCheck /> : <FiX />}
          {notification.message}
        </NotificationContainer>
      )}
      
      {/* Modal para editar información */}
      {showEditModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Editar Información</ModalTitle>
              <CloseButton onClick={handleCancelClick}>&times;</CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Nombre</Label>
              <Input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Apellidos</Label>
              <Input 
                type="text" 
                name="apellidos" 
                value={formData.apellidos} 
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Correo electrónico</Label>
              <Input 
                type="email" 
                name="correo" 
                value={formData.correo} 
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Número de teléfono</Label>
              <Input 
                type="tel" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Rol en la empresa</Label>
              <Input 
                type="text" 
                name="rol" 
                value={formData.rol} 
                onChange={handleChange}
              />
            </FormGroup>
            
            <ButtonGroup>
              <CancelButton onClick={handleCancelClick}>Cancelar</CancelButton>
              <SaveButton onClick={handleSaveClick}>Guardar</SaveButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* Modal para cambiar contraseña */}
      {showPasswordModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Cambiar Contraseña</ModalTitle>
              <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Contraseña Actual</Label>
              <Input 
                type="password" 
                name="currentPassword" 
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Nueva Contraseña</Label>
              <Input 
                type="password" 
                name="newPassword" 
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Confirmar Nueva Contraseña</Label>
              <Input 
                type="password" 
                name="confirmPassword" 
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </FormGroup>
            
            {passwordError && (
              <div style={{ color: 'red', marginTop: '10px' }}>
                {passwordError}
              </div>
            )}
            
            <ButtonGroup>
              <CancelButton onClick={handleCloseModal}>Cancelar</CancelButton>
              <SaveButton onClick={handleSavePassword}>Guardar</SaveButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}