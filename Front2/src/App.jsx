import React from "react";
import { MyRoutes } from "./routers/routes";
import UI5ThemeProvider from "./components/UI5ThemeProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ErrorBoundary>
      <UI5ThemeProvider>
        <div style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "var(--sapBackgroundColor)"
        }}>
          <MyRoutes />
          <Toaster position="top-right" />
        </div>
      </UI5ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
