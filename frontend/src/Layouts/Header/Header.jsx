import React, {useState, useEffect} from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import {Logo, Switcher, Profil} from "../../Components/Index";



export default function Header({userData}) {
  const menuItems = [
    { label: "Dashboard", url: "/" },
    { label: "Antrian", url: "/antrian" },
    { label: "Profile", url: "/profile" },
    { label: "Log Out", url: "/register" },
  ];


  return (
    <Navbar variant="sticky" isBordered className="bg-[#2f3185] text-white border-b-4 border-b-[#ffc107]">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="hidden lg:flex xl:flex md:flex" justify="start" >
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
     
         <NavbarItem isActive>
          <Link  href="/"  className="text-white" aria-current="page">
           Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="white" className="text-white" href="/antrian">
            Antrian
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="white" className="text-white" href="/profile">
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem  className="relative top-3">
          <Switcher/>
        </NavbarItem>  
 <NavbarItem className=" lg:flex">
       < Profil/>
        </NavbarItem>
      </NavbarContent>

 


       
   


      <NavbarMenu>
          {menuItems.map((item, index) => (
    <NavbarMenuItem key={`${item.label}-${index}`}>
      <Link
        color={
          index === 2 ? "warning": index === 0 ?  "blue" : index === menuItems.length - 1 ? "danger" : "foreground"
        }
        className="w-full"
        href={item.url}
        size="lg"
      >
        {item.label}
      </Link>
    </NavbarMenuItem>
  ))}
      </NavbarMenu>
    </Navbar>
  );
}
