import { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';


const NoAccess = () => {


return (
    <div   className="flex justify-center mx-4 items-center relative gap-3 ">
      <div  className="top-40 relative cursor-pointer px-10 bg-gray-100 dark:bg-slate-800 s-screen rounded overflow-hidden shadow-lg">
        <div className="px-12 py-10">
          <div className="font-bold text-xl mb-2 text-center text-black dark:text-white">
            Anda Masih Memiliki Nomer Antrian Yang Aktif
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default NoAccess;
