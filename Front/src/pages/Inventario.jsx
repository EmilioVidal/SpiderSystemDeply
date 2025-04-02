import React, { useContext, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  Container,
  TableWrapper,
  TextField,
  ClearButton,
  ExportButton,
  ActionsContainer,
  PageHeader,
  PageTitle,
  SearchContainer,
  StatsContainer,
  StatCard,
  AlertBadge,
  AlertsContainer,
  RealTimeIndicator
} from "../styles/Inventario/InventarioStyles";
import { ThemeContext } from "../App";
import { 
  MdInventory, 
  MdWarning, 
  MdErrorOutline, 
  MdSearch, 
  MdFileDownload, 
  MdStorefront,
  MdSync,
  MdNotifications
} from 'react-icons/md';

function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "inventario.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

const Export = ({ onExport, theme }) => (
  <ExportButton onClick={onExport} theme={theme}>
    <MdFileDownload size={20} />
    Exportar CSV
  </ExportButton>
);

const FilterComponent = ({ filterText, onFilter, onClear, theme }) => (
  <SearchContainer theme={theme}>
    <MdSearch size={20} color={theme === 'dark' ? 'var(--sapContent_LabelColor)' : '#6b7280'} />
    <TextField
      id="search"
      type="text"
      placeholder="Buscar producto..."
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      theme={theme}
    />
    {filterText && (
      <ClearButton type="button" onClick={onClear} theme={theme}>
        ✕
      </ClearButton>
    )}
  </SearchContainer>
);

// Simulación de actualización en tiempo real
const initialData = [
  {
    id: 1,
    producto: "Nike Air Max 270",
    sku: "NK-270-001",
    categoria: "Deportivos",
    cantidad: 15,
    ubicacion: "Almacén A",
    proveedor: "Calzado Deportivo Premium",
    estado: "Disponible",
    ultimaActualizacion: new Date()
  },
  {
    id: 2,
    producto: "Adidas Ultraboost",
    sku: "AD-UB-002",
    categoria: "Deportivos",
    cantidad: 5,
    ubicacion: "Almacén B",
    proveedor: "Calzado Deportivo Premium",
    estado: "Bajo stock",
    ultimaActualizacion: new Date()
  },
  {
    id: 3,
    producto: "Oxford Classic Brown",
    sku: "OX-CL-003",
    categoria: "Formales",
    cantidad: 0,
    ubicacion: "Almacén C",
    proveedor: "Distribuidora de Zapatos Elegance",
    estado: "Agotado",
    ultimaActualizacion: new Date()
  },
  {
    id: 4,
    producto: "Puma RS-X",
    sku: "PM-RSX-004",
    categoria: "Deportivos",
    cantidad: 8,
    ubicacion: "Almacén A",
    proveedor: "Importadora Footwear Internacional",
    estado: "Disponible",
    ultimaActualizacion: new Date()
  },
  {
    id: 5,
    producto: "Vans Old Skool",
    sku: "VN-OS-005",
    categoria: "Casual",
    cantidad: 3,
    ubicacion: "Almacén B",
    proveedor: "Zapatos y Complementos Moda Total",
    estado: "Bajo stock",
    ultimaActualizacion: new Date()
  },
  {
    id: 6,
    producto: "Converse Chuck 70",
    sku: "CV-70-006",
    categoria: "Casual",
    cantidad: 12,
    ubicacion: "Almacén C",
    proveedor: "Importadora Footwear Internacional",
    estado: "Disponible",
    ultimaActualizacion: new Date()
  },
  {
    id: 7,
    producto: "New Balance 574",
    sku: "NB-574-007",
    categoria: "Deportivos",
    cantidad: 4,
    ubicacion: "Almacén A",
    proveedor: "Calzado Deportivo Premium",
    estado: "Bajo stock",
    ultimaActualizacion: new Date()
  },
  {
    id: 8,
    producto: "Zapato Derby Negro",
    sku: "DR-NG-008",
    categoria: "Formales",
    cantidad: 20,
    ubicacion: "Almacén B",
    proveedor: "Distribuidora de Zapatos Elegance",
    estado: "Disponible",
    ultimaActualizacion: new Date()
  },
  {
    id: 9,
    producto: "Nike Air Force 1",
    sku: "NK-AF1-009",
    categoria: "Deportivos",
    cantidad: 2,
    ubicacion: "Almacén A",
    proveedor: "Calzado Deportivo Premium",
    estado: "Bajo stock",
    ultimaActualizacion: new Date()
  },
  {
    id: 10,
    producto: "Adidas Stan Smith",
    sku: "AD-SS-010",
    categoria: "Casual",
    cantidad: 0,
    ubicacion: "Almacén C",
    proveedor: "Calzado Deportivo Premium",
    estado: "Agotado",
    ultimaActualizacion: new Date()
  },
  {
    id: 11,
    producto: "Reebok Classic Leather",
    sku: "RB-CL-011",
    categoria: "Casual",
    cantidad: 6,
    ubicacion: "Almacén D",
    proveedor: "Zapatos y Complementos Moda Total",
    estado: "Bajo stock",
    ultimaActualizacion: new Date()
  },
  {
    id: 12,
    producto: "Timberland Boot",
    sku: "TM-BT-012",
    categoria: "Casual",
    cantidad: 15,
    ubicacion: "Almacén D",
    proveedor: "Importadora Footwear Internacional",
    estado: "Disponible",
    ultimaActualizacion: new Date()
  }
];

