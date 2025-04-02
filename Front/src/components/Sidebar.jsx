import styled from "styled-components";
import { v } from "../styles/Variables";
import {
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlineAnalytics, MdLogout, MdOutlineInventory, MdOutlineQueryStats, MdBusinessCenter, MdOutlineShoppingCart } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { TbDeviceDesktopAnalytics, TbReportAnalytics } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { VscMenu,VscAccount } from "react-icons/vsc";

import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../App";

// Logo component
const SpiderLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
    <path d="M18 12h-6"/>
    <path d="M6 12h4"/>
    <path d="M12 6v12"/>
  </svg>
);

// Sun icon for theme toggle
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

// Moon icon for theme toggle
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

export function Sidebar({ onResize }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { setTheme, theme } = useContext(ThemeContext);
  
  // Detectar si es un dispositivo móvil
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

  // Notificar cambios de tamaño al componente padre
  useEffect(() => {
    if (onResize) {
      const width = sidebarOpen ? (isMobile ? 0 : 300) : (isMobile ? 0 : 80);
      onResize(width);
    }
  }, [sidebarOpen, isMobile, onResize]);

  const CambiarTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container
      isOpen={sidebarOpen}
      theme={theme}
      isMobile={isMobile}
      onMouseEnter={() => !isMobile && setSidebarOpen(true)}
      onMouseLeave={() => !isMobile && setSidebarOpen(false)}
    >
      <MenuButton onClick={toggleSidebar} isOpen={sidebarOpen}>
        <VscMenu />
      </MenuButton>
      
      <div className="Logocontent">
        <div className="imgcontent">
          <SpiderLogo />
        </div>
        <h2>Spider System</h2>
      </div>
      {linksArray.map(({ icon, label, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
      <Divider />
      {secondarylinksArray.map(({ icon, label, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
      <Divider />
      <div className="Themecontent">
        {sidebarOpen && <span className="titletheme">Dark mode</span>}
        <div className="Togglecontent" onClick={CambiarTheme}>
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </div>
      </div>
    </Container>
  );
}

//#region Data links
const linksArray = [
  {
    label: "Inicio",
    icon: <AiOutlineHome />,
    to: "/home",
  },
  {
    label: "Sistema de Alertas",
    icon: <FiAlertTriangle />,
    to: "/sistema_de_alertas",
  },
  {
    label: "Analisis Predictivo",
    icon: <TbDeviceDesktopAnalytics />,
    to: "/analisis_predictivo",
  },
  {
    label: "Inventario",
    icon: <MdOutlineInventory />,
    to: "/inventario",
  },
  {
    label: "Analisis de Inventario",
    icon: <TbReportAnalytics />,
    to: "/analisis_de_inventario",
  },
  {
    label: "Metricas",
    icon: <MdOutlineQueryStats />,
    to: "/metricas",
  },
  {
    label: "Admin",
    icon: <RiAdminLine />,
    to: "/admin",
  },
  {
    label: "Chat",
    icon: <IoChatboxOutline />,
    to: "/chat",
  },
  {
    label: "Compras",
    icon: <IoCartOutline />,
    to: "/compras",
  },
  {
    label: "Gestión de Proveedores",
    icon: <MdBusinessCenter />,
    to: "/gestion_proveedores",
  },
  {
    label: "Ordenes",
    icon: <MdOutlineShoppingCart />,
    to: "/ordenes",
  },
];
const secondarylinksArray = [
  {
    label: "Cuenta",
    icon: <VscAccount />,
    to: "/cuenta",
  },
  {
    label: "Salir",
    icon: <MdLogout />,
    to: "/login",
  },
];
//#endregion

//#region STYLED COMPONENTS
const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
  z-index: 999;
  
  @media (max-width: 768px) {
    display: block;
    right: ${({ isOpen }) => (isOpen ? '15px' : '15px')};
  }
`;

const Container = styled.div`
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.bg};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  padding-top: 20px;
  width: ${({ isOpen }) => (isOpen ? '300px' : '80px')};
  transition: width 0.3s ease, left 0.3s ease;
  z-index: 98;
  overflow: hidden;
  
  /* Estilos responsivos */
  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '250px' : '0')};
    padding-top: 50px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100px')};
    box-shadow: ${({ isOpen }) => (isOpen ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none')};
  }

  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;
    
    @media (max-width: 768px) {
      flex-direction: column;
      padding-bottom: 15px;
    }
    
    .imgcontent {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transform: ${({ isOpen }) => (isOpen ? `scale(1.2)` : `scale(1.5)`)};
      
      svg {
        color: ${(props) => props.theme.textColor};
        width: 35px;
        height: 35px;
      }
      
      @media (max-width: 768px) {
        transform: ${({ isOpen }) => (isOpen ? `scale(1.2)` : `scale(0)`)};
      }
    }
    h2 {
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
      font-size: 1.3rem;
      margin: 0 0 0 10px;
      color: ${(props) => props.theme.textColor};
      
      @media (max-width: 768px) {
        font-size: 1.2rem;
        margin-top: 8px;
      }
    }
  }

  .LinkContainer {
    margin: 8px 0;
    padding: 0 8%;
    border-radius: 10px;
    
    @media (max-width: 768px) {
      padding: 0 5%;
    }
    
    :hover {
      background: ${(props) => props.theme.bg3};
      transform: translateX(5px);
      
      .Links {
        .Linkicon {
          svg {
            transform: scale(1.1);
            color: ${(props) => props.theme.bg4};
          }
        }
        
        span {
          color: ${(props) => props.theme.bg4};
          font-weight: 500;
        }
      }
    }
    
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 10px 0;
      color: ${(props) => props.theme.textColor};
      height: 45px;
      
      @media (max-width: 768px) {
        height: 40px;
      }
      
      .Linkicon {
        padding: 0 ${v.mdSpacing};
        display: flex;
        
        svg {
          font-size: 24px;
          transition: transform 0.2s ease;
          
          @media (max-width: 768px) {
            font-size: 22px;
          }
        }
      }
      
      &.active {
        background: ${(props) => `${props.theme.bg4}15`};
        border-radius: 8px;
        
        .Linkicon {
          svg {
            color: ${(props) => props.theme.bg4};
            transform: scale(1.1);
          }
        }
        
        span {
          color: ${(props) => props.theme.bg4};
          font-weight: 500;
        }
      }
      
      span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 1rem;
        transition: color 0.2s ease;
        
        @media (max-width: 768px) {
          font-size: 0.95rem;
        }
      }
    }
  }

  .Themecontent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8%;
    margin-top: 10px;
    
    @media (max-width: 768px) {
      padding: 0 5%;
      margin-bottom: 20px;
    }
    
    .titletheme {
      display: block;
      padding: 8px;
      font-weight: 600;
      font-size: 1rem;
      opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
      white-space: nowrap;
      overflow: hidden;
      
      @media (max-width: 768px) {
        font-size: 0.95rem;
        padding: 5px;
      }
    }

    .Togglecontent {
      position: relative;
      width: 45px;
      height: 22px;
      border-radius: 15px;
      background-color: ${({ theme }) => theme === "light" ? "#E8E8E8" : "#4D4D4D"};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;

      svg {
        position: absolute;
        width: 18px;
        height: 18px;
        color: ${({ theme }) => theme === "light" ? "#FFB800" : "#FFFFFF"};
      }
    }
  }
`;

const Divider = styled.div`
  height: 1.5px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin: 12px 0;
  
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;