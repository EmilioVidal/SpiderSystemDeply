import React, { useState, useContext } from "react";
import {
  Container,
  PageHeader,
  PageTitle,
  ContentArea,
  StepIndicator,
  StepItem,
  Card,
  CardHeader,
  CardContent,
  RadioGroup,
  RadioItem,
  RadioButton,
  RadioLabel,
  RadioTitle,
  RadioSubtitle,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  Button,
  Footer,
  Table,
  TableHeader,
  TableBody,
  Summary,
  SummaryRow,
  LocationItem,
  LocationIcon,
  LocationInfo,
  LocationTitle,
  LocationAddress,
  StatusIndicator,
  PaymentItem,
  PaymentIcon,
  PaymentLabel,
  PaymentLogo,
  GlobalStyle
} from "../styles/Compras/ComprasStyle";
import UI5ThemeProvider from "../components/UI5ThemeProvider";
import { ThemeContext } from "../App";

// SVG Icons for the process
const MapIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SVG Icons for quantity controls
const PlusIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3.33334V12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.33331 8H12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MinusIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33331 8H12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SVG Icons for payment methods
const CreditCardDocIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="15" height="18" rx="2" fill="#c8d2dc" />
    <circle cx="15" cy="9" r="3" fill="#ffd966" />
    <line x1="6" y1="9" x2="10" y2="9" stroke="#4a5568" />
    <line x1="6" y1="12" x2="12" y2="12" stroke="#4a5568" />
    <line x1="6" y1="15" x2="8" y2="15" stroke="#4a5568" />
    <rect x="7" y="19" width="16" height="4" rx="1" fill="#4091f9" />
    <rect x="8" y="18" width="14" height="2" rx="1" fill="#5fa4fe" />
  </svg>
);

const BankIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10V18M8 10V18M12 10V18M16 10V18M20 10V18" />
    <path d="M2 20H22" />
    <path d="M2 8H22" />
    <path d="M12 4L21 8H3L12 4Z" fill="#fff5d2" />
    <rect x="3" y="8" width="18" height="12" fill="#c8d2dc" />
  </svg>
);

const InvoiceDocIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="#e4f4ff" />
    <circle cx="12" cy="8" r="2" fill="#ffd966" />
    <line x1="8" y1="12" x2="16" y2="12" stroke="#4a5568" />
    <line x1="8" y1="15" x2="16" y2="15" stroke="#4a5568" />
    <line x1="8" y1="18" x2="12" y2="18" stroke="#4a5568" />
  </svg>
);

const TimeMoneyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="7" fill="#dd4040" />
    <polyline points="16 12 16 16 18 18" />
    <path d="M9 6h6M7 10h10M3 18c8 0 10-10 10-10C13 8 11 6 3 6" fill="#3bac83" />
  </svg>
);

const ShoppingCartIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" fill="#4091f9" />
  </svg>
);

// Sample data for suppliers
const suppliers = [
  { id: 1, name: "Calzado Deportivo Premium" },
  { id: 2, name: "Distribuidora de Zapatos Elegance" },
  { id: 3, name: "Importadora Footwear Internacional" },
  { id: 4, name: "Zapatos y Complementos Moda Total" }
];

// Sample data for products
const products = [
  { 
    id: 1, 
    name: "Zapatillas Deportivas", 
    price: 120, 
    image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
  },
  { 
    id: 2, 
    name: "Zapatos de Vestir", 
    price: 200, 
    image: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
  },
  { 
    id: 3, 
    name: "Botines de Cuero", 
    price: 250, 
    image: "https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
  },
  { 
    id: 4, 
    name: "Sandalias de Playa", 
    price: 80, 
    image: "https://images.pexels.com/photos/6046183/pexels-photo-6046183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
  }
];

// Sample data for locations
const locations = [
  { 
    id: 1, 
    name: "Super Shoes - Tienda Principal", 
    address: "Plaza Comercial Reforma, Local 42B, CDMX" 
  },
  { 
    id: 2, 
    name: "Super Shoes - Polanco", 
    address: "Av. Presidente Masaryk 228, Polanco, CDMX" 
  },
  { 
    id: 3, 
    name: "Super Shoes - Santa Fe", 
    address: "Centro Comercial Santa Fe, Nivel 2, Local 257" 
  },
  { 
    id: 4, 
    name: "Super Shoes - Outlet Perisur", 
    address: "Centro Comercial Perisur, Planta Baja, Local A15" 
  }
];

