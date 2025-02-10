import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-media-backend-bwrz.onrender.com/',
  headers: { 'Content-Type': 'application/json' },
})

export default instance
