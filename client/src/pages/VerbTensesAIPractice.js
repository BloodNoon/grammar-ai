import React from "react";
import { Box } from "@chakra-ui/react";
import { PageContainer, LessonPageHeader } from "../components/ui";
import GrammarAIPractice from "../components/GrammarAIPractice";
import { useHistory } from "react-router-dom";

export default function VerbTensesAIPractice() {
  const history = useHistory();
  return (
    <PageContainer>
      <LessonPageHeader icon="🤖" title="Verb Tenses AI Practice Test" />
      <Box maxW="800px" mx="auto">
        <GrammarAIPractice topic="verb_tenses" onComplete={() => history.push("/verb-practice")} />
      </Box>
    </PageContainer>
  );
}
