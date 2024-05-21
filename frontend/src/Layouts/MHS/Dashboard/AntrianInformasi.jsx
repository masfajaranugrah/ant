import { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';
const AntrianInformasi = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getData, SetGetData] = useState({});
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(null);
  const [cancelToken, setCancelToken] = useState(null);

  const authUser = useAuthUser();
  const navigate = useNavigate();
  useEffect(() => {
    // Membuat objek pembatalan baru menggunakan CancelToken
    const source = axios.CancelToken.source();
   // Menyimpan objek pembatalan ke dalam state
    setCancelToken(source);

    // Membuat permintaan GET ke API menggunakan Axios saat komponen dimuat
    axios.get(import.meta.env.VITE_aPIGATEWAY, {
      cancelToken: source.token // Menambahkan token pembatalan ke dalam pengaturan permintaan
    })
      .then(function (response) {
        // Mengatur state getData dengan data yang diterima dari respons API
        SetGetData(response.data);
      })
      .catch(function (error) {
        // Mengatur state error dengan pesan kesalahan jika terjadi kesalahan saat mengambil data dari API
        
      });

    // Membersihkan efek jika komponen di-unmount
    return () => {
      // Membatalkan permintaan HTTP jika komponen di-unmount
      if (source) {
        source.cancel('Component unmounted');
      }
    };
  }, []); // useEffect hanya dijalankan sekali setelah komponen dimuat karena dependencies berupa array kosong


  useEffect(() => {
    if (getData.data && Array.isArray(getData.data)) {
      setCounter(getData.data.length + 1);
    }
    
  }, [getData]);

  const handleClick = () => {
    setCounter(counter + 1);
    onClose();
    axios.post(import.meta.env.VITE_aPIGATEWAY, {
      user: authUser._id,
      nomer_antrian: "I" + counter,
      status: "aktif"
    })
    .then(function (response) {
      navigate('/antrian')
      
    })
    .catch(function (error) {
      setError(error.message);
    });
  };
  return (
    <div onClick={onOpen} className="flex justify-center mx-4 items-center relative gap-3 ">
      <div  className="top-40 relative cursor-pointer px-10 bg-gray-100 dark:bg-slate-800 s-screen rounded overflow-hidden shadow-lg">
        <div className="px-12 py-10">
          <Modal
            backdrop="blur"
            isOpen={isOpen}
            onClose={onClose} 
          >
            <ModalContent>
              <>
                <ModalHeader className="flex flex-col gap-1">notif</ModalHeader>
                <ModalBody>
                  <p>
                    Apakah kamu ingin mengambil antrian
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Tidak
                  </Button>
                  <Button color="primary" onClick={handleClick}>
                    Iya
                  </Button>
                </ModalFooter>
              </>
            </ModalContent>
          </Modal>
          <div className="font-bold text-xl mb-2 text-center text-black dark:text-white">
            Antrian Informasi
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default AntrianInformasi;
