import React, { useEffect, useState } from 'react'
import { getFighters } from '../../utils'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'

//

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

//

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

//

const FightersTable = () => {
  const [page, setPage] = React.useState(0)
  const [fightersArray, setFightersArray] = useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  useEffect(() => {
    const fetchFighters = async () => {
      const fighters = (await getFighters()) || []
      setFightersArray(fighters)
    }

    fetchFighters()
  }, [])

  const columns = [
    { id: 'firstName', label: 'FIRST' },
    { id: 'lastName', label: 'LAST' },
    { id: 'nickName', label: 'NICKNAME', minWidth: 200 },
    { id: 'height', label: 'HEIGTH' },
    { id: 'weight', label: 'WEIGTH' },
    { id: 'reach', label: 'REACH' },
    { id: 'stance', label: 'STANCE' },
    { id: 'record', label: 'RECORD' }
  ]

  const dataRows = fightersArray.map(fighter => {
    return {
      firstName: fighter.full_name.split(' ')[0],
      lastName: fighter.full_name.split(' ')[1],
      nickName: fighter.nick_name,
      height: fighter.height,
      weight: fighter.weight,
      reach: fighter.reach,
      stance: fighter.stance,
      record: fighter.record,
      fighterId: fighter.fighter_id
    }
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {dataRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.fighterId}>
                    {columns.map(column => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        page={page}
        component='div'
        count={dataRows.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 100, 250]}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default FightersTable
