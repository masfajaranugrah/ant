import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from '../../../components/MainCard';

// assets

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({title, count }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" align="center" color="textSecondary">
        {title}
      </Typography>
      <Grid>
        <Grid align="center">
          <Typography variant="h1" align="center" color="inherit">
            {count}
          </Typography>
        </Grid>
       
      </Grid>
    </Stack>
  </MainCard>
);

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
};

AnalyticEcommerce.defaultProps = {
  color: 'primary'
};

export default AnalyticEcommerce;
