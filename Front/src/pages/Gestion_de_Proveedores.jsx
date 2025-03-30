import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import { ThemeContext } from "../App";
import UI5ThemeProvider from "../components/UI5ThemeProvider";
import { createGlobalStyle } from "styled-components";
import "material-icons/iconfont/material-icons.css";
import {
  Container,
  PageHeader,
  PageTitle,
  ContentArea,
  Card,
  CardHeader,
  CardContent,
  Table,
  StatusIndicator,
  Button,
  ToolbarSection,
  SearchContainer,
  SearchInput,
  Tabs,
  Tab,
  Pagination,
  PageButton,
  ActionMenu,
  MenuButton,
  Menu,
  MenuItem,
  DialogBackdrop,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  FormGroup,
  FormLabel,
  FormInput,
  Select,
  Badge,
  ThemeToggle
} from "../styles/GestionDeProveedores/GestionDeProveedoresStyle";
import { MdBusinessCenter } from "react-icons/md";

// Define a GlobalStyle component for this page
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--sapFontFamily, "72", "72full", Arial, Helvetica, sans-serif);
  }
`;

// CSS for icon classes
const iconStyles = `
  .icon-add::before {
    content: "\\e145";
    font-family: "Material Icons";
  }
  .icon-refresh::before {
    content: "\\e5d5";
    font-family: "Material Icons";
  }
  .icon-detail-view::before {
    content: "\\e8f4";
    font-family: "Material Icons";
  }
  .icon-activated::before {
    content: "\\e876";
    font-family: "Material Icons";
  }
  .icon-pending::before {
    content: "\\e7d4";
    font-family: "Material Icons";
  }
  .icon-cancel::before {
    content: "\\e888";
    font-family: "Material Icons";
  }
  .icon-search::before {
    content: "\\e8b6";
    font-family: "Material Icons";
  }
