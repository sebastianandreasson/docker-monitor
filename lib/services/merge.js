const _ = require('lodash')

function mergeNodes ({ cloudNodes, agentNodes }) {
  cloudNodes[0].containers = cloudNodes[0].containers.concat([
    {
      docker_id: '501b1c4ac7b7174d44213c447494b163bbcaa838f8ed6207631cf41920b5220c'
    },
    {
      docker_id: 'c08409937c2ba16b5ab4d6f8eadd3a3a61176d3bb4ba2f4409b1e4c88d6da041'
    },
    {
      docker_id: '99aea8665547b60d2ce43207d5e610144bd91ae7f1e13851ea6fbd0cd958d53d'
    },
    {
      docker_id: '0ec2c2a9e1adff7bec54466ba718fb34d9ccff4ec436e90f127600e76d57c82b'
    }
  ])

  _.forEach(cloudNodes, cloudNode => {
    _.forEach(cloudNode.containers, container => {
      _.forEach(agentNodes, agentNode => {
        const matchedContainer = _.find(agentNode.containers, agentContainer =>
            agentContainer.Id === container.docker_id)
        if (matchedContainer) {
          container.meta = matchedContainer
          cloudNode.meta = {
            cpu: agentNode.cpu,
            memory: agentNode.memory
          }
          foundNode = true
        }
      })
    })
  })

  return cloudNodes
}

module.exports = {
  mergeNodes
}
