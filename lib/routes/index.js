const { addNode, getNodes } = require('../services/agents')

function nodes (req, res) {
  console.log('get nodes')
  res.send({
    nodes: getNodes()
  })
}

module.exports = (app, io) => {
  // app.get('/docker-cloud/*', dockerCloud)

  app.get('/nodes', nodes)

  io.on('connection', socket => {
    socket.on('register-node', node => addNode(socket, node))
  })
}
