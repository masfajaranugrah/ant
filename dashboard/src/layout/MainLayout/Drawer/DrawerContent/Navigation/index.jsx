import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

// project import
import NavGroup from './NavGroup';
import menuItem from '../../../../../menu-items';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //
const API1 = `http://localhost:5000/api/v1/administrator/`;

const Navigation = () => {
  const [adminRoles, setAdminRoles] = useState(null);
  const authuser = useAuthUser();
  const auth = useIsAuthenticated();
 
  useEffect(() => {
    const fetchAntrian = async () => {
      try {
        const response = await axios.get(`${API1}${authuser._id}`);
        setAdminRoles(response.data.data.role);
      } catch (error) {
        console.error('Error fetching queue:', error);
      }
    };

    if (authuser && authuser._id) {
      fetchAntrian();
    }
  }, []);

  if (adminRoles === null) {
    return null; // or a loading spinner
  }

  // Filter menu items based on the role
  const filteredItems = menuItem.items.filter((item) => {
     if (adminRoles === 'kasir') {
      return item.id === 'dashboard' || item.id === 'panggilKasir' || item.id === 'repanggilKasir' | item.id === 'cetak';
    } 
    if (adminRoles === 'informasi') {
      return item.id === 'dashboard' || item.id === 'panggilan' || item.id === 'repanggilan' || item.id === 'cetak';
    }
    return true;
  });

  const navGroups = filteredItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

Navigation.propTypes = {
  role: PropTypes.string,
};

export default Navigation;
