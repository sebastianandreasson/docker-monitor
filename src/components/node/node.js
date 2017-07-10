import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Node.css'
import { Link } from 'react-router'
import { TableRow, TableCell } from 'material-ui/Table'
import Chip from 'material-ui/Chip'

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

function colorForStats(stats) {
  if (!stats) return 'yellow'
  if (stats.cpu[0].system > 0.5) 'yellow'
  if (stats.cpu[0].system > 0.8) 'red'

  const memUsage = stats.memory[0].physical_used / stats.memory[0].physical_total
  if (memUsage > 0.5) return 'yellow'
  if (memUsage > 0.8) return 'red'
}

export const Node = (props) =>
  <TableRow>
    <TableCell>
      <div style={{ backgroundColor: colorForStats(props.stats) }} styleName="status" />
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
