import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.css'
import { MuiThemeProvider } from 'material-ui/styles'

export const App = ({ children }) =>
  <MuiThemeProvider>
    <div>
      {React.Children.map(children, (child) => React.cloneElement(child))}
    </div>
  </MuiThemeProvider>

App.propTypes = {
  children: PropTypes.node
}

export default CSSModules(App, styles)
