import React, { useEffect, useState } from 'react';
import axios from 'axios';
// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import TablesCetak from './TablesCetak';


const CetakDocument = () => {
  const [data, setData] = useState([]);
  const fileName = "myfile";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_Antrian);
        console.log(response.data.data); // Log the response data for debugging


          const customHeadings = response.data.data.map(item => ({
            "_id": item._id
          }));
          setData(customHeadings); // Update the state with reshaped data
        
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Cetak</h1>
      <MainCard>
    <Typography variant="body2">
     <TablesCetak/>
    </Typography>
  </MainCard>
    </>
  );
}

export default CetakDocument;
