import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ConfigLayout from './components/Layout/ConfigLayout';

// const LogIn = lazy(() => import('pages/LogIn/LogIn'));
// const Setting = lazy(() => import('pages/Setting/Setting'));
const Cheatsheet = lazy(() => import('pages/Cheatsheet/Cheatsheet'));
// const TypeDetail = lazy(() => import('./pages/TypeDetail/TypeDetail'));
// const TypeManager = lazy(() => import('./pages/TypeManager/TypeManager'));
const RecordsLayout = lazy(() => import('./pages/Records/RecordsLayout'));
const Sales = lazy(() => import('./pages/Sales/Sales'));
const LogIn = lazy(() => import('./pages/LogIn/LogIn'));
const ForgotPassword = lazy(() => import('./pages/LogIn/ForgotPassword'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<ConfigLayout />}>
            <Route path='cheatsheet' element={<Cheatsheet />} />
            {/* <Route path='/' element={<LogIn />} />
            <Route path='setting' element={<Setting />} />
            <Route path='type' element={<TypeDetail />} />
            <Route path='type/link/:id' element={<TypeDetail />} />
            <Route path='field' element={<TypeDetail />} />
            <Route path='link' element={<TypeDetail />} />
            <Route path='/type-manager' element={<TypeManager />} /> */}
            <Route path='sales' element={<Sales />} />
            <Route path='*' element={<Sales />} />
          </Route>
          <Route path='/login' element={<LogIn />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
