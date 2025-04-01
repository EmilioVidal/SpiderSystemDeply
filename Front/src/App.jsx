import React, { useState } from "react";
import styled from "styled-components";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import { MyRoutes } from "./routers/routes";

export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <Container>
            <MyRoutes />
          </Container>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  color: ${({ theme }) => theme.textColor};
  height: 100vh;
  width: 100%;
  position: relative;
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
`;

export default App;