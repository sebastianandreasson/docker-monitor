const Docker = require('dockerode')
const socket = require('socket.io-client')('http://localhost:3000')

const docker = new Docker()

socket.on('connect', () => {

  socket.emit('register-node', {})
})

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
