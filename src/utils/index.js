import Axios from 'axios'

//

const getFighters = async () => {
  const fightersLocal = localStorage.getItem('mma-stats-fighters')

  try {
    if (fightersLocal) return JSON.parse(fightersLocal)
  } catch (err) {
    console.log('error getting fighters from LocalStorage', err)
  }

  try {
    const res = await Axios.get('/api/fighters')
    const fighters = res.data
    if (fighters && fighters.length) {
      localStorage.setItem('mma-stats-fighters', JSON.stringify(fighters))
      return fighters
    }
  } catch (err) {
    console.log('error getting fighters from API')
  }

  return undefined
}

//

const getEvents = async () => {
  const eventsLocal = localStorage.getItem('mma-stats-events')

  try {
    if (eventsLocal) return JSON.parse(eventsLocal)
  } catch (err) {
    console.log('error getting fighters from LocalStorage', err)
  }

  try {
    const res = await Axios.get('/api/events')
    const events = res.data

    if (events && events.length) {
      localStorage.setItem('mma-stats-events', JSON.stringify(events))
      return events
    }
  } catch (err) {
    console.log('error getting events from API', err)
  }

  return null
}

export { getFighters, getEvents }
