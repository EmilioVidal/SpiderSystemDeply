import React from "react";
import { MyRoutes } from "./routers/routes";
import UI5ThemeProvider from "./components/UI5ThemeProvider";
import { Page } from "@ui5/webcomponents-react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ErrorBoundary>
      <UI5ThemeProvider>
        <Page 
          style={{ 
            height: "100vh",
            width: "100%"
          }}
          backgroundDesign="Transparent"
        >
          <MyRoutes />
          <Toaster position="top-right" />
        </Page>
      </UI5ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 