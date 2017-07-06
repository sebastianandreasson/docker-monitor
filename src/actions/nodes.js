import { createAction } from 'redux-actions'
import { get } from '../core/httpClient'

export const NODES_UPDATE = 'NODES_UPDATE'
export const NODES_FETCHING = 'NODES_FETCHING'

/* ACTIONS
------------------------------------------------- */
export const fetching = createAction(NODES_FETCHING)
export const update = createAction(NODES_UPDATE)

/* THUNKS
------------------------------------------------- */
export const fetch = () => {
  console.log('fetch')
  return (dispatch) => {
    console.log('do it')
    dispatch(fetching())

    get('/nodes', { local: true })
      .then(data => {
        dispatch(update(data))
      })
      .catch((err) => console.log(err))
  }
}
