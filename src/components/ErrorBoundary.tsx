"use client";

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    if (process.env.NODE_ENV === 'production') {
    }
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error }> = ({ error }) => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="text-center p-8 max-w-md">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Algo deu errado
      </h1>
      <p className="text-muted-foreground mb-4">
        Ocorreu um erro inesperado. Tente recarregar a página.
      </p>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="text-left text-sm text-muted-foreground">
          <summary className="cursor-pointer mb-2">Detalhes do erro (Dev)</summary>
          <pre className="bg-muted p-2 rounded text-xs overflow-auto">
            {error.message}
          </pre>
        </details>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
      >
        Recarregar Página
      </button>
    </div>
  </div>
);

export default ErrorBoundary; 