const appmetrics = require('appmetrics')
const monitor = appmetrics.monitor()

const { monitor: { host, port } } = require('./config')
const Docker = require('dockerode')
const socket = require('socket.io-client')(`http://${host}:${port}`)

const docker = new Docker()

function sendContainerStats(containers) {
  containers.forEach(container => {
    docker.getContainer(container.Id).stats({ stream: false }, function(err, data) {
      if (err) console.error(err)
      socket.emit('container-stats', data)
    })
  })
}

let interval
socket.on('connect', () => {
  docker.listContainers((err, containers) => {
    socket.emit('register-node', {
      containers: containers,
    })

    sendContainerStats(containers)

    clearInterval(interval)
    interval = setInterval(() => {
      sendContainerStats(containers)
    }, 15000)
  })
})

monitor.on('cpu', data => socket.emit('cpu', data))
monitor.on('memory', data => socket.emit('memory', data))

socket.on('containers', (callback) => {
  docker.listContainers((err, containers) => callback(containers))
})

socket.on('top', (data, callback) => {
  docker.getContainer(data.id).top({ ps_args: 'aux' }, (err, data) => {
    callback(data)
  })
})

socket.on('container', (id, callback) => {
  const container = docker.getContainer(id)

  container.inspect((err, data) => callback(data))
})

socket.on('disconnect', (err) => {
  console.log(err)
})
