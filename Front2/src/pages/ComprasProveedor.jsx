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
  AnalyticalTable,
  MessageStrip,
  Bar,
  Badge,
  Toolbar,
  ToolbarSpacer,
  IllustratedMessage,
  IllustrationMessageType,
  Popover,
  ButtonDesign
} from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/AllIcons.js";

// Componente de diálogo personalizado sin capa bloqueante
const CustomDialog = ({ isOpen, onClose, title, children, footer, width = "900px" }) => {
  if (!isOpen) return null;

  // Prevenir que clics dentro del diálogo cierren el diálogo
  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }}
      onClick={onClose} // Cerrar al hacer clic fuera del diálogo
    >
      <div 
        style={{
          width: width,
          maxWidth: '95vw',
          maxHeight: '90vh',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1001
        }}
        onClick={handleDialogClick} // Evitar que clics dentro del diálogo lo cierren
      >
        {/* Header */}
        <div style={{ 
          padding: '0.75rem 1rem',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f5f5f5'
        }}>
          <Title level="H4">{title}</Title>
          <Button 
            icon="decline" 
            design="Transparent" 
            onClick={onClose}
            ariaLabel="Cerrar"
          />
        </div>
        
        {/* Content */}
        <div style={{ 
          padding: '1rem', 
          overflowY: 'auto',
          flexGrow: 1,
          maxHeight: 'calc(80vh - 120px)'
        }}>
          {children}
        </div>
        
        {/* Footer */}
        <div style={{ 
          padding: '0.75rem 1rem',
          borderTop: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#f5f5f5'
        }}>
          {footer}
        </div>
      </div>
    </div>
  );
};

