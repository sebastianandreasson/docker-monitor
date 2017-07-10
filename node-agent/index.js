const appmetrics = require('appmetrics')
const monitor = appmetrics.monitor()

const { monitor: { host, port } } = require('./config')
const Docker = require('dockerode')
const socket = require('socket.io-client')(`http://${host}:${port}`)

const docker = new Docker()

function getContainerStats() {
  docker.listContainers((err, containers) => {
    containers.forEach((container, i) => {
      docker.getContainer(container.Id).stats(function(err, stream) {
        if (err) console.error(err)
        stream.on('data', data => {
          const stats = JSON.parse(data.toString())
          if (i === 0) {
            stats.id = 'c8dcc8d21072cf3946457b3b925c95458656e9be8a53cc5d39865271db60d37a'
          }
          socket.emit('container-stats', stats)
        })
      })
    })
  })
}
getContainerStats()

socket.on('connect', () => {
  docker.listContainers((err, containers) => {
    containers[0].Id = 'c8dcc8d21072cf3946457b3b925c95458656e9be8a53cc5d39865271db60d37a'
    socket.emit('register-node', {
      containers: containers,
    })
  })
})

monitor.on('cpu', data => socket.emit('cpu', data))
monitor.on('memory', data => socket.emit('memory', data))

socket.on('containers', (callback) => {
  docker.listContainers((err, containers) => callback(containers))
})

socket.on('container', (id, callback) => {
  const container = docker.getContainer(id)

  container.inspect((err, data) => callback(data))
})

socket.on('disconnect', (err) => {
  console.log(err)
})
