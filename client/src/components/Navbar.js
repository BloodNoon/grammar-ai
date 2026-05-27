import React from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import NavbarLinks from "./NavbarLinks";
import NavbarLogo from "./NavbarLogo";
import NavbarDropDown from "./NavbarDropDown";

export default function Navbar({ showSidebar }) {
  const [isMobile] = useMediaQuery("(max-width:768px)");

  return (
    <Flex
      w="100%"
      px={[4, 6, 8]}
      py={3}
      justify="space-between"
      align="center"
      bg="brand.100"
    >
      <NavbarLogo ml={isMobile && showSidebar ? "56px" : "0px"} />
      {!isMobile && <NavbarLinks />}
      {!isMobile && <NavbarDropDown />}
    </Flex>
  );
}
