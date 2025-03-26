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
`;

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  if (hideSidebar) {
    return (
      <div className="content-container login-page">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <AppContainer>
      <Sidebar />
      <div className="content-container">
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
      </div>
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