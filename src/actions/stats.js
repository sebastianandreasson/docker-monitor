import { createAction } from 'redux-actions'
import { get } from '../core/httpClient'

export const STATS_UPDATE = 'STATS_UPDATE'
export const STATS_FETCHING = 'STATS_FETCHING'

/* ACTIONS
------------------------------------------------- */
export const fetching = createAction(STATS_FETCHING)
export const update = createAction(STATS_UPDATE)

/* THUNKS
------------------------------------------------- */
export const fetch = () => {
  return (dispatch) => {
    dispatch(fetching())

    get('/stats', { local: true })
      .then(data => {
        dispatch(update(data))
      })
      .catch((err) => console.log(err))
  }
}
