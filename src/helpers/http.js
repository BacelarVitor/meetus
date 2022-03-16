const baseUrl = 'https://meetus-5dafa-default-rtdb.firebaseio.com/'
const get = (resorce, headers = {}) => {
  return fetch(`${baseUrl}/${resorce}.json`, {headers, method: 'GET'});
}

const post = (resorce, body, headers = {'Content-Type': 'application/json'}) => {
  return fetch(`${baseUrl}${resorce}.json`, {method: 'POST', headers, body: JSON.stringify(body)});
}

const http = {
  baseUrl,
  get,
  post
}

export default http;