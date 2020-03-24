import React, { useState } from 'react'
import './style.scss'

import EventItem from '../../components/EventItem'

import { Container, Row, Col } from 'react-bootstrap'

import eventsObj from '../../data'

const eventsArray = []
for (let key in eventsObj) {
  eventsArray.push(eventsObj[key])
}

const EventsPage = () => {
  const [events, setEvents] = useState(eventsArray.slice(0, 10))

  return (
    <div className='evnets-page__container'>
      <Container className='events__navigation'>
        <Row>
          <Col xs={5} className='name-header'>
            <h5>Name</h5>
          </Col>
          <Col>
            <h5>Date</h5>
          </Col>
          <Col className='location-header'>
            <h5>Location</h5>
          </Col>
        </Row>
      </Container>

      <div className='events__container'>
        {events.map(item => {
          return (
            <Container key={item.cards_id} className='event-item'>
              <EventItem item={item} />
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default EventsPage
