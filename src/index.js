import React from 'react'
import ReactDOM from 'react-dom'
import {
  applyRouterMiddleware,
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router'
import { useScroll } from 'react-router-scroll'

import App from './views/App'
import NotFound from './views/NotFound'
import StartContainer from './views/Start/StartContainer'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
const store = configureStore()

// Import tap events
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

ReactDOM.render((
  <Provider store={store}>
    <Router
    history={browserHistory}
    render={applyRouterMiddleware(useScroll())}>
      <Route component={App} path="/">
        <IndexRoute component={StartContainer} />
      </Route>
      <Route component={NotFound} path="*" />
    </Router>
  </Provider>
), document.getElementById('root'))
