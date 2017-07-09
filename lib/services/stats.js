const stats = {}

function setStats(id, type, value) {
  if (!stats[id]) stats[id] = {}
  if (!stats[id][type]) stats[id][type] = []

  stats[id][type].push(value)

  if (stats[id][type].length > 10) {
    stats[id][type].shift()
  }
}

function getStats() {
  return stats
}

module.exports = {
  setStats,
  getStats
}
