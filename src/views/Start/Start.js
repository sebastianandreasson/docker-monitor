import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Start.css'

export const Start = (props) =>
  <div>
    Oh hi mark
    <pre>
    {JSON.stringify(props, null, 2)}
    </pre>
  </div>

Start.propTypes = {
  loading: PropTypes.bool,
  nodes: PropTypes.arrayOf(PropTypes.shape({})),
}

export default CSSModules(Start, styles)
