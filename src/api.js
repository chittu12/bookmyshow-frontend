import axios from 'axios'

const api = axios.create({ baseURL: 'https://bookmyshow-backend1-production.up.railway.app' });



// add token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
