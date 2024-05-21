import React from "react";
import { Antrian, HomeMHS, Login, Register, Profile, HelpDesk, Footer  } from "../Layouts/Index.jsx";
import {Route, Routes } from "react-router-dom";
import RequireAuth from '@auth-kit/react-router/RequireAuth'

const RoutersHome = () => {
    return (
            <Routes>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                {/* <Route path='/' element={<HomeMHS/>}></Route> */}
                <Route path={'/antrian'} element={
            <RequireAuth fallbackPath={'/login'}>
             <Antrian/> 
            </RequireAuth>
          }/>
        <Route path={"/"} element={
          <RequireAuth fallbackPath={"/login"}>
            <HomeMHS/>
          </RequireAuth>  
        }/>
        <Route path={'/profile'} element={<Profile/>}></Route>
        <Route path={'/help'} element={<HelpDesk/>}></Route>
            </Routes>
            
    );
};

export default RoutersHome;
