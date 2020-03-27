import React from 'react'
import './fightersPage.scss'
import FightersTable from '../../components/FightersTable'

const FightersPage = () => {
  return (
    <div className='fighers-page__container'>
      <div className='fighters-header'>
        <h2>Fighters</h2>
      </div>

      <div className='fighter-table'>
        <FightersTable />
      </div>
    </div>
  )
}

export default FightersPage
