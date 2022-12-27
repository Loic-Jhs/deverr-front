import FormClient from './components/FormClient/FormClient';
import DevDetails from './components/DevDetails/DevDetails';
import DevOrder from './components/DevOrder/DevOrder';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Register/Register';
import DevList from './components/DevList/DevList';
import FormDev from './components/FormDev/FormDev';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from "./components/Login/Login";
import ForgotPassword from './components/Password/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Password/ResetPassword/ResetPassword';
import ClientProfile from './components/ClientProfile/ClientProfile';
import Profile from './components/Profile/Profile';
import './App.css'


function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dev-profile/:devID" element={<DevDetails />} />
        <Route path="/my-profile" element={<ClientProfile />} />
        <Route path="/dev-order/:devID" element={<DevOrder />} />
        <Route path="developers" element={<DevList />} />
        <Route path="/registerdev" element={<FormDev />} />
        <Route path="/registerclient" element={<FormClient />} />
        <Route path="/login" element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App