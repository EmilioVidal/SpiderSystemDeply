import { useState, useContext, useEffect, useMemo } from "react";
import { ThemeProvider } from "@ui5/webcomponents-react";
import { 
  Input, 
  Button,
  BusyIndicator,
  MessageStrip,
  Title,
  Icon as UI5Icon
} from "@ui5/webcomponents-react";
import { 
  ChatPageContainer,
  SidebarContainer,
  SearchContainer,
  UserList,
  UserItem,
  UserAvatar,
  UserInfo,
  UserName,
  LastMessage,
  ChatContainer,
  ChatHeader,
  MessagesContainer,
  Message,
  MessageTime,
  InputContainer,
  NoChatContainer,
  StatusIndicator
} from "../styles/Chat/ChatStyles";
import { ThemeContext } from "../App";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

const mockProveedores = [
  { 
    id: 1, 
    nombre: "Distribuidora del Norte", 
    email: "contacto@distribuidoradelnorte.com", 
    status: "online", 
    lastMessage: "El pedido #1234 ha sido enviado",
    keywords: ["norte", "distribuidora", "pedidos", "envíos"] 
  },
  { 
    id: 2, 
    nombre: "Calzado Martínez", 
    email: "ventas@calzadomartinez.com", 
    status: "away", 
    lastMessage: "Nuevos modelos disponibles en catálogo",
    keywords: ["calzado", "zapatos", "modelos", "catálogo"] 
  },
  { 
    id: 3, 
    nombre: "Importadora González", 
    email: "pedidos@importadoragonzalez.com", 
    status: "online", 
    lastMessage: "Confirmación de recepción de mercancía",
    keywords: ["importadora", "importación", "mercancía", "pedidos"] 
  },
  { 
    id: 4, 
    nombre: "Suelas y Más", 
    email: "ventas@suelasymas.com", 
    status: "offline", 
    lastMessage: "Actualización de precios para el próximo mes",
    keywords: ["suelas", "materiales", "precios"] 
  },
  { 
    id: 5, 
    nombre: "Distribuidora de Pieles SA", 
    email: "info@distpieles.com", 
    status: "online", 
    lastMessage: "Stock disponible de pieles premium",
    keywords: ["pieles", "cuero", "stock", "premium"] 
  }
];

const ChatPage = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [themeKey, setThemeKey] = useState(0); // Clave para forzar re-render

  // Aplicar tema de UI5 y forzar actualización
  useEffect(() => {
    const ui5Theme = theme === 'dark' ? 'sap_horizon_dark' : 'sap_horizon';
    setTheme(ui5Theme);
    
    // Forzar re-render de componentes cuando cambia el tema
    setThemeKey(prev => prev + 1);
    
    // Aplicar clase al body para asegurar que el tema se aplique correctamente
    document.body.className = `theme-${theme}`;
    
    return () => {
      // Limpiar clase al desmontar
      document.body.className = '';
    };
  }, [theme]);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      timestamp: new Date(),
      isSent: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simular respuesta del proveedor
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

  // Scroll al último mensaje cuando se envía uno nuevo
  useEffect(() => {
    if (messages.length > 0) {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <ThemeProvider key={themeKey}>
      <ChatPageContainer>
        <SidebarContainer>
          <SearchContainer>
            <Input
              icon={<UI5Icon name="search" />}
              placeholder="Buscar por nombre, email o tipo de producto..."
              value={searchTerm}
              onChange={handleSearch}
              showClearIcon
              onInput={handleSearch}
            />
          </SearchContainer>
          <UserList>
            {filteredProveedores.length > 0 ? (
              filteredProveedores.map((proveedor) => (
                <UserItem
                  key={proveedor.id}
                  isSelected={selectedUser?.id === proveedor.id}
                  onClick={() => setSelectedUser(proveedor)}
                >
                  <UserAvatar>
                    <UI5Icon name="supplier" />
                  </UserAvatar>
                  <UserInfo>
                    <UserName>{proveedor.nombre}</UserName>
                    <LastMessage>{proveedor.lastMessage}</LastMessage>
                  </UserInfo>
                  <StatusIndicator status={proveedor.status} />
                </UserItem>
              ))
            ) : (
              <MessageStrip
                style={{ margin: '1rem' }}
              >
                No se encontraron proveedores que coincidan con la búsqueda
              </MessageStrip>
            )}
          </UserList>
        </SidebarContainer>

        {selectedUser ? (
          <ChatContainer>
            <ChatHeader>
              <UserAvatar>
                <UI5Icon name="supplier" />
              </UserAvatar>
              <UserInfo>
                <Title level="H4">{selectedUser.nombre}</Title>
                <LastMessage>{selectedUser.email}</LastMessage>
              </UserInfo>
              <StatusIndicator status={selectedUser.status} />
            </ChatHeader>

            <MessagesContainer className="messages-container">
              {messages.map((message) => (
                <Message key={message.id} isSent={message.isSent}>
                  {message.text}
                  <MessageTime>
                    {message.timestamp.toLocaleTimeString()}
                  </MessageTime>
                </Message>
              ))}
              {isLoading && (
                <BusyIndicator 
                  active 
                  size="Small"
                  style={{ alignSelf: 'center' }}
                />
              )}
            </MessagesContainer>

            <InputContainer>
              <Input
                style={{ flex: 1 }}
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                icon="send"
                design="Emphasized"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                Enviar
              </Button>
            </InputContainer>
          </ChatContainer>
        ) : (
          <NoChatContainer>
            <UI5Icon name="message-success" />
            <Title level="H2">Selecciona un proveedor para chatear</Title>
            <MessageStrip>
              Aquí podrás comunicarte directamente con tus proveedores
            </MessageStrip>
          </NoChatContainer>
        )}
      </ChatPageContainer>
    </ThemeProvider>
  );
};

export default ChatPage;
