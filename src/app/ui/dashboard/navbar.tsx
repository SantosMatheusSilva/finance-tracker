'use client'
import {  
    Navbar,   
    NavbarBrand,   
    NavbarContent,   
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem  
} from "@heroui/navbar";
import {
    Avatar, 
} from "@heroui/avatar";
import {  
    Dropdown,  
    DropdownTrigger,  
    DropdownMenu,  
    DropdownSection,  
    DropdownItem
} from "@heroui/dropdown";
import { LogoutButton } from "./buttons";
import { signOut } from "next-auth/react";

import { useState } from "react";
import { useUser } from "@/app/context/sessionDataProvider";



interface NavbarProps {
    sideNavRef: React.RefObject<HTMLDivElement>;
  }

export const AcmeLogo = () => {
    
    return (
      <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
          clipRule="evenodd"
          d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    );
  };

export default function TopNavbar ({ sideNavRef }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {sessionUser} = useUser();

    /* const handleToggle = () => {
        setIsMenuOpen((prev) => !prev); 
      }; */

    return (
      <Navbar
        parentRef={sideNavRef}
        className=" bg-default-50 rounded-2xl"
        position="static"
        height={50}
        maxWidth="full"
        isBlurred={false}
        shouldHideOnScroll
        isBordered
        isMenuOpen={isMenuOpen} 
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarBrand className="md:hidden">
          <AcmeLogo />
          <p className="font-bold text-inherit sm:hidden">FTracker</p>
        </NavbarBrand>
        <NavbarContent justify="start" className="hidden sm:flex">
          <p className="text-2xl">Hello <strong>{sessionUser.username}</strong>.</p>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                name="User Name"
                fallback
                //showFallback
                className="transition-transform"
                size="sm"
                isBordered
                as="button"
                color="primary"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
              <DropdownSection>
                <DropdownItem key="profile">
                  <p>signed in as <strong>{sessionUser.username}</strong></p>
                  <p>{sessionUser.email}</p>
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="update profile">
                <p>Update profile</p>
              </DropdownItem>

              <DropdownItem key="log out">
                <LogoutButton onPress={() => signOut()}>Log Out</LogoutButton>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        {/* mobile menu */}
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle className="w-fit"  /* icon={<Avatar size="sm" radius="full"/>} */ aria-label={isMenuOpen ? "Close menu" : "Open menu"} >
          </NavbarMenuToggle>
        </NavbarContent>
        <NavbarMenu className="flex gap-3 md:hidden" >
          <NavbarMenuItem>
            <p>signed in as {sessionUser.username}</p>
            <p>{sessionUser.email}</p>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <p>Update profile</p>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <LogoutButton onPress={() => signOut()}>Log Out</LogoutButton>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    );
}