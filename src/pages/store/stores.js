import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import DialogTitle from '@mui/material/DialogTitle';

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
  TextField,
  MenuItem,
} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import Label from '../../components/label';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock

import storeService from '../../services/store.service';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },  
  { id: 'openTime', label: 'openTime', alignRight: false },
  { id: 'closeTime', label: 'CloseTime', alignRight: false },
  { id: 'isApproved', label: 'IsApproved', alignRight: false },
  { id: 'isEnable', label: 'IsEnable', alignRight: false },
  { id: '' },
];


const statusApprove = ["Approve             ", "Reject          "]
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  } 
  return stabilizedThis.map((el) => el[0]);
}

export default function Store() {  

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [stores, setStores] = useState([])

  const [storeId, setStoreId] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [isApprove, setIsApprove] = useState("");

  const [open, setOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false)

  const handleClickEdit = (id, ) => {
    alert(`edit ${id}  `)
    
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
  const handleClickNew = () => {
    alert("New OK")
    
  }
  const handleClickEditApprove = (id) =>{    
    setStoreId(id);
    setOpen(true)
    
  }
  const handleChangeStatusApprove = (event) =>{
    setIsApprove(event.target.value)
  }
  const handleClickCancel = () => {
    setOpen(false);
    
  }
  const handleClickSubmit = () => {
    if(isApprove) {
      if(isApprove === statusApprove[0]) {
        storeService.StoreApproveStoreId(storeId).then(
          response => {
            if(response.data && response.status === 200 && response.data.success) {
              alert("success");
              setOpen(false)
              setIsEdit(true)
            }
          }
        )
        
      } 
      else if(isApprove === statusApprove[1]) {
        storeService.StoreRejecteStoreId(storeId).then(
          response => {
            if(response.data && response.status === 200 && response.data.success) {
              alert("success");
              setOpen(false)
              setIsEdit(true)
            }
            
          }
        )
        
      }
    } else {
      alert("Please choose Status");
    }
    
    
  }
  const handleClose = () => {
    setOpen(false)    
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stores.length) : 0;

  const filteredDatas = applySortFilter(stores, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredDatas.length && !!filterName;
  useEffect(()=>{
    setIsEdit(false);
    storeService.StoreAll().then(
      response =>{
        if(response.data  && response.data.success) {
          console.log("Stores ==>",response.data.data.stores)
          setStores(response.data.data.stores)
        }
        
      }, error => {
        console.log("Error Store =>",error)
      }
    )
  },[isEdit])

  return (
    <>
      <Helmet>
        <title> Stores  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Stores
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
                  rowCount={stores.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  
                />
                <TableBody>
                  {filteredDatas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id,  name, address, description, isApproved
                      , isEnable, openTime, closeTime } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>

                         <TableCell align="left">
                          {name} 
                         </TableCell>
                         
                         <TableCell align="left">
                          {address.ward.name}{" "}{address.street}
                         </TableCell>
                         <TableCell align="left">
                          {description}
                         </TableCell>
                         <TableCell align="left">
                          {openTime.hour}{":"}{openTime.minute}
                         </TableCell>
                         <TableCell align="left">
                         {closeTime.hour}{":"}{closeTime.minute}
                         </TableCell>
                         <TableCell align="left">
                          {((isApproved === null ) ? 
                          (<Button className='btn btn-primary' onClick={() => handleClickEditApprove(id)}>NeedApprovel</Button>):
                          (isApproved === true)? <Button className='btn btn-success' onClick={() => handleClickEditApprove(id)}>Approved</Button> : 
                          <Button className='btn btn-warning' onClick={() => handleClickEditApprove(id)}>Rejected</Button>)}
                         </TableCell>
                         <TableCell align="left">
                          {isEnable ? <Label color="success">{sentenceCase('Yes')}</Label>: 
                          <Label color="warning">{sentenceCase('No')}</Label>}
                        </TableCell> 
                        
                        <TableCell align="right">                        
                          <IconButton size="large" color="inherit" onClick={()=>handleClickEdit(id)}>
                          <Iconify icon={'eva:edit-fill'}  sx={{ mr: 2 }} />                          
                          </IconButton>
                          <IconButton size="large" color="inherit" onClick={()=>handleClickDelete(id)}>
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
            count={stores.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Approved</DialogTitle>
        <DialogContent> 
        <DialogContentText>
            Please choose Approved or Rejected.
          </DialogContentText>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
                  label="Status"
                  fullWidth
                  select
                  variant="outlined"
                  value={isApprove}
                  id="country"      
                  onChange= {handleChangeStatusApprove}
                >
                  {statusApprove  && statusApprove.map((option) => (
             <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
          )}
            </TextField>  
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      
    </>
  );
}
