import React from "react";
import { Box } from "@chakra-ui/react";
import { PageContainer, LessonPageHeader } from "../components/ui";
import GrammarAIPractice from "../components/GrammarAIPractice";
import { useHistory } from "react-router-dom";

export default function AdverbsAIPractice() {
  const history = useHistory();
  return (
    <PageContainer>
      <LessonPageHeader icon="🤖" title="Adverbs AI Practice Test" />
      <Box maxW="800px" mx="auto">
        <GrammarAIPractice topic="adverbs" onComplete={() => history.push("/adverb-practice")} />
      </Box>
    </PageContainer>
  );
}
