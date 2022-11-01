import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import DevList from './components/DevList/DevList';
import FormDev from './components/FormDev/FormDev';
import FormClient from './components/FormClient/FormClient';
import Register from './components/Register/Register';
import DevProfile from './components/DevProfile/DevProfile';
import Login from "./components/Login/Login";
import User from './types/User';
import './App.css'
import { UserAsContext } from './types';
import { authContext } from './contexts/authContext';
import DevOrder from './components/DevOrder/DevOrder';

function App() {
  const { auth} = useContext(authContext)
  const [isLogged, setIsLogged] = useState(false)

  return (
    <div className="App">
        <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dev-profile/:devID" element={<DevProfile />} />
            <Route path="/dev-order/:devID" element={<DevOrder />} />
            <Route path="developers" element={<DevList />} />
            <Route path="/registerdev" element={<FormDev />} />
            <Route path="/registerclient" element={<FormClient />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        <Footer />
    </div>
  )
}

export default App