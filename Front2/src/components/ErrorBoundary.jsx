import React, { Component } from 'react';
import { MessageBox, Title, Text, FlexBox, FlexBoxDirection, Button, Icon } from '@ui5/webcomponents-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/home';
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <FlexBox 
          direction={FlexBoxDirection.Column} 
          justifyContent="Center"
          alignItems="Center"
          style={{ 
            height: '100vh', 
            padding: '2rem',
            backgroundColor: 'var(--sapBackgroundColor)'
          }}
        >
          <Icon name="error" style={{ fontSize: '4rem', color: 'var(--sapNegativeColor)', marginBottom: '1rem' }} />
          <Title level="H1">Oops, ha ocurrido un problema</Title>
          <Text style={{ marginBottom: '1rem' }}>
            Hemos detectado un error en la aplicación. Por favor, intenta recargar la página.
          </Text>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <MessageBox 
              type="Error"
              open
              headerText="Error details"
              style={{ width: '100%', maxWidth: '800px', marginBottom: '1rem' }}
            >
              <pre style={{ 
                whiteSpace: 'pre-wrap', 
                wordWrap: 'break-word',
                backgroundColor: 'var(--sapBackgroundColor)', 
                padding: '1rem',
                borderRadius: '0.25rem',
                fontSize: '0.875rem',
                overflow: 'auto',
                maxHeight: '300px'
              }}>
                {this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </MessageBox>
          )}
          
          <Button onClick={this.resetError} design="Emphasized">
            Volver al inicio
          </Button>
        </FlexBox>
      );
    }

    return this.props.children;
  }
} 