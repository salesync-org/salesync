import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ConfigLayout from './components/Layout/ConfigLayout';
import LoadingSpinner from './components/ui/Loading/LoadingSpinner';
import { Toaster } from './components/ui/toaster';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import { formatRecords } from './utils/utils';

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
  const test = [
    {
      id: '011edd1b-abff-4374-93c5-1f56e1be771e',
      name: 'John Quincy Adams',
      user_id: '11111111-1111-1111-1111-111111111111',
      properties: [
        {
          id: '3a38f85b-7ce9-43bd-81f9-7dd0c7197a56',
          type_property_id: '55555555-5555-5555-5555-555555555555',
          record_type_property_label: 'Email',
          item_value: 'quincy@gmail.com'
        },
        {
          id: 'c758facf-a46b-41e1-aae4-04420b86c548',
          type_property_id: '66666666-6666-6666-6666-666666666666',
          record_type_property_label: 'Title',
          item_value: 'Tổng thống Luôn'
        },
        {
          id: 'cbd30e88-3a2d-4cc6-8ad0-99e7cf980164',
          type_property_id: '77777777-7777-7777-7777-777777777777',
          record_type_property_label: 'Company',
          item_value: 'Hoa Kỳ'
        },
        {
          id: '7395f179-3f83-432b-bebe-76070c9375ba',
          type_property_id: '88888888-8888-8888-8888-888888888888',
          record_type_property_label: 'Phone',
          item_value: '911'
        }
      ]
    },
    {
      id: 'da795638-2dfc-47ae-8d93-941f7866d810',
      name: 'John Adams',
      user_id: '11111111-1111-1111-1111-111111111111',
      properties: [
        {
          id: '24e4f015-6ed0-4463-9675-fd40217d8b88',
          type_property_id: '55555555-5555-5555-5555-555555555555',
          record_type_property_label: 'Email',
          item_value: 'adam@gmail.com'
        },
        {
          id: '8feb4c30-572f-49d0-a907-85025120f463',
          type_property_id: '66666666-6666-6666-6666-666666666666',
          record_type_property_label: 'Title',
          item_value: 'Tổng thống'
        },
        {
          id: '478bcfe7-7a9b-4a61-93ce-4cf64c2b6576',
          type_property_id: '77777777-7777-7777-7777-777777777777',
          record_type_property_label: 'Company',
          item_value: 'New Company'
        },
        {
          id: '4fa77ae1-1af2-4ec4-8893-b8e604766dc6',
          type_property_id: '88888888-8888-8888-8888-888888888888',
          record_type_property_label: 'Phone',
          item_value: '123456789'
        }
      ]
    }
  ];

  console.log(formatRecords(test));

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
