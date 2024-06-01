// material-ui
import { Grid, Typography } from "@mui/material";

import MainCard from "../../components/MainCard";
import AnalyticEcommerce from "../../components/cards/statistics/AnalyticEcommerce";
import AuthFooter from "../../components/cards/AuthFooter";
import axios from "axios";
import { useEffect, useState } from "react";
// ==============================|| DASHBOARD - DEFAULT ||============================== //
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const DashboardDefault = () => {
  const [adminRoles, setAdminRoles] = useState(null);
  const authuser = useAuthUser();

  useEffect(() => {
    const fetchAntrian = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_Admin}${authuser._id}`
        );
        setAdminRoles(response.data.data.role);
      } catch (error) {
        console.error("Error fetching queue:", error);
      }
    };

    if (authuser && authuser._id) {
      fetchAntrian();
    }
  }, []);

  const [getData, setGetData] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_Antrian).then((res) => {
      setGetData(res.data.data);
    });
  }, []);

  // kasir
  const countActiveQueue = () => {
    const data = getData.filter((data) => data.nomer_antrian?.startsWith("K"));
    return data.length;
  };
  // informasi
  const countActiveQueueInformasi = () => {
    const data = getData.filter((data) => data.nomer_antrian?.startsWith("I"));
    return data.length;
  };

  // kasir 
  const getFirstActiveQueue = () => {
    const activeQueues = getData.filter((item) => item.status === "aktif" && item.nomer_antrian?.startsWith("K"));
    // Jika ada antrian aktif, kembalikan nomer antriannya, jika tidak, kembalikan "-"
    return activeQueues.length > 0 ? activeQueues[0].nomer_antrian : "-";
  };
  // informasi 
  const getFirstActiveQueueInformasi = () => {
    const activeQueues = getData.filter((item) => item.status === "aktif" && item.nomer_antrian?.startsWith("I"));
    // Jika ada antrian aktif, kembalikan nomer antriannya, jika tidak, kembalikan "-"
    return activeQueues.length > 0 ? activeQueues[0].nomer_antrian : "-";
  };

  // kasir 
  const getNextQueue = () => {
    const activeQueues = getData.filter((item) => item.status === "aktif" && item.nomer_antrian?.startsWith("K"));
    // Jika ada antrian aktif, kembalikan nomer antriannya, jika tidak, kembalikan "-"
    return activeQueues.length > 1 ? activeQueues[1].nomer_antrian : "-";
  };
// informasi 
const getNextQueueInformasi = () => {
  const activeQueues = getData.filter((item) => item.status === "aktif" && item.nomer_antrian?.startsWith("I") );
  // Jika ada antrian aktif, kembalikan nomer antriannya, jika tidak, kembalikan "-"
  return activeQueues.length > 1 ? activeQueues[1].nomer_antrian : "-";
};


// kasir 
  const sisa = () => {
    return getData.filter((item) => item.status === "aktif" && item.nomer_antrian?.startsWith("K") ).length;
  };

  // informasi 
  const sisainformasi = () => {
    return getData.filter((item) => item.status === "aktif" && item.nomer_antrian?.startsWith("I")).length;
  };

  // const calledfinish = () => {

  // return getData.filter(item => item.status === 'tidak aktif').length;

  // };
  console.log(adminRoles);
  return (
    <div>
      {adminRoles === "kasir" ? (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>
          

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Jumlah Antrian"
              count={countActiveQueue()}
              percentage={59.3}
              extra="35,000"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Antrian Sekarang"
              count={getFirstActiveQueue()}
              percentage={70.5}
              extra="8,900"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Antrian Selanjutnya"
              count={getNextQueue()}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Sisa Antrian"
              count={sisa()}
              percentage={27.4}
              isLoss
              color="warning"
              extra="$20,395"
            />
          </Grid>
          <Grid item xs={12}>
            <AuthFooter />
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>
  

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Jumlah Antrian"
              count={countActiveQueueInformasi()}
              percentage={59.3}
              extra="35,000"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Antrian Sekarang"
              count={getFirstActiveQueueInformasi()}
              percentage={70.5}
              extra="8,900"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Antrian Selanjutnya"
              count={getNextQueueInformasi()}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Sisa Antrian"
              count={sisainformasi()}
              percentage={27.4}
              isLoss
              color="warning"
              extra="$20,395"
            />
          </Grid>
          <Grid item xs={12}>
            <AuthFooter />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DashboardDefault;
