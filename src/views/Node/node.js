import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Node.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Card from 'material-ui/Card'

export class Node extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
  }

  render () {
    const { node } = this.props

    const data = node && node.stats && node.stats.cpu.map((o, i) => {
      const mem = node.stats.memory
      return {
        cpu: o.system,
        memory: (mem[i].physical_used / mem[i].physical_total)
      }
    })

    return (
      <div>
        node: {node && node.uuid}
        {node && node.stats &&
          <Card>
            <LineChart
              data={data} height={300}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }} width={600}>
               <XAxis dataKey="name"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line
                 activeDot={{ r: 8 }}
                 dataKey="cpu"
                 stroke="#8884d8"
                 type="monotone" />
               <Line
                 dataKey="memory"
                 stroke="#82ca9d"
                 type="monotone" />
            </LineChart>
          </Card>
        }
      </div>
    )
  }
}

Node.propTypes = {
  loading: PropTypes.bool,
  node: PropTypes.shape({
    stats: PropTypes.shape({})
  }),
}

export default CSSModules(Node, styles)
