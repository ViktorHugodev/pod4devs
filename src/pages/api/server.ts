import server from '../../../server.json'
import { NextApiRequest, NextApiResponse } from "next";

function apiNext(request: NextApiRequest, response: NextApiResponse){
  
  response.json(server.episodes)
}
export default apiNext