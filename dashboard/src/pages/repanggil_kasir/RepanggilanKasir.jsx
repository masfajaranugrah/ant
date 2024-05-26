// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import OrdersTableKasir from './OrdersTableKasir';

// ==============================|| SAMPLE PAGE ||============================== //

const RepanggilanKasir = () => (
  <MainCard>
    <Typography variant="body2">
     <OrdersTableKasir/>
    </Typography>
  </MainCard>
);

export default RepanggilanKasir;
