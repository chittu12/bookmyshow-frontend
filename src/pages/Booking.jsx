import React, { useEffect, useState } from 'react'
import api from '../api'
import SeatGrid from '../components/SeatGrid'

export default function Booking(){
  const [shows, setShows] = useState([])
  const [selectedShow, setSelectedShow] = useState(null)
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])

  async function fetch(){
    try{
      const res = await api.get('/show')
      setShows(res.data || [])
    }catch(err){ console.error(err) }
  }

  useEffect(()=>{ fetch() }, [])

  async function loadSeats(show){
    setSelectedShow(show)
    try{
      const res = await api.get(`/showseat/show/${show.id}`) // try this endpoint
      setSeats(res.data || [])
      setSelectedSeats([])
    }catch(err){
      console.error(err)
      setSeats([])
    }
  }

  function toggleSeat(seat){
    const exists = selectedSeats.find(s=>s.id===seat.id)
    if (exists) setSelectedSeats(selectedSeats.filter(s=>s.id!==seat.id))
    else setSelectedSeats([...selectedSeats, seat])
  }

  async function book(){
    if (!selectedShow) return alert('Select show')
    if (selectedSeats.length===0) return alert('Select seats')
    try{
      const payload = {
        show: { id: selectedShow.id },
        seats: selectedSeats.map(s=>({ id: s.id }))
      }
      await api.post('/booking/post', payload)
      alert('Booking created')
      loadSeats(selectedShow)
    }catch(err){ console.error(err); alert('Booking failed') }
  }

  return (
    <div>
      <h2 className="text-xl mb-3">Booking</h2>
      <div className="mb-4">
        <select onChange={e=>{
          const id = Number(e.target.value)
          const s = shows.find(x=>x.id===id)
          if (s) loadSeats(s)
        }} className="p-2 border rounded">
          <option value="">Select Show</option>
          {shows.map(s=> <option key={s.id} value={s.id}>#{s.id} - {s.movie?.title || s.movie}</option>)}
        </select>
      </div>

      {selectedShow && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Seats for show #{selectedShow.id}</h3>
          <SeatGrid seats={seats} onToggle={toggleSeat} />
          <div className="mt-3">
            <button onClick={book} className="px-3 py-1 bg-indigo-600 text-white rounded">Book ({selectedSeats.length})</button>
          </div>
        </div>
      )}
    </div>
  )
}
