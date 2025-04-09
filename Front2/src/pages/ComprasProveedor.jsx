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
  AnalyticalTable
} from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/AllIcons.js";

const ComprasProveedor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [compras, setCompras] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [formData, setFormData] = useState({
    proveedor: '',
    fecha: '',
    producto: '',
    cantidad: 0,
    precioUnitario: 0,
    estado: 'Pendiente'
  });

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setProveedores([
        { id: 1, nombre: 'Proveedor A' },
        { id: 2, nombre: 'Proveedor B' }
      ]);
      setCompras([
        {
          id: 1,
          proveedor: 'Proveedor A',
          fecha: '2024-03-15',
          producto: 'Producto X',
          cantidad: 100,
          precioUnitario: 50,
          total: 5000,
          estado: 'Pendiente'
        },
        {
          id: 2,
          proveedor: 'Proveedor B',
          fecha: '2024-03-14',
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

  // Definir las columnas para la tabla analítica
  const columns = [
    {
      Header: "Proveedor",
      accessor: "proveedor",
      width: 150
    },
    {
      Header: "Fecha",
      accessor: "fecha",
      width: 120
    },
    {
      Header: "Producto",
      accessor: "producto",
      width: 150
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
      width: 100
    },
    {
      Header: "Precio Unitario",
      accessor: "precioUnitario",
      width: 120,
      Cell: ({ value }) => `$${value.toLocaleString()}`
    },
    {
      Header: "Total",
      accessor: "total",
      width: 120,
      Cell: ({ value }) => `$${value.toLocaleString()}`
    },
    {
      Header: "Estado",
      accessor: "estado",
      width: 120,
      Cell: ({ value }) => (
        <ObjectStatus 
          state={value === 'Completado' ? ValueState.Success : ValueState.Warning}
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
            onClick={() => handleEditCompra(row.original)}
          />
          <Button 
            icon="delete" 
            design="Transparent"
            onClick={() => handleDeleteCompra(row.original.id)}
          />
        </FlexBox>
      )
    }
  ];

  const handleAddCompra = () => {
    setSelectedCompra(null);
    setFormData({
      proveedor: '',
      fecha: new Date().toISOString().split('T')[0],
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
    const total = formData.cantidad * formData.precioUnitario;
    
    if (selectedCompra) {
      // Actualizar compra existente
      setCompras(compras.map(c => 
        c.id === selectedCompra.id ? { ...c, ...formData, total } : c
      ));
    } else {
      // Agregar nueva compra
      const newCompra = {
        id: compras.length + 1,
        ...formData,
        total
      };
      setCompras([...compras, newCompra]);
    }
    setShowDialog(false);
  };

  const handleDeleteCompra = (id) => {
    setCompras(compras.filter(c => c.id !== id));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center}>
        <Title>Compras por Proveedor</Title>
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
        headerText={selectedCompra ? 'Editar Compra' : 'Nueva Compra'}
      >
        <Form>
          <FormItem label="Proveedor">
            <Select
              value={formData.proveedor}
              onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
            >
              {proveedores.map(p => (
                <Option key={p.id} value={p.nombre}>{p.nombre}</Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Fecha">
            <Input
              type="date"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
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
              <Option value="En proceso">En proceso</Option>
              <Option value="Completado">Completado</Option>
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

export default ComprasProveedor; 