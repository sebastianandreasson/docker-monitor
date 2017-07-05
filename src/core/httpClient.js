import config from '../constants/config'
import _ from 'lodash'

function handleErrors (response) {
  if (response.ok) {
    return response
  }

  return Promise.reject(response)
}

function generic (method, route, payload, opts) {
  let options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method,
    body: payload ? JSON.stringify(payload) : null
  }

  if (localStorage.token) {
    options = _.merge({}, options, {
      headers: _.merge(options.headers, {
        'Authorization': `Bearer ${localStorage.token}`
      })
    })
  }

  let url = `${config.BASE_URL}${route}`

  if (opts && opts.local) {
    url = route
  }

  return fetch(url, options)
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => Promise.reject(error))
}

export function get (route, opts) {
  return generic('GET', route, null, opts)
}

export function post (route, payload, opts) {
  return generic('POST', route, payload, opts)
}

export function put (route, payload, opts) {
  return generic('PUT', route, payload, opts)
}

export function remove (route, payload, opts) {
  return generic('DELETE', route, payload, opts)
}


export default {
  remove,
  get,
  post,
  put
}
