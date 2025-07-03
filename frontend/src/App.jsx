import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Vehicles from './components/Vehicles';
import Users from './components/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;