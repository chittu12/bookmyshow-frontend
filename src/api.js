import axios from 'axios'

const api = axios.create({ baseURL: 'http://192.168.0.103:8080/api' })


// add token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
