import React, { Component, PropTypes } from 'react'
import App from './App'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as StatsActions from '../../actions/stats'

export class AppContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    setInterval(() => {
      this.props.fetch()
    }, 15000)
    setTimeout(() => {
      this.props.fetch()
    }, 2500)
  }

  render () {
    return (
      <App {...this.props} />
    )
  }
}

AppContainer.propTypes = {
  fetch: PropTypes.func
}

const mapStateToProps = (state) => {
  return { ...state.stats }
}

const mapDispatch = (dispatch) => {
  return bindActionCreators(StatsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(AppContainer)
