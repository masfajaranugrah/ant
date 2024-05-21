import { Button } from "@nextui-org/react";
import Clock from "../../Clock/Clock";
import { useState, useEffect } from "react";
import axios from 'axios'
import { Footer, Header } from "../../Index";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Link } from "react-router-dom";

const API1 = `http://localhost:5000/api/v1/user/`;

const Antrian = () => {
  const [antrianList, setAntrianList] = useState([]);
  const authuser = useAuthUser();

  useEffect(() => {
    const fetchAntrian = async () => {
      try {
        const response = await axios.get(`${API1}${authuser._id}`);
        setAntrianList(response.data.data.antrians);
      } catch (error) {
        console.error('Error fetching queue:', error);
      }
    };

    fetchAntrian();
  }, [authuser._id]);

  return (
    <>
      <Header/>
      <section className="bg-gray-300 dark:bg-black relative pt-20 h-screen">
        <div className="relative top-10">        
          <div className="flex justify-center items-center gap-3 top-5">
            <div className="max-w-sm bg-gray-100 dark:bg-slate-800 rounded shadow-lg">
             
            {
  antrianList.filter(antrian => antrian.status === "aktif").length > 0 ? (
    antrianList.map(antrian => (
      antrian.status === "aktif" && (
        <div className="px-6 py-4" key={antrian._id}>
          <div className="font-bold text-3xl mb-2 text-center text-black dark:text-white">
            {antrian.nomer_antrian.includes('I') ? 'Nomer Antrian Informasi' : `Nomer Antrian Kasir`}
          </div>
          <div className="m-3 flex justify-center flex-col items-center">
            <Button color="primary" variant="shadow" className="m-5 flex py-10 px-3 text-3xl justify-center items-center">
              {antrian.nomer_antrian}
            </Button>
            <Clock className='text-red'/>
          </div>
        </div>
      )
    ))
  ) : (
    <div className="flex flex-col items-center justify-center h-full p-4">
                       <div className="font-bold text-2xl mb-2 text-center text-black dark:text-white">
                         Tidak Ada Antrian
                       </div>
                       <div className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                         Saat ini tidak ada antrian yang aktif. Silakan ambil antrian kamu dengan klik button ambil di bawah jika mengalami kendala, silahkan hubungi petugas yang ada.
                       </div>
                       <div className="text-center">
                         <Link to="/">
                           <Button color="primary" variant="solid">
                             Ambil Antrian
                           </Button>
                         </Link>
                       </div>
                     </div>
  )
}
             
           
     
          
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Antrian;
