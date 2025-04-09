import React, { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Table,
  TableColumn,
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
  AnalyticalTable
} from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';

const Compras = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [compras, setCompras] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const [formData, setFormData] = useState({
    fecha: '',
    proveedor: '',
    producto: '',
    cantidad: 0,
    precioUnitario: 0,
    estado: 'Pendiente'
  });

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setCompras([
        {
          id: 1,
          fecha: '2024-03-15',
          proveedor: 'Proveedor A',
          producto: 'Producto X',
          cantidad: 100,
          precioUnitario: 50,
          total: 5000,
          estado: 'Pendiente'
        },
        {
          id: 2,
          fecha: '2024-03-14',
          proveedor: 'Proveedor B',
          producto: 'Producto Y',
          cantidad: 200,
          precioUnitario: 30,
          total: 6000,
          estado: 'Completado'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddCompra = () => {
    setSelectedCompra(null);
    setFormData({
      fecha: new Date().toISOString().split('T')[0],
      proveedor: '',
      producto: '',
      cantidad: 0,
      precioUnitario: 0,
      estado: 'Pendiente'
    });
    setShowDialog(true);
  };

  const handleEditCompra = (compra) => {
    setSelectedCompra(compra);
    setFormData(compra);
    setShowDialog(true);
  };

  const handleSaveCompra = () => {
    if (selectedCompra) {
      // Actualizar compra existente
      setCompras(compras.map(c => 
        c.id === selectedCompra.id ? { ...c, ...formData, total: formData.cantidad * formData.precioUnitario } : c
      ));
    } else {
      // Agregar nueva compra
      const newCompra = {
        id: compras.length + 1,
        ...formData,
        total: formData.cantidad * formData.precioUnitario
      };
      setCompras([...compras, newCompra]);
    }
    setShowDialog(false);
  };

  const handleDeleteCompra = (id) => {
    setCompras(compras.filter(c => c.id !== id));
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return ValueState.Warning;
      case 'Completado':
        return ValueState.Success;
      case 'Cancelado':
        return ValueState.Error;
      default:
        return ValueState.None;
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center}>
        <Title>Gestión de Compras</Title>
        <Button icon="add" onClick={handleAddCompra}>
          Nueva Compra
        </Button>
      </FlexBox>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Icon name="loading" />
          <Text>Cargando compras...</Text>
        </div>
      ) : (
        <Card style={{ marginTop: '1rem' }}>
          <AnalyticalTable
            data={compras}
            columns={[
              {
                Header: 'Fecha',
                accessor: 'fecha'
              },
              {
                Header: 'Proveedor',
                accessor: 'proveedor'
              },
              {
                Header: 'Producto',
                accessor: 'producto'
              },
              {
                Header: 'Cantidad',
                accessor: 'cantidad'
              },
              {
                Header: 'Precio Unitario',
                accessor: 'precioUnitario',
                Cell: ({ cell }) => `$${cell.value}`
              },
              {
                Header: 'Total',
                accessor: 'total',
                Cell: ({ cell }) => `$${cell.value}`
              },
              {
                Header: 'Estado',
                accessor: 'estado',
                Cell: ({ cell }) => (
                  <ObjectStatus state={getEstadoColor(cell.value)}>
                    {cell.value}
                  </ObjectStatus>
                )
              },
              {
                Header: 'Acciones',
                Cell: ({ row }) => (
                  <FlexBox>
                    <Button icon="edit" onClick={() => handleEditCompra(row.original)} />
                    <Button icon="delete" onClick={() => handleDeleteCompra(row.original.id)} />
                  </FlexBox>
                )
              }
            ]}
          />
        </Card>
      )}

      <Dialog
        open={showDialog}
        onAfterClose={() => setShowDialog(false)}
        headerText={selectedCompra ? 'Editar Compra' : 'Nueva Compra'}
      >
        <Form>
          <FormItem label="Fecha">
            <Input
              type="Date"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            />
          </FormItem>
          <FormItem label="Proveedor">
            <Input
              value={formData.proveedor}
              onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
            />
          </FormItem>
          <FormItem label="Producto">
            <Input
              value={formData.producto}
              onChange={(e) => setFormData({ ...formData, producto: e.target.value })}
            />
          </FormItem>
          <FormItem label="Cantidad">
            <Input
              type="Number"
              value={formData.cantidad}
              onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value) })}
            />
          </FormItem>
          <FormItem label="Precio Unitario">
            <Input
              type="Number"
              value={formData.precioUnitario}
              onChange={(e) => setFormData({ ...formData, precioUnitario: parseFloat(e.target.value) })}
            />
          </FormItem>
          <FormItem label="Estado">
            <Select
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            >
              <Option value="Pendiente">Pendiente</Option>
              <Option value="Completado">Completado</Option>
              <Option value="Cancelado">Cancelado</Option>
            </Select>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button onClick={() => setShowDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveCompra}>Guardar</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Compras; 