import React, { useState, useEffect } from "react";
import {
  DynamicPageTitle,
  DynamicPageHeader,
  Title,
  Text,
  FlexBox,
  FlexBoxDirection,
  FlexBoxAlignItems,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Card,
  CardHeader,
  Icon,
  Button,
  Bar,
  BarDesign,
  Label,
  Input,
  Badge,
  BusyIndicator,
  MessageStrip,
  FilterBar,
  FilterGroupItem,
  MultiComboBox,
  MultiComboBoxItem,
  ComboBox,
  ComboBoxItem,
  AnalyticalTable,
  ObjectStatus,
  Grid,
  Toast,
  Select,
  Option,
  Dialog,
  ValueState
} from "@ui5/webcomponents-react";
import { useUI5Theme } from "../components/UI5ThemeProvider";
import { styles } from "../Styles/InventarioStyles";

// Importar íconos necesarios
import "@ui5/webcomponents-icons/dist/inventory.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/download.js";
import "@ui5/webcomponents-icons/dist/refresh.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/warning.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/message-success.js";
import "@ui5/webcomponents-icons/dist/synchronize.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/group-2.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";
import "@ui5/webcomponents-icons/dist/supplier.js";

// Datos de inventario simulados
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
    producto: "Loafer Café",
    sku: "LF-CF-010",
    categoria: "Formales",
    cantidad: 7,
    ubicacion: "Almacén C",
    proveedor: "Distribuidora de Zapatos Elegance",
    estado: "Disponible",
    ultimaActualizacion: new Date()
  },
  {
    id: 11,
    producto: "Sandalias Havaianas",
    sku: "SD-HV-011",
    categoria: "Playa",
    cantidad: 30,
    ubicacion: "Almacén B",
    proveedor: "Importadora Footwear Internacional",
    estado: "Disponible",
    ultimaActualizacion: new Date()
  },
  {
    id: 12,
    producto: "Salomon Trail Runner",
    sku: "SL-TR-012",
    categoria: "Deportivos",
    cantidad: 0,
    ubicacion: "Almacén A",
    proveedor: "Calzado Deportivo Premium",
    estado: "Agotado",
    ultimaActualizacion: new Date()
  }
];

// Lista de categorías únicas
const categorias = [...new Set(initialData.map(item => item.categoria))];

// Lista de ubicaciones únicas
const ubicaciones = [...new Set(initialData.map(item => item.ubicacion))];

// Lista de proveedores únicos
const proveedores = [...new Set(initialData.map(item => item.proveedor))];

// Función para convertir a CSV
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

      if (key === 'ultimaActualizacion') {
        result += item[key] instanceof Date ? item[key].toLocaleString() : item[key];
      } else {
        result += item[key];
      }
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

// Función para descargar CSV
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

