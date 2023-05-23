import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';

import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,  
  TableRow,  
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock


import adminService from '../../services/admin.service';
// ----------------------------------------------------------------------
const avatar ={
  avatarMaleUrl: `/assets/images/avatars/avatar_2.jpg`,
  avatarFemaleUrl: `/assets/images/avatars/avatar_1.jpg`,
  avatarOthersUrl: `/assets/images/avatars/avatar_3.jpg`,
}
const TABLE_HEAD = [
  { id: 'userName', label: 'UserName', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'dateOfBirth', label: 'DateOfBirth', alignRight: false },
  { id: 'partnerType', label: 'PartnerType', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'store', label: 'Store', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
    
  if (query) {
    return filter(array, (_user) => _user.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  } 
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {  

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('userName');

  const [filterName, setFilterName] = useState('');

  const [partners, setPartners] = useState([])

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClickEdit = (id, name) => {
    alert(`edit ${id}  ${name}`)
  };
  const handleClickDelete = (id) => {
    alert(`delete ${id}`)
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
    setSelected([]);
  };
  

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - partners.length) : 0;

  const filteredDatas = applySortFilter(partners, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredDatas.length && !!filterName;
  useEffect(() =>{
    adminService.endUserAll().then(
      response => {
        
        if(  response.data.success && response.data.data) {
         
          console.log(response.data)
          setPartners(response.data.data.endUsers)
        }
        
      }, error =>{
        console.log(error)
      }
    )
  },[])

  return (
    <>
      <Helmet>
        <title> EndUser  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          EndUser
          </Typography>
          
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName}  />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={partners.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  
                />
                <TableBody>
                  {filteredDatas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, userName, name, dateOfBirth,  isVerified, store, gender } = row;
                    const selectedUser = selected.indexOf(userName) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                         <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {gender === 'Male' &&(
                              <Avatar alt={userName} src={avatar.avatarMaleUrl} />
                            )}
                            {gender === 'Female' &&(
                              <Avatar alt={userName} src={avatar.avatarFemaleUrl} />
                            )}
                            {gender === 'Other' &&(
                              <Avatar alt={userName} src={avatar.avatarOthersUrl} />
                            )}
                            <Typography variant="subtitle2" noWrap>
                              {userName}
                            </Typography>
                          </Stack>
                        </TableCell>
                         <TableCell align="left">
                          {name} 
                         </TableCell>
                         <TableCell align="left">
                          {dateOfBirth.year} {"-"} {dateOfBirth.month}{"-"}{dateOfBirth.day}
                         </TableCell>
                         
                         <TableCell align="left">
                          {isVerified}
                         </TableCell>
                         <TableCell align="left">
                          {store}
                         </TableCell>
                        
                        <TableCell align="right">                        
                          <IconButton size="large" color="inherit" onClick={()=>handleClickEdit(id, userName)}>
                          <Iconify icon={'eva:edit-fill'}  sx={{ mr: 2 }} />                          
                          </IconButton>
                          <IconButton size="large" color="inherit" onClick={()=>handleClickDelete(id, userName)}>
                          <Iconify  icon={'eva:trash-2-outline'} color="red" sx={{ mr: 2 }} />                        
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={partners.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      
    </>
  );
}
