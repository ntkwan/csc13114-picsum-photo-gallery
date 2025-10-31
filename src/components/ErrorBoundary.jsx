import { Component } from 'react';
import { Container, Alert, Button, Typography } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-8">
          <Alert severity="error" className="mb-4">
            <Typography variant="h6">something went wrong</Typography>
            <Typography variant="body2" className="mt-2">
              {this.state.error?.message || 'an unexpected error occurred'}
            </Typography>
          </Alert>
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
          >
            reload page
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
