import axios from 'axios'

export async function request(url: string, method: 'GET' | 'POST', payload: any, headers?: any) {
  let getBody: any
  let postBody: any

  if (method.toUpperCase() === 'GET') getBody = payload
  else postBody = payload

  // return axios()
  return await axios({
    url: url,
    method: method.toUpperCase(),
    params: getBody,
    data: postBody,
    headers: headers
  })
}
