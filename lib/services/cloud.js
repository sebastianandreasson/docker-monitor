const fetch = require('node-fetch')
const { dockerCloud: { username, apiKey } } = require('../config')
let nodes = []
let stacks = []
let services = []

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

function getContainers(nodeId) {
  return dockerCloud(`/api/app/v1/container?node__uuid=${nodeId}`)
    .then(response => response.objects)
    .catch(err => next(err))
}

// general info for nodes
function getCloudNodes () {
  return dockerCloud('/api/infra/v1/node')
    .then(response => response.objects)
    .then(objects => {
      nodes = objects
      return nodes
    })
    .catch(err => next(err))
}

function getCloudNodesWithContainers() {
  return getCloudNodes()
    .then(nodes => {
      return Promise
        .all(nodes.map(node => getContainers(node.uuid)))
        .then(res => {
          return nodes.map((node, i) => {
            node.containers = res[i]
            return node
          })
        })
    })
}

function getStacks () {
  return dockerCloud('/api/app/v1/stack')
    .then(response => response.objects)
    .then(objects => {
      stacks = objects
      return stacks
    })
    .catch(err => next(err))
}

function getServices () {
  return dockerCloud('/api/app/v1/service')
    .then(response => response.objects)
    .then(objects => {
      services = objects
      return services
    })
    .catch(err => next(err))
}

module.exports = {
  getCloudNodesWithContainers,
  getCloudNodes,
  getStacks,
  getServices
}
