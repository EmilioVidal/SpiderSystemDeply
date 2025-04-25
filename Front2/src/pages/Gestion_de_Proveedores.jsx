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
import { styles } from '../Styles/Gestion_de_Proovedores';

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
    tipo: 'fabricante'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setProveedores([
        {
          id: 1,
          nombre: 'Calzado Deportivo Premium',
          contacto: 'Juan Pérez',
          email: 'contacto@calzadopremium.com',
          telefono: '555-0101',
          direccion: 'Calle Industria 123, Ciudad de México',
          tipo: 'fabricante',
          productos: 24,
          ultimoPedido: '15/10/2023'
        },
        {
          id: 2,
          nombre: 'Distribuidora de Zapatos Elegance',
          contacto: 'María Rodríguez',
          email: 'maria@elegancesshoes.com',
          telefono: '555-0102',
          direccion: 'Av. Revolución 456, Guadalajara',
          tipo: 'distribuidor',
          productos: 36,
          ultimoPedido: '02/10/2023'
        },
        {
          id: 3,
          nombre: 'Importadora Footwear Internacional',
          contacto: 'Carlos Gómez',
          email: 'cgomez@footwear-int.com',
          telefono: '555-2468',
          direccion: 'Blvd. Insurgentes 789, Ciudad de México',
          tipo: 'importador',
          productos: 18,
          ultimoPedido: '20/08/2023'
        },
        {
          id: 4,
          nombre: 'Zapatos y Complementos Moda Total',
          contacto: 'Ana López',
          email: 'alopez@modatotal.mx',
          telefono: '555-1357',
          direccion: 'Calle Hidalgo 321, Monterrey',
          tipo: 'mayorista',
          productos: 42,
          ultimoPedido: '28/09/2023'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Definir las columnas para la tabla analítica
  const columns = [
    {
      Header: "Proveedor",
      accessor: "nombre",
      width: 200,
      Cell: ({ row }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Text style={{ fontWeight: 'bold', fontSize: '1rem', color: '#0a6ed1', whiteSpace: 'normal' }}>
            {row.original.nombre}
          </Text>
          <Text style={{ fontSize: '0.875rem', color: '#6a6a6a', whiteSpace: 'normal' }}>
            <strong>Último pedido:</strong> {row.original.ultimoPedido}
          </Text>
        </div>
      )
    },
    {
      Header: "Contacto",
      accessor: "contacto",
      width: 150,
      Cell: ({ value }) => (
        <Text style={{ fontSize: '0.875rem', color: '#333', whiteSpace: 'normal' }}>{value}</Text>
      )
    },
    {
      Header: "Email",
      accessor: "email",
      width: 200,
      Cell: ({ value }) => (
        <Text style={{ fontSize: '0.875rem', color: '#0a6ed1', textDecoration: 'underline', whiteSpace: 'normal' }}>
          {value}
        </Text>
      )
    },
    {
      Header: "Productos",
      accessor: "productos",
      width: 100,
      Cell: ({ value }) => (
        <Text style={{ fontWeight: 'bold', fontSize: '1rem', color: '#107e3e', whiteSpace: 'normal' }}>{value}</Text>
      )
    },
    {
      Header: "Tipo",
      accessor: "tipo",
      width: 120,
      Cell: ({ value }) => (
        <ObjectStatus
          state={
            value === "fabricante"
              ? ValueState.Success
              : value === "distribuidor"
              ? ValueState.Information
              : value === "importador"
              ? ValueState.Warning
              : ValueState.Error
          }
          style={{ fontSize: '0.875rem', fontWeight: 'bold', whiteSpace: 'normal' }}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </ObjectStatus>
      )
    },
    {
      Header: "Acciones",
      accessor: "id",
      width: 150,
      Cell: ({ row }) => (
        <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween}>
          <Button 
            icon="show" 
            design="Transparent"
            onClick={() => handleViewDetails(row.original)}
            style={{ fontSize: '0.875rem', color: '#0a6ed1', whiteSpace: 'normal' }}
          >
            Ver detalles
          </Button>
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
      tipo: 'fabricante'
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

  const handleViewDetails = (proveedor) => {
    setSelectedProveedor(proveedor);
    setShowDialog(true);
  };

  const handleSearch = () => {
    const filteredProveedores = proveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProveedores(filteredProveedores);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedProveedor(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Title style={styles.title}>Gestión de Proveedores</Title>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Input
            placeholder="Buscar proveedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...styles.input, width: '200px' }}
          />
          <Button
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={handleSearch}
          >
            Buscar
          </Button>
          <Button
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={handleAddProveedor}
          >
            + Nuevo Proveedor
          </Button>
        </div>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <Icon name="loading" style={styles.icon} />
          <Text>Cargando proveedores...</Text>
        </div>
      ) : (
        <Card style={styles.card}>
          <AnalyticalTable
            data={proveedores}
            columns={columns}
            visibleRows={10}
            minRows={5}
            scaleWidthMode="Smart"
            selectionMode="None"
            style={styles.table} // Apply uniform font size for table content
          />
        </Card>
      )}

      {showDialog && (
        <div style={styles.dialogOverlay} onClick={handleCloseDialog}>
          <div
            style={styles.dialog}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
          >
            {selectedProveedor ? (
              <div style={{ lineHeight: '1.5' }}>
                <Text style={{ ...styles.dialogTitle, ...styles.detailSection }}>Información del Proveedor</Text>
                <Text style={styles.detailSection}><strong>Nombre:</strong> {selectedProveedor.nombre}</Text>
                <Text style={styles.detailSection}><strong>Contacto:</strong> {selectedProveedor.contacto}</Text>
                <Text style={styles.detailSection}><strong>Email:</strong> <span style={styles.link}>{selectedProveedor.email}</span></Text>
                <Text style={styles.detailSection}><strong>Teléfono:</strong> {selectedProveedor.telefono}</Text>
                <Text style={styles.detailSection}><strong>Dirección:</strong> {selectedProveedor.direccion}</Text>
                <Text style={styles.detailSection}><strong>Tipo:</strong> {selectedProveedor.tipo.charAt(0).toUpperCase() + selectedProveedor.tipo.slice(1)}</Text>
                <Text style={styles.detailSection}><strong>Productos:</strong> {selectedProveedor.productos}</Text>
                <Text style={styles.detailSection}><strong>Último Pedido:</strong> {selectedProveedor.ultimoPedido}</Text>
              </div>
            ) : (
              <Form>
                <FormItem label="Nombre" style={styles.formLabel}>
                  <Input
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    style={styles.input}
                  />
                </FormItem>
                <FormItem label="Contacto">
                  <Input
                    value={formData.contacto}
                    onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                    style={styles.input}
                  />
                </FormItem>
                <FormItem label="Email">
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={styles.input}
                  />
                </FormItem>
                <FormItem label="Teléfono">
                  <Input
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    style={styles.input}
                  />
                </FormItem>
                <FormItem label="Dirección">
                  <Input
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    style={styles.input}
                  />
                </FormItem>
                <FormItem label="Tipo">
                  <Input
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    style={styles.input}
                  />
                </FormItem>
              </Form>
            )}
            <div style={styles.dialogFooter}>
              <Button onClick={handleCloseDialog}>Cerrar</Button>
              {!selectedProveedor && <Button onClick={handleSaveProveedor}>Guardar</Button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gestion_de_Proveedores;