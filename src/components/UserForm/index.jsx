import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  Container,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const UserForm = ({ showNotification,selectedUseeEditId,handleEditCancel }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const { users,addUser, updateUser } = useUserContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: { name: '' },
    address: { street: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
    phone: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  let { id } = useParams();
  if(selectedUseeEditId){
    id=selectedUseeEditId;
  }
  console.log(id);
  console.log('selectedUseeEditId',selectedUseeEditId);
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
          
          const updatedUser = users.filter((user) => user.id === parseInt(id));
          setFormData(updatedUser[0]);
          setLoading(false);
        })
        .catch(() => {
          showNotification('Failed to load user data', 'error');
          setLoading(false);
        });
    }
  }, [id, showNotification]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const [field, subfield] = name.split('.');
      if (subfield) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subfield]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'A valid email is required';
    if (!formData.company?.name) newErrors.company = 'Company name is required';
    if (!formData.address?.street) newErrors.addressStreet = 'Street address is required';
    if (!formData.address?.city) newErrors.addressCity = 'City is required';
    if (!formData.address?.zipcode) newErrors.addressZipcode = 'Zipcode is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.website || !/.[^\s]*$/.test(formData.website)) newErrors.website = 'A valid website URL is required';
    return newErrors;
  };

  const handleSave = () => {
    setIsSubmitting(true);
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showNotification('Please fill out all fields correctly!', 'error');
      setIsSubmitting(false);
      return;
    }

    setLoading(true);
    const url = id ? `https://jsonplaceholder.typicode.com/users/${id}` : 'https://jsonplaceholder.typicode.com/users';
    const method = id ? 'put' : 'post';

    axios[method](url, formData)
      .then(() => {
        setLoading(false);
        if (id) {
          updateUser(formData);
          const updatedUser = users.filter((user) => user.id === parseInt(id));
          console.log(updatedUser);
          setFormData(updatedUser[0]);
        } else {
          addUser(formData);
        }
        showNotification(id ? 'User updated successfully' : 'User added successfully', 'success');
        if(selectedUseeEditId){
          handleEditCancel();
        }
        navigate('/users');
      })
      .catch(() => {
        setLoading(false);
        showNotification('Failed to save user.', 'error');
        setIsSubmitting(false);
      });
  };
  const handleCancel = () => {
    if(selectedUseeEditId){
      handleEditCancel();
    }
    navigate('/users');

  }
  const hasErrors = Object.keys(validateForm()).length > 0;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', width: '50vw' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        // width: '100%', 
        overflowX: 'hidden',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: 'white',
          borderRadius: { xs: 2, sm: 3, md: 4 },
          boxShadow: 1,
          width: '100%',
          mx: 'auto',
          boxSizing: 'border-box'
        }}
      >
        <Typography 
          variant={isMobile ? 'h5' : 'h4'} 
          sx={{ 
            color: '#111111',
            mb: { xs: 2, sm: 3, md: 4 },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          {id ? 'Edit User' : 'Add User'}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name}
              size={isMobile ? 'small' : 'medium'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email}
              size={isMobile ? 'small' : 'medium'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company"
              name="company.name"
              value={formData.company?.name}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(errors.company)}
              helperText={errors.company}
              size={isMobile ? 'small' : 'medium'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              size={isMobile ? 'small' : 'medium'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street"
              name="address.street"
              value={formData.address?.street}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(errors.addressStreet)}
              helperText={errors.addressStreet}
              size={isMobile ? 'small' : 'medium'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="address.city"
              value={formData.address?.city}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(errors.addressCity)}
              helperText={errors.addressCity}
              size={isMobile ? 'small' : 'medium'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zipcode"
              name="address.zipcode"
              value={formData.address?.zipcode}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(errors.addressZipcode)}
              helperText={errors.addressZipcode}
              size={isMobile ? 'small' : 'medium'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(errors.website)}
              helperText={errors.website}
              size={isMobile ? 'small' : 'medium'}
            />
          </Grid>
        </Grid>

        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          mt: { xs: 3, sm: 4 },
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'stretch' : 'flex-start'
        }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSave} 
            fullWidth={isMobile}
            size={isMobile ? 'large' : 'medium'}
          >
            Save
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleCancel}
            fullWidth={isMobile}
            size={isMobile ? 'large' : 'medium'}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserForm;