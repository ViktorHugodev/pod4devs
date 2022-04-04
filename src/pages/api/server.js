import server from '../../../db.json'

function apiNext(request, response){
  response.json(server)
}
export default apiNext