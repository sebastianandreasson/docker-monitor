const express = require('express')
const { urlencoded, json } = require('body-parser')
const { readFileSync } = require('fs')
// const routes = require('./routes')

const NODE_ENV = process.env.NODE_ENV || 'development'

const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))

// Different middleware for serving the react files if running production or development
if (NODE_ENV === 'development') {
  const webpack = require('webpack')
  const config = require('../webpack.config.dev')

  const compiler = webpack(config)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use('/static', express.static('dist'))
}

const index = readFileSync(`${__dirname}/../index.html`, { encoding: 'utf8' })
// routes.register(app)

app.get('*', (_req, res) => res.send(index))

const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
