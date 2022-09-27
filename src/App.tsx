import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
