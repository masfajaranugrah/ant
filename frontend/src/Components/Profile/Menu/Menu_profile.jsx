import {DropdownMenu, DropdownItem, Link} from "@nextui-org/react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
const Menu_profile = () => {
  const authUser = useAuthUser()
  const signOut = useSignOut()
  const navigate = useNavigate()

  const signOutAction = () => {
    signOut()
    navigate('/login')
}
    return ( 
        <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold ">{authUser.nim}</p>
        </DropdownItem>
        <DropdownItem >
          <Link href="/profile" color="foreground">
           Settings
          </Link>
          
        </DropdownItem>
        <DropdownItem>
        <Link href="/help" color="foreground">
          Help & Feedback
          </Link>
        </DropdownItem>
        <DropdownItem color="danger">
        <Link onClick={signOutAction} color="foreground">
          Log Out
          </Link>
        </DropdownItem>
      </DropdownMenu>
     );
}
 
export default Menu_profile;