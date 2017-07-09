const appmetrics = require('appmetrics')
const monitor = appmetrics.monitor()

const { monitor: { host, port } } = require('./config')
const Docker = require('dockerode')
const socket = require('socket.io-client')(`http://${host}:${port}`)

const docker = new Docker()

socket.on('connect', () => {
  docker.listContainers((err, containers) => {
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
