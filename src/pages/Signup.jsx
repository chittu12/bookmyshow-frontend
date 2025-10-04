import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Signup(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try{
      await api.post('/auth/signup', { email, password })
      setMsg('Signup successful. Please login.')
      setTimeout(()=>navigate('/login'), 1200)
    }catch(err){
      setMsg(err.response?.data?.message || err.message || 'Signup failed')
    }finally{ setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl mb-4">Signup</h2>
      {msg && <div className="bg-green-50 text-green-700 p-2 mb-3 rounded">{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
        <button disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">{loading? 'Please wait...' : 'Signup'}</button>
      </form>
    </div>
  )
}