const _ = require('lodash')

function setNodeId(cloudNodes, agentNode) {
  _.forEach(cloudNodes, cloudNode => {
    _.forEach(cloudNode.containers, container => {
      const matchedContainer = _.find(agentNode.containers, agentContainer =>
          agentContainer.Id === container.docker_id)
      if (matchedContainer) {
        agentNode.uuid = cloudNode.uuid
      }
    })
  })
}

module.exports = {
  setNodeId
}
