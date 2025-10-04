import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Movies from './pages/Movies'
import Theaters from './pages/Theaters'
import Shows from './pages/Shows'
import Booking from './pages/Booking'

function PrivateRoute({ children }){
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/movies" element={<PrivateRoute><Movies /></PrivateRoute>} />
          <Route path="/theaters" element={<PrivateRoute><Theaters /></PrivateRoute>} />
          <Route path="/shows" element={<PrivateRoute><Shows /></PrivateRoute>} />
          <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  )
}