import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Alertas } from "../pages/Alertas";
import { Predictivo } from "../pages/Predictivo";
import { Inventario } from "../pages/Inventario";
import { Inicio } from "../pages/Inicio";
import { Analisis_Inv } from "../pages/Analisis_Inv";
import { Metricas } from "../pages/Metricas";
import { Admin } from "../pages/Admin";
import { Compras } from "../pages/Compras";
import { LoginPage } from "../pages/Login";
import { Cuenta } from "../pages/Cuenta";
import ChatPage from "../pages/ChatPage";
import { Sidebar } from "../components/Sidebar";
import styled from "styled-components";
import { useState, useEffect } from "react";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow: auto;
  padding: 20px;
  transition: margin-left 0.3s ease;
  margin-left: ${({ sidebarWidth }) => sidebarWidth}px;
  width: calc(100% - ${({ sidebarWidth }) => sidebarWidth}px);
  height: 100%;
  
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 15px;
    padding-top: 60px;
  }
`;

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login" || location.pathname === "/";
  const [sidebarWidth, setSidebarWidth] = useState(80);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleSidebarResize = (width) => {
    setSidebarWidth(width);
  };

  if (hideSidebar) {
    return (
      <ContentContainer className="login-page" sidebarWidth={0}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ContentContainer>
    );
  }

  return (
    <AppContainer>
      <Sidebar onResize={handleSidebarResize} />
      <ContentContainer sidebarWidth={isMobile ? 0 : sidebarWidth}>
        <Routes>
          <Route path="/home" element={<Inicio />} />
          <Route path="/sistema_de_alertas" element={<Alertas />} />
          <Route path="/analisis_predictivo" element={<Predictivo />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/analisis_de_inventario" element={<Analisis_Inv />} />
          <Route path="/metricas" element={<Metricas />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/cuenta" element={<Cuenta />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </ContentContainer>
    </AppContainer>
  );
}

export function MyRoutes() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}