import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://raw.githubusercontent.com/ViktorHugodev/pod4devs/main/db.json'
})