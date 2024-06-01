import AntrianLoket from "./AntrianLoket";
import AntrianInformasi from './AntrianInformasi';
import { Footer, Header } from "../../Index";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import NoAccess from "./NoAccess";

const HomeMHS = () => {
  const [antrianList, setAntrianList] = useState([]);
  const [loading, setLoading] = useState(true);
  const authuser = useAuthUser();

  useEffect(() => {
    const fetchAntrian = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_User}${authuser._id}`);
        setAntrianList(response.data.data.antrians);
      } catch (error) {
        console.error('Error fetching queue:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAntrian();
  }, [authuser._id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const activeAntrian = antrianList.filter(antrian => antrian.status === "aktif");

  return (
    <>
      <Header/>
      <section className="relative bg-gray-300 dark:bg-black h-screen">
        <div className="flex flex-col lg:flex-row md:flex-row justify-center items-center relative gap-3">
          {activeAntrian.length > 0 ? (
            activeAntrian.map(antrian => (
              <div key={antrian._id}>
                <NoAccess/>
              </div>
            ))
          ) : (
            <div>
     
              <div>
                <div>
                     <AntrianInformasi/>
                </div>
             <div className="mt-[20px]">
                  <AntrianLoket/>
             </div>
            
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default HomeMHS;
