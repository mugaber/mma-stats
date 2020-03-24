import React from 'react'
import './style.scss'

import { Container, Row, Col } from 'react-bootstrap'

const EventItem = ({ item }) => {
  return (
    <Container fluid>
      <Row className='event-row'>
        <Col xs={5}>
          {item.link ? (
            <a href={item.link} target='_blank' rel='noopener noreferrer'>
              {item.name}
            </a>
          ) : (
            <p>{item.name}</p>
          )}
        </Col>

        <Col>{item.date && <p>{item.date}</p>}</Col>

        <Col xs={4}>{item.place && <p>{item.place}</p>}</Col>
      </Row>
    </Container>
  )
}

export default EventItem
