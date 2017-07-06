const fetch = require('node-fetch')
const { addNode } = require('../services/nodes')
const { dockerCloud: { username, apiKey } } = require('../config')

function dockerCloud (req, res, next) {
  const path = req.originalUrl.replace('/docker-cloud/', '')
  const options = {
    headers: {
      Authorization: `Basic ${new Buffer(username + ':' + apiKey).toString('base64')}`
    }
  }

  fetch(`https://cloud.docker.com/${path}`, options)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => next(err))
}

module.exports = (app, io) => {
  app.get('/docker-cloud/*', dockerCloud)

  io.on('connection', (socket) => {
    socket.on('register-node', (node) => addNode(socket, node))
  })
}
