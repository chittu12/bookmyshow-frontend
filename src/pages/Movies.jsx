import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../api'

export default function Movies() {
   const user = JSON.parse(localStorage.getItem('user'))
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [du, setDuration] = useState('')
  const [lan, setLanguage] = useState('')
    const [rdate, setReleaseDate] = useState('')
    const [con, setCountry] = useState('') 
     const [gen, setGenre] = useState('')
  const [file, setFile] = useState(null)
  const [editingId, setEditingId] = useState(null)


  if (!user || !Array.isArray(user.roles) || !user.roles.includes('ROLE_ADMIN')) {
  console.log('User not admin or not logged in', user);
  return <Navigate to="/unauthorized" />;
}

  // Fetch movies from backend
  async function fetchMovies() {
    try {
      const res = await api.get('/movie/get')
      setMovies(res.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchMovies() }, [])

  // Add movie
  async function add(e) {
    e.preventDefault()

    if (!file) {
      alert('Please select a file!')
      return
    }

    const formData = new FormData()
    const movieData = {
      title,
      description: desc,
      durationmins: du,
      language: lan,
      releasedate: rdate,
      country: con,
      genre: gen
    }

    formData.append('movie', JSON.stringify(movieData))
    formData.append('file', file)

    try {
      await api.post('/movie/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      // Reset form
      setTitle('')
      setDesc('')
      setDuration('')
      setLanguage('')
      setReleaseDate('')
      setCountry('')
      setGenre('')
      setFile(null)
      
      fetchMovies()
    } catch (err) {
      console.error(err)
    }
  }

function editMovie(m) {
  setEditingId(m.id)         // ye id submit ke waqt use hogi
  setTitle(m.title)
  setDesc(m.description)
  setDuration(m.durationmins)
  setLanguage(m.language)
  setReleaseDate(m.releasedate)
  setCountry(m.country)
  setGenre(m.genre)
  setFile(null)              // optional, keep old file unless new selected
}



async function submitMovie(e) {
  e.preventDefault()

  const formData = new FormData()
  const movieData = {
    title,
    description: desc,
    durationmins: du,
    language: lan,
    releasedate: rdate,
    country: con,
    genre: gen
  }

  formData.append('movie', JSON.stringify(movieData))
  if (file) formData.append('file', file)

  try {
    if (editingId) {
      // ✅ Update existing movie
      await api.put(`/movie/put/${editingId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } else {
      // ✅ Add new movie
      await api.post('/movie/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }

    // Reset form
    setEditingId(null)
    setTitle('')
    setDesc('')
    setDuration('')
    setLanguage('')
    setReleaseDate('')
    setCountry('')
    setGenre('')
    setFile(null)
    fetchMovies()
  } catch (err) {
    console.error(err)
  }
}


 async function deleteMovie(id) {
    if (!window.confirm("Are you sure you want to delete this movie?")) return
    try {
      await api.delete(`/movie/delete/${id}`)
      fetchMovies()
    } catch (err) {
      console.error(err)
    }
  }



  return (
    <div>
      <h2 className="text-xl mb-3">Movies</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Add Movie Form */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Add Movie</h3>
  <form onSubmit={submitMovie} className="space-y-2">
  <input
    required
    value={title}
    onChange={e => setTitle(e.target.value)}
    placeholder="Title"
    className="w-full p-2 border rounded"
  />
  <textarea
    value={desc}
    onChange={e => setDesc(e.target.value)}
    placeholder="Description"
    className="w-full p-2 border rounded"
  />
  <input
    required
    value={du}
    onChange={e => setDuration(e.target.value)}
    placeholder="Duration"
    className="w-full p-2 border rounded"
  />
  <input
    required
    value={lan}
    onChange={e => setLanguage(e.target.value)}
    placeholder="Language"
    className="w-full p-2 border rounded"
  />
  <input
    type="date"
    required
    value={rdate}
    onChange={e => setReleaseDate(e.target.value)}
    className="w-full p-2 border rounded"
  />
  <input
    required
    value={con}
    onChange={e => setCountry(e.target.value)}
    placeholder="Country"
    className="w-full p-2 border rounded"
  />
  <input
    required
    value={gen}
    onChange={e => setGenre(e.target.value)}
    placeholder="Genre"
    className="w-full p-2 border rounded"
  />
  <input
    type="file"
    onChange={e => setFile(e.target.files[0])}
    className="w-full p-2 border rounded"
  />

  <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
    {editingId ? "Update" : "Add"}
  </button>
</form>


        </div>



        <div className="bg-white p-4 rounded shadow">
  <h3 className="font-semibold mb-2">Movies List</h3>
  <div className="space-y-2">
    {movies.length === 0 && <div className="text-sm text-gray-500">No movies yet</div>}
    {movies.map(m => (
      <div key={m.id} className="p-2 border rounded flex gap-3 items-center">
        {/* ✅ Movie Poster */}
        <img
        src={`http://192.168.0.103:8080/api/movie/get/movieimage/${m.id}`}
          alt={m.title}
          className="w-32 h-32 object-cover rounded"
          onError={(e) => e.target.style.display = 'none'} 
        />

        {/* Movie Info */}
        <div>
          <div className="font-semibold">{m.title}</div>
          <div className="text-sm text-gray-600">{m.description}</div>
          <div className="text-xs text-gray-500">Released: {m.releasedate}</div>
        </div>

         <div className="flex flex-col gap-1">
<button
  onClick={() => editMovie(m)}
  className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
>
  Edit
</button>


                  <button onClick={() => deleteMovie(m.id)} className="px-2 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
                </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  )
}
