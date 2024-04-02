import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ConfigLayout from './components/Layout/ConfigLayout';
import LoadingSpinner from './components/ui/Loading/LoadingSpinner';
import { Toaster } from './components/ui/toaster';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';

// const LogIn = lazy(() => import('pages/LogIn/LogIn'));
// const Setting = lazy(() => import('pages/Setting/Setting'));
const Cheatsheet = lazy(() => import('pages/Cheatsheet/Cheatsheet'));
// const TypeDetail = lazy(() => import('./pages/TypeDetail/TypeDetail'));
// const TypeManager = lazy(() => import('./pages/TypeManager/TypeManager'));
const Sales = lazy(() => import('./pages/Sales/Sales'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const HomeLayout = lazy(() => import('./pages/Home/Home'));
const LogIn = lazy(() => import('pages/LogIn/LogIn'));
const ForgotPassword = lazy(() => import('pages/LogIn/ForgotPassword'));
const RecordDetail = lazy(() => import('./pages/RecordDetail/RecordDetail'));

function App() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path='cheatsheet' element={<Cheatsheet />} />
          <Route path='/:companyName'>
            <Route element={<PrivateRoute />}>
              <Route element={<ConfigLayout />}>
                <Route path='home' element={<HomeLayout />} />
                <Route path='cheatsheet' element={<Cheatsheet />} />
                <Route path='sales/:typeId' element={<Sales />} />
                <Route path='record/:recordId' element={<RecordDetail />} />
                <Route path='*' element={<Sales />} />
              </Route>
            </Route>
            <Route path='login' element={<LogIn />}></Route>
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;