`;

// Icons
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const PendingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const ExclamationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

// Sun and moon icons for theme toggle
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

// Sample data for suppliers
const suppliersData = [
  { 
    id: 1, 
    name: "Calzado Deportivo Premium",
    contact: "Juan Pérez",
    email: "contacto@calzadopremium.com",
    phone: "+52 55 1234 5678",
    type: "fabricante",
    products: 24,
    lastOrder: "2023-10-15",
    address: "Calle Industria 123, Ciudad de México",
    paymentTerms: "credito",
    orders: [
      { id: 101, date: "2023-10-15", status: "entregado", amount: 12500, items: 18 },
      { id: 102, date: "2023-09-02", status: "entregado", amount: 8700, items: 12 },
      { id: 103, date: "2023-07-22", status: "entregado", amount: 15000, items: 22 }
    ]
  },
  { 
    id: 2, 
    name: "Distribuidora de Zapatos Elegance",
    contact: "María Rodríguez",
    email: "maria@elegancesshoes.com",
    phone: "+52 33 9876 5432",
    type: "distribuidor",
    products: 36,
    lastOrder: "2023-10-02",
    address: "Av. Revolución 456, Guadalajara",
    paymentTerms: "factura",
    orders: [
      { id: 104, date: "2023-10-02", status: "entregado", amount: 22000, items: 30 },
      { id: 105, date: "2023-08-15", status: "entregado", amount: 14500, items: 25 }
    ]
  },
  { 
    id: 3, 
    name: "Importadora Footwear Internacional",
    contact: "Carlos Gómez",
    email: "cgomez@footwear-int.com",
    phone: "+52 55 2468 1357",
    type: "importador",
    products: 18,
    lastOrder: "2023-08-20",
    address: "Blvd. Insurgentes 789, Ciudad de México",
    paymentTerms: "anticipado",
    orders: [
      { id: 106, date: "2023-08-20", status: "cancelado", amount: 10000, items: 15 },
      { id: 107, date: "2023-07-05", status: "entregado", amount: 8200, items: 12 }
    ]
  },
  { 
    id: 4, 
    name: "Zapatos y Complementos Moda Total",
    contact: "Ana López",
    email: "alopez@modatotal.mx",
    phone: "+52 81 1357 2468",
    type: "mayorista",
    products: 42,
    lastOrder: "2023-09-28",
    address: "Calle Hidalgo 321, Monterrey",
    paymentTerms: "transferencia",
    orders: [
      { id: 108, date: "2023-09-28", status: "pendiente", amount: 32000, items: 45 },
      { id: 109, date: "2023-08-10", status: "entregado", amount: 18500, items: 28 },
      { id: 110, date: "2023-06-22", status: "entregado", amount: 16000, items: 24 }
    ]
  }
];

// Sample data for product categories
const categories = [
  { id: 1, name: "Calzado Deportivo" },
  { id: 2, name: "Calzado Formal" },
  { id: 3, name: "Calzado Casual" },
  { id: 4, name: "Botas" },
  { id: 5, name: "Sandalias" }
];

// Generate consistent inventory stats
const generateStats = () => {
  return [
    87, // Calzado Deportivo
    40, // Calzado Formal
    63, // Calzado Casual
    14, // Botas
    94  // Sandalias
  ];
};

// Sample data for suppliers by type instead of status
const suppliersByType = [
  { id: 1, name: "Fabricantes", count: 5, color: "success" },
  { id: 2, name: "Distribuidores", count: 3, color: "info" },
  { id: 3, name: "Importadores", count: 2, color: "warning" },
  { id: 4, name: "Mayoristas", count: 3, color: "error" }
];

// Sample data for inventory age
const inventoryByAge = [
  { id: 1, name: "Recibido < 30 días", count: 157, color: "success" },
  { id: 2, name: "Recibido 30-60 días", count: 92, color: "info" },
  { id: 3, name: "Recibido 60-90 días", count: 35, color: "warning" },
  { id: 4, name: "Recibido > 90 días", count: 14, color: "error" }
];

// SVG Icons for payment methods
const CreditCardDocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="15" height="18" rx="2" />
    <circle cx="15" cy="9" r="3" />
    <line x1="6" y1="9" x2="10" y2="9" />
    <line x1="6" y1="12" x2="12" y2="12" />
    <line x1="6" y1="15" x2="8" y2="15" />
    <rect x="7" y="19" width="16" height="4" rx="1" />
    <rect x="8" y="18" width="14" height="2" rx="1" />
  </svg>
);

const BankIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10V18M8 10V18M12 10V18M16 10V18M20 10V18" />
    <path d="M2 20H22" />
    <path d="M2 8H22" />
    <path d="M12 4L21 8H3L12 4Z" />
  </svg>
);

const InvoiceDocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" />
    <circle cx="12" cy="8" r="2" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="15" x2="16" y2="15" />
    <line x1="8" y1="18" x2="12" y2="18" />
  </svg>
);

const TimeMoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="7" />
    <polyline points="16 12 16 16 18 18" />
    <path d="M9 6h6M7 10h10M3 18c8 0 10-10 10-10C13 8 11 6 3 6" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

// Sample data for payment methods (matching Compras.jsx)
const paymentMethods = [
  { 
    id: "credito", 
    name: "Crédito Corporativo", 
    subtitle: "30 días",
    icon: <CreditCardDocIcon />
  },
  { 
    id: "transferencia", 
    name: "Transferencia Bancaria", 
    subtitle: "Pago inmediato",
    icon: <BankIcon />
  },
  { 
    id: "factura", 
    name: "Factura a 45 días", 
    subtitle: "Requiere aprobación",
    icon: <InvoiceDocIcon />
  },
  { 
    id: "anticipado", 
    name: "Pago Anticipado", 
    subtitle: "Pago al realizar pedido",
    icon: <TimeMoneyIcon />
  },
  { 
    id: "orden", 
    name: "Orden de Compra", 
    subtitle: "Departamento de adquisiciones",
    icon: <ShoppingCartIcon />
  }
];

// Component for supplier management
const Gestion_de_Proveedores = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");
  
  const [suppliers, setSuppliers] = useState(suppliersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showDialog, setShowDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(0);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    type: "fabricante",
    shoeTypes: [],
    products: 0,
    paymentTerms: "credito",
    orders: []
  });
  const [formErrors, setFormErrors] = useState({});
  const itemsPerPage = 4;
  
  // Generate stats once and reuse them
  const categoryStats = useMemo(() => generateStats(), []);
  
  // Inject icon styles
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = iconStyles;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  // Set document title
  useEffect(() => {
    document.title = "Gestión de Proveedores | Spider System";
    return () => {
      document.title = "Spider System";
    };
  }, []);
  
  // Add refresh functionality
  const handleRefresh = () => {
    setSuppliers([...suppliersData]);
    setSearchQuery("");
    setCurrentPage(1);
  };
  
  // Filter suppliers based on search query and active tab
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        supplier.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        supplier.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
                    (activeTab === "fabricante" && supplier.type === "fabricante") ||
                    (activeTab === "distribuidor" && supplier.type === "distribuidor") ||
                    (activeTab === "importador" && supplier.type === "importador") ||
                    (activeTab === "mayorista" && supplier.type === "mayorista");
    
    return matchesSearch && matchesTab;
  });
  
  // Pagination logic
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle supplier details
  const handleViewDetails = (supplier) => {
    setCurrentSupplier(supplier);
    setShowDialog(true);
  };
  
  // Get type display name
  const getTypeDisplayName = (type) => {
    switch(type) {
      case 'fabricante': return 'Fabricante';
      case 'distribuidor': return 'Distribuidor';
      case 'importador': return 'Importador';
      case 'mayorista': return 'Mayorista';
      default: return type;
    }
  };
  
  // Get type color
  const getTypeColor = (type) => {
    switch(type) {
      case 'fabricante': return 'success';
      case 'distribuidor': return 'info';
      case 'importador': return 'warning';
      case 'mayorista': return 'error';
      default: return '';
    }
  };

  // Get payment terms display name and subtitle
  const getPaymentTermsInfo = (id) => {
    const method = paymentMethods.find(method => method.id === id);
    return method || { name: "Desconocido", subtitle: "" };
  };
  
  // Get payment terms badge color
  const getPaymentTermsColor = (terms) => {
    switch(terms) {
      case 'anticipado': return 'success';
      case 'credito': return 'info';
      case 'transferencia': return 'warning';
      case 'factura': return 'error';
      case 'orden': return 'warning';
      default: return '';
    }
  };

  // Handle input change for new supplier form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Validate form before submission
  const validateForm = () => {
    const errors = {};
    
    if (!newSupplier.name.trim()) {
      errors.name = "El nombre del proveedor es obligatorio";
    }
    
    if (!newSupplier.contact.trim()) {
      errors.contact = "El nombre de contacto es obligatorio";
    }
    
    if (!newSupplier.email.trim()) {
      errors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(newSupplier.email)) {
      errors.email = "Email inválido";
    }
    
    if (!newSupplier.phone.trim()) {
      errors.phone = "El teléfono es obligatorio";
    }
    
    if (!newSupplier.address.trim()) {
      errors.address = "La dirección es obligatoria";
    }
    
    if (newSupplier.shoeTypes.length === 0) {
      errors.shoeTypes = "Seleccione al menos un tipo de calzado";
    }
    
    return errors;
  };
  
  // Handle checkbox change for shoe types
  const handleShoeTypeChange = (id) => {
    setNewSupplier(prev => {
      const shoeTypes = [...prev.shoeTypes];
      
      if (shoeTypes.includes(id)) {
        // Remove if already selected
        return {
          ...prev,
          shoeTypes: shoeTypes.filter(typeId => typeId !== id)
        };
      } else {
        // Add if not selected
        return {
          ...prev,
          shoeTypes: [...shoeTypes, id]
        };
      }
    });
    
    // Clear error if there was one
    if (formErrors.shoeTypes) {
      setFormErrors(prev => ({
        ...prev,
        shoeTypes: null
      }));
    }
  };
  
  // Handle new supplier form submission
  const handleAddSupplier = () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const newId = Math.max(...suppliers.map(s => s.id)) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Calculate a realistic number of products based on shoe types
    const estimatedProductCount = newSupplier.shoeTypes.length * 15 + Math.floor(Math.random() * 10);
    
    const supplierToAdd = {
      ...newSupplier,
      id: newId,
      products: estimatedProductCount,
      lastOrder: currentDate,
      orders: []
    };
    
    setSuppliers([...suppliers, supplierToAdd]);
    setShowAddDialog(false);
    setNewSupplier({
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      type: "fabricante",
      shoeTypes: [],
      products: 0,
      paymentTerms: "credito",
      orders: []
    });
    setFormErrors({});
  };

  return (
    <UI5ThemeProvider>
      <GlobalStyle />
      <Container>
        <ContentArea>
          <PageHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MdBusinessCenter size={24} />
              <PageTitle>Gestión de Proveedores</PageTitle>
            </div>
            <ThemeToggle onClick={toggleTheme}>
              {isDarkTheme ? <SunIcon /> : <MoonIcon />}
            </ThemeToggle>
          </PageHeader>
          
          <Card>
            <CardHeader>
              Proveedores de Super Shoes
            </CardHeader>
            <CardContent>
              <ToolbarSection>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button 
                    primary 
                    onClick={() => setShowAddDialog(true)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem' }}>
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Agregar Proveedor
                  </Button>
                  <Button onClick={handleRefresh}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem' }}>
                        <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.49 9C19.9828 7.56678 19.1209 6.2854 17.9845 5.27542C16.8482 4.26543 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7346 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Actualizar
                  </Button>
                </div>
                <SearchContainer>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <SearchInput 
                    type="text" 
                    placeholder="Buscar proveedor..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </SearchContainer>
              </ToolbarSection>
              
              <Tabs>
                <Tab 
                  active={activeTab === "all"} 
                  onClick={() => setActiveTab("all")}
                >
                  Todos
                </Tab>
                <Tab 
                  active={activeTab === "fabricante"} 
                  onClick={() => setActiveTab("fabricante")}
                >
                  Fabricantes
                </Tab>
                <Tab 
                  active={activeTab === "distribuidor"} 
                  onClick={() => setActiveTab("distribuidor")}
                >
                  Distribuidores
                </Tab>
                <Tab 
                  active={activeTab === "importador"} 
                  onClick={() => setActiveTab("importador")}
                >
                  Importadores
                </Tab>
                <Tab 
                  active={activeTab === "mayorista"} 
                  onClick={() => setActiveTab("mayorista")}
                >
                  Mayoristas
                </Tab>
              </Tabs>
              
              <Table>
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>Proveedor</th>
                    <th style={{ width: '15%' }}>Contacto</th>
                    <th style={{ width: '20%' }}>Email</th>
                    <th style={{ width: '10%' }}>Productos</th>
                    <th style={{ width: '15%' }}>Tipo</th>
                    <th style={{ width: '15%' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSuppliers.map(supplier => (
                    <tr key={supplier.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{supplier.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--sapContent_LabelColor, #6a6d70)', marginTop: '0.25rem' }}>
                          Último pedido: {new Date(supplier.lastOrder).toLocaleDateString()}
                        </div>
                      </td>
                      <td>{supplier.contact}</td>
                      <td>{supplier.email}</td>
                      <td>
                        <Badge color={supplier.products > 30 ? "success" : "info"}>
                          {supplier.products}
                        </Badge>
                      </td>
                      <td>
                        <StatusIndicator status={getTypeColor(supplier.type)}>
                          {getTypeDisplayName(supplier.type)}
                        </StatusIndicator>
                      </td>
                      <td>
                        <Button 
                          onClick={() => handleViewDetails(supplier)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                          primary
                        >
                          <span className="icon-detail-view"></span>
                          Ver detalles
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              {filteredSuppliers.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--sapContent_LabelColor, #6a6d70)' }}>
                  <span className="icon-search" style={{ fontSize: '2rem', marginBottom: '1rem' }}></span>
                  <p>No se encontraron proveedores que coincidan con los criterios de búsqueda.</p>
                </div>
              )}
              
              {totalPages > 1 && (
                <Pagination>
                  <PageButton 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </PageButton>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PageButton 
                      key={page}
                      active={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PageButton>
                  ))}
                  
                  <PageButton 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </PageButton>
                </Pagination>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              Resumen de Inventario por Proveedor
            </CardHeader>
            <CardContent>
              <Tabs>
                <Tab 
                  active={activeCategory === 0} 
                  onClick={() => setActiveCategory(0)}
                >
                  Por Categoría
                </Tab>
                <Tab 
                  active={activeCategory === 1} 
                  onClick={() => setActiveCategory(1)}
                >
                  Por Tipo
                </Tab>
                <Tab 
                  active={activeCategory === 2} 
                  onClick={() => setActiveCategory(2)}
                >
                  Por Antigüedad
                </Tab>
              </Tabs>
              
              {activeCategory === 0 && (
                <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))', gap: '1rem' }}>
                  {categories.map((category, index) => (
                    <div 
                      key={category.id} 
                      style={{ 
                        padding: '1.5rem', 
                        borderRadius: '0.25rem',
                        backgroundColor: 'var(--sapTile_Background, #ffffff)',
                        border: '1px solid var(--sapGroup_ContentBorderColor, #d9d9d9)',
                        boxShadow: '0 0 0.25rem rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                        {category.name}
                      </div>
                      <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--sapIndicator, #0854a0)', marginBottom: '0.5rem' }}>
                        {categoryStats[index]}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--sapContent_LabelColor, #6a6d70)' }}>
                          {index === 0 ? 3 : 
                            index === 1 ? 4 : 
                            index === 2 ? 2 : 
                            index === 3 ? 1 : 5} proveedores
                        </div>
                        <Badge color={
                          categoryStats[index] > 80 ? "success" : 
                          categoryStats[index] > 50 ? "info" : 
                          categoryStats[index] > 20 ? "warning" : "error"
                        }>
                          {categoryStats[index] > 80 ? "Alto" : 
                          categoryStats[index] > 50 ? "Medio" : 
                          categoryStats[index] > 20 ? "Bajo" : "Crítico"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeCategory === 1 && (
                <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))', gap: '1rem' }}>
                  {suppliersByType.map((item) => (
                    <div 
                      key={item.id} 
                      style={{ 
                        padding: '1.5rem', 
                        borderRadius: '0.25rem',
                        backgroundColor: 'var(--sapTile_Background, #ffffff)',
                        border: '1px solid var(--sapGroup_ContentBorderColor, #d9d9d9)',
                        boxShadow: '0 0 0.25rem rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--sapIndicator, #0854a0)', marginBottom: '0.5rem' }}>
                        {item.count}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--sapContent_LabelColor, #6a6d70)' }}>
                          {Math.round(item.count / 13 * 100)}% del total
                        </div>
                        <Badge color={item.color}>
                          {item.id === 1 ? "Nacional" : 
                           item.id === 2 ? "Nacional" : 
                           item.id === 3 ? "Importado" : "Variado"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeCategory === 2 && (
                <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))', gap: '1rem' }}>
                  {inventoryByAge.map((item) => (
                    <div 
                      key={item.id} 
                      style={{ 
                        padding: '1.5rem', 
                        borderRadius: '0.25rem',
                        backgroundColor: 'var(--sapTile_Background, #ffffff)',
                        border: '1px solid var(--sapGroup_ContentBorderColor, #d9d9d9)',
                        boxShadow: '0 0 0.25rem rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--sapIndicator, #0854a0)', marginBottom: '0.5rem' }}>
                        {item.count}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--sapContent_LabelColor, #6a6d70)' }}>
                          {Math.round(item.count / 298 * 100)}% del inventario
                        </div>
                        <Badge color={item.color}>
                          {item.color === "success" ? "Reciente" : 
                           item.color === "info" ? "Normal" : 
                           item.color === "warning" ? "Revisar" : "Liquidar"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </ContentArea>
        
        {/* Supplier Details Dialog */}
        {showDialog && currentSupplier && (
          <DialogBackdrop>
            <Dialog size="lg">
              <DialogHeader>
                <DialogTitle>Detalles del Proveedor</DialogTitle>
                <Button onClick={() => setShowDialog(false)}>✕</Button>
              </DialogHeader>
              <DialogContent>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                  <div style={{ flex: '1 1 20rem' }}>
                    <FormGroup>
                      <FormLabel>Nombre del Proveedor</FormLabel>
                      <h3>{currentSupplier.name}</h3>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel>Información de Contacto</FormLabel>
                      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 1rem' }}>
                        <div>Contacto:</div>
                        <div><strong>{currentSupplier.contact}</strong></div>
                        <div>Email:</div>
                        <div><strong>{currentSupplier.email}</strong></div>
                        <div>Teléfono:</div>
                        <div><strong>{currentSupplier.phone}</strong></div>
                        <div>Dirección:</div>
                        <div><strong>{currentSupplier.address}</strong></div>
                      </div>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel>Tipo de Proveedor</FormLabel>
                      <StatusIndicator status={getTypeColor(currentSupplier.type)} style={{ marginTop: '0.5rem' }}>
                        {getTypeDisplayName(currentSupplier.type)}
                      </StatusIndicator>
                    </FormGroup>
                  </div>
                  
                  <div style={{ flex: '1 1 20rem' }}>
                    <FormGroup>
                      <FormLabel>Productos Activos</FormLabel>
                      <h1 style={{ color: 'var(--sapIndicator, #0854a0)' }}>
                        {currentSupplier.products}
                      </h1>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel>Última Orden</FormLabel>
                      <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>
                        {new Date(currentSupplier.lastOrder).toLocaleDateString()}
                      </div>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel>Método de Pago</FormLabel>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                        <div style={{ color: isDarkTheme ? '#a0a0a0' : 'inherit' }}>
                          {getPaymentTermsInfo(currentSupplier.paymentTerms).icon}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>
                            {getPaymentTermsInfo(currentSupplier.paymentTerms).name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--sapContent_LabelColor, #6a6d70)' }}>
                            {getPaymentTermsInfo(currentSupplier.paymentTerms).subtitle}
                          </div>
                        </div>
                      </div>
                    </FormGroup>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <FormGroup>
                    <FormLabel>Historial de Pedidos</FormLabel>
                    <Table>
                      <thead>
                        <tr>
                          <th>Pedido #</th>
                          <th>Fecha</th>
                          <th>Productos</th>
                          <th>Monto</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSupplier.orders.map(order => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>{order.items}</td>
                            <td>${order.amount.toLocaleString()}</td>
                            <td>
                              <StatusIndicator status={
                                order.status === 'entregado' ? 'active' :
                                order.status === 'pendiente' ? 'pending' :
                                order.status === 'cancelado' ? 'inactive' : 'pending'
                              }>
                                {order.status === 'entregado' ? 'Entregado' : 'Pendiente'}
                              </StatusIndicator>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </FormGroup>
                </div>
              </DialogContent>
              <DialogFooter>
                <Button onClick={() => setShowDialog(false)}>Cerrar</Button>
              </DialogFooter>
            </Dialog>
          </DialogBackdrop>
        )}

        {/* Add Supplier Dialog */}
        {showAddDialog && (
          <DialogBackdrop>
            <Dialog size="lg">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
                <Button onClick={() => {
                  setShowAddDialog(false);
                  setFormErrors({});
                  setNewSupplier({
                    name: "",
                    contact: "",
                    email: "",
                    phone: "",
                    address: "",
                    type: "fabricante",
                    shoeTypes: [],
                    products: 0,
                    paymentTerms: "credito",
                    orders: []
                  });
                }}>✕</Button>
              </DialogHeader>
              <DialogContent>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <FormGroup>
                    <FormLabel>Nombre del Proveedor*</FormLabel>
                    <FormInput 
                      type="text"
                      name="name"
                      value={newSupplier.name}
                      onChange={handleInputChange}
                      style={{ 
                        borderColor: formErrors.name ? 'var(--sapErrorColor, #bb0000)' : 'inherit',
                        backgroundColor: isDarkTheme ? '#3d3d3d' : 'var(--sapField_Background, #ffffff)'
                      }}
                    />
                    {formErrors.name && (
                      <div style={{ color: 'var(--sapErrorColor, #bb0000)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        {formErrors.name}
                      </div>
                    )}
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Persona de Contacto*</FormLabel>
                    <FormInput 
                      type="text"
                      name="contact"
                      value={newSupplier.contact}
                      onChange={handleInputChange}
                      style={{ 
                        borderColor: formErrors.contact ? 'var(--sapErrorColor, #bb0000)' : 'inherit',
                        backgroundColor: isDarkTheme ? '#3d3d3d' : 'var(--sapField_Background, #ffffff)'
                      }}
                    />
                    {formErrors.contact && (
                      <div style={{ color: 'var(--sapErrorColor, #bb0000)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        {formErrors.contact}
                      </div>
                    )}
                  </FormGroup>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                  <FormGroup>
                    <FormLabel>Email*</FormLabel>
                    <FormInput 
                      type="email"
                      name="email"
                      value={newSupplier.email}
                      onChange={handleInputChange}
                      style={{ 
                        borderColor: formErrors.email ? 'var(--sapErrorColor, #bb0000)' : 'inherit',
                        backgroundColor: isDarkTheme ? '#3d3d3d' : 'var(--sapField_Background, #ffffff)'
                      }}
                    />
                    {formErrors.email && (
                      <div style={{ color: 'var(--sapErrorColor, #bb0000)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        {formErrors.email}
                      </div>
                    )}
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Teléfono*</FormLabel>
                    <FormInput 
                      type="tel"
                      name="phone"
                      value={newSupplier.phone}
                      onChange={handleInputChange}
                      placeholder="+52 XX XXXX XXXX"
                      style={{ 
                        borderColor: formErrors.phone ? 'var(--sapErrorColor, #bb0000)' : 'inherit',
                        backgroundColor: isDarkTheme ? '#3d3d3d' : 'var(--sapField_Background, #ffffff)'
                      }}
                    />
                    {formErrors.phone && (
                      <div style={{ color: 'var(--sapErrorColor, #bb0000)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        {formErrors.phone}
                      </div>
                    )}
                  </FormGroup>
                </div>
                
                <FormGroup style={{ marginTop: '1.5rem' }}>
                  <FormLabel>Dirección*</FormLabel>
                  <FormInput 
                    type="text"
                    name="address"
                    value={newSupplier.address}
                    onChange={handleInputChange}
                    style={{ 
                      borderColor: formErrors.address ? 'var(--sapErrorColor, #bb0000)' : 'inherit',
                      backgroundColor: isDarkTheme ? '#3d3d3d' : 'var(--sapField_Background, #ffffff)'
                    }}
                  />
                  {formErrors.address && (
                    <div style={{ color: 'var(--sapErrorColor, #bb0000)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {formErrors.address}
                    </div>
                  )}
                </FormGroup>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                  <FormGroup>
                    <FormLabel>Tipo de Proveedor</FormLabel>
                    <Select 
                      name="type"
                      value={newSupplier.type}
                      onChange={handleInputChange}
                      style={{ backgroundColor: isDarkTheme ? '#3d3d3d' : 'var(--sapField_Background, #ffffff)' }}
                    >
                      <option value="fabricante">Fabricante</option>
                      <option value="distribuidor">Distribuidor</option>
                      <option value="importador">Importador</option>
                      <option value="mayorista">Mayorista</option>
                    </Select>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Método de Pago</FormLabel>
                    <Select 
                      name="paymentTerms"
                      value={newSupplier.paymentTerms}
                      onChange={handleInputChange}
                      style={{ backgroundColor: isDarkTheme ? '#3d3d3d' : 'var(--sapField_Background, #ffffff)' }}
                    >
                      {paymentMethods.map(method => (
                        <option key={method.id} value={method.id}>
                          {method.name} - {method.subtitle}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                </div>
                
                <FormGroup style={{ marginTop: '1.5rem' }}>
                  <FormLabel>Tipos de Calzado*</FormLabel>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '0.75rem',
                    marginTop: '0.5rem',
                    padding: '1rem',
                    borderRadius: '0.25rem',
                    border: formErrors.shoeTypes ? '1px solid var(--sapErrorColor, #bb0000)' : '1px solid var(--sapGroup_ContentBorderColor, #d9d9d9)',
                    backgroundColor: isDarkTheme ? '#3d3d3d' : 'var(--sapField_Background, #ffffff)'
                  }}>
                    {categories.map(category => (
                      <label key={category.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={newSupplier.shoeTypes.includes(category.id)}
                          onChange={() => handleShoeTypeChange(category.id)}
                          style={{ cursor: 'pointer' }}
                        />
                        <span>{category.name}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.shoeTypes && (
                    <div style={{ color: 'var(--sapErrorColor, #bb0000)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {formErrors.shoeTypes}
                    </div>
                  )}
                </FormGroup>
                
                <div style={{ marginTop: '1.5rem', color: 'var(--sapContent_LabelColor, #6a6d70)', fontSize: '0.875rem' }}>
                  * Campos obligatorios
                </div>
              </DialogContent>
              <DialogFooter>
                <Button onClick={() => {
                  setShowAddDialog(false);
                  setFormErrors({});
                  setNewSupplier({
                    name: "",
                    contact: "",
                    email: "",
                    phone: "",
                    address: "",
                    type: "fabricante",
                    shoeTypes: [],
                    products: 0,
                    paymentTerms: "credito",
                    orders: []
                  });
                }}>Cancelar</Button>
                <Button primary onClick={handleAddSupplier}>
                  Guardar Proveedor
                </Button>
              </DialogFooter>
            </Dialog>
          </DialogBackdrop>
        )}
      </Container>
    </UI5ThemeProvider>
  );
};

// Force dark theme for this component
const useForceTheme = () => {
  // ... existing code ...
};

export { Gestion_de_Proveedores }; 