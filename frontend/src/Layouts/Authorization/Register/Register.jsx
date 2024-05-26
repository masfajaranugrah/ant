import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../component-auth/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../component-auth/EyeSlashFilledIcon";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import {toast } from 'react-toastify';
import { Logo } from '../../../Components/Index';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const phoneNumberRegex = (phone_number) => phone_number.match(/^(\+62|62|62)8[1-9][0-9]{6,9}$/);
  const isInvalidphone = React.useMemo(() => {
    if (phone_number === "") return false;

    return phoneNumberRegex(phone_number) ? false : true;
  }, [phone_number]);

  const validateEmail = (email) => email.match(/^[a-zA-Z0-9._%+-]+@student.ums.ac.id$/);
  const isInvalid = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const passwordRegex = (password) => password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
  );
  const isInvalidPassword = React.useMemo(() => {
    if (password === "") return false;
    return passwordRegex(password) ? false : true;
  }, [password]);


  const handleName = (e) => { 
    setName(e.target.value); 
    setSubmitted(false); 
  };
  const handleNim = (e) => { 
    setNim(e.target.value); 
    setSubmitted(false); 
  }; 

  const handlePhoneNumber = (e) => { 
    setPhoneNumber(e.target.value); 
    setSubmitted(false); 
  }; 

  const handleEmail = (e) => { 
    setEmail(e.target.value); 
    setSubmitted(false); 
  }; 

  const handlePassword = (e) => { 
    setPassword(e.target.value); 
    setSubmitted(false); 
  }; 
   

  const handleClick =async (event) => {
    event.preventDefault();
    await axios.post(import.meta.env.VITE_User, {
      name: name, 
      nim : nim ,
      phone_number : phone_number,
       email : email,
       password : password
    },{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function (response) {
      const MyIcon = () => (
        "🎉"
      )
      toast.success("Horee selamat anda berhasil registrasi", {
        icon: MyIcon
      })  
      navigate('/login')
    })
    .catch(function (err) {
      const MyIcon = () => (
        "😭"
      )
      toast.warn("Registrasi kamu gagal, silahkan coba lagi", {
    
        icon: MyIcon
      })  
})
  }

  return (
        <div className="container mx-auto">
    <Logo/>
      <div className="flex items-center justify-center h-screen my-10">
        <div className="p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl text-gray-600 font-semibold text-center mb-4">Create a new account</h2>
          <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>
          <form onSubmit={handleClick} method="post">
            <div className="mb-4">
              <Input
                isClearable
                type="text"
                label="Name"
                value={name}
                onChange={handleName}
                variant="bordered"
                placeholder="Enter your name"
                className="w-full"
                onClear={() => setName('')}
                
              />
            </div>
            <div className="mb-4">
              <Input
                isClearable
                type="text"
                label="NIM"
                value={nim}
                onChange={handleNim}
                variant="bordered"
                onClear={() => setNim('')}
                placeholder="Enter your NIM"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Input
                isClearable
                type="tel"
                label="Phone Number"
                value={phone_number}
                onChange={handlePhoneNumber}
                variant="bordered"
                onClear={() =>setPhoneNumber('')}
                isInvalid={isInvalidphone}
                color={isInvalidphone ? "danger" : "success"}
                errorMessage={isInvalidphone && "gunakan format 62xxxxxxxxxx"}
                placeholder="Enter your phone number"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Input
                isClearable
                type="email"
                label="Email"
                value={email}
                onChange={handleEmail}
                variant="bordered"
                onClear={() => setEmail("")}
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "success"}
                errorMessage={isInvalid && "Please enter a valid @student.ums.ac.id email address"}
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
            <div className="mb-4">
            <Input
    label="Password"
    value={password}
    onChange={handlePassword}
    variant="bordered"
    placeholder="Enter your password"
    isInvalid={isInvalidPassword}
    color={isInvalidPassword ? "danger" : "success"}
    errorMessage={isInvalidPassword &&  `
        Password must be at least 8 characters long and contain at least one uppercase letter,
        one lowercase letter,
        one number, and
        one special character
    `}

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
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full relative" color="primary">Register</Button>
            <p className="text-gray-600 text-xs text-center mt-4">
              Apakah anda sudah memiliki akun jika sudah silahkan klik <a href="login" className="text-blue-500 hover:underline">Sign In</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
