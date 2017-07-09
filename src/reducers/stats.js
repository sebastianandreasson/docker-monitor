import {
  STATS_FETCHING,
  STATS_UPDATE
} from '../actions/stats'
import { handleActions } from 'redux-actions'

const initialState = {
  loading: false,
  data: []
}

export default handleActions({
  [STATS_UPDATE]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload.stats
  }),
  [STATS_FETCHING]: state => ({
    ...state,
    loading: true
  })
}, initialState)
