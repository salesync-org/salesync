import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Cheatsheet = lazy(() => import('pages/Cheatsheet/Cheatsheet'));
const ConfigLayout = lazy(() => import('./components/layout/ConfigLayout'));
const TypeManager = lazy(() => import('./pages/TypeManager/TypeManager'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Cheatsheet />} />
          <Route path='/config' element={<ConfigLayout />}>
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
