import React from "react";
import { Flex, Text } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <div>
      <Flex justify="center">{children}</Flex>

      <Flex minW="100vw" mt="1.5rem" justify="center" align="center">
        <Text>© 2020 - 2021 Students Writing.com</Text>
      </Flex>
    </div>
  );
}
