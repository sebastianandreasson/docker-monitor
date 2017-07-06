const _ = require('lodash')
const agents = []

function addNode (socket, newNode) {
  agents.push({
    node: newNode,
    socket
  })

  socket.on('disconnect', () => {
    _.remove(agents, o => o.socket.id === socket.id)
    console.log(agents)
  })
}

// general info for nodes
function getNodes () {
  return _.map(agents, o => o.node)
}

// inspect the node containers
function getNode(id) {
  const agent = _.find(agents, o => o.node.id === id)

  return agent
}

module.exports = {
  addNode,
  getNodes,
  getNode
}
