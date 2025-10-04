import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Shows(){
  const [shows, setShows] = useState([])
  const [movieId, setMovieId] = useState('')
  const [theaterId, setTheaterId] = useState('')
  const [time, setTime] = useState('2025-10-03T18:30')
  const [movies, setMovies] = useState([])
  const [theaters, setTheaters] = useState([])

  async function fetchData(){
    try{
      const [sRes, mRes, tRes] = await Promise.all([
        api.get('/show'), api.get('/movie'), api.get('/theater')
      ])
      setShows(sRes.data || [])
      setMovies(mRes.data || [])
      setTheaters(tRes.data || [])
    }catch(err){ console.error(err) }
  }

  useEffect(()=>{ fetchData() }, [])

  async function add(e){
    e.preventDefault()
    try{
      await api.post('/show/post', {
        startTime: time,
        movie: { id: Number(movieId) },
        theater: { id: Number(theaterId) }
      })
      setMovieId(''); setTheaterId(''); fetchData()
    }catch(err){ console.error(err) }
  }

  return (
    <div>
      <h2 className="text-xl mb-3">Shows</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Add Show</h3>
          <form onSubmit={add} className="space-y-2">
            <select required value={movieId} onChange={e=>setMovieId(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Movie</option>
              {movies.map(m=> <option key={m.id} value={m.id}>{m.title}</option>)}
            </select>
            <select required value={theaterId} onChange={e=>setTheaterId(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Theater</option>
              {theaters.map(t=> <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)} className="w-full p-2 border rounded" />
            <button className="px-3 py-1 bg-blue-600 text-white rounded">Add Show</button>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Shows List</h3>
          <div className="space-y-2">
            {shows.length===0 && <div className="text-sm text-gray-500">No shows yet</div>}
            {shows.map(s=> (
              <div key={s.id} className="p-2 border rounded">
                <div className="font-semibold">Show #{s.id}</div>
                <div className="text-sm">Movie: {s.movie?.title || s.movie}</div>
                <div className="text-sm">Theater: {s.theater?.name || s.theater}</div>
                <div className="text-sm text-gray-600">{s.startTime || s.start_time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
