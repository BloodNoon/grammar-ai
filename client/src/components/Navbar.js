import React from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import NavbarLinks from "./NavbarLinks";
import NavbarLogo from "./NavbarLogo";
import NavbarDropDown from "./NavbarDropDown";

export default function Navbar() {
  const [isMobile] = useMediaQuery("(max-width:480px)");

  return (
    <Flex
      w="100%"
      px={[4, 6, 8]}
      py={3}
      justify="space-between"
      align="center"
      bg="brand.100"
    >
      <NavbarLogo />
      {!isMobile && <NavbarLinks />}
      <NavbarDropDown />
    </Flex>
  );
}
