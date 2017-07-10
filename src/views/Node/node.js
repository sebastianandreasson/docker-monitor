import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Node.css'
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Card, { CardHeader, CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

const colors = [
  '#001f3f',
  '#FF851B',
  '#0074D9',
  '#FF4136',
  '#7FDBFF',
  '#85144b',
  '#39CCCC',
  '#F012BE',
  '#3D9970',
  '#B10DC9'
]

export class Node extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
  }

  _renderContainerStats(title, stats) {
    const { node } = this.props
    return (
      <Card styleName="container-stats">
        <CardHeader title={title} />
        <AreaChart data={stats}
          height={400}
          margin={{ top: 10, right: 0, left: 40, bottom: 0 }}
          width={800}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend/>
          {node.containers.map((container, i) =>
            <Area
              dataKey={container.name}
              fill={colors[i]}
              stackId="1"
              type="monotone" />)}
        </AreaChart>
      </Card>
    )
  }

  render () {
    const { node } = this.props
    if (!node) return null

    const nodeStats = node.stats && node.stats.cpu.map((o, i) => {
      const mem = node.stats.memory
      return {
        cpu: o.system,
        memory: (mem[i].physical_used / mem[i].physical_total)
      }
    })

    const containerCPU = Array.from({ length: 10 }).map((_, i) => {
      const dataPoint = { name: i }
      node.containers.forEach(container => {
        if (container.stats) {
          dataPoint[container.name] = container.stats.cpu[i].cpu_usage.total_usage
        }
      })

      return dataPoint
    })

    const containerMemory = Array.from({ length: 10 }).map((_, i) => {
      const dataPoint = { name: i }
      node.containers.forEach(container => {
        if (container.stats) {
          dataPoint[container.name] = container.stats.memory[i].usage
        }
      })

      return dataPoint
    })

    return (
      <div styleName="root">
        <Card>
          <CardHeader
            subheader={node.uuid}
            title={node.public_ip} />
          <CardContent>
            <Grid container gutter={24}>
              <Grid item
                  sm={4}
                  xs={8}>
                <Typography component="p">
                  {node.deployed_datetime} <br/>
                  Disk: {node.disk}GB <br/>
                  CPUs: {node.cpu} <br/>
                  Memory: {node.memory}MB <br/>

                  Containers: {node.current_num_containers}
                </Typography>
              </Grid>

              <Grid item
                  sm={6}
                  xs={12}>
                <LineChart
                  data={nodeStats}
                  height={200}
                  width={500}>
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
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {node && node.stats && this._renderContainerStats('Container CPU usage', containerCPU)}

        {node && node.stats && this._renderContainerStats('Container memory usage', containerMemory)}
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
