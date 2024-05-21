import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from '../../Authorization/component-auth/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../Authorization/component-auth/EyeSlashFilledIcon';
import './p.scss';
import gambar from '/image/profile.png'
import { Footer, Header } from "../../Index";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const loadFile = (event) => {
    const image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
  };
  
  const authuser = useAuthUser();
  return (
    <>
    <Header/>
    <section className="bg-gray-300 dark:bg-black gap-10 relative     flex flex-col lg:flex-row md:flex-row h-screen items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="profile-pic">
          <label className="-label" htmlFor="file">
            <span className="glyphicon glyphicon-camera"></span>
            <span>Change Image</span>
          </label>
          <input id="file" type="file" onChange={loadFile} />
          <img src={gambar} id="output" width="200" alt="Profile" />
        </div>
      </div>
      <div>
        <form action="" className="gap-3">
          <div className="flex m-3 gap-5 relative">
            <Input
              type="text"
              label="Name : "
              value={authuser.name}
            />
          </div>
          <div className="flex m-3 gap-5 relative">
            <Input
              type="email"
              label="Email : "
              value={authuser.email}
            />
          </div>
          <div className="flex m-3">
            <Input
              type="tel"
              label="Phone : "
              value={authuser.phone_number}
            />
          </div>
          <div className="flex m-3">
            <Input
              label="Password : "
              value={"********"}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>
              <div className="absolute flex justify-center items-center w-[70%]">
                  <Button color="primary" variant="solid">
        Update
      </Button>
              </div>
        
        </form>
      </div>
    </section>
    <Footer/>
    </>

  );
}

export default Profile;
