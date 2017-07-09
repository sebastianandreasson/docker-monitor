const {
  addNode,
  getContainers
} = require('../services/agents')
const {
  getStacks,
  getServices,
  getCloudNodesWithContainers
} = require('../services/cloud')
const {
  getStats
} = require('../services/stats')
const {
  setNodeId
} = require('../services/merge')

function nodes (req, res) {
  getCloudNodesWithContainers()
    .then(cloudNodes => {
      res.send({
        nodes: cloudNodes
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

function stats (req, res) {
  res.send({
    stats: getStats()
  })
}

function updateNode (node) {
  getCloudNodesWithContainers()
    .then(cloudNodes => setNodeId(cloudNodes, node))
}

module.exports = (app, io) => {
  // app.get('/docker-cloud/*', dockerCloud)

  app.get('/nodes', nodes)

  app.get('/containers', containers)

  app.get('/stacks', stacks)

  app.get('/services', services)

  app.get('/stats', stats)

  io.on('connection', socket => {
    socket.on('register-node', node => addNode(socket, node, updateNode))
  })
}
