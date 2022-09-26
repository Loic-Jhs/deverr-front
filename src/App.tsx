import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/register" />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
