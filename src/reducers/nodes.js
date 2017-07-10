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
    data: payload.nodes
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
