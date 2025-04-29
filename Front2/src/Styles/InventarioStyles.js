export const styles = {
    pageHeader: {
      padding: "1rem 2rem",
      backgroundColor: "var(--sapPageHeader_Background)",
      borderBottom: "1px solid var(--sapObjectHeader_BorderColor)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
    },
  
    pageContainer: {
      padding: "1.5rem 2rem",
      backgroundColor: "var(--sapBackgroundColor)",
    },
  
    statCard: {
      gap: "1.5rem",
      marginBottom: "2rem",
    },
  
    statInfo: {
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      height: "100%", 
    },
    
  
    statValue: {
      fontSize: "1.75rem",
      fontWeight: "600",
      color: "var(--sapTextColor)",
      marginBottom: "0.25rem",
    },
  
    statLabel: {
      fontSize: "0.875rem",
      color: "var(--sapContent_LabelColor)",
    },
  
    filterBar: {
      marginBottom: "1.5rem",
      padding: "1rem",
      borderRadius: "0.5rem",
      backgroundColor: "var(--sapList_Background)",
      boxShadow: "var(--sapContent_Shadow0)",
    },
  
    inputFullWidth: {
      width: "100%",
    },
  
    tableWrapper: {
      marginTop: "1rem",
      borderRadius: "0.75rem",
      overflow: "hidden",
      backgroundColor: "var(--sapList_Background)",
      boxShadow: "none", // sin sombra
    },
  
    toastContent: {
      position: "fixed",
      bottom: "2rem",
      left: "2rem",
      backgroundColor: "var(--sapInformativeBackground)",
      color: "var(--sapTextColor)",
      padding: "1rem 1.5rem",
      borderRadius: "0.5rem",
      boxShadow: "var(--sapContent_Shadow1)",
      zIndex: 1000,
    },
  
    dialogContent: {
      padding: "1.5rem",
      backgroundColor: "var(--sapBackgroundColor)",
    },
  
    formColumn: {
      padding: "1rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
  };
  