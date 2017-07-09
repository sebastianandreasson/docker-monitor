import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Start.css'

import Node from '../../components/node'

export const Start = (props) =>
  <div>
    {props.nodes.map(node => <Node key={`Node_${node.uuid}`} {...node} />)}
  </div>

Start.propTypes = {
  loading: PropTypes.bool,
  nodes: PropTypes.arrayOf(PropTypes.shape({})),
}

export default CSSModules(Start, styles)
