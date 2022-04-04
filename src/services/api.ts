import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://github.com/ViktorHugodev/pod4devs/blob/main/server.json'
})