// Sample data for payment methods
const paymentMethods = [
  { 
    id: 1, 
    name: "Crédito Corporativo", 
    subtitle: "30 días",
    customIcon: CreditCardDocIcon
  },
  { 
    id: 2, 
    name: "Transferencia Bancaria", 
    subtitle: "Pago inmediato",
    customIcon: BankIcon
  },
  { 
    id: 3, 
    name: "Factura a 45 días", 
    subtitle: "Requiere aprobación",
    customIcon: InvoiceDocIcon
  },
  { 
    id: 4, 
    name: "Pago Anticipado", 
    subtitle: "Pago al realizar pedido",
    customIcon: TimeMoneyIcon
  },
  { 
    id: 5, 
    name: "Orden de Compra", 
    subtitle: "Departamento de adquisiciones",
    customIcon: ShoppingCartIcon
  }
];

export function Compras() {
  const { isDarkTheme } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSupplier, setSelectedSupplier] = useState(4);
  const [cartItems, setCartItems] = useState([{ productId: 1, quantity: 1 }]);
  const [selectedLocation, setSelectedLocation] = useState(2);
  const [selectedPayment, setSelectedPayment] = useState(1);
  const [orderData, setOrderData] = useState({
    orderNumber: "OC-2025-015",
    orderDate: "12 de marzo de 2025",
    estimatedDeliveryDate: "18 de marzo de 2025",
    shippingMethod: "Envío estándar (3-5 días hábiles)"
  });

  // Get products in cart with quantities
  const cartProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...product,
      quantity: item.quantity,
      total: product.price * item.quantity
    };
  });
  
  // Calculate totals
  const subtotal = cartProducts.reduce((total, item) => total + item.total, 0);
  const tax = subtotal * 0.16; // 16% tax
  const total = subtotal + tax;

  const handleStepChange = (step) => {
    if (step <= currentStep + 1) {
      setCurrentStep(step);
    }
  };

  const handleContinue = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const toggleProductSelection = (productId) => {
    const existingItem = cartItems.find(item => item.productId === productId);
    
    if (existingItem) {
      // If item exists in cart, remove it
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } else {
      // If item doesn't exist, add it with quantity 1
      setCartItems([...cartItems, { productId, quantity: 1 }]);
    }
  };

  const increaseQuantity = (productId) => {
    setCartItems(cartItems.map(item => 
      item.productId === productId 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    ));
  };

  const decreaseQuantity = (productId) => {
    setCartItems(cartItems.map(item => 
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ));
  };

  // Check if product is in cart
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.productId === productId);
  };

  // Get quantity of product in cart
  const getProductQuantity = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>Proveedores</CardHeader>
            <CardContent>
              <h3 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1rem" }}>Selecciona un proveedor</h3>
              <RadioGroup>
                {suppliers.map(supplier => (
                  <RadioItem 
                    key={supplier.id} 
                    selected={selectedSupplier === supplier.id}
                    onClick={() => setSelectedSupplier(supplier.id)}
                  >
                    <RadioButton selected={selectedSupplier === supplier.id} />
                    <RadioLabel>
                      <RadioTitle>{supplier.name}</RadioTitle>
                    </RadioLabel>
                  </RadioItem>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>Productos</CardHeader>
            <CardContent>
              <h3 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1rem" }}>Selecciona los productos</h3>
              <ProductGrid>
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    selected={isProductInCart(product.id)}
                  >
                    <ProductImage>
                      <img src={product.image} alt={product.name} />
                    </ProductImage>
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <ProductPrice>${product.price}</ProductPrice>
                      
                      {isProductInCart(product.id) ? (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          marginTop: '10px',
                          justifyContent: 'space-between'
                        }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            border: '1px solid var(--sapContent_ForegroundBorderColor, #d9d9d9)',
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <Button 
                              style={{ 
                                minWidth: '32px', 
                                height: '32px',
                                padding: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                borderRight: '1px solid var(--sapContent_ForegroundBorderColor, #d9d9d9)'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                decreaseQuantity(product.id);
                              }}
                            >
                              {MinusIcon}
                            </Button>
                            <div style={{ 
                              padding: '0 10px',
                              minWidth: '32px',
                              textAlign: 'center'
                            }}>
                              {getProductQuantity(product.id)}
                            </div>
                            <Button 
                              style={{ 
                                minWidth: '32px', 
                                height: '32px',
                                padding: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                borderLeft: '1px solid var(--sapContent_ForegroundBorderColor, #d9d9d9)'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                increaseQuantity(product.id);
                              }}
                            >
                              {PlusIcon}
                            </Button>
                          </div>
                          <Button 
                            style={{
                              padding: '0 12px',
                              height: '32px',
                              background: 'var(--sapButton_Reject_Background, #bb0000)',
                              color: 'var(--sapButton_Reject_TextColor, white)',
                              border: 'none'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleProductSelection(product.id);
                            }}
                          >
                            Quitar
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          style={{
                            marginTop: '10px',
                            background: 'var(--sapButton_Accept_Background, #0070f2)',
                            color: 'var(--sapButton_Accept_TextColor, white)',
                            border: 'none'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleProductSelection(product.id);
                          }}
                        >
                          Agregar
                        </Button>
                      )}
                    </ProductInfo>
                  </ProductCard>
                ))}
              </ProductGrid>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>Entrega</CardHeader>
            <CardContent>
              <h3 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1rem" }}>Selecciona una tienda para la entrega</h3>
              {locations.map(location => (
                <LocationItem 
                  key={location.id} 
                  selected={selectedLocation === location.id}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <LocationIcon>{MapIcon}</LocationIcon>
                  <LocationInfo>
                    <LocationTitle>{location.name}</LocationTitle>
                    <LocationAddress>{location.address}</LocationAddress>
                  </LocationInfo>
                  {selectedLocation === location.id && (
                    <StatusIndicator>{CheckIcon}</StatusIndicator>
                  )}
                </LocationItem>
              ))}
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>Pago</CardHeader>
            <CardContent>
              <h3 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1rem" }}>Selecciona el método de pago</h3>
              {paymentMethods.map(method => (
                <PaymentItem 
                  key={method.id} 
                  selected={selectedPayment === method.id}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <PaymentIcon>{method.customIcon}</PaymentIcon>
                  <div style={{ flex: 1 }}>
                    <PaymentLabel>{method.name}</PaymentLabel>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--sapContent_LabelColor, #6a6d70)',
                      marginTop: '4px'
                    }}>
                      {method.subtitle}
                    </div>
                  </div>
                </PaymentItem>
              ))}
            </CardContent>
          </Card>
        );
      case 5:
        const selectedLocationData = locations.find(l => l.id === selectedLocation);
        return (
          <Card>
            <CardHeader>Resumen del Pedido</CardHeader>
            <CardContent>
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Información del Pedido</h3>
                <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Proveedor:</strong> {suppliers.find(s => s.id === selectedSupplier)?.name}
                </div>
                <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Número de Orden:</strong> {orderData.orderNumber}
                </div>
                <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Fecha de Pedido:</strong> {orderData.orderDate}
                </div>
                <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Fecha Estimada de Entrega:</strong> {orderData.estimatedDeliveryDate}
                </div>
                <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Método de Envío:</strong> {orderData.shippingMethod}
                </div>
                <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Punto de Entrega:</strong> {selectedLocationData.name}
                </div>
                <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <strong>Dirección de Entrega:</strong> {selectedLocationData.address}
                </div>
              </div>
              
              <h3 style={{ margin: "1.5rem 0 0.5rem", fontSize: "1rem" }}>Productos Solicitados</h3>
              <Table>
                <TableHeader>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </TableHeader>
                <TableBody>
                  {cartProducts.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
              
              <Summary>
                <SummaryRow>
                  <div>Subtotal:</div>
                  <div>${subtotal.toFixed(2)}</div>
                </SummaryRow>
                <SummaryRow>
                  <div>IVA (16%):</div>
                  <div>${tax.toFixed(2)}</div>
                </SummaryRow>
                <SummaryRow>
                  <div>Total a Pagar:</div>
                  <div>${total.toFixed(2)}</div>
                </SummaryRow>
              </Summary>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <UI5ThemeProvider>
      <Container>
        <GlobalStyle />
        <PageHeader>
          <PageTitle>Compras</PageTitle>
        </PageHeader>
        <ContentArea>
          <StepIndicator>
            <StepItem 
              active={currentStep === 1} 
              onClick={() => handleStepChange(1)}
            >
              Proveedor
            </StepItem>
            <StepItem 
              active={currentStep === 2} 
              onClick={() => handleStepChange(2)}
            >
              Productos
            </StepItem>
            <StepItem 
              active={currentStep === 3} 
              onClick={() => handleStepChange(3)}
            >
              Entrega
            </StepItem>
            <StepItem 
              active={currentStep === 4} 
              onClick={() => handleStepChange(4)}
            >
              Pago
            </StepItem>
            <StepItem 
              active={currentStep === 5} 
              onClick={() => handleStepChange(5)}
            >
              Resumen
            </StepItem>
          </StepIndicator>
          
          {renderStep()}
          
          <Footer>
            {currentStep > 1 && (
              <Button onClick={() => setCurrentStep(currentStep - 1)}>
                Atrás
              </Button>
            )}
            {currentStep < 5 ? (
              <Button primary onClick={handleContinue}>
                Continuar
              </Button>
            ) : (
              <Button primary onClick={() => alert("¡Pedido confirmado!")}>
                Confirmar
              </Button>
            )}
          </Footer>
        </ContentArea>
      </Container>
    </UI5ThemeProvider>
  );
}