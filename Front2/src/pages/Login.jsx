import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUI5Theme } from "../components/UI5ThemeProvider";
import {
  Card,
  CardHeader,
  Form,
  FormItem,
  Input,
  Button,
  FlexBox,
  FlexBoxDirection,
  FlexBoxAlignItems,
  FlexBoxJustifyContent,
  Title,
  Text,
  Icon,
  Link,
  FormGroup,
  MessageStrip,
  BarDesign,
  IllustratedMessage,
  IllustrationMessageType,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/message-information.js";
import "@ui5/webcomponents-icons/dist/email.js";
import "@ui5/webcomponents-icons/dist/key.js";
import "@ui5/webcomponents-icons/dist/show.js";
import "@ui5/webcomponents-icons/dist/hide.js";
import "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js";
import { AuthImagePattern } from "../components/AuthImagePattern";

export default function Login() {
  const navigate = useNavigate();
  const { isDarkMode } = useUI5Theme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // limpia error anterior
  
    if (!formData.email || !formData.password) {
      setError("Por favor complete todos los campos");
      return;
    }
  
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.message || "Error en el servidor");
        return;
      }
  
      // Guarda el token (puedes usar localStorage o context)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("user"));
      console.log(JSON.parse(localStorage.getItem("user")).name);

      // Redirecciona al dashboard
      navigate("/home");
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      setError("No se pudo conectar al servidor");
    }
  };  

  const backgroundStyle = {
    backgroundImage: isDarkMode 
      ? "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)"
      : "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.98) 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden"
  };

  return (
    <FlexBox 
      style={{ 
        height: "100vh", 
        width: "100%",
        overflow: "hidden" 
      }}
    >
      {/* Patrón decorativo para el fondo */}
      <AuthImagePattern />
      
      {/* Panel izquierdo - Imagen/Ilustración */}
      <FlexBox 
        style={{ 
          flex: "1 1 50%", 
          display: { xs: "none", md: "flex" },
          position: "relative"
        }}
        direction={FlexBoxDirection.Column}
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
      >
        <div style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          backgroundColor: isDarkMode ? "var(--sapPrimary7)" : "var(--sapPrimary3)",
          opacity: 0.8,
          zIndex: 0
        }} />
        
        <FlexBox
          direction={FlexBoxDirection.Column}
          justifyContent={FlexBoxJustifyContent.Center}
          alignItems={FlexBoxAlignItems.Center}
          style={{ 
            zIndex: 1,
            padding: "2rem",
            textAlign: "center",
            color: isDarkMode ? "var(--sapContent_ContrastTextColor)" : "var(--sapContent_ContrastTextColor)"
          }}
        >
          <Title level="H1" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Spider System
          </Title>
          <Text style={{ fontSize: "1.25rem", maxWidth: "80%" }}>
            Sistema inteligente de gestión empresarial integrado con SAP
          </Text>
          
          <IllustratedMessage
            name={IllustrationMessageType.Connection}
            style={{ 
              marginTop: "2rem",
              "--_ui5_illustrated_message_illustration_size": "15rem"
            }}
            titleText="Potencia tu negocio"
            subtitleText="Con tecnología SAP UI5"
          />
        </FlexBox>
      </FlexBox>
      
      {/* Panel derecho - Formulario de Login */}
      <FlexBox 
        style={{ 
          flex: "1 1 50%",
          ...backgroundStyle
        }}
        direction={FlexBoxDirection.Column}
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
      >
        <Card 
          style={{ 
            width: "90%", 
            maxWidth: "450px",
            backgroundColor: "var(--sapBackgroundColor)",
            boxShadow: "var(--sapContent_Shadow2)"
          }}
        >
          <CardHeader
            titleText="Iniciar Sesión"
            subtitleText="Accede a tu cuenta"
            avatar={<Icon name="log" />}
          />
          
          {error && (
            <MessageStrip
              design="Negative"
              icon="message-error"
              onClose={() => setError("")}
              style={{ margin: "0 1rem 1rem 1rem" }}
            >
              {error}
            </MessageStrip>
          )}
          
          <Form 
            style={{ padding: "1rem" }}
            onSubmit={handleSubmit}
          >
            <FormGroup titleText="Credenciales de acceso">
              <FormItem label="Correo Electrónico">
                <Input
                  type="Email"
                  icon="email"
                  placeholder="usuario@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </FormItem>
              
              <FormItem label="Contraseña">
                <Input
                  type={showPassword ? "Text" : "Password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onIconClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? "hide" : "show"}
                  required
                />
              </FormItem>
            </FormGroup>
            
            <FlexBox 
              justifyContent={FlexBoxJustifyContent.SpaceBetween}
              style={{ marginBottom: "1rem" }}
            >
              <Link>¿Olvidaste tu contraseña?</Link>
            </FlexBox>
            
            <Button 
              design="Emphasized"
              style={{ width: "100%" }}
              onClick={handleSubmit}
            >
              Iniciar Sesión
            </Button>
            
            <FlexBox 
              direction={FlexBoxDirection.Row}
              justifyContent={FlexBoxJustifyContent.Center}
              style={{ marginTop: "1rem" }}
            >
              <Text>¿No tienes una cuenta? </Text>
              <Link style={{ marginLeft: "0.5rem" }} onClick={() => navigate("/home")}>
                Crear cuenta
              </Link>
            </FlexBox>
          </Form>
        </Card>
      </FlexBox>
    </FlexBox>
  );
} 