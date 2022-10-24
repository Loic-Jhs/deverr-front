import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { defaultUser } from "./types/defaultUser";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Register/Register';
import DevDetail from './components/DevDetail/DevDetail';
import DevList from './components/DevList/DevList';
import FormDev from './components/FormDev/FormDev';
import FormClient from './components/FormClient/FormClient';
import Login from "./components/Login/Login";
import User from './types/User';
import './App.css'


function App() {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <div className="App">
      <Header />
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/devprofile/:userId" element={<DevDetail />} />
          <Route path="/developers" element={<DevList />} />
          <Route path="/registerdev" element={<FormDev />} />
          <Route path="/registerclient" element={<FormClient />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContext.Provider>
      <Footer />
    </div>
  )
}

export default App