export default function Inventario() {
  const { isDarkMode } = useUI5Theme();
  const [inventoryData, setInventoryData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedProveedores, setSelectedProveedores] = useState([]);
  const [selectedEstados, setSelectedEstados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterBarVisible, setIsFilterBarVisible] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notifications, setNotifications] = useState([]);

  
  // Estadísticas de inventario
  const totalProducts = inventoryData.length;
  const lowStockProducts = inventoryData.filter(item => item.estado === "Bajo stock").length;
  const outOfStockProducts = inventoryData.filter(item => item.estado === "Agotado").length;
  const totalStock = inventoryData.reduce((sum, item) => sum + item.cantidad, 0);
  
  // Columnas para la tabla
  const columns = [
    {
      Header: "SKU",
      accessor: "sku",
      width: 120,
    },
    {
      Header: "Producto",
      accessor: "producto",
      width: 220,
    },
    {
      Header: "Categoría",
      accessor: "categoria",
      width: 150,
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
      width: 100,
      Cell: ({ value }) => (
        <Text style={{ fontWeight: "bold", color: value === 0 ? "var(--sapErrorColor)" : value <= 5 ? "var(--sapWarningColor)" : "inherit" }}>
          {value}
        </Text>
      )
    },
    {
      Header: "Estado",
      accessor: "estado",
      width: 130,
      Cell: ({ value }) => {
        let state, icon;
        switch (value) {
          case "Agotado":
            state = ValueState.Error;
            icon = "alert";
            break;
          case "Bajo stock":
            state = ValueState.Warning;
            icon = "warning";
            break;
          default:
            state = ValueState.Success;
            icon = "message-success";
            break;
        }
    
        return (
          <span
            style={{
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={value}
          >
            <ObjectStatus
              state={state}
             // icon={icon}
              style={{
                display: "inline",
              }}
            >
              {value}
            </ObjectStatus>
          </span>
        );
      }
    }
    
    
    ,
    
    
    {
      Header: "Ubicación",
      accessor: "ubicacion",
      width: 130,
      Cell: ({ value }) => (
        <FlexBox alignItems={FlexBoxAlignItems.Center}>
          <Icon name="locate-me" style={{ marginRight: '0.5rem', color: value === "Almacén A" ? "#1976d2" : value === "Almacén B" ? "#388e3c" : "#e64a19" }} />
          <Text>{value}</Text>
        </FlexBox>
      )
    },
    {
      Header: "Proveedor",
      accessor: "proveedor",
      width: 220,
      Cell: ({ value }) => (
        <FlexBox alignItems={FlexBoxAlignItems.Center}>
          <Icon name="supplier" style={{ marginRight: '0.5rem' }} />
          <Text>{value}</Text>
        </FlexBox>
      )
    },
    {
      Header: "Última Actualización",
      accessor: "ultimaActualizacion",
      width: 180,
      Cell: ({ value }) => (
        <Text>{value instanceof Date ? value.toLocaleString() : value}</Text>
      )
    },
    {
      Header: "Acciones",
      id: "actions",
      width: 120,
      Cell: ({ row }) => (
        <FlexBox>
          <Button
            icon="edit"
            design="Transparent"
            onClick={() => handleEditRow(row.original)}
            tooltip="Editar"
            style={{ marginRight: '0.5rem' }}
          />
          <Button
            icon="delete"
            design="Transparent"
            onClick={() => handleDeleteRow(row.original.id)}
            tooltip="Eliminar"
          />
        </FlexBox>
      )
    }
  ];
  
  // Efecto para simular actualizaciones periódicas
  useEffect(() => {
    const interval = setInterval(() => {
      setInventoryData(prevData => {
        const updatedData = prevData.map(item => {
          if (Math.random() < 0.2) {
            const randomChange = Math.floor(Math.random() * 3) - 1;
            const newQuantity = Math.max(0, item.cantidad + randomChange);
            
            let newStatus = "Disponible";
            if (newQuantity === 0) newStatus = "Agotado";
            else if (newQuantity <= 5) newStatus = "Bajo stock";
            
            if (item.estado !== newStatus) {
              // Esta función ahora sí se ejecutará correctamente
              addNotification(item.producto, newStatus);
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
  
        setLastUpdateTime(new Date());
        applyFilters(updatedData);
        setToastMessage("Inventario actualizado automáticamente");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
  
        return updatedData;
      });
    }, 60000);
  
    return () => clearInterval(interval);
  }, []);
  
  
  

  
  // Aplicar filtros cuando cambian
  useEffect(() => {
    applyFilters(inventoryData);
  }, [searchQuery, selectedCategories, selectedLocations, selectedProveedores, selectedEstados]);
  
  // Función para aplicar filtros
  const applyFilters = (data) => {
    let filtered = [...data];
    
    // Filtrar por búsqueda
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.producto.toLowerCase().includes(searchLower) || 
        item.sku.toLowerCase().includes(searchLower)
      );
    }
    
    // Filtrar por categorías
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => selectedCategories.includes(item.categoria));
    }
    
    // Filtrar por ubicaciones
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(item => selectedLocations.includes(item.ubicacion));
    }
    
    // Filtrar por proveedores
    if (selectedProveedores.length > 0) {
      filtered = filtered.filter(item => selectedProveedores.includes(item.proveedor));
    }
    
    // Filtrar por estados
    if (selectedEstados.length > 0) {
      filtered = filtered.filter(item => selectedEstados.includes(item.estado));
    }
    
    setFilteredData(filtered);
  };
  
  // Manejadores de eventos
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleCategoriesChange = (event) => {
    setSelectedCategories(event.detail.items.map(item => item.text));
  };
  
  const handleLocationsChange = (event) => {
    setSelectedLocations(event.detail.items.map(item => item.text));
  };
  
  const handleProveedoresChange = (event) => {
    setSelectedProveedores(event.detail.items.map(item => item.text));
  };
  
  const handleEstadosChange = (event) => {
    setSelectedEstados(event.detail.items.map(item => item.text));
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      applyFilters(inventoryData);
      setLastUpdateTime(new Date());
      setIsLoading(false);
      setToastMessage("Datos de inventario actualizados");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedProveedores([]);
    setSelectedEstados([]);
    setFilteredData(inventoryData);
  };
  
  const handleExportCSV = () => {
    downloadCSV(filteredData);
    setToastMessage("Archivo CSV exportado");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  const handleEditRow = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };
  
  const handleDeleteRow = (productId) => {
    const updatedData = inventoryData.filter(item => item.id !== productId);
    setInventoryData(updatedData);
    applyFilters(updatedData);
    setToastMessage("Producto eliminado del inventario");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const addNotification = (producto, nuevoEstado) => {
    const id = Date.now();
    const nuevaNotificacion = {
      id,
      mensaje: `${producto} ha cambiado a estado: ${nuevoEstado}`,
      estado: nuevoEstado
    };
  
    setNotifications(prev => [nuevaNotificacion, ...prev]);
  
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 5000); // Se borra después de 5 segundos
  };
  
  
  return (
    
    <>
    

      <DynamicPageTitle
        header={<Title>Inventario</Title>}
        subHeader={<Text>Gestión y control de inventario de productos</Text>}
        className={styles.pageHeader}
      />

{notifications.map(notif => (
  <MessageStrip
    key={notif.id}
    design={
      notif.estado === "Agotado"
        ? "Negative"
        : notif.estado === "Bajo stock"
        ? "Warning"
        : "Positive"
    }
    hideCloseButton={false}
    style={{ marginBottom: "0.5rem" }}
  >
    {notif.mensaje}
  </MessageStrip>
))}

      
      <DynamicPageHeader className={styles.pageHeader}>
        <FlexBox 
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          alignItems={FlexBoxAlignItems.Center}
          wrap={FlexBoxWrap.Wrap}
          style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}

        >
          <Text>
            Última actualización: {lastUpdateTime.toLocaleString()}
          </Text>
          
          <FlexBox>
            <Button 
              icon="refresh" 
              onClick={handleRefresh}
              tooltip="Actualizar inventario"
              style={{ marginRight: '0.5rem' }}
            >
              Actualizar
            </Button>
            <Button 
              icon="download"
              onClick={handleExportCSV}
              tooltip="Exportar a CSV"
              style={{ marginRight: '0.5rem' }}
            >
              Exportar
            </Button>
            <Button 
              icon="add"
              design="Emphasized"
              tooltip="Agregar nuevo producto"
            >
              Agregar Producto
            </Button>
          </FlexBox>
        </FlexBox>
      </DynamicPageHeader>

      

      
      <div className={styles.pageContainer}>
        {/* Estadísticas de inventario */}
        <Grid defaultSpan="XL3 L3 M6 S12" className={styles.statCard}>
        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
  <CardHeader titleText="Total de Productos" avatar={<Icon name="inventory" />} />
  <div
    className={styles.statInfo}
    style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}
  >
    <Title className={styles.statValue}>{totalProducts}</Title>
    <Text className={styles.statLabel}>Productos en el inventario</Text>
  </div>
