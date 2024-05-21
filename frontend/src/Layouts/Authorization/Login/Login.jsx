import React, {useState} from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import {Input, Button} from "@nextui-org/react";
import {EyeFilledIcon} from "../component-auth/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../component-auth/EyeSlashFilledIcon";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import refresh from '../../RefleshToken/refresh';
import { Logo } from '../../../Components/Index';
import { Footer } from '../../Index';

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const signIn = useSignIn()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_Reg, {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Jika login berhasil, simpan data pengguna
      const userData = response.data; // Sesuaikan dengan struktur data respons dari server
      console.log(userData.data._id.status)
      if (signIn({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
        },
        userState: { name: userData.data.name,nim: userData.data.nim, _id: userData.data._id, email: userData.data.email, phone_number: userData.data.phone_number},
        // refresh: refresh
      })) {
        // If Login Successfull, then Redirect the user to secure route
        navigate('/');
        toast.success("Hore selamat anda berhasil login");
      } else {
        // Else, there must be some error. So, throw an error
        throw new Error("Error Occurred. Try Again");
      }
    } catch (error) {
      toast.warn(`${error} `);
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
    <Logo/>
    <section className=' h-screen flex justify-center items-center' >
    <div className="w-[90%] flex justify-center items-center">
      <div className="px-3 py-6 rounded-lg shadow-2xl max-w-sm w-full">
        <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold text-center ">Login</h2>
        <p className='text-blue font-semibold text-[12px]'><a href="register">Don't have an account?</a></p> 
        </div>
        <form onSubmit={loginHandler}>
          <div className="mb-4">
            <Input
              isClearable
              type="email"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"
              onClear={() => setEmail('')}
              onChange={handleEmail}
              value={email}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Password"
              variant="bordered"
              value={password}
              onChange={handlePassword}
              placeholder="Enter your password"
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
          <Button type="submit" className="w-full relative" color="primary">Login</Button>
        </form>
      </div>
    </div>
    </section>
  </div>
  );
}

export default Login;
