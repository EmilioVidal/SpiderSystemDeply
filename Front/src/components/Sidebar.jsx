import styled from "styled-components";
import logo from "../assets/react.svg";
import { v } from "../styles/Variables";
import {
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";
import { MdOutlineAnalytics, MdLogout, MdOutlineInventory, MdOutlineQueryStats, MdBusinessCenter, MdOutlineShoppingCart } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { TbDeviceDesktopAnalytics, TbReportAnalytics } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { VscMenu,VscAccount } from "react-icons/vsc";

import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../App";

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
      themeUse={theme}
      isMobile={isMobile}
      onMouseEnter={() => !isMobile && setSidebarOpen(true)}
      onMouseLeave={() => !isMobile && setSidebarOpen(false)}
    >
      <MenuButton onClick={toggleSidebar} isOpen={sidebarOpen}>
        <VscMenu />
      </MenuButton>
      
      <div className="Logocontent">
        <div className="imgcontent">
          <img src={logo} />
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
        <div className="Togglecontent">
          <div className="grid theme-container">
            <div className="content">
              <div className="demo">
                <label className="switch" istheme={theme}>
                  <input
                    istheme={theme}
                    type="checkbox"
                    className="theme-swither"
                    onClick={CambiarTheme}
                  ></input>
                  <span istheme={theme} className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
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
  transition: all 0.3s ease;
  z-index: 98; /* Reducido para no superponer sobre el contenido */
  overflow-y: auto;
  overflow-x: hidden;
  
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
    padding-bottom: ${v.lgSpacing};
    
    @media (max-width: 768px) {
      flex-direction: column;
      padding-bottom: 15px;
    }
    
    .imgcontent {
      display: flex;
      img {
        max-width: 100%;
        height: auto;
      }
      cursor: pointer;
      transition: all 0.3s;
      transform: ${({ isOpen }) => (isOpen ? `scale(0.7)` : `scale(1.5)`)};
      
      @media (max-width: 768px) {
        transform: ${({ isOpen }) => (isOpen ? `scale(0.8)` : `scale(0)`)};
      }
    }
    h2 {
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
      font-size: 1.2rem;
      
      @media (max-width: 768px) {
        font-size: 1rem;
        margin-top: 5px;
      }
    }
  }
  .LinkContainer {
    margin: 8px 0;
    padding: 0 8%;
    
    @media (max-width: 768px) {
      padding: 0 5%;
    }
    
    :hover {
      background: ${(props) => props.theme.bg3};
    }
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing}-2px) 0;
      color: ${(props) => props.theme.textColor};
      height: 50px;
      
      @media (max-width: 768px) {
        height: 45px;
      }
      
      .Linkicon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;
        svg {
          font-size: 22px;
          
          @media (max-width: 768px) {
            font-size: 20px;
          }
        }
      }
      &.active {
        .Linkicon {
          svg {
            color: ${(props) => props.theme.bg4};
          }
        }
      }
      
      span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.9rem;
        
        @media (max-width: 768px) {
          font-size: 0.85rem;
        }
      }
    }
  }
  .Themecontent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8%;
    
    @media (max-width: 768px) {
      padding: 0 5%;
      margin-bottom: 20px;
    }
    
    .titletheme {
      display: block;
      padding: 10px;
      font-weight: 700;
      opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
      transition: all 0.3s;
      white-space: nowrap;
      overflow: hidden;
      
      @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 5px;
      }
    }
    .Togglecontent {
      margin: ${({ isOpen }) => (isOpen ? `auto 20px` : `auto 15px`)};
      width: 36px;
      height: 20px;
      border-radius: 10px;
      transition: all 0.3s;
      position: relative;
      
      @media (max-width: 768px) {
        margin: ${({ isOpen }) => (isOpen ? `auto 10px` : `auto 10px`)};
        width: 30px;
      }
      
      .theme-container {
        background-blend-mode: multiply, multiply;
        transition: 0.4s;
        .grid {
          display: grid;
          justify-items: center;
          align-content: center;
          height: 100vh;
          width: 100vw;
          font-family: "Lato", sans-serif;
        }
        .demo {
          font-size: 32px;
          
          @media (max-width: 768px) {
            font-size: 24px;
          }
          
          .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            
            @media (max-width: 768px) {
              width: 50px;
              height: 28px;
            }
            
            .theme-swither {
              opacity: 0;
              width: 0;
              height: 0;
              &:checked + .slider:before {
                left: 4px;
                content: "🌑";
                transform: translateX(26px);
                
                @media (max-width: 768px) {
                  transform: translateX(22px);
                }
              }
            }
            .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: ${({ themeUse }) =>
                themeUse === "light" ? v.lightcheckbox : v.checkbox};
              transition: 0.4s;
              &::before {
                position: absolute;
                content: "☀️";
                height: 0px;
                width: 0px;
                left: -10px;
                top: 16px;
                line-height: 0px;
                transition: 0.4s;
                
                @media (max-width: 768px) {
                  top: 14px;
                  left: -8px;
                  font-size: 0.8em;
                }
              }
              &.round {
                border-radius: 34px;
                &::before {
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin: ${v.lgSpacing} 0;
  
  @media (max-width: 768px) {
    margin: 15px 0;
  }
`;
//#endregion