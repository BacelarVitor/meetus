const baseUrl = 'https://meetus-5dafa-default-rtdb.firebaseio.com/'
const get = (resorce, headers = {}) => {
  return fetch(getUrl(resorce), { method: 'GET', headers});
}

const getUrl = (resource) => `${baseUrl}${resource}.json`;

const post = (resource, body, headers = {'Content-Type': 'application/json'}) => {
  return fetch(getUrl(resource), { method: 'POST', headers, body: JSON.stringify(body)});
}

const put = (resource, id, body, headers = {'Content-Type': 'application/json'}) => {
  return fetch(getUrl(`${resource}/${id}`), { method: 'PUT', headers, body: JSON.stringify(body)});
}

const patch = (resource, id, body, headers = {'Content-Type': 'application/json'}) => {
  return fetch(getUrl(`${resource}/${id}`), { method: 'PUT', headers, body: JSON.stringify(body)});
}

const deleteMeetup = (resource, id, headers = {'Content-Type': 'application/json'}) => {
  return fetch(getUrl(`${resource}/${id}`), { method: 'DELETE', headers });
}


const http = {
  baseUrl,
  get,
  post,
  put,
  delete: deleteMeetup
}

export default http;