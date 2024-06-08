import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material/';

const OrdersTablekasir = () => {
  const [getData, setGetData] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]); // State untuk menangani tombol-tombol yang telah dinonaktifkan
  const [calledIds, setCalledIds] = useState([]); // State untuk melacak ID yang sudah dipanggil

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


  // Fungsi untuk menangani ketika tombol "Selesai" diklik
  const finish = async (_id, event) => {
    event.preventDefault();
    await updateStatus(_id, 'tidak aktif');
    // Memuat ulang halaman setelah pemanggilan fungsi selesai
    location.reload();
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
            <TableCell>Tanggal</TableCell>
            <TableCell>Panggil</TableCell>
            <TableCell>Panggil Ulang</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getData.filter(data => data.status === 'tidak aktif' && data.nomer_antrian?.startsWith('K')).map((data) => (
            <TableRow key={data._id}>
              <TableCell>{data.user?.nim}</TableCell>
              <TableCell>{data.user?.name}</TableCell>
              <TableCell>{data.nomer_antrian}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>{data.createdAt ? new Date(data.createdAt).toLocaleDateString('id-ID') : ''}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  disabled
                >
                  Panggil
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                 disabled
                >
                  Panggil Ulang
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTablekasir;
