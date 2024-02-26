import { Suspense } from 'react';
import LogIn from './pages/LogIn/LogIn';
import { Route, Routes } from 'react-router-dom';
import Cheatsheet from './pages/Cheatsheet/Cheatsheet';

function App() {
  return (
      <div>
    <Suspense>
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/cheatsheet' element={<Cheatsheet />} />
          {/* <Route path='*' element={<NotFoundPage />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
