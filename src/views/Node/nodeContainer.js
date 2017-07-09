import React, { Component, PropTypes } from 'react'
import Node from './Node'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as NodeActions from '../../actions/nodes'

export class NodeContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.fetch()
  }

  render () {
    const {
      data,
      params: { id }
    } = this.props
    const node = _.find(data, o => o.uuid === id)

    return (
      <Node node={node} />
    )
  }
}

NodeContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  fetch: PropTypes.func,
  params: PropTypes.shape({})
}

const mapStateToProps = (state) => {
  return { ...state.nodes }
}

const mapDispatch = (dispatch) => {
  return bindActionCreators(NodeActions, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(NodeContainer)
