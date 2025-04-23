export const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "var(--sapBackgroundColor)",
    padding: "1.25rem",
    borderRadius: "0.5rem",
    boxShadow: "var(--sapContent_Shadow0)",
    marginTop: "0.5rem",
    minHeight: "72px"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem"
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.75rem",
    color: "var(--sapTextColor)",
    padding: "0.25rem 0"
  },
  headerIcon: {
    fontSize: "1.75rem",
    color: "var(--sapContent_IconColor)"
  },
  headerLocation: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  },
  locationIcon: {
    fontSize: "1rem",
    color: "var(--sapContent_IconColor)"
  },
  locationText: {
    fontSize: "0.875rem",
    color: "var(--sapContent_LabelColor)"
  },
  mainContent: {
    width: "100%",
    minHeight: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingTop: "2rem"
  },
  alertList: {
    marginTop: "1rem"
  },
  alertItem: {
    borderLeft: "4px solid",
    marginBottom: "0.5rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "var(--sapList_Background)",
    "&:hover": {
      transform: "translateX(4px)",
      backgroundColor: "var(--sapList_Hover_Background)"
    }
  },
  alertItemError: {
    borderLeftColor: "var(--sapErrorColor)",
    backgroundColor: "var(--sapErrorBackground)",
    "&:hover": {
      backgroundColor: "var(--sapErrorBackground)",
      opacity: 0.9
    }
  },
  alertItemWarning: {
    borderLeftColor: "var(--sapWarningColor)",
    backgroundColor: "var(--sapWarningBackground)",
    "&:hover": {
      backgroundColor: "var(--sapWarningBackground)",
      opacity: 0.9
    }
  },
  alertItemSuccess: {
    borderLeftColor: "var(--sapSuccessColor)",
    backgroundColor: "var(--sapSuccessBackground)",
    "&:hover": {
      backgroundColor: "var(--sapSuccessBackground)",
      opacity: 0.9
    }
  },
  filterBar: {
    marginBottom: "1rem",
    padding: "1rem",
    backgroundColor: "var(--sapBackgroundColor)",
    borderRadius: "0.5rem",
    boxShadow: "var(--sapContent_Shadow0)"
  },
  paginationBar: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem"
  },
  statusBadge: {
    padding: "0.25rem 0.5rem",
    borderRadius: "1rem",
    fontSize: "0.75rem",
    fontWeight: "bold"
  },
  statusBadgeError: {
    backgroundColor: "var(--sapErrorBackground)",
    color: "var(--sapErrorColor)",
    border: "1px solid var(--sapErrorBorderColor)"
  },
  statusBadgeWarning: {
    backgroundColor: "var(--sapWarningBackground)",
    color: "var(--sapWarningColor)",
    border: "1px solid var(--sapWarningBorderColor)"
  },
  statusBadgeSuccess: {
    backgroundColor: "var(--sapSuccessBackground)",
    color: "var(--sapSuccessColor)",
    border: "1px solid var(--sapSuccessBorderColor)"
  }
};
