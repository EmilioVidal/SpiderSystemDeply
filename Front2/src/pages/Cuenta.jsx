import React, { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Dialog,
  Input,
  Label,
  Form,
  FormItem,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  Icon,
  Avatar,
  ObjectStatus,
  ValueState
} from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';

const Cuenta = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [userData, setUserData] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@empresa.com',
    rol: 'Administrador',
    telefono: '555-0101',
    departamento: 'TI',
    ultimoAcceso: '2024-03-15 14:30:00'
  });
  const [formData, setFormData] = useState({ ...userData });

  const handleEditProfile = () => {
    setFormData({ ...userData });
    setShowDialog(true);
  };

  const handleSaveProfile = () => {
    setUserData({ ...formData });
    setShowDialog(false);
  };

  const handleChangePassword = () => {
    // Lógica para cambiar contraseña
    console.log('Cambiar contraseña');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Title>Mi Cuenta</Title>

      <Card style={{ marginTop: '1rem' }}>
        <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center}>
          <FlexBox alignItems={FlexBoxAlignItems.Center}>
            <Avatar size="XL" style={{ marginRight: '1rem' }}>
              <Icon name="employee" />
            </Avatar>
            <div>
              <Title level="H2">{userData.nombre}</Title>
              <Text>{userData.email}</Text>
            </div>
          </FlexBox>
          <Button icon="edit" onClick={handleEditProfile}>
            Editar Perfil
          </Button>
        </FlexBox>

        <div style={{ marginTop: '2rem' }}>
          <FlexBox direction="Column" style={{ gap: '1rem' }}>
            <div>
              <Label>Rol:</Label>
              <Text>{userData.rol}</Text>
            </div>
            <div>
              <Label>Teléfono:</Label>
              <Text>{userData.telefono}</Text>
            </div>
            <div>
              <Label>Departamento:</Label>
              <Text>{userData.departamento}</Text>
            </div>
            <div>
              <Label>Último Acceso:</Label>
              <Text>{userData.ultimoAcceso}</Text>
            </div>
          </FlexBox>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Button onClick={handleChangePassword} icon="key">
            Cambiar Contraseña
          </Button>
        </div>
      </Card>

      <Dialog
        open={showDialog}
        onAfterClose={() => setShowDialog(false)}
        headerText="Editar Perfil"
      >
        <Form>
          <FormItem label="Nombre">
            <Input
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </FormItem>
          <FormItem label="Email">
            <Input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </FormItem>
          <FormItem label="Teléfono">
            <Input
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </FormItem>
          <FormItem label="Departamento">
            <Input
              value={formData.departamento}
              onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
            />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button onClick={() => setShowDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveProfile}>Guardar</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Cuenta; 