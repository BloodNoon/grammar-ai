import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import LoadingFallback from "./components/LoadingFallback";
import { Flex, Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

import {
  Home, Dashboard, PracticeMenu, PromptList, PromptOverview, NounSortingGame,
  Signup, Login, ForgotAccount, SentenceStructures, NounsPage,
  Prep1Structure, Prep2Structure, Prep3Structure, ConjunctionStructure,
  AdjectiveStructure, AdverbStructure, PluralNoun, PossessiveNouns,
  PropComNouns, AbPlurNoun, NounComponentTest, NounQuizPageTest,
  VerbSentenceStructures, ArticleSentenceStructures, PrepositionSentenceStructures,
  ConjunctionSentenceStructures, ArticleStructure, ArticleGrammarLegend,
  ArticleSentenceBuilder, ArticleLevelSelection, ArticleWordBank,
  VerbTenseStructure, VerbGrammarLegend, VerbSentenceBuilder, VerbLevelSelection,
  VerbWordBank, AuxiliaryVerbsAndVerbals, AdjectiveQuizPage, AdverbQuizPage,
  VerbTenseQuizPage, ArticleQuizPage, PrepositionQuizPage, ConjunctionQuiz,
  NounPractice, VerbPractice, ArticlePractice, PrepositionPractice,
  AdjectivePractice, AdverbPractice, ConjunctionPractice, AdjectiveRoyalOrder,
  AdjectiveSentenceStructures, AdjectiveFillBlanks, AdverbTypes, AdverbTypeSorting,
  AdverbForms, AdverbRoyalOrder, AdverbSentenceStructures, AdverbIdentificationGame,
  GradeQuests, Grade3Quest, Grade4Quest, Grade5Quest, Grade6Quest, Grade7Quest,
  Grade8Quest, Grade9Quest, TestPrep, GrammarAI,
  NounAIPractice, VerbAIPractice, ArticleAIPractice, PrepositionAIPractice,
  AdjectiveAIPractice, AdverbAIPractice, ConjunctionAIPractice,
} from "./lazyComponents";

function AppLayout() {
  const location = useLocation();
  const showSidebar =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/forgot-account";
  const isHome = location.pathname === "/";
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [location.pathname]);

  return (
    <Flex direction="column" h="100vh" overflow="hidden">
      <Navbar showSidebar={showSidebar} />
      <Flex flex="1" overflow="hidden">
        {showSidebar && (
          <Box flexShrink="0" h={{ base: "auto", md: "100%" }}>
            <Sidebar />
          </Box>
        )}
        <Box ref={contentRef} flex="1" minW="0" h="100%" overflowY="auto" position="relative" bg={isHome ? "paper" : "brand.300"}>
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-account" component={ForgotAccount} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/overview/:id" component={PromptOverview} />
              <Route path="/practice-menu" component={PracticeMenu} />
              <Route path="/sentence-structure" component={SentenceStructures} />
              <Route path="/verb-tense-structure" component={VerbTenseStructure} />
              <Route path="/verb-grammar-legend" component={VerbGrammarLegend} />
              <Route path="/verb-sentence-builder" component={VerbSentenceBuilder} />
              <Route path="/verb-level-selection" component={VerbLevelSelection} />
              <Route path="/verb-wordbank" component={VerbWordBank} />
              <Route path="/auxiliary-verbs" component={AuxiliaryVerbsAndVerbals} />
              <Route path="/verb-sentence-structures" component={VerbSentenceStructures} />
              <Route path="/article-structure" component={ArticleStructure} />
              <Route path="/article-grammar-legend" component={ArticleGrammarLegend} />
              <Route path="/article-sentence-builder" component={ArticleSentenceBuilder} />
              <Route path="/article-level-selection" component={ArticleLevelSelection} />
              <Route path="/article-wordbank" component={ArticleWordBank} />
              <Route path="/article-sentence-structures" component={ArticleSentenceStructures} />
              <Route path="/prompts" component={PromptList} />
              <Route path="/adjective-structure" component={AdjectiveStructure} />
              <Route path="/adjective-royal-order" component={AdjectiveRoyalOrder} />
              <Route path="/adjective-sentence-structures" component={AdjectiveSentenceStructures} />
              <Route path="/adjective-fill-blanks" component={AdjectiveFillBlanks} />
              <Route path="/adverb-structure" component={AdverbStructure} />
              <Route path="/adverb-types" component={AdverbTypes} />
              <Route path="/adverb-forms" component={AdverbForms} />
              <Route path="/adverb-royal-order" component={AdverbRoyalOrder} />
              <Route path="/adverb-sentence-structures" component={AdverbSentenceStructures} />
              <Route path="/adverb-identification-game" component={AdverbIdentificationGame} />
              <Route path="/adverb-type-sorting" component={AdverbTypeSorting} />
              <Route path="/conjunction-structure" component={ConjunctionStructure} />
              <Route path="/conjunction-sentence-structures" component={ConjunctionSentenceStructures} />
              <Route path="/prep1-structure" component={Prep1Structure} />
              <Route path="/prep2-structure" component={Prep2Structure} />
              <Route path="/prep3-structure" component={Prep3Structure} />
              <Route path="/preposition-sentence-structures" component={PrepositionSentenceStructures} />
              <Route path="/nouns" component={NounsPage} />
              <Route path="/propcom-nouns" component={PropComNouns} />
              <Route path="/abplur-nouns" component={AbPlurNoun} />
              <Route path="/plural-noun" component={PluralNoun} />
              <Route path="/possessive-nouns" component={PossessiveNouns} />
              <Route path="/NounSortingGame" component={NounSortingGame} />
              <Route path="/NounComponentTest" component={NounComponentTest} />
              <Route path="/NounQuizPageTest" component={NounQuizPageTest} />
              <Route path="/noun-practice" component={NounPractice} />
              <Route path="/verb-practice" component={VerbPractice} />
              <Route path="/article-practice" component={ArticlePractice} />
              <Route path="/preposition-practice" component={PrepositionPractice} />
              <Route path="/adjective-practice" component={AdjectivePractice} />
              <Route path="/adverb-practice" component={AdverbPractice} />
              <Route path="/conjunction-practice" component={ConjunctionPractice} />
              <Route path="/adj-quiz" component={AdjectiveQuizPage} />
              <Route path="/adverb-quiz" component={AdverbQuizPage} />
              <Route path="/verb-tense-quiz" component={VerbTenseQuizPage} />
              <Route path="/article-quiz" component={ArticleQuizPage} />
              <Route path="/preposition-quiz" component={PrepositionQuizPage} />
              <Route path="/conjunction-quiz" component={ConjunctionQuiz} />
              <Route path="/grade-quests" component={GradeQuests} />
              <Route path="/grade-3-quest" component={Grade3Quest} />
              <Route path="/grade-4-quest" component={Grade4Quest} />
              <Route path="/grade-5-quest" component={Grade5Quest} />
              <Route path="/grade-6-quest" component={Grade6Quest} />
              <Route path="/grade-7-quest" component={Grade7Quest} />
              <Route path="/grade-8-quest" component={Grade8Quest} />
              <Route path="/grade-9-quest" component={Grade9Quest} />
              <Route path="/test-prep" component={TestPrep} />
              <Route path="/grammar-ai" component={GrammarAI} />
              <Route path="/noun-ai-practice" component={NounAIPractice} />
              <Route path="/verb-ai-practice" component={VerbAIPractice} />
              <Route path="/article-ai-practice" component={ArticleAIPractice} />
              <Route path="/preposition-ai-practice" component={PrepositionAIPractice} />
              <Route path="/adjective-ai-practice" component={AdjectiveAIPractice} />
              <Route path="/adverb-ai-practice" component={AdverbAIPractice} />
              <Route path="/conjunction-ai-practice" component={ConjunctionAIPractice} />
              <Route path="/sat-shsat/:topic" component={SATSHSATPractice} />
            </Switch>
          </Suspense>
        </Box>
      </Flex>
    </Flex>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
