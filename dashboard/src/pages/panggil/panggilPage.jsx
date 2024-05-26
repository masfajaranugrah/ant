// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import OrdersTableInformasi from './OrdersTableInformasi';

// ==============================|| SAMPLE PAGE ||============================== //

const panggilPage = () => (
  <MainCard>
    <Typography variant="body2">
     <OrdersTableInformasi/>
    </Typography>
  </MainCard>
);

export default panggilPage;
