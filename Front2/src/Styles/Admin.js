export const adminStyles = {
  container: {
    width: "100%",
    minHeight: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingTop: "2rem"
  },

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

  headerIcon: {
    fontSize: "1.75rem",
    color: "var(--sapContent_IconColor)"
  },

  headerTitle: {
    margin: 0,
    fontSize: "1.75rem",
    color: "var(--sapTextColor)",
    padding: "0.25rem 0"
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  },

  locationContainer: {
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

  content: {
    backgroundColor: 'var(--sapList_Background)',
    margin: '0 2rem 2rem',
    borderRadius: '0.5rem',
    boxShadow: 'var(--sapContent_Shadow0)',
    overflow: 'hidden'
  },

  grid: {
    padding: '2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  },

  loadingContainer: {
    textAlign: 'center',
    padding: '2rem',
    gridColumn: '1 / -1'
  },

  userCard: {
    padding: '1.5rem',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: 'var(--sapContent_Shadow2)'
    }
  },

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },

  photoContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
    transition: 'opacity 0.2s'
  },

  userPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  photoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0,
    transition: 'opacity 0.2s',
    ':hover': {
      opacity: 1
    }
  },

  cameraIcon: {
    color: 'white',
    fontSize: '1.5rem'
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },

  userName: {
    margin: 0,
    fontSize: '1.25rem'
  },

  userEmail: {
    color: 'var(--sapContent_LabelColor)',
    fontSize: '0.875rem'
  },

  rolBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: '0.25rem'
  },

  lastAccess: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--sapContent_LabelColor)',
    fontSize: '0.875rem',
    marginTop: '0.5rem'
  },

  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    marginTop: '1rem',
    borderTop: '1px solid var(--sapContent_ForegroundBorderColor)',
    paddingTop: '1rem'
  },

  dialog: {
    width: '400px'
  },

  form: {
    padding: '1rem'
  },

  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    padding: '0.5rem'
  },

  hiddenInput: {
    display: 'none'
  },

  roleIcon: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--sapContent_Shadow0)'
  },

  roleIconInner: {
    fontSize: '0.875rem'
  }
};

export const getRolColor = (rol) => {
  switch (rol) {
    case 'Dueño':
      return 'var(--sapIndicationColor_1)';
    case 'Administrador':
      return 'var(--sapIndicationColor_3)';
    case 'Analista':
      return 'var(--sapIndicationColor_4)';
    case 'Proveedor':
      return 'var(--sapIndicationColor_6)';
    default:
      return 'var(--sapIndicationColor_5)';
  }
};

export const getRolIcon = (rol) => {
  switch (rol) {
    case 'Dueño':
      return 'key-user-settings';
    case 'Administrador':
      return 'employee-approvals';
    case 'Analista':
      return 'business-objects-experience';
    case 'Proveedor':
      return 'supplier';
    default:
      return 'customer';
  }
};
