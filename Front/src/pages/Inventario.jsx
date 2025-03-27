import React from "react";
import DataTable from "react-data-table-component";
import {
  Container,
  TableWrapper,
  TextField,
  ClearButton,
  ExportButton,
  ActionsContainer,
} from "../styles/Inventario/InventarioStyles";
import { useContext } from "react";
import { ThemeContext } from "../App";

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

const Export = ({ onExport }) => (
  <ExportButton onClick={onExport}>
    📄 Excel
  </ExportButton>
);

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div style={{ display: 'flex' }}>
    <TextField
      id="search"
      type="text"
      placeholder="Filtrar por Producto"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </div>
);

const data = [
  {
    id: 1,
    producto: "Martillo",
    sku: "SKU-001",
    categoria: "Herramientas",
    cantidad: 15,
    ubicacion: "Almacén A",
    proveedor: "ConstruMax",
    estado: "Disponible",
  },
  {
    id: 2,
    producto: "Destornillador",
    sku: "SKU-002",
    categoria: "Herramientas",
    cantidad: 5,
    ubicacion: "Almacén B",
    proveedor: "ToolTech",
    estado: "Bajo stock",
  },
  {
    id: 3,
    producto: "Clavos 2\"",
    sku: "SKU-003",
    categoria: "Ferretería",
    cantidad: 0,
    ubicacion: "Almacén C",
    proveedor: "MetalPro",
    estado: "Agotado",
  },
  {
    id: 4,
    producto: "Sierra Eléctrica",
    sku: "SKU-004",
    categoria: "Herramientas Eléctricas",
    cantidad: 8,
    ubicacion: "Almacén A",
    proveedor: "PowerTools",
    estado: "Disponible",
  },
  {
    id: 5,
    producto: "Taladro Inalámbrico",
    sku: "SKU-005",
    categoria: "Herramientas Eléctricas",
    cantidad: 3,
    ubicacion: "Almacén B",
    proveedor: "PowerTools",
    estado: "Bajo stock",
  },
  {
    id: 6,
    producto: "Tornillos 3\"",
    sku: "SKU-006",
    categoria: "Ferretería",
    cantidad: 150,
    ubicacion: "Almacén C",
    proveedor: "MetalPro",
    estado: "Disponible",
  },
  {
    id: 7,
    producto: "Llave Inglesa",
    sku: "SKU-007",
    categoria: "Herramientas",
    cantidad: 12,
    ubicacion: "Almacén A",
    proveedor: "ToolTech",
    estado: "Disponible",
  },
  {
    id: 8,
    producto: "Cinta Métrica",
    sku: "SKU-008",
    categoria: "Herramientas",
    cantidad: 20,
    ubicacion: "Almacén B",
    proveedor: "ConstruMax",
    estado: "Disponible",
  },
  {
    id: 9,
    producto: "Nivel de Burbuja",
    sku: "SKU-009",
    categoria: "Herramientas",
    cantidad: 4,
    ubicacion: "Almacén A",
    proveedor: "ConstruMax",
    estado: "Bajo stock",
  },
  {
    id: 10,
    producto: "Pala",
    sku: "SKU-010",
    categoria: "Jardín",
    cantidad: 0,
    ubicacion: "Almacén C",
    proveedor: "GardenPro",
    estado: "Agotado",
  },
  {
    id: 11,
    producto: "Pintura Blanca 5L",
    sku: "SKU-011",
    categoria: "Pinturas",
    cantidad: 25,
    ubicacion: "Almacén D",
    proveedor: "ColorMax",
    estado: "Disponible",
  },
  {
    id: 12,
    producto: "Brocha 4\"",
    sku: "SKU-012",
    categoria: "Pinturas",
    cantidad: 2,
    ubicacion: "Almacén D",
    proveedor: "ColorMax",
    estado: "Bajo stock",
  }
];

