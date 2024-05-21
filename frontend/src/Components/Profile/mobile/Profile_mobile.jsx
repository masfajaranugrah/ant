import {Dropdown, DropdownTrigger, Avatar} from "@nextui-org/react";
import Menu_profile from "../Menu/Menu_profile";

const Profil_mobile = () => {
    return ( 
        <Dropdown placement="bottom-end"  backdrop="blur">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform lg:hidden xl:hidden"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </DropdownTrigger>
       <Menu_profile/>
      </Dropdown>
     );
}
 
export default Profil_mobile;