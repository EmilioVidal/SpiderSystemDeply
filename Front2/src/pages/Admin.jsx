import React, { useState, useEffect } from 'react';
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
  ObjectStatus,
  ValueState,
  Select,
  Option,
  MessageStrip,
  AnalyticalTable
} from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/AllIcons.js";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: '',
    departamento: '',
    estado: 'Activo'
  });

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setUsuarios([
        {
          id: 1,
          nombre: 'Juan Pérez',
          email: 'juan.perez@empresa.com',
          rol: 'Administrador',
          departamento: 'TI',
          ultimoAcceso: '2024-03-15 14:30:00',
          estado: 'Activo'
        },
        {
          id: 2,
          nombre: 'María García',
          email: 'maria.garcia@empresa.com',
          rol: 'Usuario',
          departamento: 'Ventas',
          ultimoAcceso: '2024-03-14 10:15:00',
          estado: 'Inactivo'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Definir las columnas para la tabla analítica
  const columns = [
    {
      Header: "Nombre",
      accessor: "nombre",
      width: 200
    },
    {
      Header: "Email",
      accessor: "email",
      width: 250
    },
    {
      Header: "Rol",
      accessor: "rol",
      width: 150
    },
    {
      Header: "Departamento",
      accessor: "departamento",
      width: 150
    },
    {
      Header: "Último Acceso",
      accessor: "ultimoAcceso",
      width: 180
    },
    {
      Header: "Estado",
      accessor: "estado",
      width: 120,
      Cell: ({ value }) => (
        <ObjectStatus 
          state={value === 'Activo' ? ValueState.Success : ValueState.Error}
        >
          {value}
        </ObjectStatus>
      )
    },
    {
      Header: "Acciones",
      accessor: "id",
      width: 200,
      Cell: ({ row }) => (
        <FlexBox>
          <Button 
            icon="edit" 
            design="Transparent"
            onClick={() => handleEditUsuario(row.original)}
          />
          <Button 
            icon="key" 
            design="Transparent"
            onClick={() => handleResetPassword(row.original.id)}
          />
          <Button 
            icon="delete" 
            design="Transparent"
            onClick={() => handleDeleteUsuario(row.original.id)}
          />
        </FlexBox>
      )
    }
  ];

  const handleAddUsuario = () => {
    setSelectedUsuario(null);
    setFormData({
      nombre: '',
      email: '',
      rol: '',
      departamento: '',
      estado: 'Activo'
    });
    setShowDialog(true);
  };

  const handleEditUsuario = (usuario) => {
    setSelectedUsuario(usuario);
    setFormData(usuario);
    setShowDialog(true);
  };

  const handleSaveUsuario = () => {
    if (selectedUsuario) {
      // Actualizar usuario existente
      setUsuarios(usuarios.map(u => 
        u.id === selectedUsuario.id ? { ...u, ...formData } : u
      ));
    } else {
      // Agregar nuevo usuario
      const newUsuario = {
        id: usuarios.length + 1,
        ...formData,
        ultimoAcceso: new Date().toLocaleString()
      };
      setUsuarios([...usuarios, newUsuario]);
    }
    setShowDialog(false);
  };

  const handleDeleteUsuario = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  const handleResetPassword = (id) => {
    // Lógica para resetear contraseña
    console.log('Resetear contraseña para usuario:', id);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center}>
        <Title>Administración de Usuarios</Title>
        <Button icon="add" onClick={handleAddUsuario}>
          Nuevo Usuario
        </Button>
      </FlexBox>

      <MessageStrip design="Information" style={{ marginTop: '1rem' }}>
        En esta sección puedes gestionar los usuarios del sistema, sus roles y permisos.
      </MessageStrip>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Icon name="loading" />
          <Text>Cargando usuarios...</Text>
        </div>
      ) : (
        <Card style={{ marginTop: '1rem' }}>
          <AnalyticalTable
            data={usuarios}
            columns={columns}
            visibleRows={10}
            minRows={5}
            scaleWidthMode="Smart"
            selectionMode="None"
          />
        </Card>
      )}

      <Dialog
        open={showDialog}
        onAfterClose={() => setShowDialog(false)}
        headerText={selectedUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}
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
          <FormItem label="Rol">
            <Select
              value={formData.rol}
              onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
            >
              <Option value="Administrador">Administrador</Option>
              <Option value="Usuario">Usuario</Option>
              <Option value="Supervisor">Supervisor</Option>
            </Select>
          </FormItem>
          <FormItem label="Departamento">
            <Input
              value={formData.departamento}
              onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
            />
          </FormItem>
          <FormItem label="Estado">
            <Select
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            >
              <Option value="Activo">Activo</Option>
              <Option value="Inactivo">Inactivo</Option>
            </Select>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button onClick={() => setShowDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveUsuario}>Guardar</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Admin; 