import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--sapBackgroundColor);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  color: var(--sapTitleColor, #32363a);
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--sapBackgroundColor);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProfileSection = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--sapBackgroundColor);
  border: 3px solid var(--sapHighlightColor, #0854a0);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    width: 60%;
    height: 60%;
    color: var(--sapContent_LabelColor, #6a6d70);
  }
`;

export const ImageUploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--sapButton_Background, #0854a0);
  color: var(--sapButton_TextColor, #fff);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--sapButton_Hover_Background, #066bbf);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ImageDeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--sapNegativeButton_Background, #bb0000);
  color: var(--sapNegativeButton_TextColor, #fff);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--sapNegativeButton_Hover_Background, #a50000);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InfoLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--sapContent_LabelColor, #6a6d70);
`;

export const InfoInput = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--sapField_BorderColor, #bfbfbf);
  border-radius: 0.25rem;
  background-color: var(--sapField_Background, #fff);
  color: var(--sapField_TextColor, #32363a);
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: var(--sapField_Hover_BorderColor, #0854a0);
  }
  
  &:disabled {
    background-color: var(--sapField_Disabled_Background, #f7f7f7);
    color: var(--sapField_Disabled_TextColor, #959595);
    cursor: not-allowed;
  }
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const RoleBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: var(--sapHighlightColor, #0854a0);
  color: white;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--sapButton_Background, #0854a0);
  color: var(--sapButton_TextColor, #fff);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
  margin-top: 1rem;
  
  &:hover {
    background-color: var(--sapButton_Hover_Background, #066bbf);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

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
  background-color: var(--sapBackgroundColor);
  padding: 2rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

export const ModalIcon = styled.div`
  color: var(--sapPositiveTextColor, #107e3e);
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  color: var(--sapTitleColor, #32363a);
`;

export const ModalText = styled.p`
  font-size: 0.875rem;
  color: var(--sapContent_LabelColor, #6a6d70);
  margin: 0 0 1.5rem 0;
`;

export const ModalButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: var(--sapButton_Background, #0854a0);
  color: var(--sapButton_TextColor, #fff);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--sapButton_Hover_Background, #066bbf);
  }
`; 