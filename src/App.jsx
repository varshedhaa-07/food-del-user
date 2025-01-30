import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { Route, Routes } from 'react-router';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { ToastContainer } from "react-toastify";


const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
    </>

  )
}

export default App;
