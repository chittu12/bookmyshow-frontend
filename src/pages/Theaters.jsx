import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Theaters(){
  const [theaters, setTheaters] = useState([])
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  async function fetch(){
    try{ const res = await api.get('/theater'); setTheaters(res.data || []) }catch(err){ console.error(err) }
  }
  useEffect(()=>fetch(), [])

  async function add(e){
    e.preventDefault()
    try{
      await api.post('/theater/post', { name, totalcinemahalls: 1, location })
      setName(''); setLocation(''); fetch()
    }catch(err){ console.error(err) }
  }

  return (
    <div>
      <h2 className="text-xl mb-3">Theaters</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Add Theater</h3>
          <form onSubmit={add} className="space-y-2">
            <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded" />
            <input required value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="w-full p-2 border rounded" />
            <button className="px-3 py-1 bg-green-600 text-white rounded">Add</button>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">List</h3>
          <div className="space-y-2">
            {theaters.length===0 && <div className="text-sm text-gray-500">No theaters yet</div>}
            {theaters.map(t=> (
              <div key={t.id} className="p-2 border rounded">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-600">{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}