import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import loginImg from "../images/undraw_my_password.svg";
import {
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  Image,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  HStack,
  Center,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

export default function Login() {
  const { currentUser, login } = useAuth();
  const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultValues: { email: "", password: "", role: "student" } });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 1. Added role state to keep track of the selected tab for the query
  const [role, setRole] = useState("student");

  // 2. Updated the query key array to include the new role
  const { isLoading, isError, error, refetch, status } = useQuery(
    ["user", { email, password, role }],
    login,
    { enabled: false },
  );

  if (currentUser) {
    return <Redirect to="/" />;
  }

  async function onSubmit() {
    try {
      refetch();
      if (status === 200) history.push("/");
    } catch (err) {
      console.error(err, "Failed to log in.");
    }
  }

  return (
    <Layout>
      {isError && (
        <Alert status="error" mt="2rem" borderRadius="md">
          <AlertIcon />
          An error occurred: {error.message}
        </Alert>
      )}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        my="2rem"
        gap="2rem"
        boxShadow="xl"
        borderRadius="1rem"
        bg="white"
      >
        <GridItem p="2rem">
          <Flex direction="column" justify="center" align="center" h="100%">
            <Heading size="lg" mb="2rem" color="brand.700" fontWeight="normal">
              Welcome Back
            </Heading>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", maxWidth: "400px" }}
            >
              {/* Hidden input to ensure 'role' is tracked by the form */}
              <input type="hidden" {...register("role")} />

              {/* --- TABBED ROLE SELECTOR --- */}
              <Tabs
                isFitted
                variant="enclosed"
                mb="1.5rem"
                onChange={(index) => {
                  const selectedRole = index === 0 ? "student" : "teacher";
                  setValue("role", selectedRole); // Updates react-hook-form
                  setRole(selectedRole); // Updates the useQuery dependency
                }}
              >
                <TabList mb="1em" borderColor="gray.200">
                  <Tab
                    _selected={{
                      color: "brand.700",
                      borderColor: "gray.200",
                      borderBottomColor: "white",
                      bg: "white",
                      fontWeight: "bold",
                    }}
                    color="gray.500"
                    bg="gray.50"
                  >
                    Student
                  </Tab>
                  <Tab
                    _selected={{
                      color: "brand.700",
                      borderColor: "gray.200",
                      borderBottomColor: "white",
                      bg: "white",
                      fontWeight: "bold",
                    }}
                    color="gray.500"
                    bg="gray.50"
                  >
                    Teacher
                  </Tab>
                </TabList>
              </Tabs>
              {/* --------------------------- */}

              <FormControl
                id="email"
                isRequired
                isInvalid={errors.email}
                mb="1rem"
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
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="password"
                isRequired
                isInvalid={errors.password}
                mb="1.5rem"
              >
                <FormLabel color="brand.700" fontWeight="600" fontSize="sm">
                  Password
                </FormLabel>
                <Input
                  name="password"
                  type="password"
                  focusBorderColor="orange.300"
                  {...register("password", {
                    required: "This is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Center>
                <Button
                  isLoading={isLoading}
                  my="1rem"
                  loadingText="Loading..."
                  type="submit"
                  w="100%"
                  size="lg"
                  bg="gray.100"
                  color="brand.700"
                  _hover={{ bg: "#E2E8F0" }}
                  fontWeight="600"
                >
                  Log in
                </Button>
              </Center>

              <Center mt={2}>
                <HStack fontSize="sm">
                  <Text color="gray.400">Don't have an account?</Text>
                  <Text
                    as={Link}
                    to="/signup"
                    color="brand.700"
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Sign Up
                  </Text>
                </HStack>
              </Center>
            </form>
          </Flex>
        </GridItem>

        <GridItem p="2rem" display={{ base: "none", md: "block" }}>
          <Image
            src={loginImg}
            alt="login"
            boxSize="100%"
            objectFit="contain"
          />
        </GridItem>
      </Grid>
    </Layout>
  );
}
