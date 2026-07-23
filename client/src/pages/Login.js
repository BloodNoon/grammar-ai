import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
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
  SimpleGrid,
  Box,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

const LOGIN_FEATURES = [
  { title: "Track Progress", body: "Pick up exactly where you left off." },
  { title: "Smart Next Steps", body: "See recommended practice and tests by grade." },
  { title: "Cleaner Dashboard", body: "Your progress, streaks, and activity in one place." },
  { title: "Built For Students", body: "Fast access to lessons, practice, and tests." },
];

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
            Welcome Back
          </Heading>
          <Text mb="2rem" color="whiteAlpha.900">
            Jump back into your lessons, continue practice, and see the next
            best test or skill set waiting for you.
          </Text>
          <SimpleGrid columns={2} spacing={4}>
            {LOGIN_FEATURES.map((f) => (
              <Box key={f.title} bg="whiteAlpha.200" borderRadius="md" p="1rem">
                <Text fontWeight="bold" mb="0.25rem" fontSize="sm">
                  {f.title}
                </Text>
                <Text fontSize="xs" color="whiteAlpha.800">
                  {f.body}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </GridItem>

        <GridItem p="2.5rem">
          <Flex direction="column" justify="center" h="100%">
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
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
                  setValue("role", selectedRole);
                  setRole(selectedRole);
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

              <Heading size="lg" mb="0.5rem" color="brand.700" fontWeight="normal">
                Log In
              </Heading>
              <Text color="gray.500" mb="1.5rem" fontSize="sm">
                Use your email and password to open your learning dashboard.
              </Text>

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

              <Button
                isLoading={isLoading}
                mb="1.5rem"
                loadingText="Loading..."
                type="submit"
                w="100%"
                size="lg"
                bg="gray.100"
                color="brand.700"
                _hover={{ bg: "#E2E8F0" }}
                fontWeight="600"
              >
                Open My Dashboard
              </Button>

              <VStack align="center" spacing={2} fontSize="sm">
                <HStack>
                  <Text color="gray.400">Don't have an account?</Text>
                  <Text as={Link} to="/signup" color="brand.700" fontWeight="bold">
                    Sign Up
                  </Text>
                </HStack>
                <Text as={Link} to="/" color="gray.400">
                  Want to learn first? Return to home
                </Text>
              </VStack>
            </form>
          </Flex>
        </GridItem>
      </Grid>
    </Layout>
  );
}
