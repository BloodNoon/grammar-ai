import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
} from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function NavbarDropDown() {
  const { currentUser, logout } = useAuth();
  const queryClient = useQueryClient();
  const [isMobile] = useMediaQuery("(max-width:480px)");
  function handleLogout() {
    logout();
    queryClient.removeQueries("user", { exact: true });
  }

  return (
    <HStack>
      {!currentUser ? (
        <>
          <Text
            as={Link}
            to="/signup"
            px="1.2rem"
            py="0.35rem"
            mr="1rem"
            borderRadius="0.5rem"
            bg="brand.900"
            color="white"
            fontSize="lg"
          >
            Sign Up
          </Text>
          <Button
            as={Link}
            to="/login"
            fontSize="lg"
            color="brand.900"
            borderColor="brand.900"
            borderWidth="2px"
            variant="outline"
          >
            Login
          </Button>
        </>
      ) : (
        <Menu>
          <MenuButton
            as={Button}
            mx="1rem"
            rightIcon={<ChevronDownIcon />}
            fontSize="lg"
          >
            {currentUser.data.alias
              ? currentUser.data.alias
              : currentUser.data.email}
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/dashboard" color="red.700">
              DashBoard
            </MenuItem>
            {isMobile && (
              <>
                <MenuItem as={Link} to="/prompts" color="red.700">
                  Start Writing
                </MenuItem>
                <MenuItem
                  as={Link}
                  to={{
                    pathname: "https://forms.gle/N8aZD3yeA9ya7SMW6",
                  }}
                  target="_blank"
                  color="red.700"
                >
                  Report Bug
                </MenuItem>
              </>
            )}
            <MenuItem as={Link} to="/" onClick={handleLogout} color="red.700">
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </HStack>
  );
}
