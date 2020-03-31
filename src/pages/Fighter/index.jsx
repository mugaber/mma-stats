import React, { useState, useEffect } from 'react'
import './fighterPage.scss'

import { useParams } from 'react-router-dom'
import { getFighter } from '../../utils'

import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'

//

const WithOverLay = ({ text, overlay }) => {
  return (
    <OverlayTrigger overlay={<Tooltip>{overlay}</Tooltip>}>
      <p>{text}:</p>
    </OverlayTrigger>
  )
}

//

const Fighter = () => {
  const { id: fighterId } = useParams()
  const [fighter, setFighter] = useState({})

  useEffect(() => {
    const rFighter = getFighter(fighterId)
    setFighter(rFighter)
  }, [fighterId])

  const {
    full_name,
    fights_record,
    nick_name,
    birth_date,
    weight,
    height,
    reach,
    stance,
    slmp,
    samp,
    str_acc,
    str_dev,
    td_avg,
    td_acc,
    td_def,
    sub_avg
  } = fighter

  return (
    <div className='fighter-page__container'>
      <div className='fighter__container'>
        <Container fluid className='fighter-header'>
          <Row>
            <Col xs='6'>
              <h3>{full_name}</h3>
              <p>{nick_name}</p>
            </Col>

            <Col xs='6' className='fighter-record'>
              <h5>RECORD: {fights_record}</h5>
            </Col>
          </Row>
        </Container>

        <Container fluid className='fighter-info__container'>
          <Row>
            <Col xs='12' md='4' className='fighter-info__box'>
              <div className='fighter-info__text'>
                <p>Weight:</p>
                <p>Height:</p>
                <p>Stacne:</p>
                <p>Reach:</p>
                <p>dob:</p>
              </div>

              <div className='fighter-info__numbers'>
                <p>{weight}</p>
                <p>{height}</p>
                <p>{stance}</p>
                <p>{reach}</p>
                <p>{birth_date}</p>
              </div>
            </Col>

            <Col xs='12' md='4' className='fighter-info__box'>
              <div className='fighter-info__text'>
                <WithOverLay
                  overlay='Significant Strikes Landed per Minute'
                  text='SlpM'
                />
                <WithOverLay overlay='Significant Striking Accuracy' text='Str. Acc.' />
                <WithOverLay
                  overlay='Significant Strikes Absorbed per Minute'
                  text='SApM'
                />
                <WithOverLay
                  overlay='Significant Strike Defence (the % of opponents strikes that did not land)'
                  text='Str. Def'
                />
              </div>

              <div className='fighter-info__numbers'>
                <p>{slmp}</p>
                <p>{str_acc}</p>
                <p>{samp}</p>
                <p>{str_dev}</p>
              </div>
            </Col>

            <Col xs='12' md='4' className='fighter-info__box'>
              <div className='fighter-info__text'>
                <WithOverLay
                  overlay='Average Takedowns Landed per 15 minutes'
                  text='TD Avg'
                />
                <WithOverLay overlay='Takedown Accuracy' text='TD Acc.' />
                <WithOverLay
                  overlay='Takedown Defense (the % of opponents TD attempts that did not land)'
                  text='TD Acc.'
                />
                <WithOverLay
                  overlay='Average Submissions Attempted per 15 minutes'
                  text='Sub. Avg.'
                />
              </div>

              <div className='fighter-info__numbers'>
                <p>{td_avg}</p>
                <p>{td_acc}</p>
                <p>{td_def}</p>
                <p>{sub_avg}</p>
              </div>
            </Col>
          </Row>

          <div className='info-hover'>
            <WithOverLay
              overlay='Hover over the abbreviations'
              text={<i className='fa fa-info-circle'></i>}
            />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Fighter
