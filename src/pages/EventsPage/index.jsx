import React, { useState, useEffect } from 'react'
import './style.scss'

import Pagination from '../../components/Pagination'

import { Table } from 'react-bootstrap'

import eventsObj from '../../fights'

const eventsArray = []
for (let key in eventsObj) {
  eventsArray.push(eventsObj[key])
}

//
const EventsPage = () => {
  const [eventsPerPage] = useState(10)
  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setEvents(eventsArray)
      setTimeout(() => setLoading(false), 100)
    }

    fetchEvents()
  }, [])

  // Get current events
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirsEvents = indexOfLastEvent - eventsPerPage
  const currentEvents = events.slice(indexOfFirsEvents, indexOfLastEvent)

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className='evnets-page__container'>
      <Table striped bordered hover className='events__table'>
        <thead className='events__navigation'>
          <tr>
            <th></th>
            <th style={{ width: '38%' }}>Name</th>
            <th style={{ width: '20%' }}>Date</th>
            <th style={{ width: '37%' }}>Location</th>
          </tr>
        </thead>

        <tbody>
          {currentEvents.map((item, idx) => (
            <tr key={item.name}>
              <td>{idx + 1 + (currentPage - 1) * 10}</td>
              <td>
                {item.link ? (
                  <a href={item.link} target='_blank' rel='noopener noreferrer'>
                    {item.name}
                  </a>
                ) : (
                  <p>{item.name}</p>
                )}
              </td>
              <td>{item.date && <p>{item.date}</p>}</td>
              <td>{item.place && <p>{item.place}</p>}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className='pagination__container'>
        <Pagination
          eventsPerPage={eventsPerPage}
          totalEvents={events.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  )
}

export default EventsPage
