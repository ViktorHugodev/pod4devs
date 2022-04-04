import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://pod4devs.vercel.app/api/server'
})