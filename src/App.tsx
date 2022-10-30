import { Routes, Route } from 'react-router-dom';

import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Homepage from './components/Homepage/Homepage';
import DevList from './components/DevList/DevList';
import FormDev from './components/FormDev/FormDev';
import FormClient from './components/FormClient/FormClient';
import Register from './components/Register/Register';
import DevProfileV2 from './components/DevProfile/DevProfileV2';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dev-profile/:devID" element={<DevProfileV2 />} />
        {/* <Route path="dev-pro/:devID" element={<DevDetail />} />*/}        
        <Route path="developers" element={<DevList />} />
        <Route path="/registerdev" element={<FormDev />} />
        <Route path="/registerclient" element={<FormClient />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App