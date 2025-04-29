import React, { useState } from 'react';
import {
  Title,
  Text,
  Button,
  Icon,
  Label,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  FlexBoxDirection,
  RadioButton,
  Card,
  Input,
  Select,
  Option,
  List,
  StandardListItem,
  Avatar,
  Table,
  TableColumn,
  TableRow,
  Bar,
  BarDesign,
  AnalyticalTable
} from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/AllIcons.js";

// Importar imágenes
import ImagenZapatoDeportivo from '../Fotos/ImagenZapatoDeportivo.jpg';
import ImagenZapatoDeVestir from '../Fotos/ImagenZapatoDeVestir.jpg';
import ImagenBotas from '../Fotos/ImagenBotas.png';
import ImagenSandalias from '../Fotos/ImagenSandalias.jpg';

const Compras = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deliveryPoint, setDeliveryPoint] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

  const providers = [
    { id: 1, name: "Calzado Deportivo Premium" },
    { id: 2, name: "Distribuidora de Zapatos Elegance" },
    { id: 3, name: "Importadora Footwear Internacional" },
    { id: 4, name: "Zapatos y Complementos Moda Total" }
  ];

  const products = [
    { 
      id: 1, 
      name: "Zapatos Deportivos", 
      price: 120, 
      image: ImagenZapatoDeportivo,
      description: "Zapatillas deportivas de alta calidad"
    },
    { 
      id: 2, 
      name: "Zapatos de Vestir", 
      price: 200, 
      image: ImagenZapatoDeVestir,
      description: "Zapatos elegantes para ocasiones formales"
    },
    { 
      id: 3, 
      name: "Botas", 
      price: 250, 
      image: ImagenBotas,
      description: "Botas de cuero genuino"
    },
    { 
      id: 4, 
      name: "Sandalias de Playa", 
      price: 80, 
      image: ImagenSandalias,
      description: "Sandalias cómodas para la playa"
    }
  ];

  const deliveryPoints = [
    {
      id: 1,
      name: "Super Shoes - Tienda Principal",
      address: "Plaza Comercial Reforma, Local 42B, CDMX"
    }
  ];

  const paymentMethods = [
    { id: 1, name: "Crédito Corporativo", description: "30 días" },
    { id: 2, name: "Transferencia Bancaria", description: "Pago inmediato" },
    { id: 3, name: "Factura a 45 días", description: "Requiere aprobación" },
    { id: 4, name: "Pago Anticipado", description: "Pago al realizar pedido" },
    { id: 5, name: "Orden de Compra", description: "Departamento de adquisiciones" }
  ];

  const handleProductQuantityChange = (productId, quantity) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.productId === productId);
      if (existing) {
        if (quantity === 0) {
          return prev.filter(p => p.productId !== productId);
        }
        return prev.map(p => p.productId === productId ? { ...p, quantity } : p);
      }
      return [...prev, { productId, quantity }];
    });
  };

  const getProductById = (productId) => {
    return products.find(p => p.id === productId);
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product.price * item.quantity);
    }, 0);
  };

  const calculateTax = () => {
    return calculateTotal() * 0.16;
  };

  const calculateFinalTotal = () => {
    return calculateTotal() + calculateTax();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    const newOrder = {
      id: `OC-${new Date().getFullYear()}-${String(orderHistory.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString(),
      provider: providers.find(p => p.id === selectedProvider)?.name,
      products: selectedProducts.map(sp => ({
        ...getProductById(sp.productId),
        quantity: sp.quantity
      })),
      total: calculateFinalTotal(),
      deliveryPoint: deliveryPoints.find(dp => dp.id === deliveryPoint)?.name,
      paymentMethod: paymentMethods.find(pm => pm.id === paymentMethod)?.name,
      status: 'Pendiente'
    };

    setOrderHistory(prev => [newOrder, ...prev]);
    
    // Reset all states
    setCurrentStep(0);
    setSelectedProvider(null);
    setSelectedProducts([]);
    setDeliveryPoint(null);
    setPaymentMethod(null);
    setShowHistory(false);

    // Mostrar mensaje de éxito
    alert('¡Pedido realizado con éxito! Puedes iniciar un nuevo pedido.');
  };

  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId);
  };

  const steps = [
    {
      title: "Proveedor",
      content: (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          padding: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <Title level="H1" style={{
              fontSize: '1.5rem',
              color: 'var(--sapTextColor)',
              fontWeight: '600'
            }}>
              Proveedores
            </Title>
            <Text style={{
              fontSize: '1rem',
              color: 'var(--sapContent_LabelColor)'
            }}>
              Selecciona un proveedor
            </Text>
          </div>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: '0.5rem'
          }}>
            {providers.map((provider) => (
              <div
                key={provider.id}
                onClick={() => handleProviderSelect(provider.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  backgroundColor: selectedProvider === provider.id ? 'var(--sapSelectedColor)' : 'transparent',
                  border: `1px solid ${selectedProvider === provider.id ? 'var(--sapSelectedColor)' : 'var(--sapContent_ForegroundBorderColor)'}`,
                  color: selectedProvider === provider.id ? 'white' : 'var(--sapTextColor)',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <RadioButton
                  checked={selectedProvider === provider.id}
                  onChange={() => handleProviderSelect(provider.id)}
                  style={{ margin: 0 }}
                />
                <Text style={{
                  fontSize: '0.875rem',
                  fontWeight: '400'
                }}>
                  {provider.name}
                </Text>
              </div>
            ))}
          </div>
          <FlexBox
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
            style={{
              marginTop: '1rem',
              paddingTop: '0.5rem'
            }}
          >
            <Button
              onClick={handleBack}
              disabled={currentStep === 0}
              style={{
                minWidth: '100px'
              }}
            >
              Atrás
            </Button>
            <Button
              design="Emphasized"
              onClick={handleNext}
              disabled={!selectedProvider}
              style={{
                minWidth: '100px'
              }}
            >
              Continuar
            </Button>
          </FlexBox>
        </div>
      )
    },
    {
      title: "Productos",
      content: (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <Title level="H1" style={{
              fontSize: '1.5rem',
              color: 'var(--sapTextColor)',
              fontWeight: '600'
            }}>
              Productos
            </Title>
            <Text style={{
              fontSize: '1rem',
              color: 'var(--sapContent_LabelColor)'
            }}>
              Selecciona los productos
            </Text>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            padding: '1rem'
          }}>
            {products.map((product) => {
              const selectedProduct = selectedProducts.find(p => p.productId === product.id);
              const quantity = selectedProduct ? selectedProduct.quantity : 0;

              return (
                <Card
                  key={product.id}
                  style={{
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    height: '400px',
                    boxShadow: 'var(--sapContent_Shadow0)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: 'var(--sapContent_Shadow2)'
                    }
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    backgroundColor: 'var(--sapContent_ImagePlaceholderBackground)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '8px'
                      }}
                    />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    flex: 1
                  }}>
                    <Title level="H2" style={{ 
                      fontSize: '1.25rem',
                      minHeight: '1.5em'
                    }}>
                      {product.name}
                    </Title>
                    <Text style={{ 
                      color: 'var(--sapContent_LabelColor)',
                      minHeight: '3em'
                    }}>
                      {product.description}
                    </Text>
                    <Text style={{ 
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: 'var(--sapTextColor)',
                      marginTop: 'auto'
                    }}>
                      ${product.price}
                    </Text>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: quantity > 0 ? 'space-between' : 'center',
                    gap: '0.5rem',
                    marginTop: 'auto',
                    height: '40px'
                  }}>
                    {quantity > 0 ? (
                      <>
                        <Button
                          icon="less"
                          design="Transparent"
                          onClick={() => handleProductQuantityChange(product.id, quantity - 1)}
                          style={{
                            minWidth: '32px',
                            height: '32px',
                            padding: '0',
                            color: 'var(--sapButton_TextColor)',
                            border: '1px solid var(--sapButton_BorderColor)',
                            backgroundColor: 'transparent'
                          }}
                        />
                        <Text style={{ 
                          width: '40px', 
                          textAlign: 'center',
                          fontSize: '1rem',
                          fontWeight: '500'
                        }}>
                          {quantity}
                        </Text>
                        <Button
                          icon="add"
                          design="Transparent"
                          onClick={() => handleProductQuantityChange(product.id, quantity + 1)}
                          style={{
                            minWidth: '32px',
                            height: '32px',
                            padding: '0',
                            color: 'var(--sapButton_TextColor)',
                            border: '1px solid var(--sapButton_BorderColor)',
                            backgroundColor: 'transparent'
                          }}
                        />
                        <Button
                          icon="delete"
                          design="Negative"
                          onClick={() => handleProductQuantityChange(product.id, 0)}
                          style={{
                            minWidth: '32px',
                            height: '32px',
                            padding: '0'
                          }}
                        />
                      </>
                    ) : (
                      <Button
                        design="Emphasized"
                        onClick={() => handleProductQuantityChange(product.id, 1)}
                        style={{ 
                          width: '100%',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          width: '100%'
                        }}>
                          <Icon name="add" />
                          <span>Agregar</span>
                        </div>
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <FlexBox
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
            style={{
              marginTop: '2rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--sapContent_ForegroundBorderColor)'
            }}
          >
            <Button
              onClick={handleBack}
              style={{
                minWidth: '120px'
              }}
            >
              Atrás
            </Button>
            <Button
              design="Emphasized"
              onClick={handleNext}
              disabled={selectedProducts.length === 0}
              style={{
                minWidth: '120px'
              }}
            >
              Continuar
            </Button>
          </FlexBox>
        </div>
      )
    },
    {
      title: "Entrega",
      content: (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem',
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <Title level="H1" style={{
              fontSize: '1.75rem',
              color: 'var(--sapTextColor)',
              margin: 0
            }}>
              Entrega
            </Title>
            <Text style={{
              fontSize: '1rem',
              color: 'var(--sapContent_LabelColor)',
              margin: 0
            }}>
              Punto de entrega asignado
            </Text>
          </div>

          <div 
            onClick={() => setDeliveryPoint(deliveryPoints[0].id)}
            style={{
              border: '1px solid var(--sapContent_ForegroundBorderColor)',
              borderRadius: '8px',
              padding: '1.25rem',
              cursor: 'pointer',
              backgroundColor: deliveryPoint === deliveryPoints[0].id ? 'var(--sapList_SelectionBackgroundColor)' : 'white',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '1rem',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: 'var(--sapSelectedColor)',
                backgroundColor: deliveryPoint === deliveryPoints[0].id ? 
                  'var(--sapList_SelectionBackgroundColor)' : 
                  'var(--sapList_Hover_Background)'
              }
            }}
          >
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}>
              <Icon 
                name="map" 
                style={{
                  color: 'var(--sapContent_IconColor)',
                  fontSize: '1.25rem',
                  marginTop: '0.125rem'
                }}
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <Text style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--sapTextColor)',
                  margin: 0
                }}>
                  Super Shoes - Tienda Principal
                </Text>
                <Text style={{
                  color: 'var(--sapContent_LabelColor)',
                  fontSize: '0.875rem',
                  margin: 0
                }}>
                  Plaza Comercial Reforma, Local 42B, CDMX
                </Text>
              </div>
            </div>
            {deliveryPoint === deliveryPoints[0].id && (
              <Icon 
                name="accept" 
                style={{
                  color: 'var(--sapSuccessColor)',
                  fontSize: '1.25rem'
                }}
              />
            )}
          </div>

          <FlexBox
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
            style={{
              marginTop: 'auto',
              paddingTop: '2rem',
              borderTop: '1px solid var(--sapContent_ForegroundBorderColor)'
            }}
          >
            <Button
              design="Default"
              onClick={handleBack}
              style={{
                minWidth: '120px'
              }}
            >
              Atrás
            </Button>
            <Button
              design="Emphasized"
              onClick={handleNext}
              disabled={!deliveryPoint}
              style={{
                minWidth: '120px'
              }}
            >
              Continuar
            </Button>
          </FlexBox>
        </div>
      )
    },
    {
      title: "Pago",
      content: (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem',
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <Title level="H1" style={{
              fontSize: '1.75rem',
              color: 'var(--sapTextColor)',
              margin: 0
            }}>
              Pago
            </Title>
            <Text style={{
              fontSize: '1rem',
              color: 'var(--sapContent_LabelColor)',
              margin: 0
            }}>
              Selecciona el método de pago
            </Text>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                style={{
                  border: '1px solid var(--sapContent_ForegroundBorderColor)',
                  borderRadius: '8px',
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: paymentMethod === method.id ? 'var(--sapList_SelectionBackgroundColor)' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'var(--sapSelectedColor)',
                    backgroundColor: paymentMethod === method.id ? 'var(--sapList_SelectionBackgroundColor)' : 'var(--sapList_Hover_Background)'
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flex: 1
                }}>
                  <Icon
                    name={
                      method.id === 1 ? "credit-card" :
                      method.id === 2 ? "money-bills" :
                      method.id === 3 ? "document" :
                      method.id === 4 ? "payment-approval" :
                      "cart"
                    }
                    style={{
                      fontSize: '1.25rem',
                      color: 'var(--sapContent_IconColor)'
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    <Text style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: 'var(--sapTextColor)',
                      margin: 0
                    }}>
                      {method.name}
                    </Text>
                    <Text style={{
                      color: 'var(--sapContent_LabelColor)',
                      fontSize: '0.875rem',
                      margin: 0
                    }}>
                      {method.description}
                    </Text>
                  </div>
                </div>
                {paymentMethod === method.id && (
                  <Icon
                    name="accept"
                    style={{
                      color: 'var(--sapSuccessColor)',
                      fontSize: '1.25rem'
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <FlexBox
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
            style={{
              marginTop: 'auto',
              paddingTop: '2rem',
              borderTop: '1px solid var(--sapContent_ForegroundBorderColor)'
            }}
          >
            <Button
              design="Default"
              onClick={handleBack}
              style={{
                minWidth: '120px'
              }}
            >
              Atrás
            </Button>
            <Button
              design="Emphasized"
              onClick={handleNext}
              disabled={!paymentMethod}
              style={{
                minWidth: '120px'
              }}
            >
              Continuar
            </Button>
          </FlexBox>
        </div>
      )
    },
    {
      title: "Resumen",
      content: (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem',
          padding: '2rem'
        }}>
          <Title level="H1">Resumen del Pedido</Title>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.5rem' 
          }}>
            <div>
              <Title level="H2">Información del Pedido</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Text>Proveedor: {providers.find(p => p.id === selectedProvider)?.name || 'Calzado Deportivo Premium'}</Text>
                <Text>Número de Orden: OC-2025-015</Text>
                <Text>Fecha de Pedido: {new Date().toLocaleDateString()}</Text>
                <Text>Fecha Estimada de Entrega: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</Text>
                <Text>Método de Envío: Envío estándar (3-5 días hábiles)</Text>
                <Text>Punto de Entrega: Super Shoes - Tienda Principal</Text>
              </div>
            </div>

            <div>
              <Title level="H2">Productos Solicitados</Title>
              <div style={{ 
                border: '1px solid var(--sapContent_ForegroundBorderColor)',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: 'white'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {selectedProducts.map(selectedProduct => {
                    const product = products.find(p => p.id === selectedProduct.productId);
                    return product && selectedProduct.quantity > 0 && (
                      <div key={product.id} style={{
                        padding: '0.5rem 0',
                        borderBottom: '1px solid var(--sapContent_ForegroundBorderColor)'
                      }}>
                        <Text style={{ 
                          display: 'block',
                          fontSize: '1rem',
                          fontWeight: '600',
                          marginBottom: '0.25rem'
                        }}>
                          {product.name}
                        </Text>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <Text style={{ 
                            color: 'var(--sapContent_LabelColor)',
                            fontSize: '0.875rem'
                          }}>
                            Cantidad: {selectedProduct.quantity} {selectedProduct.quantity > 1 ? 'unidades' : 'unidad'}
                          </Text>
                          <Text style={{ 
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}>
                            ${(product.price * selectedProduct.quantity).toFixed(2)}
                          </Text>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ 
                  borderTop: '2px solid var(--sapContent_ForegroundBorderColor)',
                  marginTop: '1rem',
                  paddingTop: '1rem'
                }}>
                  <Text style={{ 
                    display: 'block', 
                    textAlign: 'right',
                    marginBottom: '0.25rem'
                  }}>
                    Subtotal: ${calculateTotal().toFixed(2)}
                  </Text>
                  <Text style={{ 
                    display: 'block', 
                    textAlign: 'right',
                    marginBottom: '0.25rem'
                  }}>
                    IVA (16%): ${calculateTax().toFixed(2)}
                  </Text>
                  <Text style={{ 
                    display: 'block', 
                    textAlign: 'right',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    marginTop: '0.5rem'
                  }}>
                    Total a Pagar: ${calculateFinalTotal().toFixed(2)}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <FlexBox
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
            style={{
              marginTop: 'auto',
              paddingTop: '2rem',
              borderTop: '1px solid var(--sapContent_ForegroundBorderColor)'
            }}
          >
            <Button
              design="Default"
              onClick={handleBack}
              style={{
                minWidth: '120px'
              }}
            >
              Atrás
            </Button>
            <Button
              design="Emphasized"
              onClick={handleConfirm}
              style={{
                minWidth: '120px'
              }}
            >
              Confirmar Pedido
            </Button>
          </FlexBox>
        </div>
      )
    }
  ];

  const OrderHistory = () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'var(--sapList_Background)',
      borderRadius: '0.5rem',
      boxShadow: 'var(--sapContent_Shadow0)',
      margin: '0 2rem 2rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <Title level="H1">Historial de Pedidos</Title>
        <Button 
          icon="decline"
          design="Transparent"
          onClick={() => setShowHistory(false)}
        >
          Cerrar
        </Button>
      </div>

      {orderHistory.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--sapContent_LabelColor)'
        }}>
          <Icon 
            name="document"
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              color: 'var(--sapContent_NonInteractiveIconColor)'
            }}
          />
          <Text>No hay pedidos en el historial</Text>
        </div>
      ) : (
        <AnalyticalTable
          data={orderHistory}
          columns={[
            {
              Header: "Orden #",
              accessor: "id",
              width: 120
            },
            {
              Header: "Fecha",
              accessor: "date",
              Cell: ({ value }) => new Date(value).toLocaleDateString()
            },
            {
              Header: "Proveedor",
              accessor: "provider"
            },
            {
              Header: "Productos",
              accessor: "products",
              Cell: ({ value }) => value.map(p => `${p.name} (${p.quantity})`).join(', ')
            },
            {
              Header: "Total",
              accessor: "total",
              Cell: ({ value }) => `$${value.toFixed(2)}`,
              width: 120
            },
            {
              Header: "Estado",
              accessor: "status",
              width: 120
            }
          ]}
          alternateRowColor
          visibleRows={5}
        />
      )}
    </div>
  );

  return (
    <div style={{ 
      width: "100%",
      minHeight: "100%",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      paddingTop: "2rem"
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "var(--sapBackgroundColor)",
        padding: "1.25rem",
        borderRadius: "0.5rem",
        boxShadow: "var(--sapContent_Shadow0)",
        marginTop: "0.5rem",
        minHeight: "72px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem"
        }}>
          <Icon 
            name="cart" 
            style={{
              fontSize: "1.75rem",
              color: "var(--sapContent_IconColor)"
            }}
          />
          <Title level="H1" style={{
            margin: 0,
            fontSize: "1.75rem",
            color: "var(--sapTextColor)",
            padding: "0.25rem 0"
          }}>
            Compras
          </Title>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem"
        }}>
          <Button
            icon="history"
            design="Transparent"
            onClick={() => setShowHistory(true)}
          >
            Historial de Pedidos
          </Button>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <Icon 
              name="map" 
              style={{
                fontSize: "1rem",
                color: "var(--sapContent_IconColor)"
              }}
            />
            <Text style={{
              fontSize: "0.875rem",
              color: "var(--sapContent_LabelColor)"
            }}>
              Plaza Comercial Reforma, Local 42B, CDMX
            </Text>
          </div>
        </div>
      </div>

      {showHistory ? (
        <OrderHistory />
      ) : (
        <>
          {/* Progress Steps */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "1rem 2rem",
            backgroundColor: "white",
            margin: "0 2rem",
            borderRadius: "0.5rem",
            boxShadow: "var(--sapContent_Shadow0)"
          }}>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: 
                      index < currentStep ? "var(--sapSuccessColor)" :
                      index === currentStep ? "var(--sapSelectedColor)" :
                      "var(--sapContent_NonInteractiveIconColor)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white"
                  }}>
                    {index < currentStep ? (
                      <Icon name="accept" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <Text 
                    style={{
                      color: index <= currentStep ? 'var(--sapTextColor)' : 'var(--sapContent_LabelColor)',
                      fontWeight: index === currentStep ? '600' : '400'
                    }}
                  >
                    {step.title}
                  </Text>
                </div>
                {index < steps.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: "2px",
                    backgroundColor: index < currentStep ? "var(--sapSuccessColor)" : "var(--sapContent_NonInteractiveIconColor)",
                    maxWidth: "50px"
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            backgroundColor: 'var(--sapList_Background)',
            margin: '0 2rem 2rem',
            borderRadius: '0.5rem',
            boxShadow: 'var(--sapContent_Shadow0)',
            overflow: 'hidden'
          }}>
            {steps[currentStep].content}
          </div>
        </>
      )}
    </div>
  );
};

export default Compras; 