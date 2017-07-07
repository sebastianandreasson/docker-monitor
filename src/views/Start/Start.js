import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Start.css'

const renderContainer = (container) =>
  <div styleName="container">
    {container.meta ? container.meta.Id : container.docker_id}

  </div>

const renderNode = (node) =>
  <div styleName="node">
    {`${node.uuid} - ${node.public_ip}`}
    <pre>
      {node.meta ? JSON.stringify(node.meta, null, 2) : ''}
    </pre>
    {node.containers.map(container => renderContainer(container))}
  </div>

export const Start = (props) =>
  <div>
    Oh hi mark
    {props.nodes.map(node => renderNode(node))}
    {/* <pre>
    {JSON.stringify(props, null, 2)}
    </pre> */}
  </div>

Start.propTypes = {
  loading: PropTypes.bool,
  nodes: PropTypes.arrayOf(PropTypes.shape({})),
}

export default CSSModules(Start, styles)
