import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './node.css'
import { Link } from 'react-router'
// import Card, { CardHeader, CardContent } from 'material-ui/Card'
import { TableRow, TableCell } from 'material-ui/Table'
import Chip from 'material-ui/Chip'
import Icon from 'material-ui/Icon'

// import Container from '../container'

function displayStat(stats, type) {
  if (!stats) return '-'
  let usage
  switch (type) {
    case 'cpu':
      usage = stats.cpu[0].system
      break
    case 'memory':
      usage = stats.memory[0].physical_used / stats.memory[0].physical_total
      break
  }
  return usage ? `${(usage * 100).toFixed(1)}%` : '-'
}

export const Node = (props) =>
  <TableRow>
    <TableCell>
      <Icon className="material-icons" color="action">
        desktop_windows
      </Icon>
    </TableCell>
    <TableCell>
      <Link to={`/node/${props.uuid}`}>
        {props.public_ip}
      </Link>
    </TableCell>
    <TableCell>
      <div styleName="tag-container">
        {props.tags.map(tag => <Chip key={`Node_tag_${tag.name}`} label={tag.name} />)}
      </div>
    </TableCell>
    <TableCell>
      {displayStat(props.stats, 'cpu')}
    </TableCell>
    <TableCell>
      {displayStat(props.stats, 'memory')}
    </TableCell>
  </TableRow>

{/* <Table>
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
</Table> */}

Node.propTypes = {
  containers: PropTypes.arrayOf(PropTypes.shape({})),
  public_ip: PropTypes.string,
  stats: PropTypes.shape({}),
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string
  })),
  uuid: PropTypes.string,
}

export default CSSModules(Node, styles)
