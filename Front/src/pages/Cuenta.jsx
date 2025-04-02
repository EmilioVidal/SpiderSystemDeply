import React, { useState, useRef, useContext } from "react";
import { FiCamera, FiMail, FiLogOut, FiTrash2, FiCheckCircle, FiSave } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { ThemeContext } from "../App";
import UI5ThemeProvider from "../components/UI5ThemeProvider";
import {
  Container,
  PageHeader,
  PageTitle,
  ContentArea,
  ProfileSection,
  ProfileImageContainer,
  ProfileImage,
  ImageUploadButton,
  ImageDeleteButton,
  ProfileInfo,
  InfoSection,
  InfoLabel,
  InfoInput,
  InfoRow,
  RoleBadge,
  SaveButton,
  ModalOverlay,
  ModalContent,
  ModalIcon,
  ModalTitle,
  ModalText,
  ModalButton
} from "../styles/Cuenta/CuentaStyles";

export function Cuenta() {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const [userData, setUserData] = useState({
    nombre: "Juan",
    apellidos: "Pérez García",
    correo: "juan.perez@example.com",
    telefono: "+52 555 123 4567",
    profileImage: "",
    rol: "Administrador"
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({ ...userData, profileImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setUserData({ ...userData, profileImage: "" });
  };

  const handleSaveChanges = () => {
    setShowConfirmModal(true);
  };

  return (
    <UI5ThemeProvider>
      <Container>
        <PageHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <VscAccount size={28} />
            <PageTitle>Mi Cuenta</PageTitle>
          </div>
        </PageHeader>

        <ContentArea>
          <ProfileSection>
            <ProfileImageContainer>
              <ProfileImage>
                {userData.profileImage ? (
                  <img src={userData.profileImage} alt="Profile" />
                ) : (
                  <VscAccount />
                )}
              </ProfileImage>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <ImageUploadButton onClick={handleProfileImageClick}>
                <FiCamera />
                Subir nueva foto
              </ImageUploadButton>
              {userData.profileImage && (
                <ImageDeleteButton onClick={handleDeleteImage}>
                  <FiTrash2 />
                  Eliminar foto
                </ImageDeleteButton>
              )}
            </ProfileImageContainer>

            <ProfileInfo>
              <InfoRow>
                <InfoSection>
                  <InfoLabel>Nombre(s)</InfoLabel>
                  <InfoInput
                    type="text"
                    value={userData.nombre}
                    onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                  />
                </InfoSection>
                <InfoSection>
                  <InfoLabel>Apellido(s)</InfoLabel>
                  <InfoInput
                    type="text"
                    value={userData.apellidos}
                    onChange={(e) => setUserData({ ...userData, apellidos: e.target.value })}
                  />
                </InfoSection>
              </InfoRow>

              <InfoSection>
                <InfoLabel>Correo electrónico</InfoLabel>
                <InfoInput
                  type="email"
                  value={userData.correo}
                  onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
                />
              </InfoSection>

              <InfoRow>
                <InfoSection>
                  <InfoLabel>Teléfono</InfoLabel>
                  <InfoInput
                    type="tel"
                    value={userData.telefono}
                    onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
                  />
                </InfoSection>
                <InfoSection>
                  <InfoLabel>Rol</InfoLabel>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <RoleBadge>{userData.rol}</RoleBadge>
                  </div>
                </InfoSection>
              </InfoRow>

              <SaveButton onClick={handleSaveChanges}>
                <FiSave />
                Guardar cambios
              </SaveButton>
            </ProfileInfo>
          </ProfileSection>
        </ContentArea>

        {showConfirmModal && (
          <ModalOverlay>
            <ModalContent>
              <ModalIcon>
                <FiCheckCircle size={48} />
              </ModalIcon>
              <ModalTitle>¡Cambios guardados!</ModalTitle>
              <ModalText>Los cambios en tu perfil se han guardado correctamente.</ModalText>
              <ModalButton onClick={() => setShowConfirmModal(false)}>
                Aceptar
              </ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </UI5ThemeProvider>
  );
}
