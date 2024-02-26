import { Suspense } from 'react';
import LogIn from './pages/LogIn/LogIn';
import { Route, Routes } from 'react-router-dom';
import Cheatsheet from './pages/Cheatsheet/Cheatsheet';
import TypeManager from './pages/TypeManager/TypeManager';

function App() {
  return (
    <div>
      <Suspense>
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/cheatsheet' element={<Cheatsheet />} />
          <Route path='/type-manager' element={<TypeManager />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
