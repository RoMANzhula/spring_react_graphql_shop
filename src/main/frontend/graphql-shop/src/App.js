import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/home';
import Navbar from './components/navbar';
import Register from './pages/register';
import Login from './pages/login';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
