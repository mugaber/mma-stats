import React, { useState, useEffect } from 'react'
import './style.scss'

import EventItem from '../../components/EventItem'
import Pagination from '../../components/Pagination'
import SignupForm from '../../components/SignupForm'

import { Container, Row, Col, Spinner } from 'react-bootstrap'

import eventsObj from '../../data'

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
      setTimeout(() => setLoading(false), 500)
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
      <Container fluid className='events__navigation'>
        <Row>
          <Col xs={5} className='name-header'>
            <h5>Name</h5>
          </Col>
          <Col>
            <h5>Date</h5>
          </Col>
          <Col xs={4} className='location-header'>
            <h5>Location</h5>
          </Col>
        </Row>
      </Container>

      <div className='events__container'>
        {loading ? (
          <Spinner variant='primary' animation='border' className='events-spinner' />
        ) : (
          <>
            {currentEvents.map(item => (
              <Container fluid key={item.cards_id}>
                <EventItem item={item} />
              </Container>
            ))}

            <div className='pagination__container'>
              <Pagination
                eventsPerPage={eventsPerPage}
                totalEvents={events.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          </>
        )}
      </div>

      <SignupForm />
    </div>
  )
}

export default EventsPage
