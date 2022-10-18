import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Register/Register';
import DevDetail from './components/DevDetail/DevDetail';
import DevList from './components/DevList/DevList';
import FormDev from './components/FormDev/FormDev';
import FormClient from './components/FormClient/FormClient';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="dev-profile/:userId" element={<DevDetail />} />
        <Route path="developpeurs" element={<DevList />} />
        <Route path="/registerdev" element={<FormDev />} />
        <Route path="/registerclient" element={<FormClient />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App