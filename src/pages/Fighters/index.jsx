import React from 'react'
import './fightersPage.scss'
import FightersTable from '../../components/FightersTable'

const FightersPage = () => {
  return (
    <div className='fighters-page__container'>
      <div className='fighters-table__container'>
        <FightersTable />
      </div>
    </div>
  )
}

export default FightersPage
