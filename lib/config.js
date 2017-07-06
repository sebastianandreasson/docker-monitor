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
    username: 'sebastianandreas',
    apiKey: 'b342ebf3-cbb6-4293-a1bf-e696b20a32c7'
  }
}

module.exports = {
  server: config.get('server'),
  dockerCloud: config.get('dockerCloud')
}
