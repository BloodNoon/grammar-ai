import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
  Grid,
  GridItem,
  Text,
  Heading,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  HStack,
  VStack,
  Box,
  List,
  ListItem,
  Alert,
  AlertIcon,
  ButtonGroup,
} from "@chakra-ui/react";

const SIGNUP_HIGHLIGHTS = [
  "Students get a grade-based dashboard with recommended next steps.",
  "Teachers can monitor classroom growth and unlock better interventions.",
  "Parents can follow progress without guessing what their child still needs.",
];

const ROLES = [
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent / Guardian" },
  { value: "teacher", label: "Teacher" },
];

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
      grade: "",
      role: "student",
    },
  });

  const [role, setRole] = useState("student");

  const { isLoading, isError, error, mutate } = useMutation(
    ({ email, password, role, grade }) => signUp(email, password, role, grade),
    { onSuccess: () => queryClient.invalidateQueries("user") },
  );

  if (currentUser) {
    return <Redirect to="/" />;
  }

  async function onSubmit(data) {
    const { email, password, role, grade } = data;
    try {
      mutate({ email, password, role, grade });
      history.push("/");
    } catch (err) {
      console.error(err, "Failed to create an account.");
    }
  }

  function selectRole(value) {
    setValue("role", value);
    setRole(value);
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
            Start your learning path
          </Heading>
          <Text mb="2rem" color="whiteAlpha.900">
            Create the right account type and move straight into lessons,
            practice, tests, and a clearer progress dashboard.
          </Text>
          <VStack spacing={3} align="stretch">
            {SIGNUP_HIGHLIGHTS.map((h) => (
              <Box key={h} bg="whiteAlpha.200" borderRadius="md" p="1rem">
                <Text fontSize="sm" color="whiteAlpha.900">
                  {h}
                </Text>
              </Box>
            ))}
          </VStack>
        </GridItem>

        <GridItem p="2.5rem">
          <Flex direction="column" justify="center" h="100%">
            <Heading size="lg" mb="0.5rem" color="brand.700" fontWeight="normal">
              Create an account
            </Heading>
            <Text color="gray.500" mb="1.5rem" fontSize="sm">
              Pick the type of account you want to create and finish setup in
              one screen.
            </Text>

            <Box
              bg="orange.50"
              border="1px solid"
              borderColor="orange.200"
              borderRadius="md"
              p="1rem"
              mb="1.5rem"
              fontSize="sm"
              color="gray.600"
            >
              Important: keep cookies enabled for this site. Private
              browsing, content blockers, or "block all cookies" settings can
              stop signup, login, and email verification from working.
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              {/* Hidden input to ensure 'role' is tracked by the form */}
              <input type="hidden" {...register("role")} />

              {/* --- ROLE SELECTOR (Student / Parent-Guardian / Teacher) --- */}
              <ButtonGroup mb="1.5rem" isAttached w="100%">
                {ROLES.map((r) => (
                  <Button
                    key={r.value}
                    flex="1"
                    onClick={() => selectRole(r.value)}
                    bg={role === r.value ? "brand.700" : "gray.50"}
                    color={role === r.value ? "white" : "gray.500"}
                    fontWeight={role === r.value ? "bold" : "normal"}
                    _hover={{ bg: role === r.value ? "brand.700" : "gray.100" }}
                  >
                    {r.label}
                  </Button>
                ))}
              </ButtonGroup>
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
                mb="0.5rem"
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
              <List fontSize="xs" color="gray.400" mb="1rem" pl="1rem" styleType="disc">
                <ListItem>Your password can't be too similar to your other personal information.</ListItem>
                <ListItem>Your password must contain at least 8 characters.</ListItem>
                <ListItem>Your password can't be a commonly used password.</ListItem>
                <ListItem>Your password can't be entirely numeric.</ListItem>
              </List>

              <FormControl
                id="confirmPassword"
                isRequired
                isInvalid={errors.confirmPassword}
                mb="1.5rem"
              >
                <FormLabel color="brand.700" fontWeight="600" fontSize="sm">
                  Password confirmation
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
                {!errors.confirmPassword && (
                  <Text fontSize="xs" color="gray.400" mt="0.25rem">
                    Enter the same password as before, for verification.
                  </Text>
                )}
              </FormControl>

              {role === "student" && (
                <FormControl id="grade" mb="1.5rem">
                  <FormLabel color="brand.700" fontWeight="600" fontSize="sm">
                    Grade
                  </FormLabel>
                  <Select
                    placeholder="Select your grade"
                    focusBorderColor="orange.300"
                    {...register("grade")}
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Grade {i + 1}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}

              <Button
                isLoading={isLoading}
                mb="1rem"
                loadingText="Creating"
                type="submit"
                w="100%"
                size="lg"
                bg="gray.100"
                color="brand.700"
                _hover={{ bg: "#E2E8F0" }}
                fontWeight="600"
              >
                Create {ROLES.find((r) => r.value === role)?.label} Account
              </Button>

              {role !== "teacher" && (
                <Text fontSize="sm" color="gray.500" mb="1rem">
                  Teacher account?{" "}
                  <Text
                    as="span"
                    color="brand.700"
                    fontWeight="bold"
                    cursor="pointer"
                    onClick={() => selectRole("teacher")}
                  >
                    Create a teacher account here
                  </Text>
                  .
                </Text>
              )}

              <HStack fontSize="sm">
                <Text color="gray.400">Already have an account?</Text>
                <Text as={Link} to="/login" color="brand.700" fontWeight="bold">
                  Log in
                </Text>
              </HStack>
            </form>
          </Flex>
        </GridItem>
      </Grid>
    </Layout>
  );
}
