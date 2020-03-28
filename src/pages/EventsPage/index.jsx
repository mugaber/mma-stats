import React from 'react'
import './style.scss'

import FightsTable from '../../components/FightsTable'

const EventsPage = () => {
  return (
    <div className='evnets-page__container'>
      <div className='events-table__container'>
        <FightsTable />
      </div>
    </div>
  )
}

export default EventsPage
