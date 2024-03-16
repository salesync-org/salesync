import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import AuthProvider from './context/AuthContext.tsx';
import './index.css';
import { GlobalModalProvider } from './context/GlobalModalContext.tsx';

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
        <GlobalModalProvider>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </GlobalModalProvider>
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
