import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import LogIn from './pages/LogIn/LogIn';

const Cheatsheet = lazy(() => import('pages/Cheatsheet/Cheatsheet'));
const ConfigLayout = lazy(() => import('./components/layout/ConfigLayout'));
const AccountType = lazy(() => import('./pages/TypeDetail/TypeDetail'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          
          <Route path='/' element={<ConfigLayout />}>
            <Route path='/' element={<LogIn />} />
            <Route path='/cheatsheet' element={<Cheatsheet />} />
            <Route path='type' element={<TypeManager />} />
            <Route path='field' element={<TypeManager />} />
            <Route path='link' element={<TypeManager />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
