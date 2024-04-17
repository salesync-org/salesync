import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ConfigLayout from './components/Layout/ConfigLayout';
import LoadingSpinner from './components/ui/Loading/LoadingSpinner';
import { Toaster } from './components/ui/Toast';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import ObjectManager from './pages/Settings/ObjectManager';
import TypePropertyManager from './pages/Settings/TypePropertyManager';
const SettingLayout = lazy(() => import('./pages/Settings/SettingLayout'));
const PersonalInformationSetting = lazy(() => import('./pages/Settings/PersonalInformationSetting'));
const UserSetting = lazy(() => import('./pages/Settings/UserSetting'));
const ChangePasswordSetting = lazy(() => import('./pages/Settings/ChangePasswordSetting'));
const CompanyInformationSetting = lazy(() => import('./pages/Settings/CompanyInformationSetting'));
const PropertySetting = lazy(() => import('./pages/Settings/PropertySetting'));

// const LogIn = lazy(() => import('pages/LogIn/LogIn'));
// const Setting = lazy(() => import('pages/Setting/Setting'));
const Cheatsheet = lazy(() => import('pages/Cheatsheet/Cheatsheet'));
// const TypeDetail = lazy(() => import('./pages/TypeDetail/TypeDetail'));
// const TypeManager = lazy(() => import('./pages/TypeManager/TypeManager'));
const Sales = lazy(() => import('./pages/Sales/Sales'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const HomeLayout = lazy(() => import('./pages/Home/Home'));
const LogIn = lazy(() => import('pages/LogIn/LogIn'));
const VerifyEmail = lazy(() => import('pages/VerifyEmail/VerifyEmail'));
const ChangePassword = lazy(() => import('pages/ChangePassword/ChangePassword'));
const ForgotPassword = lazy(() => import('pages/LogIn/ForgotPassword'));
const RecordDetail = lazy(() => import('./pages/RecordDetail/RecordDetail'));

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className='h-screen'>
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace />}></Route>
          <Route path='/home' element={<LogIn />}></Route>
          <Route path='/login' element={<LogIn />}></Route>
          <Route path='/cheatsheet' element={<Cheatsheet />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/:companyName/' element={<PrivateRoute />}>
            <Route element={<ConfigLayout />}>
              <Route path='home' element={<HomeLayout />} />
              <Route path='sales/:typeId' element={<Sales />} />
              <Route path='record/:recordId' element={<RecordDetail />} />
              <Route path='setting/' element={<SettingLayout />}>
                <Route path='personal-information' element={<PersonalInformationSetting />} />
                <Route path='company-information' element={<CompanyInformationSetting />} />
                <Route path='change-user-password' element={<ChangePasswordSetting />} />
                <Route path='profiles' element={<PersonalInformationSetting />} />
                <Route path='users' element={<UserSetting />} />
                <Route path='object-manager' element={<ObjectManager />} />
                <Route path='object-manager/:typeId' element={<TypePropertyManager />} />
                <Route path='object-manager/:typeId/create' element={<PropertySetting />} />
              </Route>
              <Route path='*' element={<Sales />} />
            </Route>
          </Route>
          <Route path='/:companyName/login' element={<LogIn />}></Route>
          <Route path='/realms/:companyName/login-actions/action-token' element={<VerifyEmail />}></Route>
          <Route path='/:companyName/:userId/change-password' element={<ChangePassword />}></Route>
          <Route path='*' element={<div>Oops</div>} />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;
