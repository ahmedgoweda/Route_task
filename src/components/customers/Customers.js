import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



export function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align='center'>
          {row.id}
        </TableCell>
        <TableCell align="center">{row.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Transactions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Id</TableCell>
                    <TableCell align='center'>Amount</TableCell>
                    <TableCell align='center'>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.transactions.map((transactionRow) => (
                    <TableRow key={transactionRow.id}>
                         <TableCell align="center">{transactionRow.id}</TableCell>
                         <TableCell align="center">{transactionRow.amount}</TableCell>
                         <TableCell align="center">{transactionRow.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customer_id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};



export default function CustomersTable(props) {
  const {customers} = props
   
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Name</TableCell>
     
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
CustomersTable.propTypes = {
  customers:PropTypes.arrayOf(
    PropTypes.shape({
      name:PropTypes.string.isRequired,
      id:PropTypes.string.isRequired,
      transactions: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customer_id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }),
    ).isRequired,
    })
  )
}
