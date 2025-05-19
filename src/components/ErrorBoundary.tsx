import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-6 p-8 max-w-md">
            <div className="bg-red-500 rounded-full h-24 w-24 flex items-center justify-center mx-auto">
              <span className="text-5xl font-bold text-white">!</span>
            </div>
            <h1 className="text-3xl font-bold text-dashboard-heading">Something went wrong</h1>
            <p className="text-xl text-muted-foreground">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <pre className="bg-gray-100 p-4 rounded-md text-left text-sm overflow-auto max-h-32">
              {this.state.error?.stack?.split('\n').slice(0, 3).join('\n')}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