</Card>


<Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
  <CardHeader titleText="Stock Total" avatar={<Icon name="shipping-status" />} />
  <div
    className={styles.statInfo}
    style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}
  >
    <Title className={styles.statValue}>{totalStock}</Title>
    <Text className={styles.statLabel}>Unidades en total</Text>
  </div>
</Card>


<Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
  <CardHeader titleText="Bajo Stock" avatar={<Icon name="warning" />} />
  <div
    className={styles.statInfo}
    style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}
  >
    <Title className={styles.statValue} style={{ color: "var(--sapWarningColor)" }}>{lowStockProducts}</Title>
    <Text className={styles.statLabel}>Productos con bajo stock</Text>
  </div>
</Card>


<Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
  <CardHeader titleText="Agotados" avatar={<Icon name="alert" />} />
  <div
    className={styles.statInfo}
    style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}
  >
    <Title className={styles.statValue} style={{ color: "var(--sapErrorColor)" }}>{outOfStockProducts}</Title>
    <Text className={styles.statLabel}>Productos sin stock</Text>
  </div>
</Card>
</Grid>


        
        {/* Filtros */}
        <FilterBar 
          showGoButton={false}
          showRestoreButton
          showClearButton
          onClear={handleClearFilters}
          className={styles.filterBar}
        >
          <FilterGroupItem label="Búsqueda">
            <Input 
              placeholder="Buscar por nombre o SKU"
              value={searchQuery}
              onChange={handleSearch}
              icon="search"
              className={styles.inputFullWidth}
            />
          </FilterGroupItem>
          
          <FilterGroupItem label="Categoría">
            <MultiComboBox
              onSelectionChange={handleCategoriesChange}
              placeholder="Filtrar por categoría"
            >
              {categorias.map((cat, index) => (
                <MultiComboBoxItem key={index} text={cat} />
              ))}
            </MultiComboBox>
          </FilterGroupItem>
          
          <FilterGroupItem label="Ubicación">
            <MultiComboBox
              onSelectionChange={handleLocationsChange}
              placeholder="Filtrar por ubicación"
            >
              {ubicaciones.map((loc, index) => (
                <MultiComboBoxItem key={index} text={loc} />
              ))}
            </MultiComboBox>
          </FilterGroupItem>
          
          <FilterGroupItem label="Estado">
            <MultiComboBox
              onSelectionChange={handleEstadosChange}
              placeholder="Filtrar por estado"
            >
              <MultiComboBoxItem text="Disponible" />
              <MultiComboBoxItem text="Bajo stock" />
              <MultiComboBoxItem text="Agotado" />
            </MultiComboBox>
          </FilterGroupItem>
        </FilterBar>
        
        {/* Tabla de inventario */}
        {isLoading ? (
          <FlexBox 
            direction={FlexBoxDirection.Column}
            justifyContent={FlexBoxJustifyContent.Center}
            alignItems={FlexBoxAlignItems.Center}
            className={styles.tableWrapper}
          >
            <BusyIndicator size="Large" />
            <Text style={{ marginTop: "1rem" }}>Cargando datos de inventario...</Text>
          </FlexBox>
        ) : (
          <Card className={styles.tableWrapper}>
            <AnalyticalTable
              data={filteredData}
              columns={columns}
              visibleRows={10}
              alternateRowColor
              header={
                <Bar 
                  design={BarDesign.Header}
                  endContent={
                    <Label>Mostrando {filteredData.length} de {inventoryData.length} productos</Label>
                  }
                />
              }
              footer={
                <Bar 
                  design={BarDesign.Footer}
                  startContent={
                    <Text>Total de productos: {filteredData.length}</Text>
                  }
                />
              }
              scaleWidthMode="Smart"
              selectionMode="SingleSelect"
              withRowHighlight
              sortable
              filterable
              groupable
            />
          </Card>
        )}
        
        {/* Toast para notificaciones */}
        {showToast && (
          <Toast duration={3000} className={styles.toastContent}>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
              <Icon name="synchronize" style={{ marginRight: '0.5rem' }} />
              <Text>{toastMessage}</Text>
            </FlexBox>
          </Toast>
        )}
        
        {/* Diálogo de edición */}
        {selectedProduct && (
          <Dialog
            headerText="Editar Producto"
            open={isDialogOpen}
            onAfterClose={handleCloseDialog}
            className={styles.dialogContent}
            footer={
              <Bar 
                design={BarDesign.Footer}
                endContent={
                  <>
                    <Button design="Transparent" onClick={handleCloseDialog}>Cancelar</Button>
                    <Button design="Emphasized" onClick={handleCloseDialog}>Guardar</Button>
                  </>
                }
              />
            }
          >
            <div className={styles.formColumn}>
              <FlexBox direction={FlexBoxDirection.Column} style={{ gap: "1rem" }}>
                <Label required>Producto</Label>
                <Input value={selectedProduct.producto} />
                
                <Label required>SKU</Label>
                <Input value={selectedProduct.sku} />
                
                <Label required>Categoría</Label>
                <Select>
                  {categorias.map((cat, index) => (
                    <Option key={index} selected={cat === selectedProduct.categoria}>{cat}</Option>
                  ))}
                </Select>
                
                <Label required>Cantidad</Label>
                <Input type="Number" value={selectedProduct.cantidad.toString()} />
                
                <Label required>Ubicación</Label>
                <Select>
                  {ubicaciones.map((loc, index) => (
                    <Option key={index} selected={loc === selectedProduct.ubicacion}>{loc}</Option>
                  ))}
                </Select>
                
                <Label required>Proveedor</Label>
                <Select>
                  {proveedores.map((prov, index) => (
                    <Option key={index} selected={prov === selectedProduct.proveedor}>{prov}</Option>
                  ))}
                </Select>
              </FlexBox>
            </div>
          </Dialog>
        )}
      </div>
    </>
  );
}