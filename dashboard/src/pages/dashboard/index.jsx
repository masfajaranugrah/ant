 // material-ui
import {
  Grid,
  Typography
} from '@mui/material';

import MainCard from '../../components/MainCard';
import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';
import AuthFooter from '../../components/cards/AuthFooter';
import axios from 'axios'
import { useEffect, useState } from 'react';
// ==============================|| DASHBOARD - DEFAULT ||============================== //
const urlApi = "http://localhost:5000/api/v1/antrian";

const DashboardDefault = () => {
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    axios.get(urlApi)
    .then((res) => {
      setGetData(res.data.data)
    })
  }, [])
  const countActiveQueue = () => {
    return getData.length;
  };
  const getFirstActiveQueue = () => {
    const firstActiveQueue = getData.find(item => item.status === 'aktif');
    return firstActiveQueue ? firstActiveQueue.nomer_antrian : "-";
};



const sisa = () => {
  return getData.filter(item => item.status === 'aktif').length;

}


// const calledfinish = () => {

// return getData.filter(item => item.status === 'tidak aktif').length;
  
// };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Jumlah Antrian" count={countActiveQueue()} percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Antrian Sekarang" count={getFirstActiveQueue()} percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Antrian Selanjutnya" count="" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Sisa Antrian" count={sisa()} percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>

      <Grid item xs={12}>
        <AuthFooter />
      
      </Grid>
    
      </Grid>

  );
};

export default DashboardDefault;
