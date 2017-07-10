import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Start.css'
import Card, { CardContent } from 'material-ui/Card'
import Table, { TableHead, TableBody, TableRow, TableCell } from 'material-ui/Table'

import Node from '../../components/node'

export const Start = (props) =>
  <div>
    <Card>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>status</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>CPU (%)</TableCell>
              <TableCell>Memory (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.nodes.map(node => <Node key={`Node_${node.uuid}`} {...node} />)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>

Start.propTypes = {
  loading: PropTypes.bool,
  nodes: PropTypes.arrayOf(PropTypes.shape({})),
}

export default CSSModules(Start, styles)
