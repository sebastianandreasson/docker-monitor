import { createAction } from 'redux-actions'
import { get } from '../core/httpClient'

export const STATS_UPDATE = 'STATS_UPDATE'
export const STATS_FETCHING = 'STATS_FETCHING'

/* ACTIONS
------------------------------------------------- */
export const fetchingStats = createAction(STATS_FETCHING)
export const updateStats = createAction(STATS_UPDATE)

/* THUNKS
------------------------------------------------- */
export const fetchStats = () => {
  return (dispatch) => {
    dispatch(fetchingStats())

    get('/stats', { local: true })
      .then(data => {
        dispatch(updateStats(data))
      })
      .catch((err) => console.log(err))
  }
}
