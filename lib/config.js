const config = require('nconf-camel-cased')({
  env: {
    separator: '__',
    lowerCase: true
  },
  file: {
    file: 'config.json',
    dir: '../',
    search: true
  }
})

config.defaults = {
  server: {
    port: 3000,
    host: 'localhost'
  },
  dockerCloud: {
    username: 'someUsername',
    apiKey: 'someKey'
  }
}

module.exports = {
  server: config.get('server'),
  dockerCloud: config.get('dockerCloud')
}
