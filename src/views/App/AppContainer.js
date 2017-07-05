import React, { Component, PropTypes } from 'react'
import App from './App'

export class AppContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  render () {
    return (
      <App
        {...this.props}
        offline={this.props.offline} />
    )
  }
}

AppContainer.propTypes = {
  offline: PropTypes.bool
}

export default AppContainer
