const Docker = require('dockerode')

function addNode (socket, node) {
  const docker = new Docker({ socketPath: '/var/run/docker.sock' })

  console.log(docker)
}

module.exports = {
  addNode
}
