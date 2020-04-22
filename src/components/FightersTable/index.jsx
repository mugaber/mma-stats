import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import fighters from '../../assets/fighters'
import './fightersTable.scss'

import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

//

const { SearchBar } = Search

const columns = [
  { dataField: 'firstName', text: 'FIRST' },
  { dataField: 'lastName', text: 'LAST' },
  { dataField: 'nickName', text: 'NICKNAME' },
  { dataField: 'height', text: 'HEIGTH' },
  { dataField: 'weight', text: 'WEIGTH' },
  { dataField: 'reach', text: 'REACH' },
  { dataField: 'stance', text: 'STANCE' },
  { dataField: 'record', text: 'RECORD' },
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
  hidePageListOnlyOnePage: true,
}

//

const FightersTable = () => {
  const [fightersArray, setFightersArray] = useState([])
  const history = useHistory()

  useEffect(() => {
    setFightersArray(Object.values(fighters))
  }, [])

  const dataRows = fightersArray.map(fighter => ({
    firstName: fighter.full_name.split(' ')[0],
    lastName: fighter.full_name.split(' ')[1],
    nickName: fighter.nick_name,
    height: fighter.height,
    weight: fighter.weight,
    reach: fighter.reach,
    stance: fighter.stance,
    record: fighter.Record,
    fighterId: fighter.id,
  }))

  const rowEvents = {
    onClick: (e, row, rowIndex) => history.push(`/fighter/${row.fighterId}`),
  }

  return (
    <div className='fighters__table'>
      <ToolkitProvider keyField='fighterId' data={dataRows} columns={columns} search>
        {props => (
          <>
            <div className='fighters-table__header'>
              <h4>Fighters</h4>
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
              rowEvents={rowEvents}
              rowClasses='fighter-row'
              pagination={paginationFactory(options)}
            />
          </>
        )}
      </ToolkitProvider>
    </div>
  )
}

export default FightersTable
