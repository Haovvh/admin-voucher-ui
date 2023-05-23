import { Helmet } from 'react-helmet-async';
import { filter, set } from 'lodash';
import { sentenceCase } from 'change-case';

import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Box,
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
  TextField
} from '@mui/material';
// components
import Grid from '@mui/material/Unstable_Grid2';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import Label from '../../components/label';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock


import adminService from '../../services/admin.service';
import storeService from '../../services/store.service';
// ----------------------------------------------------------------------
const avatar ={
  avatarMaleUrl: `/assets/images/avatars/avatar_2.jpg`,
  avatarFemaleUrl: `/assets/images/avatars/avatar_1.jpg`,
  avatarOthersUrl: `/assets/images/avatars/avatar_3.jpg`,
}
const TABLE_HEAD = [
  { id: 'userName', label: 'UserName', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'dateOfBirth', label: 'DateOfBirth', alignRight: false },
  { id: 'partnerType', label: 'PartnerType', alignRight: false },
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

export default function Partner() {  

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState({
    district:"",
    province:"",
    ward:"",
    street:""
  })
  const [store, setStore] = useState({
    name:"",
    description:""
  })

  const [openTime, setOpenTime] = useState("")

  const [closeTime, setCloseTime] = useState("")

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

  const handleClose = () => {
    setOpen(false)    
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClickCancel = () => {
    setOpen(false);
    setAddress({
      district:"",
      province:"",
      ward:"",
      street:""
    })
    setStore({
      name:"",
      description:""
    })
    setCloseTime("")
    setOpenTime("")
  }
  
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
  

  const handleClickStore = (id) => {
    storeService.GetStoreById(id).then(
      response =>{
        if (response.data && response.data.success) {
          const temp = response.data.data.store
          console.log(temp)
          setOpen(true);
          setAddress({
            district: temp.address.ward.district.fullName,
            street: temp.address.street,
            province: temp.address.ward.province.fullName,
            ward: temp.address.ward.fullName,
          })
          setStore({
            name:temp.name,
            description: temp.description
          })
          setOpenTime(`${temp.openTime.hour}:${temp.openTime.minute}`)
          setCloseTime(`${temp.closeTime.hour}:${temp.closeTime.minute}`)
        }
        
      }, error => {
        console.log(error)
      }
    )
   
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - partners.length) : 0;

  const filteredDatas = applySortFilter(partners, getComparator(order, orderBy), filterName);


  const isNotFound = !filteredDatas.length && !!filterName;
  useEffect(() =>{
    adminService.partnerAll().then(
      response => {
        if(response && response.status === 200 && response.data.success && response.data.data) {
          console.log("partner ==>",response.data.data.partners)
          setPartners(response.data.data.partners)
        }
        
      }, error =>{
        console.log("Error Partner",error)
      }
    )
  },[])

  return (
    <>
      <Helmet>
        <title> Partners  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Partners
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
                    const { id, userName, name, dateOfBirth, partnerType, address,  store, gender } = row;
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
                          {address.street} {address.ward.fullName} {address.ward.district.fullName} 
                         </TableCell>
                         <TableCell align="left">
                          {dateOfBirth.year} {"-"} {dateOfBirth.month}{"-"}{dateOfBirth.day}
                         </TableCell>
                         <TableCell align="left">
                          {partnerType}
                         </TableCell>
                         <TableCell align="left">
                          {(store !== null) ? <Button className='btn btn-success' onClick={() => handleClickStore(store.id)}>{store.name}</Button> : <Button className='btn btn-warning'>No</Button>}
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Store</DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              name="name" 
              label="Store Name" 
              fullWidth
              value={store.name} 
              required
              disabled
              />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              name="description" 
              label="Description" 
              value={store.description} 
              fullWidth
              required
              
              />
          </Grid>
          <Grid item xs={6}>
          <TextField
                  label="province"
                  fullWidth                  
                  value={address.province}
                  id="country"       
                  disabled   
                  
                />
           
          
          </Grid>
          <Grid item xs={6}>
          <TextField
                  label="District"                 
                  
                  fullWidth
                  value={address.district}
                  id="country" 
                  disabled
                  
                />
               
          </Grid>
          <Grid item xs={4}>
          <TextField
                  label="Ward"
                  fullWidth                  
                  variant="outlined"
                  value={address.ward}
                  id="country"      
                  
                />
                  
          </Grid>
          <Grid item xs={8}>
            <TextField 
            name="street" 
            label="Street" 
            disabled
            value={address.street}             
           
            />
          </Grid>
          <Grid item xs={6}>
          <Label>Open Time</Label>
          <TextField 
            name="openTime" 
            type="text"
            fullWidth
            value={openTime} 
            disabled
           
            />
          </Grid>
          <Grid item xs={6}> 
          <Label>Close Time</Label>
          <TextField 
            name="closeTime" 
            type="text"
            fullWidth
            value={closeTime} 
            disabled            
            />
          </Grid>
        </Grid> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
    </>
  );
}
