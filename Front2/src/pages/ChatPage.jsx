import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Input,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  Icon,
  Avatar,
  MessageStrip
} from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simular respuesta del sistema
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          text: 'Gracias por tu mensaje. ¿En qué más puedo ayudarte?',
          sender: 'system',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={{ padding: '1rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Title>Chat de Soporte</Title>

      <Card style={{ flex: 1, marginTop: '1rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {messages.length === 0 ? (
            <MessageStrip design="Information">
              Bienvenido al chat de soporte. ¿En qué puedo ayudarte hoy?
            </MessageStrip>
          ) : (
            messages.map((message) => (
              <FlexBox
                key={message.id}
                justifyContent={message.sender === 'user' ? FlexBoxJustifyContent.FlexEnd : FlexBoxJustifyContent.FlexStart}
                style={{ marginBottom: '1rem' }}
              >
                <FlexBox alignItems={FlexBoxAlignItems.Center}>
                  {message.sender === 'system' && (
                    <Avatar size="S" style={{ marginRight: '0.5rem' }}>
                      <Icon name="employee" />
                    </Avatar>
                  )}
                  <Card
                    style={{
                      backgroundColor: message.sender === 'user' ? '#E8F4FF' : '#F5F5F5',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      maxWidth: '70%'
                    }}
                  >
                    <Text>{message.text}</Text>
                    <Text style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>
                      {message.timestamp}
                    </Text>
                  </Card>
                  {message.sender === 'user' && (
                    <Avatar size="S" style={{ marginLeft: '0.5rem' }}>
                      <Icon name="customer" />
                    </Avatar>
                  )}
                </FlexBox>
              </FlexBox>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid #ddd' }}>
          <FlexBox>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              style={{ flex: 1, marginRight: '0.5rem' }}
            />
            <Button icon="send" onClick={handleSendMessage}>
              Enviar
            </Button>
          </FlexBox>
        </div>
      </Card>
    </div>
  );
};

export default ChatPage; 