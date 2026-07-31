import React from "react";
import { Box } from "@chakra-ui/react";
import { PageContainer, LessonPageHeader } from "../components/ui";
import GrammarAIPractice from "../components/GrammarAIPractice";
import { useHistory } from "react-router-dom";

export default function PrepositionsAIPractice() {
  const history = useHistory();
  return (
    <PageContainer>
      <LessonPageHeader icon="🤖" title="Prepositions AI Practice Test" />
      <Box maxW="800px" mx="auto">
        <GrammarAIPractice topic="prepositions" onComplete={() => history.push("/preposition-practice")} />
      </Box>
    </PageContainer>
  );
}