const ComprasProveedor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [compras, setCompras] = useState([]);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionType, setActionType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Mostramos 5 elementos por página por defecto

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setCompras([
        {
          id: "OC-2025-001",
          proveedor: "Calzado Deportivo Premium",
          fecha: "2024-03-13",
          producto: "Zapatillas Deportivas Premium",
          cantidad: 50,
          precioUnitario: 2400,
          total: 120000,
          estado: "pendiente",
          prioridad: "alta",
          fechaLimite: "2024-03-18",
          notas: "Urgente - Temporada nueva",
          metodoEnvio: "Transportadora XYZ",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Crédito Corporativo",
            terminosPago: "30 días"
          }
        },
        {
          id: "OC-2025-002",
          proveedor: "Distribuidora de Zapatos Elegance",
          fecha: "2024-03-12",
          producto: "Mocasines Elegance",
          cantidad: 30,
          precioUnitario: 3333,
          total: 100000,
          estado: "en_proceso",
          prioridad: "media",
          fechaLimite: "2024-03-20",
          notas: "-",
          metodoEnvio: "Transportadora ABC",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Factura a 45 días",
            terminosPago: "45 días"
          }
        },
        {
          id: "OC-2025-003",
          proveedor: "Importadora Footwear Internacional",
          fecha: "2024-03-11",
          producto: "Botas de Cuero Importadas",
          cantidad: 25,
          precioUnitario: 4800,
          total: 120000,
          estado: "en_transito",
          prioridad: "baja",
          fechaLimite: "2024-03-23",
          notas: "-",
          metodoEnvio: "Transportadora LMN",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Transferencia bancaria",
            terminosPago: "15 días"
          }
        },
        {
          id: "OC-2025-004",
          proveedor: "Zapatos y Complementos Moda Total",
          fecha: "2024-03-10",
          producto: "Zapatos Formales Modelo Ejecutivo",
          cantidad: 40,
          precioUnitario: 2500,
          total: 100000,
          estado: "pendiente",
          prioridad: "alta",
          fechaLimite: "2024-03-16",
          notas: "Cliente corporativo",
          metodoEnvio: "DHL Express",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Tarjeta corporativa",
            terminosPago: "Inmediato"
          }
        },
        {
          id: "OC-2025-005",
          proveedor: "Calzado Infantil Happy Feet",
          fecha: "2024-03-09",
          producto: "Zapatos Escolares Niño",
          cantidad: 60,
          precioUnitario: 1200,
          total: 72000,
          estado: "completada",
          prioridad: "media",
          fechaLimite: "2024-03-15",
          notas: "Pedido temporada escolar",
          metodoEnvio: "Fedex",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Transferencia bancaria",
            terminosPago: "Pagado"
          }
        },
        {
          id: "OC-2025-006",
          proveedor: "Accesorios para Calzado S.A.",
          fecha: "2024-03-08",
          producto: "Plantillas Ergonómicas",
          cantidad: 100,
          precioUnitario: 350,
          total: 35000,
          estado: "en_proceso",
          prioridad: "baja",
          fechaLimite: "2024-03-18",
          notas: "Accesorios",
          metodoEnvio: "Transportadora XYZ",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Crédito Corporativo",
            terminosPago: "30 días"
          }
        },
        {
          id: "OC-2025-007",
          proveedor: "Calzado Deportivo Premium",
          fecha: "2024-03-07",
          producto: "Zapatillas Running Pro",
          cantidad: 45,
          precioUnitario: 2800,
          total: 126000,
          estado: "completada",
          prioridad: "alta",
          fechaLimite: "2024-03-14",
          notas: "Stock prioritario",
          metodoEnvio: "DHL Express",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Tarjeta corporativa",
            terminosPago: "Pagado"
          }
        },
        {
          id: "OC-2025-008",
          proveedor: "Importadora Footwear Internacional",
          fecha: "2024-03-06",
          producto: "Sandalias Playa Deluxe",
          cantidad: 80,
          precioUnitario: 950,
          total: 76000,
          estado: "en_transito",
          prioridad: "media",
          fechaLimite: "2024-03-16",
          notas: "Temporada verano",
          metodoEnvio: "Transportadora LMN",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Crédito Corporativo",
            terminosPago: "45 días"
          }
        },
        {
          id: "OC-2025-009",
          proveedor: "Calzado Deportivo Premium",
          fecha: "2024-03-05",
          producto: "Tenis Casual Street",
          cantidad: 65,
          precioUnitario: 1800,
          total: 117000,
          estado: "pendiente",
          prioridad: "media",
          fechaLimite: "2024-03-15",
          notas: "Colección urbana",
          metodoEnvio: "Transportadora XYZ",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Crédito Corporativo",
            terminosPago: "30 días"
          }
        },
        {
          id: "OC-2025-010",
          proveedor: "Distribuidora de Zapatos Elegance",
          fecha: "2024-03-04",
          producto: "Zapatos de Vestir Premium",
          cantidad: 35,
          precioUnitario: 2900,
          total: 101500,
          estado: "en_proceso",
          prioridad: "alta",
          fechaLimite: "2024-03-14",
          notas: "Evento corporativo",
          metodoEnvio: "DHL Express",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Transferencia bancaria",
            terminosPago: "15 días"
          }
        },
        {
          id: "OC-2025-011",
          proveedor: "Accesorios para Calzado S.A.",
          fecha: "2024-03-03",
          producto: "Limpiadores Especializados",
          cantidad: 120,
          precioUnitario: 250,
          total: 30000,
          estado: "completada",
          prioridad: "baja",
          fechaLimite: "2024-03-10",
          notas: "Productos de limpieza",
          metodoEnvio: "Transportadora ABC",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Tarjeta corporativa",
            terminosPago: "Pagado"
          }
        },
        {
          id: "OC-2025-012",
          proveedor: "Calzado Infantil Happy Feet",
          fecha: "2024-03-02",
          producto: "Zapatos Infantiles Casual",
          cantidad: 50,
          precioUnitario: 950,
          total: 47500,
          estado: "en_transito",
          prioridad: "media",
          fechaLimite: "2024-03-12",
          notas: "Colección primavera",
          metodoEnvio: "Fedex",
          direccionEntrega: "Super Shoes - Tienda Principal, Plaza Comercial Reforma, Local 42B, CDMX",
          detalles: {
            metodoPago: "Crédito Corporativo",
            terminosPago: "45 días"
          }
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar compras según la búsqueda
  const filteredCompras = compras.filter(compra => 
    compra.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    compra.proveedor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    compra.producto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Efecto para resetear a la primera página cuando se realiza una búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompras.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompras.length / itemsPerPage);

  // Función para manejar la paginación de forma segura
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Hacer scroll al inicio de la tabla
      document.querySelector('.analyticalTable')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Manejar ver detalles
  const handleViewDetails = (compra) => {
    setSelectedCompra(compra);
    setShowDetailsDialog(true);
  };

  // Manejar confirmar compra
  const handleConfirmCompra = (compra) => {
    setSelectedCompra(compra);
    setActionType('confirm');
    setShowConfirmDialog(true);
  };

  // Manejar rechazar compra
  const handleRejectCompra = (compra) => {
    setSelectedCompra(compra);
    setActionType('reject');
    setShowRejectDialog(true);
  };

  // Confirmar acción
  const handleConfirmAction = () => {
    if (actionType === 'confirm') {
      // Actualizar estado a en_proceso (en lugar de confirmada)
      const updatedCompras = compras.map(compra => 
        compra.id === selectedCompra.id 
          ? { ...compra, estado: 'en_proceso' } 
          : compra
      );
      setCompras(updatedCompras);
      setShowConfirmDialog(false);
      setShowDetailsDialog(false);
      
      // Mostrar mensaje de éxito
      alert('Orden aceptada exitosamente');
    } else if (actionType === 'reject') {
      // Eliminar la orden de la lista
      const updatedCompras = compras.filter(compra => compra.id !== selectedCompra.id);
      setCompras(updatedCompras);
      setShowRejectDialog(false);
      setShowDetailsDialog(false);
      
      // Mostrar mensaje de éxito
      alert('Orden rechazada exitosamente');
    }
    setSelectedCompra(null);
    setActionType(null);
  };

  // Obtener color del estado
  const getStatusValueState = (estado) => {
    switch(estado) {
      case 'pendiente': return ValueState.Warning;
      case 'en_proceso': return ValueState.Information;
      case 'en_transito': return ValueState.Information;
      case 'confirmada': return ValueState.Success;
      case 'completada': return ValueState.Success;
      case 'rechazada': return ValueState.Error;
      case 'cancelada': return ValueState.Error;
      default: return ValueState.Warning; // Por defecto muestra como pendiente
    }
  };

  // Obtener texto del estado
  const getStatusText = (estado) => {
    switch(estado) {
      case 'pendiente': return 'Pendiente';
      case 'en_proceso': return 'En proceso';
      case 'en_transito': return 'En tránsito';
      case 'confirmada': return 'Confirmada';
      case 'completada': return 'Completada';
      case 'rechazada': return 'Rechazada';
      case 'cancelada': return 'Cancelada';
      default: return 'Pendiente'; // Por defecto muestra como pendiente
    }
  };

  // Obtener color de prioridad
  const getPriorityValueState = (prioridad) => {
    switch(prioridad) {
      case 'alta': return ValueState.Error;
      case 'media': return ValueState.Warning;
      case 'baja': return ValueState.Information;
      default: return ValueState.None;
    }
  };

  // Obtener color de badge de prioridad
  const getPriorityBadgeColor = (prioridad) => {
    switch(prioridad) {
      case 'alta': return '3'; // Rojo
      case 'media': return '7'; // Naranja
      case 'baja': return '8'; // Azul
      default: return '10';
    }
  };

  // Obtener texto de prioridad
  const getPriorityText = (prioridad) => {
    switch(prioridad) {
      case 'alta': return 'Alta';
      case 'media': return 'Media';
      case 'baja': return 'Baja';
      default: return prioridad;
    }
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-MX', options);
  };

  // Exportar a CSV
  const handleExportData = () => {
    const header = [
      'Número de Orden',
      'Fecha de Pedido',
      'Producto',
      'Cantidad',
      'Estado',
      'Prioridad',
      'Fecha Límite',
      'Notas',
      'Método de Envío',
      'Dirección de Entrega',
      'Proveedor',
      'Total'
    ].join(',');
    
    const rows = filteredCompras.map(compra => [
      compra.id,
      compra.fecha,
      `"${compra.producto}"`,
      compra.cantidad,
      getStatusText(compra.estado),
      getPriorityText(compra.prioridad),
      compra.fechaLimite,
      `"${compra.notas}"`,
      `"${compra.metodoEnvio}"`,
      `"${compra.direccionEntrega}"`,
      `"${compra.proveedor}"`,
      compra.total
    ].join(','));
    
    const csv = [header, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ordenes_de_compra.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Definir las columnas para la tabla analítica
  const columns = [
    {
      Header: "Número de Orden",
      accessor: "id",
      width: 150
    },
    {
      Header: "Fecha de Pedido",
      accessor: "fecha",
      width: 150,
      Cell: ({ value }) => formatDate(value)
    },
    {
      Header: "Producto",
      accessor: "producto",
      width: 200
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
      width: 100,
      Cell: ({ value }) => (
        <Badge colorScheme={value > 30 ? "8" : "10"}>
          {value}
        </Badge>
      )
    },
    {
      Header: "Estado",
      accessor: "estado",
      width: 120,
      Cell: ({ value }) => {
        const estado = value || 'pendiente'; // Si no hay valor, mostrar como pendiente
        let backgroundColor;
        let textColor = 'white';
        
        // Asignar colores según el estado
        switch(estado) {
          case 'pendiente':
            backgroundColor = '#e9730c'; // Naranja para Pendiente
            break;
          case 'en_proceso':
            backgroundColor = '#0a6ed1'; // Azul para En proceso
            break;
          case 'en_transito':
            backgroundColor = '#0a6ed1'; // Azul para En tránsito
            break;
          case 'completada':
          case 'confirmada':
            backgroundColor = '#107e3e'; // Verde para Completada/Confirmada
            break;
          default:
            backgroundColor = '#e9730c'; // Por defecto Naranja
        }
        
        return (
          <div style={{
            backgroundColor: backgroundColor,
            color: textColor,
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'inline-block',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}>
            {getStatusText(estado)}
          </div>
        );
      }
    },
    {
      Header: "Prioridad",
      accessor: "prioridad",
      width: 120,
      Cell: ({ value }) => (
        <Badge colorScheme={getPriorityBadgeColor(value)}>
          {getPriorityText(value)}
        </Badge>
      )
    },
    {
      Header: "Fecha Límite",
      accessor: "fechaLimite",
      width: 150,
      Cell: ({ value }) => formatDate(value)
    },
    {
      Header: "Notas",
      accessor: "notas",
      width: 200
    },
    {
      Header: "Método de Envío",
      accessor: "metodoEnvio",
      width: 180
    },
    {
      Header: "Dirección de Entrega",
      accessor: "direccionEntrega",
      width: 300
    },
    {
      Header: "Acciones",
      accessor: "actions",
      width: 300,
      Cell: ({ row }) => (
        <FlexBox style={{ gap: '0.5rem' }}>
          <Button 
            design="Emphasized"
            icon="detail-view"
            onClick={() => handleViewDetails(row.original)}
            style={{ backgroundColor: '#0854a0', color: 'white' }}
          >
            Ver Detalle
          </Button>
          {row.original.estado === 'pendiente' && (
            <>
              <Button 
                design="Negative"
                icon="decline"
                onClick={() => handleRejectCompra(row.original)}
                style={{ backgroundColor: '#bb0000', color: 'white' }}
              >
                Rechazar
              </Button>
              <Button 
                design="Emphasized"
                icon="accept"
                onClick={() => handleConfirmCompra(row.original)}
                style={{ backgroundColor: '#0a6ed1', color: 'white' }}
              >
                Aceptar
              </Button>
            </>
          )}
        </FlexBox>
      )
    }
  ];

  return (
    <div style={{ 
      padding: '1.5rem',
      paddingTop: '6rem', // Espacio mayor en la parte superior para dejar espacio al header
      maxWidth: '100%',
      boxSizing: 'border-box',
      background: '#f5f5f5' // Fondo sutil para mejor contraste
    }}>
      {/* Encabezado de la página */}
      <FlexBox alignItems={FlexBoxAlignItems.Center} style={{ 
        marginBottom: '2rem',
        padding: '0.5rem 0'
      }}>
        <Icon name="shopping-cart" style={{ marginRight: '1rem', fontSize: '2rem', color: '#0854a0' }} />
        <Title level="H1" style={{ margin: 0, color: '#333' }}>Órdenes de Compra - Super Shoes</Title>
      </FlexBox>
      
      {/* Tarjeta principal de compras */}
      <Card 
        style={{ 
          marginBottom: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          borderRadius: '8px'
        }}
        header={
          <div style={{ padding: '1.5rem 1.5rem 0.5rem 1.5rem' }}>
            <Title level="H4">Órdenes de Compra</Title>
          </div>
        }
      >
        <div style={{ padding: '1.5rem' }}>
          {/* Barra de herramientas */}
          <Toolbar style={{ 
            marginBottom: '1.5rem',
            padding: '0.5rem 0'
          }}>
            <Button 
              icon="download"
              design="Emphasized"
              onClick={handleExportData}
              style={{
                backgroundColor: '#0854a0',
                color: 'white',
                padding: '0.5rem 1rem',
                height: 'auto'
              }}
            >
              Exportar Catálogo
            </Button>
            <ToolbarSpacer />
            <div style={{ position: 'relative', width: '300px' }}>
              <Input
                icon="search"
                placeholder="Buscar orden..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </Toolbar>
          
          {/* Tabla de compras */}
          <div style={{ 
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
          }}>
            <AnalyticalTable
              data={currentItems} // Usamos los elementos paginados
              columns={columns}
              visibleRows={itemsPerPage}
              minRows={itemsPerPage}
              scaleWidthMode="Grow"
              alternateRowColor
              header={<div style={{ height: '0.5rem' }}></div>}
              noDataText={
                <IllustratedMessage
                  name={IllustrationMessageType.SearchEarth}
                  titleText="No se encontraron compras"
                  subtitleText="Intenta cambiar tus criterios de búsqueda"
                  style={{ margin: '2rem 0' }}
                />
              }
            />
          </div>
          
          {/* Controles de paginación */}
          {filteredCompras.length > 0 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              margin: '1.5rem 0',
              padding: '1rem 0',
              borderTop: '1px solid #e5e5e5'
            }}>
              {/* Selector de elementos por página */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Text>Elementos por página:</Text>
                <Select
                  onChange={(e) => {
                    setItemsPerPage(parseInt(e.detail.selectedOption.dataset.value));
                    setCurrentPage(1); // Resetear a primera página
                  }}
                  style={{ width: '80px' }}
                >
                  <Option data-value="5" selected={itemsPerPage === 5}>5</Option>
                  <Option data-value="10" selected={itemsPerPage === 10}>10</Option>
                  <Option data-value="15" selected={itemsPerPage === 15}>15</Option>
                </Select>
              </div>
              
              {/* Controles de navegación */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '0.5rem'
              }}>
                <Button 
                  icon="nav-back" 
                  design="Transparent"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  ariaLabel="Página anterior"
                  style={{ minWidth: '36px', height: '36px', padding: '0' }}
                />
                
                {/* Mostrar números de página */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  // Mostrar solo un subconjunto de páginas si hay muchas
                  .filter(number => 
                    number === 1 || 
                    number === totalPages || 
                    (number >= currentPage - 1 && number <= currentPage + 1)
                  )
                  .map((number, index, array) => (
                    <React.Fragment key={number}>
                      {/* Mostrar puntos suspensivos si hay saltos en la secuencia */}
                      {index > 0 && array[index - 1] !== number - 1 && (
                        <span style={{ margin: '0 4px' }}>...</span>
                      )}
                      <Button 
                        design={number === currentPage ? "Emphasized" : "Default"}
                        onClick={() => paginate(number)}
                        style={{
                          minWidth: '36px',
                          height: '36px',
                          padding: '0',
                          borderRadius: '4px',
                          ...(number === currentPage 
                            ? { backgroundColor: '#0854a0', color: 'white' } 
                            : {})
                        }}
                      >
                        {number}
                      </Button>
                    </React.Fragment>
                  ))
                }
                
                <Button 
                  icon="nav-forward" 
                  design="Transparent"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  ariaLabel="Página siguiente"
                  style={{ minWidth: '36px', height: '36px', padding: '0' }}
                />
              </div>
              
              {/* Información de paginación */}
              <div style={{ color: '#666', fontSize: '0.875rem' }}>
                {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredCompras.length)} de {filteredCompras.length}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Diálogo de detalles personalizado */}
      <CustomDialog
        isOpen={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        title="Detalles de la Compra"
        footer={
          <FlexBox style={{ gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button 
              design="Default"
              onClick={() => setShowDetailsDialog(false)}
            >
              Cerrar
            </Button>
            {selectedCompra && selectedCompra.estado === 'pendiente' && (
              <>
                <Button 
                  design="Negative"
                  icon="decline"
                  onClick={() => {
                    setActionType('reject');
                    setShowRejectDialog(true);
                  }}
                  style={{ backgroundColor: '#bb0000', color: 'white' }}
                >
                  Rechazar Orden
                </Button>
                <Button 
                  design="Emphasized"
                  icon="accept"
                  onClick={() => {
                    setActionType('confirm');
                    setShowConfirmDialog(true);
                  }}
                  style={{ backgroundColor: '#0854a0', color: 'white' }}
                >
                  Aceptar
                </Button>
              </>
            )}
          </FlexBox>
        }
      >
        {selectedCompra && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <Form columnsL={1} columnsXL={1}>
                  <FormItem label="Número de Orden:">
                    <Title level="H5">{selectedCompra.id}</Title>
                  </FormItem>
                  
                  <FormItem label="Proveedor:">
                    <Text>{selectedCompra.proveedor}</Text>
                  </FormItem>
                  
                  <FormItem label="Fecha:">
                    <Text>{formatDate(selectedCompra.fecha)}</Text>
                  </FormItem>
                  
                  <FormItem label="Estado:">
                    <ObjectStatus
                      state={getStatusValueState(selectedCompra.estado)}
                      text={getStatusText(selectedCompra.estado)}
                    />
                  </FormItem>
                  
                  <FormItem label="Prioridad:">
                    <Badge colorScheme={getPriorityBadgeColor(selectedCompra.prioridad)}>
                      {getPriorityText(selectedCompra.prioridad)}
                    </Badge>
                  </FormItem>
                </Form>
              </div>
              
              <div style={{ flex: '1 1 300px' }}>
                <Form columnsL={1} columnsXL={1}>
                  <FormItem label="Producto:">
                    <Text>{selectedCompra.producto}</Text>
                  </FormItem>
                  
                  <FormItem label="Cantidad:">
                    <Badge colorScheme="8">{selectedCompra.cantidad}</Badge>
                  </FormItem>
                  
                  <FormItem label="Precio Unitario:">
                    <Text>${selectedCompra.precioUnitario.toLocaleString()}</Text>
                  </FormItem>
                  
                  <FormItem label="Total:">
                    <Text style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                      ${selectedCompra.total.toLocaleString()}
                    </Text>
                  </FormItem>
                  
                  <FormItem label="Fecha Límite:">
                    <Text>{formatDate(selectedCompra.fechaLimite)}</Text>
                  </FormItem>
                </Form>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Title level="H5" style={{ marginBottom: '1rem' }}>Información de Entrega</Title>
              <Form columnsL={1} columnsXL={1}>
                <FormItem label="Método de Envío">
                  <Text>{selectedCompra.metodoEnvio}</Text>
                </FormItem>
                <FormItem label="Dirección de Entrega">
                  <Text>{selectedCompra.direccionEntrega}</Text>
                </FormItem>
                <FormItem label="Notas">
                  <Text>{selectedCompra.notas !== "-" ? selectedCompra.notas : "No hay notas adicionales"}</Text>
                </FormItem>
              </Form>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Title level="H5" style={{ marginBottom: '1rem' }}>Información de Pago</Title>
              <Form columnsL={1} columnsXL={1}>
                <FormItem label="Método de Pago">
                  <Text>{selectedCompra.detalles.metodoPago}</Text>
                </FormItem>
                <FormItem label="Términos de Pago">
                  <Text>{selectedCompra.detalles.terminosPago}</Text>
                </FormItem>
              </Form>
            </div>
          </div>
        )}
      </CustomDialog>

      {/* Diálogo de confirmación personalizado */}
      <CustomDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        title="Aceptar Compra"
        width="500px"
        footer={
          <FlexBox style={{ gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button 
              design="Default"
              onClick={() => setShowConfirmDialog(false)}
              style={{ marginRight: '8px' }}
            >
              Cancelar
            </Button>
            <Button 
              design="Emphasized" 
              icon="accept"
              onClick={handleConfirmAction}
              style={{ backgroundColor: '#0854a0', color: 'white' }}
            >
              Aceptar
            </Button>
          </FlexBox>
        }
      >
        <div>
          <Text>¿Estás seguro que deseas aceptar la compra {selectedCompra?.id}?</Text>
          <MessageStrip
            design="Information"
            style={{ marginTop: '1rem' }}
          >
            Esta acción cambiará el estado de la compra a "En proceso"
          </MessageStrip>
        </div>
      </CustomDialog>

      {/* Diálogo de rechazo personalizado */}
      <CustomDialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        title="Rechazar Compra"
        width="500px"
        footer={
          <FlexBox style={{ gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button 
              design="Default"
              onClick={() => setShowRejectDialog(false)}
              style={{ marginRight: '8px' }}
            >
              Cancelar
            </Button>
            <Button 
              design="Negative" 
              icon="decline"
              onClick={handleConfirmAction}
              style={{ backgroundColor: '#bb0000', color: 'white' }}
            >
              Rechazar
            </Button>
          </FlexBox>
        }
      >
        <div>
          <Text>¿Estás seguro que deseas rechazar la compra {selectedCompra?.id}?</Text>
          <MessageStrip
            design="Warning"
            style={{ marginTop: '1rem' }}
          >
            Esta acción eliminará la compra del sistema
          </MessageStrip>
        </div>
      </CustomDialog>
    </div>
  );
};

export default ComprasProveedor; 