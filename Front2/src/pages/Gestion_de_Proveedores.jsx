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
  AnalyticalTable
} from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/AllIcons.js";

const Gestion_de_Proveedores = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [proveedores, setProveedores] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    direccion: '',
    rating: 0
  });

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setProveedores([
        {
          id: 1,
          nombre: 'Proveedor A',
          contacto: 'Juan Pérez',
          email: 'juan@proveedora.com',
          telefono: '555-0101',
          direccion: 'Calle Principal 123',
          rating: 4.5,
          estado: 'Activo'
        },
        {
          id: 2,
          nombre: 'Proveedor B',
          contacto: 'María García',
          email: 'maria@proveedorb.com',
          telefono: '555-0102',
          direccion: 'Avenida Central 456',
          rating: 3.8,
          estado: 'Activo'
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
      width: 150
    },
    {
      Header: "Contacto",
      accessor: "contacto",
      width: 150
    },
    {
      Header: "Email",
      accessor: "email",
      width: 200
    },
    {
      Header: "Teléfono",
      accessor: "telefono",
      width: 120
    },
    {
      Header: "Rating",
      accessor: "rating",
      width: 100,
      Cell: ({ value }) => (
        <ObjectStatus 
          state={value >= 4 ? ValueState.Success : value >= 3 ? ValueState.Warning : ValueState.Error}
        >
          {value.toFixed(1)}
        </ObjectStatus>
      )
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
      width: 150,
      Cell: ({ row }) => (
        <FlexBox>
          <Button 
            icon="edit" 
            design="Transparent"
            onClick={() => handleEditProveedor(row.original)}
          />
          <Button 
            icon="delete" 
            design="Transparent"
            onClick={() => handleDeleteProveedor(row.original.id)}
          />
        </FlexBox>
      )
    }
  ];

  const handleAddProveedor = () => {
    setSelectedProveedor(null);
    setFormData({
      nombre: '',
      contacto: '',
      email: '',
      telefono: '',
      direccion: '',
      rating: 0
    });
    setShowDialog(true);
  };

  const handleEditProveedor = (proveedor) => {
    setSelectedProveedor(proveedor);
    setFormData(proveedor);
    setShowDialog(true);
  };

  const handleSaveProveedor = () => {
    if (selectedProveedor) {
      // Actualizar proveedor existente
      setProveedores(proveedores.map(p => 
        p.id === selectedProveedor.id ? { ...p, ...formData } : p
      ));
    } else {
      // Agregar nuevo proveedor
      const newProveedor = {
        id: proveedores.length + 1,
        ...formData,
        estado: 'Activo'
      };
      setProveedores([...proveedores, newProveedor]);
    }
    setShowDialog(false);
  };

  const handleDeleteProveedor = (id) => {
    setProveedores(proveedores.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center}>
        <Title>Gestión de Proveedores</Title>
        <Button icon="add" onClick={handleAddProveedor}>
          Nuevo Proveedor
        </Button>
      </FlexBox>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Icon name="loading" />
          <Text>Cargando proveedores...</Text>
        </div>
      ) : (
        <Card style={{ marginTop: '1rem' }}>
          <AnalyticalTable
            data={proveedores}
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
        headerText={selectedProveedor ? 'Editar Proveedor' : 'Nuevo Proveedor'}
      >
        <Form>
          <FormItem label="Nombre">
            <Input
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </FormItem>
          <FormItem label="Contacto">
            <Input
              value={formData.contacto}
              onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
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
          <FormItem label="Dirección">
            <Input
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
            />
          </FormItem>
          <FormItem label="Rating">
            <Input
              type="Number"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
            />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button onClick={() => setShowDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveProveedor}>Guardar</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Gestion_de_Proveedores; 