import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Alertas } from "../pages/Alertas";
import { Predictivo } from "../pages/Predictivo";
import { Inventario } from "../pages/Inventario";
import { Inicio } from "../pages/Inicio";
import { Analisis_Inv } from "../pages/Analisis_Inv";
import { Metricas } from "../pages/Metricas";
import { Admin } from "../pages/Admin";
import { Compras } from "../pages/Compras";
import { LoginPage } from "../pages/Login";
import { Sidebar } from "../components/Sidebar";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow: auto;
  width: 100%;
  height: 100%;
`;

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  if (hideSidebar) {
    return (
      <ContentContainer className="login-page">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ContentContainer>
    );
  }

  return (
    <AppContainer>
      <Sidebar />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/sistema_de_alertas" element={<Alertas />} />
          <Route path="/analisis_predictivo" element={<Predictivo />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/analisis_de_inventario" element={<Analisis_Inv />} />
          <Route path="/metricas" element={<Metricas />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/compras" element={<Compras />} />
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