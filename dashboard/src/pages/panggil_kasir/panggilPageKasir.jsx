// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import OrdersTablekasir from './OrdersTablekasir';

// ==============================|| SAMPLE PAGE ||============================== //

const panggilPageKasir = () => (
  <MainCard>
    <Typography variant="body2">
     <OrdersTablekasir/>
    </Typography>
  </MainCard>
);

export default panggilPageKasir;
