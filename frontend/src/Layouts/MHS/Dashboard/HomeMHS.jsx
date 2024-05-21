 import AntrianLoket from "./AntrianLoket";
import AntrianInformasi from './AntrianInformasi';
import { Footer, Header } from "../../Index";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import NoAccess from "./NoAccess";
 
const API1 = `http://localhost:5000/api/v1/user/`;
const HomeMHS = () => {
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
    <section className="relative bg-gray-300 dark:bg-black h-screen ">
      <div>
     
      </div>
      <div className="flex flex-col -top-20 lg:flex-row md:flex-row justify-center  items-center relative gap-3">
      {
  antrianList.filter(antrian => antrian.status === "aktif").length > 0 ? (
    antrianList.map(antrian => (
      antrian.status === "aktif" && (
        <div>
          <NoAccess/>
        </div>
      )
    ))
  ) : (
    <div>
    <h1>Ambil Antrian</h1>
    <hr />
    <div  className="flex justify-center items-center text-5xl  font-bold pt-20 relative" >
                <AntrianInformasi/>
    <AntrianLoket/>
                     </div></div>
  )
}
             
    
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default HomeMHS;
