import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.css'

export const App = ({ children }) =>
  <div>
    {React.Children.map(children, (child) => React.cloneElement(child))}
  </div>

App.propTypes = {
  children: PropTypes.node
}

export default CSSModules(App, styles)
