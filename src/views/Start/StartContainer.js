import React, { Component, PropTypes } from 'react'
import Start from './Start'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as NodeActions from '../../actions/nodes'

export class StartContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    console.log('fetch yo')
    this.props.fetch()
  }

  render () {
    const {
      data,
      loading
    } = this.props

    return (
      <Start loading={loading} nodes={data} />
    )
  }
}

StartContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  fetch: PropTypes.func,
  loading: PropTypes.bool
}

const mapStateToProps = (state) => {
  return { ...state.nodes }
}

const mapDispatch = (dispatch) => {
  return bindActionCreators(NodeActions, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(StartContainer)
