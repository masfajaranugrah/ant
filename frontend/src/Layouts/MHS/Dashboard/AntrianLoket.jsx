import { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';


const AntrianLoket = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getData, setGetData] = useState({});
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(null);
  const [cancelToken, setCancelToken] = useState(null);

  const authUser = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    const source = axios.CancelToken.source();
    setCancelToken(source);

    axios.get(import.meta.env.VITE_aPIGATEWAY, {
      cancelToken: source.token
    })
      .then((response) => {
        setGetData(response.data);
      })
      .catch((error) => {
        
      });

    return () => {
      if (source) {
        return false
      }
    };
  }, []);

  useEffect(() => {
    if (getData.data && Array.isArray(getData.data)) {
      const kAntrian = getData.data
        .filter(item => item.nomer_antrian.startsWith("K"))
        .map(item => parseInt(item.nomer_antrian.slice(1), 10));

      if (kAntrian.length > 0) {
        const maxKNumber = Math.max(...kAntrian);
        setCounter(maxKNumber + 1);
      } else {
        setCounter(1);
      }
    }
  }, [getData]);

  const handleClick = () => {
    const newAntrian = `K${counter}`;
    setCounter(counter + 1);
    onClose();
    axios.post(import.meta.env.VITE_aPIGATEWAY, {
      user: authUser._id,
      nomer_antrian: newAntrian,
      status: "aktif"
    })
    .then(() => {
      navigate('/antrian');
    })
    .catch((error) => {
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
            Antrian Kasir
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default AntrianLoket;
