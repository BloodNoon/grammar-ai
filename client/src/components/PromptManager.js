import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";
import {
  Box,
  Switch,
  HStack,
  Checkbox,
  Button,
  Input,
  Select,
  Text,
  Spacer,
  FormControl,
  FormLabel,
  FormErrorMessage,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { createNewPrompt, editPromptById } from "../api/Prompt";

export default function PromptManager({ id, prompt, onClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: prompt ? prompt.title : "",
      description: prompt ? prompt.description : "",
      structure: prompt ? prompt.structure : "",
      DraftEditor: prompt
        ? EditorState.createWithContent(
            convertFromRaw(JSON.parse(prompt.content)),
          )
        : EditorState.createEmpty(),
      type: prompt ? prompt.type : "sentence",
      grade: {
        grade_3: prompt ? prompt.grade.grade_3 : false,
        grade_4: prompt ? prompt.grade.grade_4 : false,
        grade_5: prompt ? prompt.grade.grade_5 : false,
        grade_6: prompt ? prompt.grade.grade_6 : false,
        grade_7: prompt ? prompt.grade.grade_7 : false,
        grade_8: prompt ? prompt.grade.grade_8 : false,
        grade_any: prompt ? prompt.grade.grade_any : false,
      },
    },
  });
  const queryClient = useQueryClient();
  const types = [
    { label: "Sentence", value: "sentence" },
    { label: "Paragraph", value: "paragraph" },
    { label: "Essay", value: "essay" },
  ];
  const grades = [
    { label: "3", value: false },
    { label: "4", value: false },
    { label: "5", value: false },
    { label: "6", value: false },
    { label: "7", value: false },
    { label: "8", value: false },
    { label: "any", value: false },
  ];

  const structures = [
    { label: "Pronoun", value: "#Pronoun" },
    { label: "Verb", value: "#Verb" },
    { label: "Noun", value: "#Noun" },
    { label: "Adjective", value: "#Adjective" },
    { label: "Adverb", value: "#Adverb" },
    { label: "Preposition", value: "#Preposition" },
    { label: "Subject", value: "#Subject" },
    { label: "Object", value: "#Object" },
  ];

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [structureState, setStructureState] = useState(() =>
    prompt?.structure ? true : false,
  );
  const [structureInput, setStructureInput] = useState(() =>
    prompt?.structure ? prompt.structure : "",
  );

  useEffect(() => {
    if (prompt?.content) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(prompt.content)),
        ),
      );
    }
  }, [prompt]);

  const { isLoading, mutate } = useMutation(
    prompt
      ? (updatedPrompt) => editPromptById(id, updatedPrompt)
      : (newPrompt) => createNewPrompt(newPrompt),
    {
      onSuccess: () => {
        prompt
          ? queryClient.invalidateQueries("prompt")
          : queryClient.invalidateQueries("prompts");
      },
    },
  );

  async function createPrompt(data) {
    const { title, description, structure, type, grade } = data;
    const contentState = editorState.getCurrentContent();

    const newPrompt = {
      title,
      description,
      structure,
      content: JSON.stringify(convertToRaw(contentState)),
      type,
      grade,
    };

    mutate(newPrompt);
    onClose();
  }

  async function editPrompt(data) {
    const { title, description, structure, type, grade } = data;
    const contentState = editorState.getCurrentContent();

    const updatedPrompt = {
      title,
      description,
      structure,
      content: JSON.stringify(convertToRaw(contentState)),
      type,
      grade,
    };

    mutate(updatedPrompt);
    onClose();
  }

  function makeStructureByClick(e) {
    setStructureInput((oldStructure) => oldStructure + " " + e.target.value);
  }

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Prompt Manager</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(prompt ? editPrompt : createPrompt)}>
          <ModalBody>
            {/* {error && (
							<Alert status="error">
								<AlertIcon />
								{error}
							</Alert>
						)} */}

            <FormControl isInvalid={errors.title} isRequired>
              <FormLabel htmlFor="title">Title / Question</FormLabel>
              <Input
                id="title"
                type="text"
                required
                {...register("title", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                name="description"
                type="text"
                {...register("description")}
              />
            </FormControl>
            <FormControl
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormLabel htmlFor="haveStructure">Sentence Structure</FormLabel>
              <Controller
                render={() => (
                  <Switch
                    isChecked={structureState}
                    onChange={() => setStructureState(!structureState)}
                  />
                )}
                name="structureTrigger"
                control={control}
              />
            </FormControl>
            {structureState && (
              <FormControl>
                <Controller
                  name="structure"
                  control={control}
                  render={() => (
                    <Input
                      name="structure"
                      type="text"
                      value={structureInput}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setStructureInput(newValue);
                        setValue("structure", newValue);
                      }}
                      placeholder="Form your structure by clicking the buttons below"
                    />
                  )}
                />

                <Text as="i" fontSize="xs" color="gray.400">
                  Note: Part of speech only recognizable by the system if '#'
                  exists. For you own words, type them above manually without
                  the '#'. The buttons below only adds part of speech to the
                  end, so do move them to the right position with each separated
                  with a space.
                </Text>
                {structures.map((structure) => (
                  <Button
                    key={structure.label}
                    value={structure.value}
                    onClick={makeStructureByClick}
                    m="0.5rem"
                    size="sm"
                  >
                    {structure.label}
                  </Button>
                ))}
              </FormControl>
            )}
            <FormControl>
              <FormLabel htmlFor="content">
                Content (e.g. passage, extra info, etc.)
              </FormLabel>
              <Controller
                render={() => (
                  <DraftailEditor
                    editorState={editorState}
                    onChange={setEditorState}
                    blockTypes={[{ type: BLOCK_TYPE.UNSTYLED }]}
                    inlineStyles={[
                      { type: INLINE_STYLE.BOLD },
                      { type: INLINE_STYLE.ITALIC },
                      { type: INLINE_STYLE.UNDERLINE },
                    ]}
                  />
                )}
                name="DraftEditor"
                control={control}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="type">Type</FormLabel>
              <Select name="type" {...register("type")}>
                {types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="grade">Grade</FormLabel>
              <HStack>
                {grades.map((grade) => {
                  return (
                    <Box key={`grade_${grade.label}`} w="100%">
                      <Checkbox
                        name={`grade_${grade.label}`}
                        defaultChecked={false}
                        {...register(`grade.grade_${grade.label}`)}
                      >
                        {grade.label}
                      </Checkbox>
                      <Spacer />
                    </Box>
                  );
                })}
              </HStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mx="0.5rem">
              Close
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              mx="0.5rem"
              loadingText="Submitting"
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </>
  );
}
