// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import OrdersTable from './OrdersTable';

// ==============================|| SAMPLE PAGE ||============================== //

const RePangilanPage = () => (
  <MainCard>
    <Typography variant="body2">
     <OrdersTable/>
    </Typography>
  </MainCard>
);

export default RePangilanPage;
