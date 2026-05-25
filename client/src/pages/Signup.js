import React from "react";
import Layout from "../components/Layout";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import signUpImg from "../images/undraw_sign_in.svg";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
  Grid,
  GridItem,
  Text,
  Heading,
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

export default function Signup() {
  const { currentUser, signUp } = useAuth();
  const queryClient = useQueryClient();
  const history = useHistory();

  // 1. We extracted 'setValue' here to programmatically update the role
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
    },
  });

  const { isLoading, isError, error, mutate } = useMutation(
    ({ email, password, role }) => signUp(email, password, role),
    { onSuccess: () => queryClient.invalidateQueries("user") },
  );

  if (currentUser) {
    return <Redirect to="/" />;
  }

  async function onSubmit(data) {
    const { email, password, role } = data;

    try {
      mutate({ email, password, role });
      history.push("/");
    } catch (err) {
      console.error(err, "Failed to create an account.");
    }
  }

  return (
    <Layout>
      {isError && (
        <Alert status="error" mt="2rem">
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
        <GridItem p="2rem" display={{ base: "none", md: "block" }}>
          <Image
            src={signUpImg}
            alt="signup"
            boxSize="100%"
            objectFit="contain"
          />
        </GridItem>
        <GridItem p="2rem">
          <Flex direction="column" justify="center" align="center" h="100%">
            <Heading size="lg" mb="2rem" color="brand.700" fontWeight="normal">
              Create an account
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
                /* Index 0 is the first tab (Student)
                                  Index 1 is the second tab (Teacher)
                                  When they click, we update the hidden form value!
                                */
                onChange={(index) =>
                  setValue("role", index === 0 ? "student" : "teacher")
                }
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
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="password"
                isRequired
                isInvalid={errors.password}
                mb="1rem"
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
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="confirmPassword"
                isRequired
                isInvalid={errors.confirmPassword}
                mb="1.5rem"
              >
                <FormLabel color="brand.700" fontWeight="600" fontSize="sm">
                  Confirm Password
                </FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  focusBorderColor="orange.300"
                  {...register("confirmPassword", {
                    required: "This is required",
                    validate: (value) =>
                      value === watch("password") || "Password does not match.",
                  })}
                />
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <Center>
                <Button
                  isLoading={isLoading}
                  my="1rem"
                  loadingText="Creating"
                  type="submit"
                  bg="gray.100"
                  color="brand.700"
                  _hover={{ bg: "#E2E8F0" }}
                  fontWeight="600"
                >
                  Create account
                </Button>
              </Center>

              <Center mt={2}>
                <HStack fontSize="sm">
                  <Text color="gray.400">Already have an account?</Text>
                  <Text as={Link} to="/login" color="brand.700">
                    Log in
                  </Text>
                </HStack>
              </Center>
            </form>
          </Flex>
        </GridItem>
      </Grid>
    </Layout>
  );
}
