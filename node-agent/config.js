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
  monitor: {
    host: 'localhost',
    port: 3000
  }
}

module.exports = {
  monitor: config.get('monitor')
}
