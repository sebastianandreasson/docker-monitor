import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './node.css'

import Container from '../container'

export const Node = (props) =>
  <div styleName="root">
    <a href={`/node/${props.uuid}`}>
      {props.public_ip}
    </a>
    <div>
      {props.stats &&
        <div>
          <span>CPU: {props.stats.cpu[0].system}%</span>
          <br />
          <span>MEM: {props.stats.memory[0].physical_used / props.stats.memory[0].physical_total}%</span>
        </div>
      }
    </div>
    {props.containers.map(container =>
      <Container key={`Container_${container.uuid}`} {...container} />
    )}
  </div>

Node.propTypes = {
  containers: PropTypes.arrayOf(PropTypes.shape({})),
  public_ip: PropTypes.string,
  stats: PropTypes.arrayOf(PropTypes.shape({})),
  uuid: PropTypes.string,
}

export default CSSModules(Node, styles)
