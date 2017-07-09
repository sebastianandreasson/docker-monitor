import { combineReducers } from 'redux'
import nodes from './nodes'
import stats from './stats'

const rootReducer = combineReducers({
  nodes,
  stats
})

export default rootReducer