export function Inventario() {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === 'dark';
  const [data, setData] = useState(initialData);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [alerts, setAlerts] = useState([]);

  // Simulación de actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedData = data.map(item => {
        // Simulamos cambios aleatorios en el inventario
        if (Math.random() > 0.8) {
          const change = Math.floor(Math.random() * 3) - 1;
          const newQuantity = Math.max(0, item.cantidad + change);
          
          // Actualizar estado basado en la nueva cantidad
          let newStatus = "Disponible";
          if (newQuantity === 0) newStatus = "Agotado";
          else if (newQuantity <= 5) newStatus = "Bajo stock";

          // Generar alerta si es necesario
          if (newStatus !== item.estado) {
            const newAlert = {
              id: Date.now(),
              producto: item.producto,
              mensaje: `${item.producto} ha cambiado a estado: ${newStatus}`,
              tipo: newStatus === "Agotado" ? "error" : "warning",
              timestamp: new Date()
            };
            setAlerts(prev => [newAlert, ...prev].slice(0, 5));
          }

          return {
            ...item,
            cantidad: newQuantity,
            estado: newStatus,
            ultimaActualizacion: new Date()
          };
        }
        return item;
      });

      setData(updatedData);
      setLastUpdate(new Date());
    }, 5000); // Actualizar cada 5 segundos

    return () => clearInterval(interval);
  }, [data]);

  // Calcular estadísticas
  const stats = {
    total: data.length,
    disponible: data.filter(item => item.estado === "Disponible").length,
    bajoStock: data.filter(item => item.estado === "Bajo stock").length,
    agotado: data.filter(item => item.estado === "Agotado").length
  };

  const getLocationColor = (location, isDark) => {
    if (isDark) {
      switch (location) {
        case 'Almacén A':
          return { bg: 'rgba(233, 30, 99, 0.15)', text: '#f48fb1' };
        case 'Almacén B':
          return { bg: 'rgba(33, 150, 243, 0.15)', text: '#90caf9' };
        case 'Almacén C':
          return { bg: 'rgba(156, 39, 176, 0.15)', text: '#ce93d8' };
        case 'Almacén D':
          return { bg: 'rgba(255, 152, 0, 0.15)', text: '#ffcc80' };
        default:
          return { bg: 'rgba(158, 158, 158, 0.15)', text: '#e0e0e0' };
      }
    } else {
      switch (location) {
        case 'Almacén A':
          return { bg: '#ffebee', text: '#c2185b' };
        case 'Almacén B':
          return { bg: '#e3f2fd', text: '#1976d2' };
        case 'Almacén C':
          return { bg: '#f3e5f5', text: '#7b1fa2' };
        case 'Almacén D':
          return { bg: '#fff3e0', text: '#f57c00' };
        default:
          return { bg: '#f5f5f5', text: '#616161' };
      }
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: '80px',
    },
    {
      name: "Producto",
      selector: (row) => row.producto,
      sortable: true,
      grow: 2,
    },
    {
      name: "Código SKU",
      selector: (row) => row.sku,
      sortable: true,
    },
    {
      name: "Categoría",
      selector: (row) => row.categoria,
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
      sortable: true,
      right: true,
      cell: (row) => (
        <div style={{
          fontWeight: '500',
          color: row.cantidad === 0 ? (isDarkTheme ? '#ef5350' : '#d32f2f') :
                 row.cantidad <= 5 ? (isDarkTheme ? '#ffb74d' : '#ed6c02') :
                 'inherit'
        }}>
          {row.cantidad}
        </div>
      ),
    },
    {
      name: "Ubicación",
      selector: (row) => row.ubicacion,
      sortable: true,
      cell: (row) => {
        const colors = getLocationColor(row.ubicacion, isDarkTheme);
        return (
          <div
            style={{
              background: colors.bg,
              padding: '6px 12px',
              borderRadius: '16px',
              fontSize: '14px',
              color: colors.text,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <MdStorefront size={16} />
            {row.ubicacion}
          </div>
        );
      },
    },
    {
      name: "Proveedor",
      selector: (row) => row.proveedor,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
      cell: (row) => {
        let color, bgColor;
        if (row.estado === "Disponible") {
          color = isDarkTheme ? '#81c784' : '#2e7d32';
          bgColor = isDarkTheme ? 'rgba(129, 199, 132, 0.15)' : '#e8f5e9';
        } else if (row.estado === "Bajo stock") {
          color = isDarkTheme ? '#ffb74d' : '#ed6c02';
          bgColor = isDarkTheme ? 'rgba(255, 183, 77, 0.15)' : '#fff3e0';
        } else {
          color = isDarkTheme ? '#ef5350' : '#d32f2f';
          bgColor = isDarkTheme ? 'rgba(239, 83, 80, 0.15)' : '#ffebee';
        }
        
        return (
          <div
            style={{
              background: bgColor,
              padding: '6px 12px',
              borderRadius: '16px',
              color: color,
              fontWeight: "500",
              fontSize: '14px',
            }}
          >
            {row.estado}
          </div>
        );
      },
    },
    {
      name: "Última Actualización",
      selector: (row) => row.ultimaActualizacion,
      sortable: true,
      cell: (row) => (
        <div style={{ fontSize: '14px', color: 'var(--sapContent_LabelColor)' }}>
          {row.ultimaActualizacion.toLocaleTimeString()}
        </div>
      ),
    }
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: isDarkTheme ? 'var(--sapList_Background)' : '#ffffff',
        borderCollapse: 'separate',
        borderSpacing: '0',
        border: `1px solid ${isDarkTheme ? 'var(--sapList_BorderColor)' : '#e5e7eb'}`,
        borderRadius: '8px',
        overflow: 'hidden',
      },
    },
    subHeader: {
      style: {
        backgroundColor: 'transparent',
        padding: '16px',
        marginBottom: '8px',
      },
    },
    head: {
      style: {
        fontSize: '14px',
        color: isDarkTheme ? 'var(--sapContent_LabelColor)' : '#6b7280',
      }
    },
    headRow: {
      style: {
        backgroundColor: isDarkTheme ? 'var(--sapList_HeaderBackground)' : '#f9fafb',
        minHeight: '52px',
        borderBottom: `2px solid ${isDarkTheme ? 'var(--sapList_BorderColor)' : '#e5e7eb'}`,
      },
    },
    headCells: {
      style: {
        padding: '16px',
        fontWeight: 600,
        color: isDarkTheme ? 'var(--sapContent_LabelColor)' : '#374151',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
        backgroundColor: isDarkTheme ? 'var(--sapList_Background)' : '#ffffff',
        '&:nth-of-type(odd)': {
          backgroundColor: isDarkTheme ? 'var(--sapList_AlternatingBackground)' : '#f9fafb',
        },
        minHeight: '52px',
        '&:hover': {
          backgroundColor: isDarkTheme ? 'var(--sapList_Hover_Background)' : '#f3f4f6',
          cursor: 'pointer',
          transform: 'translateY(-1px)',
          transition: 'all 0.2s ease',
        },
      },
    },
    cells: {
      style: {
        padding: '16px',
        color: isDarkTheme ? 'var(--sapContent_LabelColor)' : '#374151',
      },
    },
    pagination: {
      style: {
        backgroundColor: isDarkTheme ? 'var(--sapList_Background)' : '#ffffff',
        border: 'none',
        borderTop: `2px solid ${isDarkTheme ? 'var(--sapList_BorderColor)' : '#e5e7eb'}`,
        color: isDarkTheme ? 'var(--sapContent_LabelColor)' : '#374151',
        padding: '16px',
      },
    },
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <ActionsContainer theme={theme}>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          theme={theme}
        />
        <Export onExport={() => downloadCSV(data)} theme={theme} />
      </ActionsContainer>
    );
  }, [filterText, resetPaginationToggle, theme]);

  return (
    <Container theme={theme}>
      <PageHeader theme={theme}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <MdInventory size={28} />
          <PageTitle theme={theme}>Inventario de Productos</PageTitle>
        </div>
        <RealTimeIndicator theme={theme}>
          <MdSync size={16} />
          Última actualización: {lastUpdate.toLocaleTimeString()}
        </RealTimeIndicator>
      </PageHeader>

      {alerts.length > 0 && (
        <AlertsContainer theme={theme}>
          {alerts.map(alert => (
            <AlertBadge key={alert.id} tipo={alert.tipo} theme={theme}>
              <MdNotifications size={20} />
              {alert.mensaje}
              <span style={{ marginLeft: 'auto', fontSize: '12px' }}>
                {alert.timestamp.toLocaleTimeString()}
              </span>
            </AlertBadge>
          ))}
        </AlertsContainer>
      )}

      <StatsContainer theme={theme}>
        <StatCard theme={theme}>
          <div className="icon-container total">
            <MdInventory size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Productos</div>
          </div>
        </StatCard>
        
        <StatCard theme={theme}>
          <div className="icon-container available">
            <MdInventory size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.disponible}</div>
            <div className="stat-label">Disponibles</div>
          </div>
        </StatCard>

        <StatCard theme={theme}>
          <div className="icon-container warning">
            <MdWarning size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.bajoStock}</div>
            <div className="stat-label">Bajo Stock</div>
          </div>
        </StatCard>

        <StatCard theme={theme}>
          <div className="icon-container danger">
            <MdErrorOutline size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.agotado}</div>
            <div className="stat-label">Agotados</div>
          </div>
        </StatCard>
      </StatsContainer>

      <TableWrapper theme={theme}>
        <DataTable
          columns={columns}
          data={data.filter(item =>
            item.producto.toLowerCase().includes(filterText.toLowerCase())
          )}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          customStyles={customStyles}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 50]}
          noDataComponent={
            <div style={{ 
              padding: '24px', 
              textAlign: 'center',
              color: isDarkTheme ? 'var(--sapContent_LabelColor)' : '#6b7280'
            }}>
              No se encontraron productos
            </div>
          }
          theme={theme}
        />
      </TableWrapper>
    </Container>
  );
}