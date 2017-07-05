import alt from '../alt'
import StatisticsActions from '../actions/StatisticsActions'

class StatisticsStore {
  constructor () {
    this.bindListeners({
      fetch: StatisticsActions.fetch
    })

    this.stats = {
    }
  }

  fetch (stats) {
    this.stats = stats
  }
}

export default alt.createStore(StatisticsStore, 'StatisticsStore')
