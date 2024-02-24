import { Route, Routes } from 'react-router-dom';
import Cheatsheet from './pages/Cheatsheet/Cheatsheet';
import TypeManager from './pages/TypeManager/TypeManager';

function App() {
  return (
    // <div>
    //   <Cheatsheet />
    // </div>

    <Routes>
      <Route path='/' element={<Cheatsheet />} />
      <Route path='/type-manager' element={<TypeManager />} />
    </Routes>
  );
}

export default App;
