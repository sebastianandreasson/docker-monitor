const {
  addNode,
  getNodes,
  getContainers
} = require('../services/agents')
const {
  getStacks,
  getServices,
  getCloudNodesWithContainers
} = require('../services/cloud')
const { mergeNodes } = require('../services/merge')

function nodes (req, res) {

  getCloudNodesWithContainers()
    .then(cloudNodes => {
      const nodes = mergeNodes({
        cloudNodes,
        agentNodes: getNodes()
      })
      res.send({
        nodes
      })
    })
}

function containers (req, res) {
  res.send({
    containers: getContainers()
  })
}

function stacks (req, res) {
  res.send({
    stacks: getStacks()
  })
}

function services (req, res) {
  res.send({
    services: getServices()
  })
}


module.exports = (app, io) => {
  // app.get('/docker-cloud/*', dockerCloud)

  app.get('/nodes', nodes)

  app.get('/containers', containers)

  app.get('/stacks', stacks)

  app.get('/services', services)

  io.on('connection', socket => {
    socket.on('register-node', node => addNode(socket, node))
  })
}
