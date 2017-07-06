import {
  NODES_FETCHING,
  NODES_UPDATE
} from '../actions/nodes'
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
  })
}, initialState)
