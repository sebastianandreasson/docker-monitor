import {
  NODES_FETCHING,
  NODES_UPDATE
} from '../actions/nodes'
import {
  STATS_UPDATE
} from '../actions/stats'
import { handleActions } from 'redux-actions'

const initialState = {
  loading: false,
  data: []
}

export default handleActions({
  [NODES_UPDATE]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload.nodes.map((node, i) => {
      if (state.data[i] && state.data[i].stats) {
        node.stats = state.data[i].stats

        node.containers = node.containers.map((container, j) => {
          if (state.data[i].containers[j] && state.data[i].containers[j].stats) {
            container.stats = state.data[i].containers[j].stats
          }
          return container
        })
      }
      return node
    })
  }),
  [NODES_FETCHING]: state => ({
    ...state,
    loading: true
  }),
  [STATS_UPDATE]: (state, { payload }) => ({
    ...state,
    data: state.data.map(node => {
      node.stats = payload.stats[node.uuid]

      node.containers = node.containers.map(container => {
        container.stats = payload.stats[container.docker_id]
        return container
      })
      return node
    })
  })
}, initialState)
