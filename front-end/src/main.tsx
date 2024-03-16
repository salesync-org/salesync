import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthProvider from './context/AuthContext.tsx';
import { ErrorBoundary } from './pages/ErrorBoundary/ErrorBoundary.tsx';

const queryClient = new QueryClient();

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const { server } = await import('@/mocks/api/handlers.ts');
  return server.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('entry')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
});

// ReactDOM.createRoot(document.getElementById('entry')!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </QueryClientProvider>
//   </React.StrictMode>
// );
