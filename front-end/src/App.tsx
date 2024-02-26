import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Cheatsheet = lazy(() => import('pages/Cheatsheet/Cheatsheet'));
const ConfigLayout = lazy(() => import('./components/layout/ConfigLayout'));
const AccountType = lazy(() => import('./pages/AccountType/AccountType'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Cheatsheet />} />
          <Route path='/config' element={<ConfigLayout />}>
            <Route path='type' element={<AccountType />} />
            <Route path='field' element={<AccountType />} />
            <Route path='link' element={<AccountType />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
