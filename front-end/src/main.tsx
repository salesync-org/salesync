import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import AuthProvider from './context/AuthContext.tsx';
import './index.css';
import { GlobalModalProvider } from './context/GlobalModalContext.tsx';
import 'react-tooltip/dist/react-tooltip.css';

const queryClient = new QueryClient();

async function enableMocking() {
  if (process.env.NODE_ENV === 'mock') {
    const { server } = await import('@/mocks/api/handlers.ts');
    return server.start();
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('entry')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <GlobalModalProvider>
              <App />
            </GlobalModalProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
});
