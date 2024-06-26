import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/Toast';

const ConfigLayout = lazy(() => import('./components/Layout/ConfigLayout'));
const LoadingSpinner = lazy(() => import('./components/ui/Loading/LoadingSpinner'));
const PrivateRoute = lazy(() => import('./pages/PrivateRoute/PrivateRoute'));
const ObjectManager = lazy(() => import('./pages/Settings/ObjectManager'));
const TypePropertyManager = lazy(() => import('./pages/Settings/TypePropertyManager'));
const CompanyRedirect = lazy(() => import('./components/Layout/CompanyRedirect'));
const UpdateReport = lazy(() => import('./components/Records/UpdateReport'));
const ReportLayout = lazy(() => import('./components/Records/ReportLayout'));
const ReportDetail = lazy(() => import('./components/Records/ReportDetail'));
const CreateReport = lazy(() => import('./components/Records/CreateReport'));
const SettingLayout = lazy(() => import('./pages/Settings/SettingLayout'));
const PersonalInformationSetting = lazy(() => import('./pages/Settings/PersonalInformationSetting'));
const UserSetting = lazy(() => import('./pages/Settings/UserSetting'));
const ChangePasswordSetting = lazy(() => import('./pages/Settings/ChangePasswordSetting'));
const CompanyInformationSetting = lazy(() => import('./pages/Settings/CompanyInformationSetting'));
const PropertySetting = lazy(() => import('./pages/Settings/PropertySetting'));
const RoleSetting = lazy(() => import('./pages/Settings/RoleSetting'));

// const LogIn = lazy(() => import('pages/LogIn/LogIn'));
// const Setting = lazy(() => import('pages/Setting/Setting'));
const Cheatsheet = lazy(() => import('pages/Cheatsheet/Cheatsheet'));
// const TypeDetail = lazy(() => import('./pages/TypeDetail/TypeDetail'));
// const TypeManager = lazy(() => import('./pages/TypeManager/TypeManager'));
const SectionDomain = lazy(() => import('./pages/SectionDomain/SectionDomain'));
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
          <Route path='/:companyName/login' element={<LogIn />}></Route>
          <Route path='/:companyName/' element={<PrivateRoute />}>
            <Route element={<ConfigLayout />}>
              <Route path='' element={<CompanyRedirect />} />
              <Route path='home' element={<CompanyRedirect />} />
              <Route path='section/home' element={<HomeLayout />} />
              <Route path='section/:domainName/' element={<SectionDomain />} />
              <Route path='section/:domainName/report/' element={<ReportLayout />}>
                <Route path='create-report/:typeReportId' element={<CreateReport />} />
                <Route path='update-report/:reportId' element={<UpdateReport />} />
                <Route path=':reportId' element={<ReportDetail />} />
              </Route>
              <Route path='section/:domainName/:typeId' element={<SectionDomain />} />
              <Route path='section/:domainName/record/:recordId' element={<RecordDetail />} />
              <Route path='setting/' element={<SettingLayout />}>
                <Route path='personal-information' element={<PersonalInformationSetting />} />
                <Route path='company-information' element={<CompanyInformationSetting />} />
                <Route path='change-user-password' element={<ChangePasswordSetting />} />
                <Route path='roles' element={<RoleSetting />} />
                <Route path='users' element={<UserSetting />} />
                <Route path='object-manager' element={<ObjectManager />} />
                <Route path='object-manager/:typeId' element={<TypePropertyManager />} />
                <Route path='object-manager/:typeId/create' element={<PropertySetting />} />
              </Route>
              {/* <Route path='*' element={<Sales />} /> */}
            </Route>
          </Route>
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
