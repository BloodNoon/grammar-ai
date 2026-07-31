import React from "react";
import { Box } from "@chakra-ui/react";
import { PageContainer, LessonPageHeader } from "../components/ui";
import GrammarAIPractice from "../components/GrammarAIPractice";
import { useHistory } from "react-router-dom";

export default function NounAIPractice() {
  const history = useHistory();
  return (
    <PageContainer>
      <LessonPageHeader icon="🤖" title="Noun AI Practice Test" />
      <Box maxW="800px" mx="auto">
        <GrammarAIPractice topic="nouns" onComplete={() => history.push("/noun-practice")} />
      </Box>
    </PageContainer>
  );
}
