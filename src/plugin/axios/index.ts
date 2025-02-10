import axios from 'axios'

const token = localStorage.getItem('token')

const instance = axios.create({
  baseURL: 'https://social-media-backend-bwrz.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  },
})

export default instance
