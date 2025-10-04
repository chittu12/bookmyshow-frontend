import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function logout(){
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
    <div className="flex items-center gap-2 font-bold text-lg">
  <img
    src="https://getlogo.net/wp-content/uploads/2020/04/bookmyshow-logo-vector.png"
    alt="BookMyShow Logo"
  className="w-15 h-12 object-contain align-middle"
  />
</div>

        <div className="space-x-4">
          <Link to="/movies" className="hover:underline">Movies</Link>
          <Link to="/theaters" className="hover:underline">Theaters</Link>
          <Link to="/shows" className="hover:underline">Shows</Link>
          <Link to="/booking" className="hover:underline">Booking</Link>
          {token ? (
            <button onClick={logout} className="ml-4 px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          ) : (
            <>
              <Link to="/login" className="ml-4 px-3 py-1 bg-blue-500 text-white rounded">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}