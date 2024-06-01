import React, { useEffect, useState } from 'react';
import axios from 'axios';
// material-ui
 
// project import
import MainCard from '../../components/MainCard';
import TablesCetak from './TablesCetak';


const CetakDocument = () => {
 
  return (
    <>
   
      <div>
      <TablesCetak/>
   </div>
    </>
  );
}

export default CetakDocument;


