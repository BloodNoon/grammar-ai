import React from "react";
import { Box } from "@chakra-ui/react";
import { PageContainer, LessonPageHeader } from "../components/ui";
import GrammarAIPractice from "../components/GrammarAIPractice";
import { useHistory } from "react-router-dom";

export default function ConjunctionsAIPractice() {
  const history = useHistory();
  return (
    <PageContainer>
      <LessonPageHeader icon="🤖" title="Conjunctions AI Practice Test" />
      <Box maxW="800px" mx="auto">
        <GrammarAIPractice topic="conjunctions" onComplete={() => history.push("/conjunction-practice")} />
      </Box>
    </PageContainer>
  );
}
