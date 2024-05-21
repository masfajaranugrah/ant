import {Dropdown, DropdownTrigger, User} from "@nextui-org/react";
import Menu_profile from "../Menu/Menu_profile";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
const Profil_destop = () => {
  const authUser = useAuthUser()
    return ( 
        <Dropdown placement="bottom-start" backdrop="blur">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
          className="transition-transform hidden lg:flex xl:flex font-bold text-white"
          description={authUser.nim}
          name={authUser.name}
        />
      </DropdownTrigger>
    <Menu_profile/>
    </Dropdown>
     );
}
 
export default Profil_destop;