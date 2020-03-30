import React from 'react'
import './style.scss'

import EventsTable from '../../components/EventsTable'

const EventsPage = () => {
  return (
    <div className='evnets-page__container'>
      <div className='events-table__container'>
        <EventsTable />
      </div>
    </div>
  )
}

export default EventsPage
