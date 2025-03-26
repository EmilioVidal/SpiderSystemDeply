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

const columns = [
  {
    name: "Producto",
    selector: (row) => row.producto,
    sortable: true,
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
  },
  {
    name: "Ubicación en almacén",
    selector: (row) => row.ubicacion,
    sortable: true,
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
    cell: (row) => (
      <span
        style={{
          color:
            row.estado === "Disponible"
              ? "green"
              : row.estado === "Bajo stock"
              ? "orange"
              : "red",
          fontWeight: "bold",
        }}
      >
        {row.estado}
      </span>
    ),
  },
];

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
];

export function Inventario() {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const filteredItems = data.filter(
    (item) =>
      item.producto &&
      item.producto.toLowerCase().includes(filterText.toLowerCase())
  );

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    subHeader: {
      style: {
        padding: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
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
        <Export onExport={() => downloadCSV(data)} />
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </ActionsContainer>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <Container>
      <h1>Inventario</h1>
      <TableWrapper>
        <DataTable
          title="Tabla de Productos"
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          customStyles={customStyles}
          highlightOnHover
          striped
        />
      </TableWrapper>
    </Container>
  );
}