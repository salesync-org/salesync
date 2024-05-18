/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui';
import React from 'react';
import { Link } from 'react-router-dom';

export class ErrorBoundary extends React.Component<any, { hasError: boolean; error: Error | null; errorInfo: string }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: '' };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error, errorInfo: error.message };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // this.setState({ error, errorInfo });
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className='fixed bottom-0 right-0 rounded-md bg-red-500 p-10'>
          <h1 className='text-xl text-white'>{this.state.errorInfo}</h1>
          <Button intent='primary' className='mx-auto'>
            <Link to={'/home'}>Go back to Hame</Link>
          </Button>
        </section>
      );
    }
    return this.props.children;
  }
}
