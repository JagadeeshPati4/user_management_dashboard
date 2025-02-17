import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import UserForm from '../UserForm';

const UserList = ({ showNotification }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const { users, error, deleteUser,setGetDefualt } = useUserContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUseeEditId, setSelectedUserEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDeleteClick = (id) => {

    setSelectedUserEditId(id);
    setOpenDialog(true);
  };
  const handleEditClick=(id)=>{
    console.log('id selected',id);
    setSelectedUserId(id);
    setOpenDialogEdit(true);
  }
  const handleDelete = () => {
    if (selectedUseeEditId) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${selectedUseeEditId}`)
        .then(() => {
          deleteUser(selectedUseeEditId);
          showNotification('User deleted successfully', 'success');
          setOpenDialog(false);
        })
        .catch(() => {
          showNotification('Failed to delete user.', 'error');
          setOpenDialog(false);
        });
    }
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };
  const handleEditCancel = () => {
    setOpenDialogEdit(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    
  };

  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  console.log("selectedUserId",selectedUserId)
  // Mobile card view component
  const MobileUserCard = ({ user }) => (
    <Card sx={{ mb: 1 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="textSecondary">ID: {user.id}</Typography>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2">{user.email}</Typography>
          <Typography variant="body2" color="textSecondary">{user.company.name}</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Link to={`/edit/${user.id}`}> <Button 
              variant="contained" 
              color="primary" 
           
              fullWidth
              size="small"
            >
              Edit
            </Button></Link>
           
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => handleDeleteClick(user.id)}
              fullWidth
              size="small"
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
  if (users.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '50vh',
        width: '100%',
        gap: 2
      }}>
        <Typography variant="h3">No users found</Typography>
        <Button onClick={()=>{setGetDefualt(true)}}  variant="contained"  color="secondary"  size={isTablet ? 'small' : 'medium'}
        >Get defulat data</Button>
      </Box>
    );
  }
  return (
    <Box sx={{ 
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      px: { xs: 1, sm: 3 },
      py: { xs: 1, sm: 3 }
    }}>
      <Box sx={{
        backgroundColor: 'white',
        borderRadius: { xs: 1, sm: 3 },
        boxShadow: 1,
        p: { xs: 1, sm: 3 },
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 2 },
          mb: { xs: 1, sm: 3 }
        }}>
          <Typography 
            variant={isMobile ? 'h5' : 'h4'} 
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            User List
          </Typography>
          <Link to="/create">
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Add User
          </Button></Link>
        </Box>

        {error && (
          <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ 
          flex: 1,
          overflowX: 'auto',
          minHeight: 0,
        }}>
          {isMobile ? (
            <Stack spacing={1}>
              {paginatedUsers.map(user => (
                <MobileUserCard key={user.id} user={user} />
              ))}
            </Stack>
          ) : (
            <Table sx={{ 
              minWidth: isTablet ? 600 : 800,
              '& th': { fontWeight: 'bold' }
            }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.company.name}</TableCell>
                    <TableCell align="right">
                      <Stack 
                        direction="row" 
                        spacing={1} 
                        justifyContent="flex-end"
                      >
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={() => handleEditClick(user.id)}
                          size={isTablet ? 'small' : 'medium'}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          onClick={() => handleDeleteClick(user.id)}
                          size={isTablet ? 'small' : 'medium'}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>

        <Box sx={{ 
          mt: { xs: 1, sm: 2 },
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}>
          <TablePagination
            component="div"
            count={users.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={isMobile ? [5] : [5, 10, 25]}
            sx={{
              '.MuiTablePagination-toolbar': {
                pl: { xs: 0 },
                pr: { xs: 0 },
                minHeight: { xs: '40px' },
                alignItems: 'center',
              },
              '.MuiTablePagination-selectLabel': {
                display: { xs: 'none', sm: 'block' }
              },
              '.MuiTablePagination-select': {
                display: { xs: 'none', sm: 'block' }
              },
              
              '.MuiTablePagination-actions': {
                marginLeft: { xs: 0, sm: 2 }
              }
            }}
          />
        </Box>
      </Box>

      <Dialog 
        open={openDialog} 
        onClose={handleCancel}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog 
        open={openDialogEdit} 
        onClose={handleEditCancel}
        maxWidth='x-lg'
      >
       <UserForm showNotification={showNotification}  selectedUseeEditId={selectedUserId} handleEditCancel={handleEditCancel} />
      </Dialog>
    </Box>
  );
};

export default UserList;