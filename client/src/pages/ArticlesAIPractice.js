import React from "react";
import { Box } from "@chakra-ui/react";
import { PageContainer, LessonPageHeader } from "../components/ui";
import GrammarAIPractice from "../components/GrammarAIPractice";
import { useHistory } from "react-router-dom";

export default function ArticlesAIPractice() {
  const history = useHistory();
  return (
    <PageContainer>
      <LessonPageHeader icon="🤖" title="Articles AI Practice Test" />
      <Box maxW="800px" mx="auto">
        <GrammarAIPractice topic="articles" onComplete={() => history.push("/article-practice")} />
      </Box>
    </PageContainer>
  );
}
