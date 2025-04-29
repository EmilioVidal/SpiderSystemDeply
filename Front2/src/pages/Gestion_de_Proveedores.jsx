import React, { useState, useEffect, useMemo } from 'react';
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
  FlexBoxDirection,
  FlexBoxAlignItems,
  Icon,
  ObjectStatus,
  ValueState,
  AnalyticalTable,
  AnalyticalTableScaleWidthMode,
  IllustratedMessage,
  Badge,
  Bar,
  TableSelectionMode,
  BusyIndicator,
  FilterBar,
  FilterGroupItem,
  ToolbarSpacer,
  Avatar,
  TabContainer,
  Tab as UI5Tab,
  TabSeparator,
  Select,
  Option,
  IllustrationMessageType,
  ThemeProvider
} from '@ui5/webcomponents-react';
import { spacing } from '@ui5/webcomponents-react-base';
import { useNavigate } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import { styles } from '../Styles/Gestion_de_Proovedores';
import { useUI5Theme } from '../components/UI5ThemeProvider';

const Gestion_de_Proveedores = () => {
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useUI5Theme();
  const [loading, setLoading] = useState(true);
  const [proveedores, setProveedores] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    direccion: '',
    tipo: 'fabricante',
    productos: 0,
    ultimoPedido: 'N/A',
    shoeTypes: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [originalProveedores, setOriginalProveedores] = useState([]);
  const [filterType, setFilterType] = useState('todos');
  const [activeCategory, setActiveCategory] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Definir categoryStats
  const categoryStats = useMemo(() => [
    { count: 87, providers: 3, lowStock: 5, value: 125000 }, // Calzado Deportivo
    { count: 40, providers: 4, lowStock: 8, value: 82000 }, // Calzado Formal
    { count: 63, providers: 2, lowStock: 3, value: 94500 }, // Calzado Casual
    { count: 14, providers: 1, lowStock: 4, value: 35000 }, // Botas
    { count: 94, providers: 5, lowStock: 2, value: 108000 }  // Sandalias
  ], []);

  // Datos estáticos para categorías de productos
  const categories = [
    { id: 1, name: "Calzado Deportivo", description: "Zapatillas y calzado para actividades deportivas" },
    { id: 2, name: "Calzado Formal", description: "Zapatos de vestir y calzado elegante" },
    { id: 3, name: "Calzado Casual", description: "Calzado para uso diario y casual" },
    { id: 4, name: "Botas", description: "Botas de trabajo y botas de moda" },
    { id: 5, name: "Sandalias", description: "Sandalias y calzado de temporada" }
  ];

  // Datos estáticos para proveedores por tipo
  const suppliersByType = [
    { id: 1, name: "Fabricantes Nacionales", count: 5, color: "Success", description: "Fabricantes locales de calzado" },
    { id: 2, name: "Distribuidores Autorizados", count: 3, color: "Information", description: "Distribuidores oficiales de marcas" },
    { id: 3, name: "Importadores Directos", count: 2, color: "Warning", description: "Importadores de calzado internacional" },
    { id: 4, name: "Mayoristas", count: 3, color: "Error", description: "Proveedores de grandes volúmenes" }
  ];

  // Datos de inventario por antigüedad
  const inventoryByAge = [
    { 
      id: 1, 
      name: "Inventario Nuevo", 
      subtitle: "Menos de 30 días",
      count: 157, 
      value: 235000,
      color: "Success",
      description: "Productos recién recibidos en óptimas condiciones"
    },
    { 
      id: 2, 
      name: "Inventario Regular", 
      subtitle: "30-60 días",
      count: 92, 
      value: 138000,
      color: "Information",
      description: "Productos con rotación normal"
    },
    { 
      id: 3, 
      name: "Inventario en Observación", 
      subtitle: "60-90 días",
      count: 35, 
      value: 52500,
      color: "Warning",
      description: "Productos que requieren atención en ventas"
    },
    { 
      id: 4, 
      name: "Inventario Crítico", 
      subtitle: "Más de 90 días",
      count: 14, 
      value: 21000,
      color: "Error",
      description: "Productos que necesitan acción inmediata"
    }
  ];

  // Métodos de pago
  const paymentMethods = [
    { id: "credito", name: "Crédito Corporativo", subtitle: "30 días" },
    { id: "transferencia", name: "Transferencia Bancaria", subtitle: "Pago inmediato" },
    { id: "factura", name: "Factura a 45 días", subtitle: "Requiere aprobación" },
    { id: "anticipado", name: "Pago Anticipado", subtitle: "Pago al realizar pedido" },
    { id: "orden", name: "Orden de Compra", subtitle: "Departamento de adquisiciones" }
  ];

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      const data = [
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
      ];
      setProveedores(data);
      setOriginalProveedores(data);
      setLoading(false);
    }, 1000);
  }, []);

  // Definir las columnas para la tabla analítica
  const columns = [
    {
      Header: "Proveedor",
      accessor: "nombre",
      width: 275,
      disableResizing: true,
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ row }) => (
        <FlexBox direction={FlexBoxDirection.Column} style={{ padding: '0.75rem 0' }}>
          <Text style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.375rem' }}>
            {row.original.nombre}
          </Text>
          <FlexBox alignItems={FlexBoxAlignItems.Center}>
            <Icon name="calendar" style={{ fontSize: '0.75rem', marginRight: '0.375rem', color: isDarkMode ? '#a0a0a0' : '#0854a0' }} />
            <Text style={{ fontSize: '0.75rem', color: isDarkMode ? '#a0a0a0' : '#6a6d70' }}>
              Último pedido: {row.original.ultimoPedido}
            </Text>
          </FlexBox>
        </FlexBox>
      )
    },
    {
      Header: "Contacto",
      accessor: "contacto",
      width: 190,
      disableResizing: true,
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ value, row }) => (
        <FlexBox direction={FlexBoxDirection.Column} style={{ padding: '0.75rem 0' }}>
          <Text style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.375rem' }}>
            {value}
          </Text>
          <FlexBox alignItems={FlexBoxAlignItems.Center}>
            <Icon name="phone" style={{ fontSize: '0.75rem', marginRight: '0.375rem', color: isDarkMode ? '#a0a0a0' : '#0854a0' }} />
            <Text style={{ fontSize: '0.75rem', color: isDarkMode ? '#a0a0a0' : '#6a6d70' }}>
              {row.original.telefono}
            </Text>
          </FlexBox>
        </FlexBox>
      )
    },
    {
      Header: "Email",
      accessor: "email",
      width: 230,
      disableResizing: true,
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ value }) => (
        <FlexBox direction={FlexBoxDirection.Column} style={{ padding: '0.75rem 0' }}>
          <FlexBox alignItems={FlexBoxAlignItems.Start}>
            <Icon name="email" style={{ fontSize: '0.75rem', marginRight: '0.375rem', marginTop: '0.125rem', color: isDarkMode ? '#a0a0a0' : '#0854a0' }} />
            <Text style={{ fontSize: '0.75rem', color: isDarkMode ? '#e0e0e0' : '#32363a' }}>
              {value}
            </Text>
          </FlexBox>
        </FlexBox>
      )
    },
    {
      Header: "Productos",
      accessor: "productos",
      width: 125,
      disableResizing: true,
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ value }) => (
        <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.Center} style={{ padding: '0.75rem 0' }}>
          <Badge
            color={getBadgeColorByProductCount(value)}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}
          >
              {value}
          </Badge>
        </FlexBox>
      )
    },
    {
      Header: "Tipo",
      accessor: "tipo",
      width: 150,
      disableResizing: true,
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ value }) => (
        <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.Center} style={{ padding: '0.75rem 0' }}>
            <ObjectStatus
            state={getTipoValueState(value)}
            style={{ fontSize: '0.8125rem' }}
            >
            {value.charAt(0).toUpperCase() + value.slice(1)}
            </ObjectStatus>
        </FlexBox>
      )
    },
    {
      Header: "Acciones",
      accessor: "id",
      width: 150,
      disableResizing: true,
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => (
        <FlexBox justifyContent={FlexBoxJustifyContent.Center} alignItems={FlexBoxAlignItems.Center} style={{ padding: '0.75rem 0' }}>
          <Button 
            design="Emphasized"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontSize: '0.75rem',
              height: '2.25rem',
              padding: '0 0.75rem'
            }}
            onClick={() => handleViewDetails(row.original)}
          >
            <Icon name="detail-view" />
            Ver detalles
          </Button>
        </FlexBox>
      )
    }
  ];

  const getBadgeColorByProductCount = (count) => {
    if (count > 30) return ValueState.Success;
    if (count > 20) return ValueState.Warning;
    return ValueState.Information;
  };

  const getTipoValueState = (tipo) => {
    switch (tipo) {
      case "fabricante": return ValueState.Success;
      case "distribuidor": return ValueState.Information;
      case "importador": return ValueState.Warning;
      default: return ValueState.Error;
    }
  };

  const getPaymentTermsInfo = (id) => {
    const method = paymentMethods.find(method => method.id === id) || { name: "Desconocido", subtitle: "" };
    return method;
  };

  // Helper para formatear fechas al estilo mexicano
  const formatDateToMexican = (dateString) => {
    try {
      if (dateString.includes('/')) {
        return dateString;
      }
      
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const handleAddProveedor = () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const newId = Math.max(...proveedores.map(p => p.id), 0) + 1;
    const currentDate = new Date().toLocaleDateString('es-MX');
    
    const proveedorToAdd = {
      ...formData,
      id: newId,
      productos: 0,
      ultimoPedido: currentDate
    };
    
    setProveedores(prevProveedores => [...prevProveedores, proveedorToAdd]);
    setOriginalProveedores(prevOriginal => [...prevOriginal, proveedorToAdd]);
    handleCloseAddDialog();
  };

  const handleEditProveedor = (proveedor) => {
    setSelectedProveedor(proveedor);
    setFormData(proveedor);
    setShowDialog(true);
  };

  const handleViewDetails = (proveedor) => {
    console.log("Abriendo detalles del proveedor:", proveedor.nombre);
    setSelectedProveedor(proveedor);
    setShowDialog(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setProveedores(originalProveedores);
      return;
    }
    
    const filtered = originalProveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProveedores(filtered);
  };

  const handleFilterChange = (tipo) => {
    setFilterType(tipo);
    
    if (tipo === 'todos') {
      setProveedores(originalProveedores);
      return;
    }
    
    const filtered = originalProveedores.filter(
      proveedor => proveedor.tipo === tipo
    );
    setProveedores(filtered);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedProveedor(null);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  };

  const handleCloseAddDialog = () => {
    setShowAddDialog(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
    
    // Limpiar estados después de un tiempo
    setTimeout(() => {
      setFormErrors({});
      setFormData({
        nombre: '',
        contacto: '',
        email: '',
        telefono: '',
        direccion: '',
        tipo: 'fabricante',
        productos: 0,
        ultimoPedido: 'N/A',
        shoeTypes: []
      });
    }, 100);
  };

  const handleOpenAddDialog = () => {
    setShowAddDialog(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      if (value.length <= 3) {
        setFormData(prev => ({
          ...prev,
          [name]: "+52"
        }));
        return;
      }

      let formattedPhone = value.replace(/[^\d+]/g, '');
      
      if (!formattedPhone.startsWith('+52')) {
        formattedPhone = '+52' + formattedPhone;
      }
      
      if (formattedPhone.length > 3) {
        formattedPhone = formattedPhone.slice(0, 3) + ' ' + formattedPhone.slice(3);
        if (formattedPhone.length > 6) {
          formattedPhone = formattedPhone.slice(0, 6) + ' ' + formattedPhone.slice(6);
          if (formattedPhone.length > 11) {
            formattedPhone = formattedPhone.slice(0, 11) + ' ' + formattedPhone.slice(11);
          }
        }
      }
      
      formattedPhone = formattedPhone.slice(0, 16);
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleShoeTypeChange = (id) => {
    setFormData(prev => {
      const shoeTypes = [...(prev.shoeTypes || [])];
      
      if (shoeTypes.includes(id)) {
        return {
          ...prev,
          shoeTypes: shoeTypes.filter(typeId => typeId !== id)
        };
      } else {
        return {
          ...prev,
          shoeTypes: [...shoeTypes, id]
        };
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Renderizar el título de la tabla
  const renderTableTitle = () => (
    <div style={{ marginBottom: '1rem' }}>
      <Bar
        design="Header"
        startContent={
          <Title level="H4" style={{ margin: '0', fontSize: '1.125rem', fontWeight: '600' }}>
            Proveedores de Super Shoes
          </Title>
        }
        endContent={
          <Button 
            design="Emphasized"
            onClick={handleOpenAddDialog}
            style={{ 
              height: '1.75rem',
              padding: '0 0.625rem',
              backgroundColor: isDarkMode ? '#4c9aff' : '#0854a0',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.75rem',
              fontWeight: '400',
              border: 'none',
              borderRadius: '0.25rem'
            }}
          >
            Agregar Proveedor
          </Button>
        }
        style={{
          padding: '0.75rem 0',
          backgroundColor: 'transparent',
          height: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 'none',
          boxShadow: 'none'
        }}
      />
      
      {/* Barra de filtros integrada */}
      <div style={{ 
        padding: '0.75rem 0',
        backgroundColor: 'transparent',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '0.5rem'
      }}>
        <FlexBox alignItems={FlexBoxAlignItems.Center}>
          <div style={{ position: 'relative', width: '250px' }}>
            <Icon 
              name="search" 
              style={{ 
                position: 'absolute', 
                left: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: isDarkMode ? '#8a8d91' : '#0854a0',
                fontSize: '1rem'
              }} 
            />
          <Input
            placeholder="Buscar proveedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
              style={{ 
                width: '100%', 
                paddingLeft: '2.25rem',
                borderRadius: '0.25rem',
                height: '2.25rem'
              }}
            />
          </div>
          <Button 
            design="Transparent"
            onClick={handleSearch}
            style={{ marginLeft: '0.25rem' }}
          >
            Buscar
          </Button>
        </FlexBox>
        
        <FlexBox wrap>
          <Text style={{ 
            marginRight: '0.5rem', 
            alignSelf: 'center',
            fontWeight: '600',
            fontSize: '0.875rem'
          }}>
            Filtrar por:
          </Text>
          <FlexBox wrap>
          <Button 
            design={filterType === 'todos' ? 'Emphasized' : 'Default'}
              onClick={() => handleFilterChange('todos')}
            style={{ 
                borderRadius: '1rem', 
              fontSize: '0.75rem', 
              height: '1.75rem',
              margin: '0.125rem',
              minWidth: 'auto',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem'
            }}
          >
            Todos
          </Button>
          <Button 
            design={filterType === 'fabricante' ? 'Emphasized' : 'Default'}
              onClick={() => handleFilterChange('fabricante')}
            style={{ 
              margin: '0.125rem', 
                borderRadius: '1rem', 
              fontSize: '0.75rem', 
              height: '1.75rem',
              minWidth: 'auto',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem'
            }}
          >
            Fabricantes
          </Button>
          <Button 
            design={filterType === 'distribuidor' ? 'Emphasized' : 'Default'}
              onClick={() => handleFilterChange('distribuidor')}
            style={{ 
              margin: '0.125rem', 
                borderRadius: '1rem', 
              fontSize: '0.75rem', 
              height: '1.75rem',
              minWidth: 'auto',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem'
            }}
          >
            Distribuidores
          </Button>
          <Button 
            design={filterType === 'importador' ? 'Emphasized' : 'Default'}
              onClick={() => handleFilterChange('importador')}
            style={{ 
              margin: '0.125rem', 
                borderRadius: '1rem', 
              fontSize: '0.75rem', 
              height: '1.75rem',
              minWidth: 'auto',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem'
            }}
          >
            Importadores
          </Button>
          <Button 
            design={filterType === 'mayorista' ? 'Emphasized' : 'Default'}
              onClick={() => handleFilterChange('mayorista')}
            style={{ 
              margin: '0.125rem', 
                borderRadius: '1rem', 
              fontSize: '0.75rem', 
              height: '1.75rem',
              minWidth: 'auto',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem'
            }}
          >
            Mayoristas
          </Button>
        </FlexBox>
        </FlexBox>
      </div>
    </div>
  );

  // Componente para la paginación
  const renderPagination = () => {
    // Calcular páginas totales
    const totalPages = Math.ceil(proveedores.length / itemsPerPage);
    
    // No mostrar paginación si hay menos de 1 página
    if (totalPages <= 1) return null;

  return (
      <FlexBox 
        justifyContent={FlexBoxJustifyContent.Center} 
        style={{ 
          marginTop: '1rem', 
          padding: '0.5rem',
          backgroundColor: isDarkMode ? '#252525' : '#f5f5f5',
          borderTop: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
        }}
      >
        <Button
          design="Transparent"
          icon="navigation-left-arrow"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ minWidth: '2rem', height: '2rem', padding: '0' }}
        />
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Button
            key={page}
            design={currentPage === page ? "Emphasized" : "Transparent"}
            onClick={() => setCurrentPage(page)}
            style={{ 
              minWidth: '2.25rem',
              height: '2.25rem',
              borderRadius: '0.25rem',
              margin: '0 0.125rem',
              padding: '0'
            }}
          >
            {page}
          </Button>
        ))}
        
        <Button
          design="Transparent"
          icon="navigation-right-arrow"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ minWidth: '2rem', height: '2rem', padding: '0' }}
        />
      </FlexBox>
    );
  };

  // Cálculo de elementos paginados
  const paginatedProveedores = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return proveedores.slice(startIndex, startIndex + itemsPerPage);
  }, [proveedores, currentPage, itemsPerPage]);

  // Función para obtener el color según el tipo y el tema
  const getColorForType = (type, isDark) => {
    switch (type) {
      case 'Success':
        return isDark ? '#36b37e' : '#107e3e';
      case 'Information':
        return isDark ? '#4c9aff' : '#0a6ed1';
      case 'Warning':
        return isDark ? '#ffab00' : '#e9730c';
      case 'Error':
        return isDark ? '#ef5350' : '#bb0000';
      default:
        return isDark ? '#a0a0a0' : '#6a6d70';
    }
  };

  // Función para obtener el icono según la antigüedad
  const getIconForAge = (id) => {
    switch (id) {
      case 1:
        return "product";
      case 2:
        return "offsite-work";
      case 3:
        return "alert";
      case 4:
        return "error";
      default:
        return "time-entry-request";
    }
  };

  // Funciones para el manejo del formulario de agregar proveedor
  const validateForm = () => {
    const errors = {};
    
    if (!formData.nombre.trim()) {
      errors.nombre = "El nombre del proveedor es obligatorio";
    }
    
    if (!formData.contacto.trim()) {
      errors.contacto = "El nombre de contacto es obligatorio";
    }
    
    if (!formData.email.trim()) {
      errors.email = "El correo electrónico es obligatorio";
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Formato de correo inválido";
      }
    }
    
    if (!formData.telefono.trim()) {
      errors.telefono = "El teléfono es obligatorio";
    } else {
      const phoneRegex = /^\+52\s[1-9]\d\s\d{4}\s\d{4}$/;
      if (!phoneRegex.test(formData.telefono)) {
        errors.telefono = "Formato de teléfono inválido. Use: +52 XX XXXX XXXX";
      }
    }
    
    if (!formData.direccion.trim()) {
      errors.direccion = "La dirección es obligatoria";
    }
    
    return errors;
  };

  return (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: isDarkMode ? '#1c1c1c' : '#f7f7f7',
      minHeight: '100vh',
      fontFamily: '"72", Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <div style={{ 
        marginBottom: '1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
        paddingBottom: '1rem',
      }}>
        <Title style={{ 
          fontSize: '1.5rem',
          fontWeight: '500',
          color: isDarkMode ? '#ffffff' : '#32363a',
          textTransform: 'capitalize', 
        }}>
          Gestión de Proveedores
        </Title>
        </div>

        {loading ? (
        <Card 
          style={{ 
            marginTop: '1rem',
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.07)',
            borderRadius: '0.5rem',
            border: 'none',
            overflow: 'hidden',
          }}
        >
            <FlexBox
              justifyContent={FlexBoxJustifyContent.Center}
              alignItems={FlexBoxAlignItems.Center}
              style={{ height: '300px' }}
            >
              <BusyIndicator active size="Medium" />
            <Text style={{ marginLeft: '1rem', color: isDarkMode ? '#e0e0e0' : 'inherit' }}>
              Cargando proveedores...
            </Text>
            </FlexBox>
          </Card>
        ) : (
        <>
          <Card 
            style={{ 
              marginTop: '1rem',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              borderRadius: '0.5rem',
              border: 'none',
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden'
            }}
          >
            {renderTableTitle()}
            
            {proveedores.length === 0 ? (
              <FlexBox
                justifyContent={FlexBoxJustifyContent.Center}
                alignItems={FlexBoxAlignItems.Center}
                style={{ padding: '3rem 0' }}
              >
                <IllustratedMessage
                  name={IllustrationMessageType.SearchEarth}
                  titleText="No se encontraron proveedores"
                  subtitleText="Intenta con otra búsqueda o agrega un nuevo proveedor"
                  style={{ maxWidth: '400px' }}
                />
              </FlexBox>
            ) : (
              <div style={{ 
                padding: '0.75rem', 
                overflowX: 'auto',
                backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.07)',
                borderRadius: '0.5rem',
                border: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
              }}>
            <AnalyticalTable
                  data={paginatedProveedores}
              columns={columns}
                  visibleRows={itemsPerPage}
                  minRows={4}
              scaleWidthMode={AnalyticalTableScaleWidthMode.Smart}
              selectionMode={TableSelectionMode.None}
              withRowHighlight
              tableHooks={[]}
              noDataText="No se encontraron proveedores"
                  style={{
                    width: '100%',
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                    fontSize: '0.875rem',
                    '--_ui5_tc_header_row_outline_width': '0',
                    '--_ui5_tc_row_outline_width': '0',
                    tableLayout: 'fixed',
                    '--_ui5_tc_cell_padding': '0.5rem 0.75rem',
                    '--sapUiContentDisabledTextColor': isDarkMode ? '#e0e0e0' : '#32363a',
                    '--sapContent_GridSize': '0.25rem',
                    '--sapUiTableRowHeight': 'auto',
                    '--sapUiTableRowHdrHeight': '3rem',
                    '--_ui5_tc_cell_vertical_align': 'top',
                    '--sapList_HeaderBorderColor': isDarkMode ? '#444444' : '#e0e0e0',
                    '--sapList_BorderColor': isDarkMode ? '#444444' : '#e8e8e8',
                    '--_ui5_tc_row_hover_outline_color': 'transparent',
                    '--_ui5_analytical_table_header_cell_vertical_align': 'bottom',
                    '--sapUiListHeaderBorderWidth': '0',
                    '--sapUiFieldBorderWidth': '0',
                    '--sapUiListTableFixedColumnWidth': 'auto',
                    '--sapUiBaseBG': isDarkMode ? '#2d2d2d' : '#ffffff',
                    '--sapUiListHeaderBackground': isDarkMode ? '#252525' : '#fafafa',
                    '--sapUiListSelectionBackgroundColor': isDarkMode ? '#3d3d3d' : '#f0f7fd',
                    '--_ui5_tc_row_outline_color': 'transparent',
                    '--_ui5_tc_cell_outline_width': '0',
                    '--_ui5_tc_header_cell_default_border_color': isDarkMode ? '#444444' : '#e5e5e5',
                    '--_ui5_tc_headerBorderWidth': '0 0 1px 0',
                    '--_ui5_analytical_table_header_box_shadow': 'none',
                    '--sapGroup_TitleBackground': isDarkMode ? '#252525' : '#f5f5f5',
                    '--_ui5_analytical_table_header_background_color': isDarkMode ? '#252525' : '#f5f5f5',
                    '--_ui5_tc_row_height': 'auto',
                    '--_ui5_tc_header_row_height': '2.75rem',
                    '--_ui5_tc_row_highlight_display': 'none',
                    '--sapUiElementLineHeight': '1.4',
                    '--sapUiListTableHeaderFontSize': '0.8125rem',
                    '--sapUiTextDisabled': isDarkMode ? '#a0a0a0' : '#666',
                    '--_ui5_tc_padding': '0',
                    '--_ui5_tc_header_cell_padding': '0.75rem 1rem',
                  }}
              resizable={false}
              sortable={false}
              filterable={false}
                  fixedLayout={false}
              alternateRowColor
              wrap="true"
              alwaysShowColHeaders
                  rowHeight={80}
                  headerRowHeight={45}
              highlightField="tipo"
            />
              </div>
            )}
            
            {proveedores.length > 0 && renderPagination()}
          </Card>

          <Card 
            style={{ 
              marginTop: '1.5rem',
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.07)',
              borderRadius: '0.5rem',
              border: 'none',
              overflow: 'hidden',
              padding: '1.5rem',
              width: '100%',
              marginBottom: '3rem'
            }}
          >
            <Title level="H4" style={{ marginBottom: '1rem', fontWeight: '600' }}>
              Resumen de Inventario por Proveedor
            </Title>

            <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
              <TabContainer
                onTabSelect={(e) => setActiveCategory(parseInt(e.detail.tabIndex))}
                selectedIndex={activeCategory}
                style={{ 
                  marginBottom: '1.5rem', 
                  borderBottom: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`
                }}
                fixed
              >
                <UI5Tab
                  text="Por Categoría de Producto"
                  icon="product"
                  semanticColor={activeCategory === 0 ? "Positive" : "Neutral"}
                />
                <UI5Tab
                  text="Por Tipo de Proveedor"
                  icon="supplier"
                  semanticColor={activeCategory === 1 ? "Positive" : "Neutral"}
                />
                <UI5Tab
                  text="Por Antigüedad de Inventario"
                  icon="time-entry-request"
                  semanticColor={activeCategory === 2 ? "Positive" : "Neutral"}
                />
              </TabContainer>
            </div>

            {activeCategory === 0 && (
              <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
                <Title level="H5" style={{ 
                  marginBottom: '1rem', 
                  color: isDarkMode ? '#e0e0e0' : '#32363a', 
                  fontSize: '1.125rem',
                  fontWeight: '600'
                }}>
                  Vista general del inventario por categoría de producto
                </Title>
                <FlexBox wrap style={{ gap: '1.5rem', alignItems: 'stretch', minWidth: '900px', justifyContent: 'space-between' }}>
                  {categories.map((category, index) => {
                    const stats = categoryStats[index];
                    return (
                      <div 
                        key={category.id} 
                        style={{ 
                          padding: '1.5rem',
                          borderRadius: '0.5rem',
                          backgroundColor: isDarkMode ? '#3d3d3d' : '#ffffff',
                          border: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          flexGrow: 1,
                          flexBasis: 'calc(50% - 1.5rem)',
                          minWidth: '400px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center} style={{ marginBottom: '1rem' }}>
                            <Title level="H5" style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                              {category.name}
                            </Title>
                            <Badge
                              color={index % 2 === 0 ? ValueState.Success : ValueState.Information}
                              style={{
                                padding: '0.25rem 0.75rem',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                              }}
                            >
                              <Icon name="product" style={{ fontSize: '0.875rem' }} />
                              <span>{50 + index * 15} productos</span>
                            </Badge>
                          </FlexBox>
                          
                          <Text style={{ fontSize: '0.875rem', color: isDarkMode ? '#a0a0a0' : '#6a6d70', marginBottom: '1rem' }}>
                            {category.description}
                          </Text>
                        </div>
                        
                        <div>
                          <FlexBox style={{ gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ flex: 1 }}>
                              <Text style={{ 
                                fontSize: '0.75rem', 
                                color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                                marginBottom: '0.25rem'
                              }}>
                                Proveedores
                              </Text>
                              <FlexBox alignItems={FlexBoxAlignItems.Center} style={{ gap: '0.375rem' }}>
                                <Icon name="supplier" style={{ 
                                  color: isDarkMode ? '#4c9aff' : '#0854a0',
                                  fontSize: '1rem'
                                }} />
                                <Text style={{ 
                                  fontWeight: '600', 
                                  color: isDarkMode ? '#4c9aff' : '#0854a0',
                                  fontSize: '0.875rem'
                                }}>
                                  {index + 2} activos
                                </Text>
                              </FlexBox>
                            </div>
                            <div style={{ flex: 1 }}>
                              <Text style={{ 
                                fontSize: '0.75rem', 
                                color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                                marginBottom: '0.25rem'
                              }}>
                                Stock Bajo
                              </Text>
                              <FlexBox alignItems={FlexBoxAlignItems.Center} style={{ gap: '0.375rem' }}>
                                <Icon name="alert" style={{ 
                                  color: (index + 3) > 5 ? (isDarkMode ? '#ef5350' : '#bb0000') : (isDarkMode ? '#4c9aff' : '#0854a0'),
                                  fontSize: '1rem'
                                }} />
                                <Text style={{ 
                                  fontWeight: '600',
                                  color: (index + 3) > 5 ? (isDarkMode ? '#ef5350' : '#bb0000') : (isDarkMode ? '#4c9aff' : '#0854a0'),
                                  fontSize: '0.875rem'
                                }}>
                                  {index + 3} productos
                                </Text>
                              </FlexBox>
                            </div>
                          </FlexBox>
                          
                          <div style={{ 
                            marginTop: '1rem', 
                            paddingTop: '1rem', 
                            borderTop: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}` 
                          }}>
                            <Text style={{ 
                              fontSize: '0.75rem', 
                              color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                              marginBottom: '0.25rem'
                            }}>
                              Valor de Inventario
                            </Text>
                            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{ gap: '0.375rem' }}>
                              <Icon name="money-bills" style={{ 
                                color: isDarkMode ? '#4c9aff' : '#0854a0',
                                fontSize: '1rem'
                              }} />
                              <Text style={{ 
                                fontWeight: '600', 
                                fontSize: '1rem',
                                color: isDarkMode ? '#4c9aff' : '#0854a0'
                              }}>
                                ${(50000 + index * 15000).toLocaleString()}
                              </Text>
                            </FlexBox>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </FlexBox>
              </div>
            )}
            
            {activeCategory === 1 && (
              <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
                <Title level="H5" style={{ 
                  marginBottom: '1rem', 
                  color: isDarkMode ? '#e0e0e0' : '#32363a', 
                  fontSize: '1.125rem',
                  fontWeight: '600'
                }}>
                  Distribución de proveedores por tipo y su participación en el inventario
                </Title>
                <FlexBox wrap style={{ gap: '1.5rem', alignItems: 'stretch', minWidth: '900px', justifyContent: 'space-between' }}>
                  {suppliersByType.map((type) => (
                    <div 
                      key={type.id} 
                      style={{ 
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: isDarkMode ? '#3d3d3d' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        flexGrow: 1,
                        flexBasis: 'calc(50% - 1.5rem)',
                        minWidth: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <FlexBox alignItems={FlexBoxAlignItems.Center} style={{ marginBottom: '1rem' }}>
                          <Avatar 
                            colorScheme={type.color.toLowerCase()}
                            shape="Circle"
                            size="S"
                            style={{ marginRight: '0.75rem' }}
                          />
                          <Title level="H5" style={{ margin: 0 }}>
                            {type.name}
                          </Title>
                        </FlexBox>
                        
                        <Text style={{ fontSize: '0.875rem', color: isDarkMode ? '#a0a0a0' : '#6a6d70', marginBottom: '1rem' }}>
                          {type.description}
                        </Text>
                      </div>
                      
                      <div>
                        <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center} style={{ marginBottom: '0.5rem' }}>
                          <Text style={{ fontSize: '0.875rem', color: isDarkMode ? '#a0a0a0' : '#6a6d70' }}>
                            Cantidad total:
                          </Text>
                          <ObjectStatus
                            state={ValueState[type.color]}
                            style={{ fontSize: '0.875rem' }}
                          >
                            {type.count} proveedores
                          </ObjectStatus>
                        </FlexBox>
                        
                        <div style={{ marginTop: '1rem' }}>
                          <Text style={{ fontSize: '0.75rem', color: isDarkMode ? '#a0a0a0' : '#6a6d70', marginBottom: '0.25rem' }}>
                            Participación en el inventario:
                          </Text>
                          <div style={{ 
                            width: '100%', 
                            height: '0.5rem', 
                            backgroundColor: isDarkMode ? '#252525' : '#f0f0f0', 
                            borderRadius: '0.25rem',
                            overflow: 'hidden',
                            marginBottom: '0.25rem'
                          }}>
                            <div style={{ 
                              width: `${(type.count / 13) * 100}%`, 
                              height: '100%', 
                              backgroundColor: getColorForType(type.color, isDarkMode),
                              borderRadius: '0.25rem' 
                            }}/>
                          </div>
                          <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                            <Text style={{ fontSize: '0.75rem', color: isDarkMode ? '#a0a0a0' : '#6a6d70' }}>
                              0%
                            </Text>
                            <Text style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                              {Math.round((type.count / 13) * 100)}%
                            </Text>
                            <Text style={{ fontSize: '0.75rem', color: isDarkMode ? '#a0a0a0' : '#6a6d70' }}>
                              100%
                            </Text>
                          </FlexBox>
                        </div>
                      </div>
                    </div>
                  ))}
                </FlexBox>
              </div>
            )}
            
            {activeCategory === 2 && (
              <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
                <Title level="H5" style={{ 
                  marginBottom: '1rem', 
                  color: isDarkMode ? '#e0e0e0' : '#32363a', 
                  fontSize: '1.125rem',
                  fontWeight: '600'
                }}>
                  Análisis del inventario por tiempo de permanencia en almacén
                </Title>
                <FlexBox wrap style={{ gap: '1.5rem', alignItems: 'stretch', minWidth: '900px', justifyContent: 'space-between' }}>
                  {inventoryByAge.map((item) => (
                    <div 
                      key={item.id} 
                      style={{ 
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: isDarkMode ? '#3d3d3d' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        flexGrow: 1,
                        flexBasis: 'calc(50% - 1.5rem)',
                        minWidth: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center} style={{ marginBottom: '0.5rem' }}>
                          <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <Icon 
                              name={getIconForAge(item.id)} 
                              style={{ 
                                marginRight: '0.75rem',
                                color: getColorForType(item.color, isDarkMode),
                                fontSize: '1.125rem'
                              }}
                            />
                            <Title level="H5" style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                              {item.name}
                            </Title>
                          </FlexBox>
                          <Badge
                            color={ValueState[item.color]}
                            style={{
                              padding: '0.25rem 0.75rem',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}
                          >
                            <Icon name="time-entry-request" style={{ fontSize: '0.875rem' }} />
                            <span>{item.subtitle}</span>
                          </Badge>
                        </FlexBox>
                        
                        <Text style={{ 
                          fontSize: '0.875rem', 
                          color: isDarkMode ? '#a0a0a0' : '#6a6d70', 
                          marginBottom: '1rem',
                          lineHeight: '1.4'
                        }}>
                          {item.description}
                        </Text>
                      </div>
                      
                      <div>
                        <FlexBox style={{ gap: '2rem', marginTop: '1rem' }}>
                          <div style={{ flex: 1 }}>
                            <Text style={{ 
                              fontSize: '0.75rem', 
                              color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                              marginBottom: '0.375rem'
                            }}>
                              Cantidad
                            </Text>
                            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{ gap: '0.375rem' }}>
                              <Icon name="product" style={{ 
                                color: isDarkMode ? '#4c9aff' : '#0854a0',
                                fontSize: '1rem'
                              }} />
                              <div>
                                <Text style={{ 
                                  fontWeight: '600', 
                                  fontSize: '1rem', 
                                  color: isDarkMode ? '#4c9aff' : '#0854a0'
                                }}>
                                  {item.count.toLocaleString()}
                                </Text>
                              </div>
                            </FlexBox>
                          </div>
                          <div style={{ flex: 1 }}>
                            <Text style={{ 
                              fontSize: '0.75rem', 
                              color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                              marginBottom: '0.375rem'
                            }}>
                              Valor
                            </Text>
                            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{ gap: '0.375rem' }}>
                              <Icon name="money-bills" style={{ 
                                color: isDarkMode ? '#4c9aff' : '#0854a0',
                                fontSize: '1rem'
                              }} />
                              <Text style={{ 
                                fontWeight: '600', 
                                fontSize: '1rem', 
                                color: isDarkMode ? '#4c9aff' : '#0854a0'
                              }}>
                                ${item.value.toLocaleString()}
                              </Text>
                            </FlexBox>
                          </div>
                        </FlexBox>
                        
                        <div style={{ marginTop: '1rem' }}>
                          <Text style={{ 
                            fontSize: '0.75rem', 
                            color: isDarkMode ? '#a0a0a0' : '#6a6d70', 
                            marginBottom: '0.375rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem'
                          }}>
                            <Icon name="chart-axis" style={{ fontSize: '0.875rem' }} />
                            Porcentaje del inventario total
                          </Text>
                          <div style={{ 
                            width: '100%', 
                            height: '0.5rem', 
                            backgroundColor: isDarkMode ? '#252525' : '#f0f0f0', 
                            borderRadius: '0.25rem',
                            overflow: 'hidden',
                            marginBottom: '0.5rem'
                          }}>
                            <div style={{ 
                              width: `${(item.count / 298) * 100}%`, 
                              height: '100%', 
                              backgroundColor: getColorForType(item.color, isDarkMode),
                              borderRadius: '0.25rem',
                              transition: 'width 0.3s ease-in-out'
                            }}/>
                          </div>
                          <FlexBox justifyContent={FlexBoxJustifyContent.End} alignItems={FlexBoxAlignItems.Center} style={{ gap: '0.25rem' }}>
                            <Icon 
                              name="percentage" 
                              style={{ 
                                fontSize: '0.75rem',
                                color: isDarkMode ? '#4c9aff' : '#0854a0'
                              }} 
                            />
                            <Text style={{ 
                              fontSize: '0.875rem', 
                              fontWeight: '600',
                              color: isDarkMode ? '#4c9aff' : '#0854a0'
                            }}>
                              {Math.round((item.count / 298) * 100)}%
                            </Text>
                          </FlexBox>
                        </div>
                      </div>
                    </div>
                  ))}
                </FlexBox>
              </div>
            )}
          </Card>
        </>
      )}

      {/* Custom Modal for Provider Details */}
      {showDialog && selectedProveedor && (
        <>
          {/* Modal Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(2px)',
              zIndex: 999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={handleCloseDialog}
          />
          
          {/* Modal Content */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '0.5rem',
              border: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
              zIndex: 1000,
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1rem 1.5rem',
              borderBottom: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Title level="H4" style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#32363a' }}>
                Detalles del Proveedor
              </Title>
              <Button
                icon="decline"
                design="Transparent"
                onClick={handleCloseDialog}
                style={{ minWidth: 'auto', padding: '0.25rem' }}
              />
            </div>

            {/* Modal Body */}
            <div style={{ 
              padding: '1.5rem',
              overflowY: 'auto',
              maxHeight: 'calc(90vh - 130px)'
            }}>
              <FlexBox direction={FlexBoxDirection.Column} style={{ gap: '1rem' }}>
                <FlexBox style={{ margin: '0.5rem 0' }}>
                  <Text style={{ 
                    width: '120px', 
                    fontWeight: 'bold',
                    color: isDarkMode ? '#e0e0e0' : '#32363a'
                  }}>
                    Nombre:
                  </Text>
                  <Text style={{ 
                    color: isDarkMode ? '#ffffff' : '#32363a'
                  }}>
                    {selectedProveedor.nombre}
                  </Text>
                </FlexBox>
                <FlexBox style={{ margin: '0.5rem 0' }}>
                  <Text style={{ 
                    width: '120px', 
                    fontWeight: 'bold',
                    color: isDarkMode ? '#e0e0e0' : '#32363a'
                  }}>
                    Contacto:
                  </Text>
                  <Text style={{ 
                    color: isDarkMode ? '#ffffff' : '#32363a'
                  }}>
                    {selectedProveedor.contacto}
                  </Text>
                </FlexBox>
                <FlexBox style={{ margin: '0.5rem 0' }}>
                  <Text style={{ 
                    width: '120px', 
                    fontWeight: 'bold',
                    color: isDarkMode ? '#e0e0e0' : '#32363a'
                  }}>
                    Email:
                  </Text>
                  <Text style={{ 
                    color: isDarkMode ? '#ffffff' : '#32363a'
                  }}>
                    {selectedProveedor.email}
                  </Text>
                </FlexBox>
                <FlexBox style={{ margin: '0.5rem 0' }}>
                  <Text style={{ 
                    width: '120px', 
                    fontWeight: 'bold',
                    color: isDarkMode ? '#e0e0e0' : '#32363a'
                  }}>
                    Teléfono:
                  </Text>
                  <Text style={{ 
                    color: isDarkMode ? '#ffffff' : '#32363a'
                  }}>
                    {selectedProveedor.telefono}
                  </Text>
                </FlexBox>
                <FlexBox style={{ margin: '0.5rem 0' }}>
                  <Text style={{ 
                    width: '120px', 
                    fontWeight: 'bold',
                    color: isDarkMode ? '#e0e0e0' : '#32363a'
                  }}>
                    Dirección:
                  </Text>
                  <Text style={{ 
                    color: isDarkMode ? '#ffffff' : '#32363a'
                  }}>
                    {selectedProveedor.direccion}
                  </Text>
                </FlexBox>
                <FlexBox style={{ margin: '0.5rem 0' }}>
                  <Text style={{ 
                    width: '120px', 
                    fontWeight: 'bold',
                    color: isDarkMode ? '#e0e0e0' : '#32363a'
                  }}>
                    Tipo:
                  </Text>
                  <ObjectStatus state={getTipoValueState(selectedProveedor.tipo)}>
                    {selectedProveedor.tipo.charAt(0).toUpperCase() + selectedProveedor.tipo.slice(1)}
                  </ObjectStatus>
                </FlexBox>
                <FlexBox style={{ margin: '0.5rem 0' }}>
                  <Text style={{ 
                    width: '120px', 
                    fontWeight: 'bold',
                    color: isDarkMode ? '#e0e0e0' : '#32363a'
                  }}>
                    Productos:
                  </Text>
                  <Badge color={getBadgeColorByProductCount(selectedProveedor.productos)}>
                    {selectedProveedor.productos}
                  </Badge>
                </FlexBox>
                <FlexBox style={{ margin: '0.5rem 0' }}>
                  <Text style={{ 
                    width: '120px', 
                    fontWeight: 'bold',
                    color: isDarkMode ? '#e0e0e0' : '#32363a'
                  }}>
                    Último Pedido:
                  </Text>
                  <Text style={{ 
                    color: isDarkMode ? '#ffffff' : '#32363a'
                  }}>
                    {selectedProveedor.ultimoPedido}
                  </Text>
                </FlexBox>
              </FlexBox>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <Button 
                design="Emphasized" 
                onClick={handleCloseDialog}
                style={{ 
                  minWidth: '5rem',
                  backgroundColor: isDarkMode ? '#4c9aff' : '#0854a0',
                  color: 'white'
                }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Custom Modal for Adding Provider */}
      {showAddDialog && (
        <>
          {/* Modal Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(2px)',
              zIndex: 999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={handleCloseAddDialog}
          />
          
          {/* Modal Content */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '0.5rem',
              border: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
              zIndex: 1000,
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1rem 1.5rem',
              borderBottom: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Title level="H4" style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#32363a' }}>
                Agregar Nuevo Proveedor
              </Title>
              <Button
                icon="decline"
                design="Transparent"
                onClick={handleCloseAddDialog}
                style={{ minWidth: 'auto', padding: '0.25rem' }}
              />
            </div>

            {/* Modal Body */}
            <div style={{ 
              padding: '1.5rem',
              overflowY: 'auto',
              maxHeight: 'calc(90vh - 130px)'
            }}>
              <Text style={{ 
                marginBottom: '1.5rem', 
                color: isDarkMode ? '#e0e0e0' : '#6a6d70',
                fontSize: '0.875rem',
                lineHeight: '1.4',
                display: 'block'
              }}>
                Complete la información del nuevo proveedor. Todos los campos marcados con * son obligatorios.
              </Text>
              <Form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <FormItem
                  style={{ margin: 0 }}
                  label={
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: '0.25rem'
                      }}>
                        <Text style={{ 
                          fontWeight: '600',
                          color: isDarkMode ? '#e0e0e0' : '#32363a',
                          fontSize: '0.875rem'
                        }}>
                          Nombre del Proveedor
                        </Text>
                        <Text style={{ 
                          color: '#bb0000',
                          marginLeft: '0.25rem'
                        }}>*</Text>
                      </div>
                      <Text style={{ 
                        fontSize: '0.75rem',
                        color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                        lineHeight: '1.3'
                      }}>
                        Nombre comercial o razón social completa
                      </Text>
                    </div>
                  }
                >
                  <Input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    valueState={formErrors.nombre ? ValueState.Error : ValueState.None}
                    valueStateMessage={formErrors.nombre}
                    placeholder="Ej: Calzado Deportivo Premium S.A. de C.V."
                    style={{ width: '100%' }}
                  />
                </FormItem>

                <FormItem
                  style={{ margin: 0 }}
                  label={
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: '0.25rem'
                      }}>
                        <Text style={{ 
                          fontWeight: '600',
                          color: isDarkMode ? '#e0e0e0' : '#32363a',
                          fontSize: '0.875rem'
                        }}>
                          Nombre del Contacto
                        </Text>
                        <Text style={{ 
                          color: '#bb0000',
                          marginLeft: '0.25rem'
                        }}>*</Text>
                      </div>
                      <Text style={{ 
                        fontSize: '0.75rem',
                        color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                        lineHeight: '1.3'
                      }}>
                        Persona responsable o representante
                      </Text>
                    </div>
                  }
                >
                  <Input
                    name="contacto"
                    value={formData.contacto}
                    onChange={handleInputChange}
                    valueState={formErrors.contacto ? ValueState.Error : ValueState.None}
                    valueStateMessage={formErrors.contacto}
                    placeholder="Ej: Juan Pérez González"
                    style={{ width: '100%' }}
                  />
                </FormItem>

                <FormItem
                  style={{ margin: 0 }}
                  label={
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: '0.25rem'
                      }}>
                        <Text style={{ 
                          fontWeight: '600',
                          color: isDarkMode ? '#e0e0e0' : '#32363a',
                          fontSize: '0.875rem'
                        }}>
                          Correo Electrónico
                        </Text>
                        <Text style={{ 
                          color: '#bb0000',
                          marginLeft: '0.25rem'
                        }}>*</Text>
                      </div>
                      <Text style={{ 
                        fontSize: '0.75rem',
                        color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                        lineHeight: '1.3'
                      }}>
                        Correo electrónico principal para comunicaciones
                      </Text>
                    </div>
                  }
                >
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    valueState={formErrors.email ? ValueState.Error : ValueState.None}
                    valueStateMessage={formErrors.email}
                    placeholder="Ej: contacto@empresa.com"
                    style={{ width: '100%' }}
                  />
                </FormItem>

                <FormItem
                  style={{ margin: 0 }}
                  label={
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: '0.25rem'
                      }}>
                        <Text style={{ 
                          fontWeight: '600',
                          color: isDarkMode ? '#e0e0e0' : '#32363a',
                          fontSize: '0.875rem'
                        }}>
                          Teléfono
                        </Text>
                        <Text style={{ 
                          color: '#bb0000',
                          marginLeft: '0.25rem'
                        }}>*</Text>
                      </div>
                      <Text style={{ 
                        fontSize: '0.75rem',
                        color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                        lineHeight: '1.3'
                      }}>
                        Número de teléfono con formato: +52 XX XXXX XXXX
                      </Text>
                    </div>
                  }
                >
                  <Input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    valueState={formErrors.telefono ? ValueState.Error : ValueState.None}
                    valueStateMessage={formErrors.telefono}
                    placeholder="+52 55 1234 5678"
                    style={{ width: '100%' }}
                  />
                </FormItem>

                <FormItem
                  style={{ margin: 0 }}
                  label={
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: '0.25rem'
                      }}>
                        <Text style={{ 
                          fontWeight: '600',
                          color: isDarkMode ? '#e0e0e0' : '#32363a',
                          fontSize: '0.875rem'
                        }}>
                          Dirección
                        </Text>
                        <Text style={{ 
                          color: '#bb0000',
                          marginLeft: '0.25rem'
                        }}>*</Text>
                      </div>
                      <Text style={{ 
                        fontSize: '0.75rem',
                        color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                        lineHeight: '1.3'
                      }}>
                        Dirección completa incluyendo calle, número, colonia, ciudad y estado
                      </Text>
                    </div>
                  }
                >
                  <Input
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    valueState={formErrors.direccion ? ValueState.Error : ValueState.None}
                    valueStateMessage={formErrors.direccion}
                    placeholder="Ej: Calle Industria 123, Col. Centro, Ciudad de México"
                    style={{ width: '100%' }}
                  />
                </FormItem>

                <FormItem
                  style={{ margin: 0 }}
                  label={
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: '0.25rem'
                      }}>
                        <Text style={{ 
                          fontWeight: '600',
                          color: isDarkMode ? '#e0e0e0' : '#32363a',
                          fontSize: '0.875rem'
                        }}>
                          Tipo de Proveedor
                        </Text>
                      </div>
                      <Text style={{ 
                        fontSize: '0.75rem',
                        color: isDarkMode ? '#a0a0a0' : '#6a6d70',
                        lineHeight: '1.3'
                      }}>
                        Seleccione la categoría que mejor describe al proveedor
                      </Text>
                    </div>
                  }
                >
                  <Select
                    name="tipo"
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <Option value="fabricante">Fabricante - Produce calzado directamente</Option>
                    <Option value="distribuidor">Distribuidor - Representa marcas oficialmente</Option>
                    <Option value="importador">Importador - Trae productos del extranjero</Option>
                    <Option value="mayorista">Mayorista - Maneja grandes volúmenes</Option>
                  </Select>
                </FormItem>
              </Form>

              {Object.keys(formErrors).length > 0 && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  backgroundColor: isDarkMode ? '#442726' : '#ffeaea',
                  border: `1px solid ${isDarkMode ? '#5c2b2b' : '#ffd7d7'}`,
                  borderRadius: '0.25rem'
                }}>
                  <Text style={{
                    color: isDarkMode ? '#ff8d8d' : '#ab1f1f',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    display: 'block'
                  }}>
                    Por favor corrija los siguientes errores:
                  </Text>
                  <ul style={{ 
                    marginLeft: '1.25rem',
                    listStyle: 'disc'
                  }}>
                    {Object.entries(formErrors).map(([field, error]) => (
                      <li key={field} style={{
                        color: isDarkMode ? '#ff8d8d' : '#ab1f1f',
                        fontSize: '0.75rem',
                        marginBottom: '0.25rem',
                        lineHeight: '1.3'
                      }}>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: `1px solid ${isDarkMode ? '#444444' : '#e0e0e0'}`,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.5rem'
            }}>
              <Button 
                design="Transparent" 
                onClick={handleCloseAddDialog}
                style={{ minWidth: '5rem' }}
              >
                Cancelar
              </Button>
              <Button 
                design="Emphasized" 
                onClick={handleAddProveedor}
                style={{ 
                  minWidth: '5rem',
                  backgroundColor: isDarkMode ? '#4c9aff' : '#0854a0',
                  color: 'white'
                }}
              >
                Guardar
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Gestion_de_Proveedores;