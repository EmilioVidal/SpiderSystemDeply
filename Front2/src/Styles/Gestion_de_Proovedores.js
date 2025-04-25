export const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    fontFamily: '"72", Arial, sans-serif',
  },
  header: {
    marginBottom: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#333',
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#0a6ed1',
    color: '#fff',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0854a0',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '2rem',
    color: '#6a6a6a',
    fontSize: '1.2rem',
  },
  card: {
    marginTop: '1rem',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '1rem',
    tableLayout: 'auto', // Ensure cells adjust to content
    wordWrap: 'break-word', // Allow text to wrap within cells
    fontSize: '0.875rem', // Uniform font size for table content
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: '2px solid #e0e0e0',
    fontSize: '1rem', // Slightly larger font size for table headers
  },
  tableRow: {
    '&:nth-child(even)': {
      backgroundColor: '#f9f9f9',
    },
    '&:hover': {
      backgroundColor: '#eaf4fc',
    },
  },
  tableCell: {
    padding: '0.75rem',
    borderBottom: '1px solid #e0e0e0',
    textAlign: 'left', // Ensure text alignment is consistent
    whiteSpace: 'normal', // Allow text to wrap
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e0e0e0',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    marginBottom: '1rem',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#0a6ed1',
    outline: 'none',
    boxShadow: '0 0 4px rgba(10, 110, 209, 0.5)',
  },
  formLabel: {
    fontWeight: '500',
    marginBottom: '0.5rem',
    display: 'block',
    color: '#555',
  },
  icon: {
    fontSize: '2rem',
    color: '#0a6ed1',
    marginBottom: '1rem',
  },
  successStatus: {
    color: '#107e3e',
    fontWeight: 'bold',
  },
  warningStatus: {
    color: '#e9730c',
    fontWeight: 'bold',
  },
  errorStatus: {
    color: '#bb0000',
    fontWeight: 'bold',
  },
  dialogTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#333',
  },
  link: {
    color: '#0a6ed1',
    textDecoration: 'underline',
  },
  dialog: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    zIndex: 1000,
  },
  dialogOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  detailSection: {
    marginBottom: '1rem', // Add spacing between sections
  },
};
