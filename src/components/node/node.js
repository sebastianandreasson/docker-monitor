import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './node.css'
import Card, { CardHeader, CardContent } from 'material-ui/Card'
import Table, { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table'

import Container from '../container'

export const Node = (props) =>
  <Card styleName="root">
    <CardHeader
      subheader={props.uuid}
      title={`${props.public_ip},
        CPU: ${props.stats ? props.stats.cpu[0].system: '-'}%,
        MEM: ${props.stats ? (props.stats.memory[0].physical_used / props.stats.memory[0].physical_total) : '-'}%`}
    />
    <CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Started</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.containers.map(container =>
            <Container key={`Container_${container.uuid}`} {...container} />
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>

Node.propTypes = {
  containers: PropTypes.arrayOf(PropTypes.shape({})),
  public_ip: PropTypes.string,
  stats: PropTypes.arrayOf(PropTypes.shape({})),
  uuid: PropTypes.string,
}

export default CSSModules(Node, styles)
