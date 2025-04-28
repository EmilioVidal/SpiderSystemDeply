import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Input,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  Icon,
  Avatar,
  MessageStrip,
  BusyIndicator,
  AnalyticalTable,
  Bar,
  Label,
  FileUploader
} from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';
import { useUI5Theme } from '../components/UI5ThemeProvider';

// Importar iconos de manera general en lugar de individualmente
import "@ui5/webcomponents-icons/dist/AllIcons.js";

// Función para obtener la inicial del nombre
const getInitial = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase();
};

// Datos de proveedores para el chat
const mockProveedores = [
  { 
    id: 1, 
    nombre: "Distribuidora del Norte", 
    email: "contacto@distribuidoradelnorte.com", 
    status: "online", 
    lastMessage: "El pedido #1234 ha sido enviado",
    keywords: ["norte", "distribuidora", "pedidos", "envíos"],
    avatar: "supplier" 
  },
  { 
    id: 2, 
    nombre: "Calzado Martínez", 
    email: "ventas@calzadomartinez.com", 
    status: "away", 
    lastMessage: "Nuevos modelos disponibles en catálogo",
    keywords: ["calzado", "zapatos", "modelos", "catálogo"],
    avatar: "supplier" 
  },
  { 
    id: 3, 
    nombre: "Importadora González", 
    email: "pedidos@importadoragonzalez.com", 
    status: "online", 
    lastMessage: "Confirmación de recepción de mercancía",
    keywords: ["importadora", "importación", "mercancía", "pedidos"],
    avatar: "shipping-status" 
  },
  { 
    id: 4, 
    nombre: "Suelas y Más", 
    email: "ventas@suelasymas.com", 
    status: "offline", 
    lastMessage: "Actualización de precios para el próximo mes",
    keywords: ["suelas", "materiales", "precios"],
    avatar: "product" 
  },
  { 
    id: 5, 
    nombre: "Distribuidora de Pieles SA", 
    email: "info@distpieles.com", 
    status: "online", 
    lastMessage: "Stock disponible de pieles premium",
    keywords: ["pieles", "cuero", "stock", "premium"],
    avatar: "factory" 
  }
];

// Componente del indicador de estado
const StatusIndicator = ({ status }) => {
  const statusColors = {
    online: "#22c55e", // verde
    away: "#f59e0b",   // ámbar
    offline: "#94a3b8"  // gris
  };
  
  return (
    <div style={{ 
      width: "10px", 
      height: "10px", 
      borderRadius: "50%", 
      backgroundColor: statusColors[status] || statusColors.offline,
      marginLeft: "8px",
      boxShadow: `0 0 0 2px white, 0 0 0 3px ${statusColors[status] || statusColors.offline}`
    }} />
  );
};

// Componente Avatar personalizado con iniciales
const CustomAvatar = ({ user, size = "S", style = {} }) => {
  const { isDarkMode } = useUI5Theme();
  const initial = getInitial(user.nombre);
  
  // Siempre mostrar la inicial, incluso cuando hay un icono definido
  return (
    <Avatar 
      style={style}
      size={size}
      backgroundColor={user.status === "online" ? "Accent6" : user.status === "away" ? "Accent4" : "Accent8"}
    >
      {initial}
    </Avatar>
  );
};

