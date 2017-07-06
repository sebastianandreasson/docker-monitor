const fetch = require('node-fetch')
const { addNode } = require('../services/nodes')
const { dockerCloud: { username, apiKey } } = require('../config')

function dockerCloud (path) {
  const options = {
    headers: {
      Authorization: `Basic ${new Buffer(username + ':' + apiKey).toString('base64')}`
    }
  }

  return fetch(`https://cloud.docker.com/${path}`, options)
    .then(res => res.json())
    .catch(console.err)
}



function nodes (req, res, next) {
  console.log('get nodes')
  dockerCloud('/api/infra/v1/node')
    .then(response => {
      res.send({
        nodes: response.objects
      })
    })
    .catch(err => next(err))
}

module.exports = (app, io) => {
  // app.get('/docker-cloud/*', dockerCloud)

  app.get('/nodes', nodes)

  io.on('connection', (socket) => {
    socket.on('register-node', (node) => addNode(socket, node))
  })
}
