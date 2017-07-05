import React, { Component } from 'react'
import Start from './Start'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as StatsActions from '../../actions/stats'

export class StartContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  render () {

    return (
      <Start {...this.props} />
    )
  }
}

StartContainer.propTypes = {
}

const mapStateToProps = (state) => {
  return { ...state.stats }
}

const mapDispatch = (dispatch) => {
  return bindActionCreators(StatsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(StartContainer)