const ChatPage = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileUploaderRef = useRef(null);
  const { isDarkMode } = useUI5Theme();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estilos con soporte para tema claro/oscuro
  const styles = {
    pageContainer: {
      display: 'flex',
      height: 'calc(100vh - 56px)', // Ajustar altura según el header principal
      backgroundColor: isDarkMode ? 'var(--sapBackgroundColor)' : 'var(--sapBackgroundColor)',
      paddingTop: '56px', // Añadir padding superior para compensar el header fijo
      position: 'relative',
      marginTop: '20px' // Espacio adicional desde la parte superior
    },
    sidebar: {
      width: '320px',
      borderRight: `1px solid ${isDarkMode ? 'var(--sapContent_ShadowColor)' : 'var(--sapList_BorderColor)'}`,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    searchContainer: {
      padding: '1rem',
      borderBottom: `1px solid ${isDarkMode ? 'var(--sapContent_ShadowColor)' : 'var(--sapList_BorderColor)'}`,
      backgroundColor: isDarkMode ? 'var(--sapList_HeaderBackground)' : 'var(--sapList_HeaderBackground)'
    },
    userList: {
      flex: 1,
      overflowY: 'auto'
    },
    userItem: (isSelected) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      backgroundColor: isSelected 
        ? isDarkMode ? 'var(--sapList_SelectionBackgroundColor)' : 'var(--sapList_SelectionBackgroundColor)'
        : 'transparent',
      borderBottom: `1px solid ${isDarkMode ? 'var(--sapContent_ShadowColor)' : 'var(--sapList_BorderColor)'}`,
      transition: 'background-color 0.2s ease'
    }),
    userAvatar: {
      marginRight: '12px',
      backgroundColor: isDarkMode ? 'var(--sapButton_Background)' : 'var(--sapButton_Background)'
    },
    userInfo: {
      flex: 1
    },
    userName: {
      fontWeight: 600,
      fontSize: '0.875rem',
      color: isDarkMode ? 'var(--sapTextColor)' : 'var(--sapTextColor)'
    },
    lastMessage: {
      fontSize: '0.75rem',
      color: isDarkMode ? 'var(--sapContent_LabelColor)' : 'var(--sapContent_LabelColor)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '180px'
    },
    chatContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    chatHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: `1px solid ${isDarkMode ? 'var(--sapContent_ShadowColor)' : 'var(--sapList_BorderColor)'}`,
      backgroundColor: isDarkMode ? 'var(--sapList_HeaderBackground)' : 'var(--sapList_HeaderBackground)'
    },
    messagesContainer: {
      flex: 1,
      padding: '1rem',
      overflowY: 'auto',
      backgroundColor: isDarkMode ? 'var(--sapBackgroundColor)' : 'var(--sapBackgroundColor)',
      display: 'flex',
      flexDirection: 'column'
    },
    inputContainer: {
      padding: '1rem',
      borderTop: `1px solid ${isDarkMode ? 'var(--sapContent_ShadowColor)' : 'var(--sapList_BorderColor)'}`,
      backgroundColor: isDarkMode ? 'var(--sapList_FooterBackground)' : 'var(--sapList_FooterBackground)'
    },
    messageBox: (isSent) => ({
      backgroundColor: isSent 
        ? isDarkMode ? 'var(--sapButton_Emphasized_Background)' : 'var(--sapButton_Emphasized_Background)'
        : isDarkMode ? 'var(--sapList_Background)' : 'var(--sapList_Background)',
      color: isSent 
        ? 'white' 
        : isDarkMode ? 'var(--sapTextColor)' : 'var(--sapTextColor)',
      padding: '0.75rem 1rem',
      borderRadius: '0.75rem',
      maxWidth: '70%',
      marginBottom: '1rem',
      alignSelf: isSent ? 'flex-end' : 'flex-start',
      position: 'relative',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    }),
    messageTime: {
      fontSize: '0.7rem',
      color: isDarkMode ? 'var(--sapContent_LabelColor)' : 'var(--sapContent_LabelColor)',
      textAlign: 'right',
      marginTop: '0.25rem',
      opacity: 0.8
    },
    noChatContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: isDarkMode ? 'var(--sapBackgroundColor)' : 'var(--sapBackgroundColor)'
    },
    chatHeaderTitle: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    messageWithAvatar: (isSent) => ({
      display: 'flex',
      flexDirection: isSent ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      marginBottom: '1rem',
      width: '100%'
    }),
    messageAvatar: {
      marginLeft: '8px',
      marginRight: '8px'
    },
    myAvatar: {
      backgroundColor: isDarkMode ? 'var(--sapButton_Accept_Background)' : 'var(--sapButton_Accept_Background)'
    },
    photoButton: {
      marginRight: '0.5rem',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '36px',
      height: '36px',
    },
    uploadIcon: {
      color: isDarkMode ? 'var(--sapButton_TextColor)' : 'var(--sapButton_TextColor)',
      fontSize: '1.2rem'
    },
    imageMessage: {
      maxWidth: '250px',
      maxHeight: '250px',
      borderRadius: '8px',
      marginBottom: '0.5rem'
    },
    fileUploader: {
      display: 'none'
    }
  };

  // Búsqueda optimizada con useMemo
  const filteredProveedores = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    if (!searchTermLower) return mockProveedores;

    return mockProveedores.filter(proveedor => {
      const searchFields = [
        proveedor.nombre.toLowerCase(),
        proveedor.email.toLowerCase(),
        proveedor.lastMessage.toLowerCase(),
        ...(proveedor.keywords || []).map(k => k.toLowerCase())
      ];

      // Dividir el término de búsqueda en palabras para búsqueda parcial
      const searchWords = searchTermLower.split(/\s+/);

      // Verificar si todas las palabras de búsqueda coinciden con algún campo
      return searchWords.every(word =>
        searchFields.some(field => field.includes(word))
      );
    });
  }, [searchTerm]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    // Solo proceder si hay un mensaje y un usuario seleccionado
    if (!newMessage || !selectedUser) return;
    
    // Crear el mensaje
    const message = {
      id: Date.now(),
      text: newMessage,
      timestamp: new Date(),
      isSent: true
    };
    
    // Añadir mensaje a la lista y limpiar el input
    setMessages(prev => [...prev, message]);
    setNewMessage("");
    
    // Simular respuesta
    setIsLoading(true);
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: "Mensaje recibido, te responderemos pronto.",
        timestamp: new Date(),
        isSent: false
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // No necesita hacer nada más, ya que el filtrado se realiza automáticamente con useMemo
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Limpiar mensajes previos al cambiar de usuario
    setMessages([]);
  };

  const handleUploadClick = () => {
    // Activar el input de archivo oculto
    fileUploaderRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file || !selectedUser) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen');
      return;
    }

    // Crear un objeto URL para la imagen
    const imageUrl = URL.createObjectURL(file);

    // Crear mensaje con imagen
    const imageMessage = {
      id: Date.now(),
      isImage: true,
      imageUrl: imageUrl,
      fileName: file.name,
      timestamp: new Date(),
      isSent: true
    };

    setMessages(prev => [...prev, imageMessage]);

    // Limpiar el input file para permitir cargar la misma imagen nuevamente
    event.target.value = '';

    // Simular respuesta
    setIsLoading(true);
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: "Mensaje recibido, te responderemos pronto.",
        timestamp: new Date(),
        isSent: false
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  const currentUser = { nombre: "Mi Usuario", avatar: "employee" };

  // Componente para renderizar un mensaje (puede ser texto o imagen)
  const MessageContent = ({ message }) => {
    if (message.isImage) {
      return (
        <>
          <img 
            src={message.imageUrl} 
            alt={message.fileName} 
            style={styles.imageMessage} 
          />
          <Text style={{ color: message.isSent ? 'white' : 'inherit' }}>
            {message.fileName}
          </Text>
        </>
      );
    }
    
    return (
      <Text style={{ color: message.isSent ? 'white' : 'inherit' }}>
        {message.text}
      </Text>
    );
  };

  return (
    <div style={styles.pageContainer}>
      {/* Sidebar - Lista de contactos */}
      <div style={styles.sidebar}>
        <div style={styles.searchContainer}>
          <Input
            icon="search"
            placeholder="Buscar proveedor..."
            value={searchTerm}
            onChange={handleSearch}
            onInput={handleSearch} // Añadir onInput para que responda en tiempo real
            showClearIcon
            style={{ width: '100%' }}
          />
        </div>
        <div style={styles.userList}>
          {filteredProveedores.length > 0 ? (
            filteredProveedores.map((proveedor) => (
              <div 
                key={proveedor.id} 
                style={styles.userItem(selectedUser?.id === proveedor.id)}
                onClick={() => handleSelectUser(proveedor)}
              >
                <CustomAvatar 
                  user={proveedor} 
                  style={styles.userAvatar}
                />
                <div style={styles.userInfo}>
                  <div style={styles.userName}>{proveedor.nombre}</div>
                  <div style={styles.lastMessage}>{proveedor.lastMessage}</div>
                </div>
                <StatusIndicator status={proveedor.status} />
              </div>
            ))
          ) : (
            <MessageStrip
              design="Information"
              style={{ margin: '1rem' }}
            >
              No se encontraron proveedores que coincidan con la búsqueda
            </MessageStrip>
          )}
        </div>
      </div>

      {/* Contenedor principal del chat */}
      {selectedUser ? (
        <div style={styles.chatContainer}>
          {/* Cabecera del chat */}
          <div style={styles.chatHeader}>
            <CustomAvatar 
              user={selectedUser} 
              style={styles.userAvatar}
            />
            <div style={styles.chatHeaderTitle}>
              <Title level="H5" style={{ margin: 0 }}>{selectedUser.nombre}</Title>
              <Text style={styles.lastMessage}>{selectedUser.email}</Text>
            </div>
            <StatusIndicator status={selectedUser.status} />
          </div>

          {/* Contenedor de mensajes */}
          <div style={styles.messagesContainer}>
            {messages.map((message) => (
              <div 
                key={message.id} 
                style={styles.messageWithAvatar(message.isSent)}
              >
                {/* Avatar solo se muestra en los mensajes recibidos */}
                {!message.isSent && (
                  <CustomAvatar 
                    user={selectedUser}
                    size="XS" 
                    style={styles.messageAvatar}
                  />
                )}
                
                <div style={styles.messageBox(message.isSent)}>
                  <MessageContent message={message} />
                  <div style={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
                
                {/* Avatar solo se muestra en los mensajes enviados */}
                {message.isSent && (
                  <Avatar 
                    size="XS" 
                    style={{...styles.messageAvatar, ...styles.myAvatar}}
                  >
                    {getInitial(currentUser.nombre)}
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                <BusyIndicator size="Small" active />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Contenedor de entrada de mensaje - MODIFICADO */}
          <div style={styles.inputContainer}>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
              {/* Botón de imagen completamente rediseñado */}
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '36px',
                  height: '36px',
                  marginRight: '8px',
                  backgroundColor: 'var(--sapButton_Background)',
                  border: '1px solid var(--sapButton_BorderColor)',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={handleUploadClick}
              >
                <span style={{ fontSize: '18px' }}>📷</span>
              </div>
              
              {/* Archivo oculto */}
              <input 
                type="file" 
                ref={fileUploaderRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              <Input
                style={{ flex: 1, marginRight: '0.5rem' }}
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              
              <Button 
                icon="send" 
                design="Emphasized"
                onClick={handleSendMessage}
                disabled={!newMessage}
              >
                Enviar
              </Button>
            </FlexBox>
          </div>
        </div>
      ) : (
        <div style={styles.noChatContainer}>
          <Icon 
            name="message-success" 
            style={{ 
              fontSize: '3rem', 
              color: 'var(--sapContent_IconColor)',
              marginBottom: '1rem'
            }}
          />
          <Title level="H2">Selecciona un proveedor para chatear</Title>
          <MessageStrip 
            design="Information"
            style={{ marginTop: '1rem' }}
          >
            Aquí podrás comunicarte directamente con tus proveedores
          </MessageStrip>
        </div>
      )}
    </div>
  );
};

export default ChatPage; 