import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Container.css'
import { TableRow, TableCell } from 'material-ui/Table'

export const Container = (props) =>
<TableRow>
  <TableCell>
    <a href={`/container/${props.uuid}`}>
      {props.name}
    </a>
  </TableCell>
  <TableCell>
    {props.started_datetime}
  </TableCell>
</TableRow>

Container.propTypes = {
  name: PropTypes.string,
  started_datetime: PropTypes.string,
  uuid: PropTypes.string
}

export default CSSModules(Container, styles)
