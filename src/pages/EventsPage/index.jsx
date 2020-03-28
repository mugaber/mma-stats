import React from 'react'
import './style.scss'

import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import eventsObj from '../../fights'

//

const eventsArray = []
for (let key in eventsObj) {
  eventsArray.push(eventsObj[key])
}

const columns = [
  {
    dataField: 'name',
    text: 'Name'
  },
  {
    dataField: 'date',
    text: 'Date'
  },
  {
    dataField: 'place',
    text: 'Location'
  }
]

//

const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
  <div className='btn-group' role='group'>
    {options.map(option => {
      const isSelect = currSizePerPage === `${option.page}`
      return (
        <button
          key={option.text}
          type='button'
          onClick={() => onSizePerPageChange(option.page)}
          className={`btn ${isSelect ? 'btn-primary' : ''}`}
        >
          {option.text}
        </button>
      )
    })}
  </div>
)

const options = {
  sizePerPageRenderer
}

//

const EventsPage = () => {
  return (
    <BootstrapTable
      keyField='id'
      data={eventsArray}
      columns={columns}
      pagination={paginationFactory(options)}
    />
  )
}

export default EventsPage
