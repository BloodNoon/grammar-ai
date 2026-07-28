import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import {
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  VStack,
  HStack,
  ButtonGroup,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function ForgotAccount() {
  const [mode, setMode] = useState("password"); // "password" | "username"
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: { email: "" } });

  function selectMode(value) {
    setMode(value);
    setSubmitted(false);
  }

  // Placeholder submit — no backend endpoint exists yet.
  // This just simulates the "request sent" state for now.
  async function onSubmit(data) {
    console.log("Forgot account request (placeholder):", { ...data, mode });
    setSubmitted(true);
    reset();
  }

  return (
    <Layout>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        my="2rem"
        gap="0"
        boxShadow="xl"
        borderRadius="1rem"
        overflow="hidden"
        bg="white"
      >
        <GridItem
          p="2.5rem"
          bg="brand.700"
          color="white"
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          justifyContent="center"
        >
          <Heading size="xl" mb="1rem" color="white">
            Account Recovery
          </Heading>
          <Text color="whiteAlpha.900">
            Forgetting your password or username happens to everyone.
            Enter your email below and we'll help you get back into your
            learning dashboard.
          </Text>
        </GridItem>

        <GridItem p="2.5rem">
          <Flex direction="column" justify="center" h="100%">
            <Box w="100%" maxW="400px" mx="auto">
              <Heading size="lg" mb="0.5rem" color="brand.700" fontWeight="normal">
                Forgot Password or Username?
              </Heading>
              <Text color="gray.500" mb="1.5rem" fontSize="sm">
                Choose what you need help with, then enter your email
                address.
              </Text>

              <ButtonGroup mb="1.5rem" isAttached w="100%">
                <Button
                  flex="1"
                  onClick={() => selectMode("password")}
                  bg={mode === "password" ? "brand.700" : "gray.50"}
                  color={mode === "password" ? "white" : "gray.500"}
                  fontWeight={mode === "password" ? "bold" : "normal"}
                  _hover={{ bg: mode === "password" ? "brand.700" : "gray.100" }}
                >
                  Reset Password
                </Button>
                <Button
                  flex="1"
                  onClick={() => selectMode("username")}
                  bg={mode === "username" ? "brand.700" : "gray.50"}
                  color={mode === "username" ? "white" : "gray.500"}
                  fontWeight={mode === "username" ? "bold" : "normal"}
                  _hover={{ bg: mode === "username" ? "brand.700" : "gray.100" }}
                >
                  Recover Username
                </Button>
              </ButtonGroup>

              {submitted && (
                <Alert status="success" mb="1.5rem" borderRadius="md">
                  <AlertIcon />
                  If an account exists for that email, we've sent{" "}
                  {mode === "password" ? "password reset" : "username recovery"}{" "}
                  instructions.
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                  id="email"
                  isRequired
                  isInvalid={errors.email}
                  mb="1.5rem"
                >
                  <FormLabel color="brand.700" fontWeight="600" fontSize="sm">
                    Email address
                  </FormLabel>
                  <Input
                    name="email"
                    type="email"
                    focusBorderColor="orange.300"
                    {...register("email", {
                      required: "This is required",
                    })}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  mb="1.5rem"
                  w="100%"
                  size="lg"
                  bg="gray.100"
                  color="brand.700"
                  _hover={{ bg: "#E2E8F0" }}
                  fontWeight="600"
                >
                  {mode === "password"
                    ? "Send Password Reset"
                    : "Send Username Recovery"}
                </Button>
              </form>

              <VStack align="center" spacing={2} fontSize="sm">
                <HStack>
                  <Text color="gray.400">Remembered it?</Text>
                  <Text as={Link} to="/login" color="brand.700" fontWeight="bold">
                    Back to Log In
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Layout>
  );
}
