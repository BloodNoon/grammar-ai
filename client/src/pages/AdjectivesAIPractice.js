import React from "react";
import { Box } from "@chakra-ui/react";
import { PageContainer, LessonPageHeader } from "../components/ui";
import GrammarAIPractice from "../components/GrammarAIPractice";
import { useHistory } from "react-router-dom";

export default function AdjectivesAIPractice() {
  const history = useHistory();
  return (
    <PageContainer>
      <LessonPageHeader icon="🤖" title="Adjectives AI Practice Test" />
      <Box maxW="800px" mx="auto">
        <GrammarAIPractice topic="adjectives" onComplete={() => history.push("/adjective-practice")} />
      </Box>
    </PageContainer>
  );
}
