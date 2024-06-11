import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminRoute from './components/AdminRoute';
import AddUser from './pages/addUser/AddUser';
import UsersList from './pages/allUsers/AllUsers';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/admin/allUsers" element={<AdminRoute><UsersList /></AdminRoute>} />
        <Route path="/admin/addUser" element={<AdminRoute><AddUser /></AdminRoute>} />
      </Routes>
    </div>
  );
}

export default App;
