import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import Login from './pages/Login';
import Home from './pages/Home';



function App() {
  return (
    <div className="App">

      


      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookingcar" element={<BookingCar />} />
      </Routes>
      
    </div>
  );
} 

export default App;
