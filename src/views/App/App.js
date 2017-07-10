import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.css'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const theme = createMuiTheme({
  palette: createPalette({
    type: 'dark', // Switching the dark mode on is a single property value change.
  }),
})

export const App = ({ children }) =>
  <MuiThemeProvider theme={theme}>
    <div>
      <AppBar color="default" position="static">
        <Toolbar>
          <Typography color="inherit" type="title">
            Dockercloud monitor
          </Typography>
        </Toolbar>
      </AppBar>
      {React.Children.map(children, (child) => React.cloneElement(child))}
    </div>
  </MuiThemeProvider>

App.propTypes = {
  children: PropTypes.node
}

export default CSSModules(App, styles)
