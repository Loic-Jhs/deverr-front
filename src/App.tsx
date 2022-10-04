import { Routes, Route } from 'react-router-dom';

import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homepage from './components/Homepage/Homepage';
import Register from './components/Register/Register';
import FormDev from './components/FormDev/FormDev';
import FormClient from './components/FormClient/FormClient';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerdev" element={<FormDev />} />
        <Route path="/registerclient" element={<FormClient />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