export function Inventario() {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const { theme } = useContext(ThemeContext);

  const getLocationColor = (location, isDark) => {
    if (isDark) {
      switch (location) {
        case 'Almacén A':
          return { bg: 'rgba(233, 30, 99, 0.2)', text: '#f48fb1' };
        case 'Almacén B':
          return { bg: 'rgba(33, 150, 243, 0.2)', text: '#90caf9' };
        case 'Almacén C':
          return { bg: 'rgba(156, 39, 176, 0.2)', text: '#ce93d8' };
        case 'Almacén D':
          return { bg: 'rgba(255, 152, 0, 0.2)', text: '#ffcc80' };
        default:
          return { bg: 'rgba(158, 158, 158, 0.2)', text: '#e0e0e0' };
      }
    } else {
      switch (location) {
        case 'Almacén A':
          return { bg: '#ffebee', text: '#333' };
        case 'Almacén B':
          return { bg: '#e8eaf6', text: '#333' };
        case 'Almacén C':
          return { bg: '#f3e5f5', text: '#333' };
        case 'Almacén D':
          return { bg: '#fff3e0', text: '#333' };
        default:
          return { bg: '#f5f5f5', text: '#333' };
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
      name: "Cantidad Disponible",
      selector: (row) => row.cantidad,
      sortable: true,
      right: true,
    },
    {
      name: "Ubicación",
      selector: (row) => row.ubicacion,
      sortable: true,
      cell: (row) => {
        const colors = getLocationColor(row.ubicacion, theme === 'dark');
        return (
          <div
            style={{
              background: colors.bg,
              padding: '6px 12px',
              borderRadius: '16px',
              fontSize: '14px',
              color: colors.text,
              fontWeight: 500,
              boxShadow: theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
            }}
          >
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
        let color;
        if (row.estado === "Disponible") {
          color = theme === 'dark' ? '#81c784' : '#2e7d32';
        } else if (row.estado === "Bajo stock") {
          color = theme === 'dark' ? '#ffb74d' : '#ed6c02';
        } else {
          color = theme === 'dark' ? '#ef5350' : '#d32f2f';
        }
        
        return (
          <span
            style={{
              color,
              fontWeight: "500",
              fontSize: '14px',
            }}
          >
            {row.estado}
          </span>
        );
      },
    },
  ];

  const filteredItems = data.filter(
    (item) =>
      item.producto &&
      item.producto.toLowerCase().includes(filterText.toLowerCase())
  );

  const customStyles = {
    table: {
      style: {
        backgroundColor: 'transparent',
        borderCollapse: 'separate',
        borderSpacing: '0',
        border: `1px solid ${theme === 'light' ? '#dfe3e8' : '#4a5568'}`,
        borderRadius: '8px',
        overflow: 'hidden',
      },
    },
    subHeader: {
      style: {
        backgroundColor: 'transparent',
        padding: '0 0 8px 0',
        marginBottom: '0',
      },
    },
    tableWrapper: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        border: 'none',
        boxShadow: theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.3)' : 'none',
      },
    },
    responsiveWrapper: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        minHeight: 'calc(100vh - 300px)',
        backgroundColor: 'transparent',
      },
    },
    head: {
      style: {
        fontSize: '14px',
        color: theme === 'light' ? '#333' : '#e2e8f0',
      }
    },
    headRow: {
      style: {
        backgroundColor: theme === 'light' ? '#f1f3f5' : '#2d3748',
        minHeight: '52px',
        borderBottom: `2px solid ${theme === 'light' ? '#dfe3e8' : '#4a5568'}`,
      },
    },
    headCells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
        fontWeight: 600,
        color: theme === 'light' ? '#333' : '#e2e8f0',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
        minHeight: '52px',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1a202c',
        '&:nth-of-type(odd)': {
          backgroundColor: theme === 'light' ? '#f8f9fa' : '#2d3748',
        },
        '&:nth-of-type(even)': {
          backgroundColor: theme === 'light' ? '#ffffff' : '#1a202c',
        },
        '&:hover': {
          backgroundColor: theme === 'light' ? '#f1f3f5' : '#374151',
          cursor: 'pointer',
          transform: 'translateY(-1px)',
          boxShadow: theme === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
        },
        borderBottom: `1px solid ${theme === 'light' ? '#edf0f2' : '#4a5568'}`,
        color: theme === 'light' ? '#333' : '#e2e8f0',
      },
    },
    cells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
        color: theme === 'light' ? '#333' : '#e2e8f0',
        transition: 'all 0.2s ease',
        position: 'relative',
        '&:hover::after': theme === 'dark' ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          pointerEvents: 'none',
        } : {},
      },
    },
    pagination: {
      style: {
        borderTop: `2px solid ${theme === 'light' ? '#dfe3e8' : '#4a5568'}`,
        backgroundColor: theme === 'light' ? '#f8f9fa' : '#2d3748',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        color: theme === 'light' ? '#333' : '#e2e8f0',
        padding: '12px 16px',
      },
      pageButtonsStyle: {
        borderRadius: '4px',
        height: '32px',
        padding: '0 8px',
        margin: '0 4px',
        cursor: 'pointer',
        transition: 'all .2s ease',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1a202c',
        border: `1px solid ${theme === 'light' ? '#dfe3e8' : '#4a5568'}`,
        color: theme === 'light' ? '#333' : '#e2e8f0',
        '&:hover:not(:disabled)': {
          backgroundColor: theme === 'light' ? '#f1f3f5' : '#374151',
          borderColor: theme === 'light' ? '#cfd6de' : '#4a5568',
          transform: 'translateY(-1px)',
          boxShadow: theme === 'dark' ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
        },
        '&:disabled': {
          opacity: '0.4',
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: 'none',
        },
      },
    },
    noData: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        color: theme === 'light' ? '#666' : '#a0aec0',
        backgroundColor: theme === 'light' ? '#f8f9fa' : '#2d3748',
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
      <ActionsContainer>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Export onExport={() => downloadCSV(data)} />
          <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        </div>
      </ActionsContainer>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <Container>
      <h1>Tabla de Productos</h1>
      <TableWrapper>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          customStyles={customStyles}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 50]}
          fixedHeader
          noDataComponent={
            <div style={{ padding: '24px', textAlign: 'center' }}>
              No se encontraron registros para mostrar
            </div>
          }
        />
      </TableWrapper>
    </Container>
  );
}