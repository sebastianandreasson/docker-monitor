import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './container.css'

export const Container = (props) =>
<div styleName="root">
  <a href={`/container/${props.uuid}`}>
    {props.name}
  </a>
</div>

Container.propTypes = {
  name: PropTypes.string,
  uuid: PropTypes.string
}

export default CSSModules(Container, styles)
