import React, { useEffect, useState } from 'react'
import './eventsTable.scss'

import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

import { getEvents } from '../../utils'

//

const { SearchBar } = Search

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
    dataField: 'location',
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
          className={`btn ${isSelect ? 'btn-primary' : 'btn-light'}`}
        >
          {option.text}
        </button>
      )
    })}
  </div>
)

//

const customTotal = (from, to, size) => (
  <span className='react-bootstrap-table-pagination-total'>
    {from} - {to} of {size}
  </span>
)

const options = {
  showTotal: true,
  paginationTotalRenderer: customTotal,
  sizePerPageRenderer,
  alwaysShowAllBtns: true,
  hidePageListOnlyOnePage: true
}

//

const EventsTable = () => {
  const [eventsArray, setEventsArray] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents()
      setEventsArray(fetchedEvents)
    }

    fetchEvents()
  }, [])

  return (
    <div className='events__table'>
      <ToolkitProvider keyField='name' data={eventsArray} columns={columns} search>
        {props => (
          <>
            <div className='events-table__header'>
              <h4>Events</h4>
              <div className='search-bar__container'>
                <SearchBar
                  {...props.searchProps}
                  placeholder='Search using any field...'
                />
              </div>
            </div>

            <BootstrapTable
              hover
              {...props.baseProps}
              pagination={paginationFactory(options)}
            />
          </>
        )}
      </ToolkitProvider>
    </div>
  )
}

export default EventsTable
