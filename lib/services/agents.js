const _ = require('lodash')
const agents = []

function addNode (socket, node) {
  agents.push({
    node,
    socket
  })

  socket.on('disconnect', () => {
    _.remove(agents, o => o.socket.id === socket.id)
    console.log(agents)
  })

  socket.on('cpu', cpu => {
    node.cpu = cpu
  })
  socket.on('memory', memory => {
    node.memory = memory
  })

  socket.on('containers', containers => {
    node.containers = containers
  })
}

// general info for nodes
function getNodes () {
  return _.map(agents, o => o.node)
}

// inspect the node containers
function getNode(id) {
  const agent = _.find(agents, o => o.node.id === id)

  return agent.node
}

function getContainers(nodeId) {
  const node = getNode(nodeId)

  return node.containers
}

function getContainer(nodeId, id) {
  const containers = getContainers(nodeId)

  const container = _.find(containers, o => o.uuid === id)

  return container
}

module.exports = {
  addNode,
  getNodes,
  getNode,
  getContainers,
  getContainer
}
