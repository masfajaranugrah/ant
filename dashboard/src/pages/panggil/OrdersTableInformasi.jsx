import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material/';

const OrdersTableInformasi = () => {
  const [getData, setGetData] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);  
  const [calledIds, setCalledIds] = useState([]);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_Antrian);
        setGetData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const updateStatus = async (_id, status) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_Antrian}/${_id}`, { status });

      if (response.status !== 200) {
        throw new Error('Failed to update status');
      }

      const data = response.data;
      console.log(data); // Menampilkan respons dari backend
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

   const handleCall = (_id, antrian, nama) => {
     handleCallButtonClick(antrian, nama);

     setDisabledButtons([...disabledButtons, _id]);
     setCalledIds([...calledIds, _id]);
  };

   const finish = async (_id, event) => {
    event.preventDefault();
    await updateStatus(_id, 'tidak aktif');
     location.reload();
  };

   const handleRecall = (_id, antrian, nama) => {
     rehandleCallButtonClick(antrian, nama);
     setCalledIds(calledIds.filter(calledId => calledId !== _id));
  };

   const handleCallButtonClick = (antrian, nama) => {
    try {
      if (responsiveVoice && responsiveVoice.speak) {
        responsiveVoice.speak(`Panggilan untuk antrian ${antrian}, segera datang ke loket infromasi`, "Indonesian Male", {
          pitch: 1,
          rate: 1,
        });
      } else {
        throw new Error('Pustaka tidak tersedia atau suara tidak dapat diputar.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat memainkan suara:', error.message);
    }
  };

  const rehandleCallButtonClick = (antrian, nama) => {
    try {
      if (responsiveVoice && responsiveVoice.speak) {
        responsiveVoice.speak(`Panggilan ulang untuk antrian ${antrian}, segera datang ke loket infromasi`, "Indonesian Male", {
          pitch: 1,
          rate: 1,
        });
      } else {
        throw new Error('Pustaka tidak tersedia atau suara tidak dapat diputar.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat memainkan suara:', error.message);
    }
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>NIM</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Nomor Antrian</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Panggil</TableCell>
            <TableCell>Panggil Ulang</TableCell>
            <TableCell>Selesai</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getData.filter(data => data.status === 'aktif' && data.nomer_antrian?.startsWith('I')).map((data) => (
            <TableRow key={data._id}>
              <TableCell>{data.user?.nim}</TableCell>
              <TableCell>{data.user?.name}</TableCell>
              <TableCell>{data.nomer_antrian}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCall(data._id, data.nomer_antrian, data.user.name)}
                  disabled={disabledButtons.includes(data._id)}
                >
                  Panggil
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRecall(data._id, data.nomer_antrian, data.user.name)}
                  disabled={!calledIds.includes(data._id)}
                >
                  Panggil Ulang
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={(event) => finish(data._id, event)}
                >
                  Selesai
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTableInformasi;
