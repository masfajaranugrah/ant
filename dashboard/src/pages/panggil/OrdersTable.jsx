import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material/';
import { useDispatch } from 'react-redux';

const urlApi = "http://localhost:5000/api/v1/antrian";
 // Waktu dalam milidetik antara setiap polling

const OrdersTable = () => {
  const [getData, setGetData] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]); // State untuk menangani tombol-tombol yang telah dinonaktifkan
  const [calledIds, setCalledIds] = useState([]); // State untuk melacak ID yang sudah dipanggil


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlApi);
        setGetData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // Membersihkan efek setelah komponen di-unmount
    return () => {
      // Code untuk membersihkan efek, jika diperlukan
    };
  }, []); 

  // const updateStatus = (_id, status) =>  {
  //  console.log(`${urlApi}/${_id}`)
  //  console.log(status)
  // }

  const updateStatus = async (_id, status) => {
    try {
        const response = await axios.patch(`${urlApi}/${_id}`, { status });

        if (response.status !== 200) {
            throw new Error('Failed to update status');
        }

        const data = response.data;
        console.log(data); // Menampilkan respons dari backend
    } catch (error) {
        console.error('Error updating status:', error.message);
    }
};
 
  // Fungsi untuk menangani ketika tombol "Panggil" diklik
  const handleCall = (_id, antrian, nama) => {

    // Mengirim permintaan suara
    handleCallButtonClick(antrian, nama);
  
    // Menambahkan ID ke dalam daftar tombol yang telah dinonaktifkan
    setDisabledButtons([...disabledButtons, _id]);
    // Menambahkan ID ke dalam daftar ID yang sudah dipanggil
    setCalledIds([...calledIds, _id]);
  };

  //selesai
  const finish = (_id, e) => {
    e.preventDefault();
    updateStatus(_id, 'tidak aktif');
    // Memuat ulang halaman setelah pemanggilan fungsi selesai
    location.reload();
    console.log("berhasil")
  };

  // Fungsi untuk menangani ketika tombol "Panggil Ulang" diklik
  const handleRecall = (_id, antrian, nama) => {
    // Mengirim permintaan suara
    rehandleCallButtonClick(antrian, nama);
    // Menghapus ID dari daftar ID yang sudah dipanggil
    setCalledIds(calledIds.filter(calledId => calledId !== _id));
  };


  // Fungsi untuk menangani pemutaran suara
  const handleCallButtonClick = (antrian, nama) => {
    try {
      if (responsiveVoice && responsiveVoice.speak) {
        responsiveVoice.speak(`Panggilan  untuk antrian ${antrian}, atas nama ${nama}, segera datang ke sumber suara`, "Indonesian Male", {
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


  
  const rehandleCallButtonClick = (antrian, name) => {
    try {
      if (responsiveVoice && responsiveVoice.speak) {
        responsiveVoice.speak(`Panggilan ulang untuk antrian ${antrian}, atas nama ${name}, segera datang ke sumber suara`, "Indonesian Male", {
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
          {getData.filter(data => data.status === 'aktif').map((data) => (
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
                  disabled={disabledButtons.includes(data._id)}>Panggil</Button>
              </TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => handleRecall(data._id, data.nomer_antrian, data.user.name)} 
                  disabled={!calledIds.includes(data._id)}>Panggil Ulang</Button>
              </TableCell>
              <TableCell>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => finish(data._id, event)} 
                >selesai</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
