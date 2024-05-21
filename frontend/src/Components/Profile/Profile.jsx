import React from "react";
import Profil_destop from "./destop/Profile_destop";
import Profil_mobile from "./mobile/Profile_mobile";
export default function Profil() {
  return (
    <div className="flex items-center gap-4">
   <Profil_destop/>
   <Profil_mobile/>    
  </div>
  );
}
