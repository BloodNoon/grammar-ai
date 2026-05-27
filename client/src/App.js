import React, { lazy, Suspense } from "react";
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

// default chunk
const Home = lazy(
  () => import(/* webpackChunkName: "default" */ "./pages/Home"),
);
const Dashboard = lazy(
  () => import(/* webpackChunkName: "default" */ "./pages/Dashboard"),
);
const PracticeMenu = lazy(
  () => import(/* webpackChunkName: "default" */ "./pages/PracticeMenu"),
);
const PromptList = lazy(
  () => import(/* webpackChunkName: "default" */ "./pages/PromptList"),
);
const PromptOverview = lazy(
  () => import(/* webpackChunkName: "default" */ "./pages/PromptOverview"),
);
const NounSortingGame = lazy(
  () =>
    import(/* webpackChunkName: "default" */ "./components/SortingGameWrapper"),
);

// auth chunk
const Signup = lazy(
  () => import(/* webpackChunkName: "auth" */ "./pages/Signup"),
);
const Login = lazy(
  () => import(/* webpackChunkName: "auth" */ "./pages/Login"),
);

// sentence-checker chunk
const SentenceStructures = lazy(
  () =>
    import(
      /* webpackChunkName: "sentence-checker" */ "./pages/SentenceStructure"
    ),
);
const NounsPage = lazy(
  () => import(/* webpackChunkName: "sentence-checker" */ "./pages/NounsPage"),
);
const Prep1Structure = lazy(
  () =>
    import(
      /* webpackChunkName: "sentence-checker" */ "./pages/Prep1Page/prep1Structure"
    ),
);
const Prep2Structure = lazy(
  () =>
    import(
      /* webpackChunkName: "sentence-checker" */ "./pages/Prep2Page/prep2Structure"
    ),
);
const Prep3Structure = lazy(
  () =>
    import(
      /* webpackChunkName: "sentence-checker" */ "./pages/Prep3Page/prep3Structure"
    ),
);
const ConjunctionStructure = lazy(
  () =>
    import(
      /* webpackChunkName: "sentence-checker" */ "./pages/conjunctionStructure"
    ),
);
const AdjectiveStructure = lazy(
  () =>
    import(
      /* webpackChunkName: "sentence-checker" */ "./pages/adjectivePage/adjectiveStructure"
    ),
);
const AdverbStructure = lazy(
  () =>
    import(
      /* webpackChunkName: "sentence-checker" */ "./pages/adverbPage/adverbPage"
    ),
);
const PluralNoun = lazy(
  () => import(/* webpackChunkName: "sentence-checker" */ "./pages/pluralNoun"),
);
const PossessiveNouns = lazy(
  () =>
    import(
      /* webpackChunkName: "sentence-checker" */ "./pages/PossessiveNouns"
    ),
);
const PropComNouns = lazy(
  () =>
    import(/* webpackChunkName: "sentence-checker" */ "./pages/PropComNoun"),
);
const AbPlurNoun = lazy(
  () => import(/* webpackChunkName: "sentence-checker" */ "./pages/AbPlurNoun"),
);
const NounComponentTest = lazy(
  () =>
    import(
      /* webpackChunkName: "sentence-checker" */ "./pages/nounComponentTest"
    ),
);
const NounQuizPageTest = lazy(
  () =>
    import(
      /* webpackChunkName: "sentence-checker" */ "./pages/nounQuizpageTest"
    ),
);

// article chunk
const ArticleStructure = lazy(
  () => import(/* webpackChunkName: "article" */ "./pages/ArticleStructure"),
);
const ArticleGrammarLegend = lazy(
  () =>
    import(
      /* webpackChunkName: "article" */ "./pages/ArticleStructureComponents/ArticleGrammarLegend"
    ),
);
const ArticleSentenceBuilder = lazy(
  () =>
    import(
      /* webpackChunkName: "article" */ "./pages/ArticleStructureComponents/ArticleSentenceBuilder"
    ),
);
const ArticleLevelSelection = lazy(
  () =>
    import(
      /* webpackChunkName: "article" */ "./pages/ArticleStructureComponents/ArticleLevelSelection"
    ),
);
const ArticleWordBank = lazy(
  () =>
    import(
      /* webpackChunkName: "article" */ "./pages/ArticleStructureComponents/ArticleWordbank"
    ),
);

// verb-tense chunk
const VerbTenseStructure = lazy(
  () =>
    import(/* webpackChunkName: "verb-tense" */ "./pages/VerbTenseStructure"),
);
const VerbGrammarLegend = lazy(
  () =>
    import(
      /* webpackChunkName: "verb-tense" */ "./pages/VerbTenseComponents/VerbGrammarLegend"
    ),
);
const VerbSentenceBuilder = lazy(
  () =>
    import(
      /* webpackChunkName: "verb-tense" */ "./pages/VerbTenseComponents/VerbSentenceBuilder"
    ),
);
const VerbLevelSelection = lazy(
  () =>
    import(
      /* webpackChunkName: "verb-tense" */ "./pages/VerbTenseComponents/VerbLevelSelection"
    ),
);
const VerbWordBank = lazy(
  () =>
    import(
      /* webpackChunkName: "verb-tense" */ "./pages/VerbTenseComponents/VerbWordBank"
    ),
);

// quiz chunk
const AdjectiveQuizPage = lazy(
  () => import(/* webpackChunkName: "quiz" */ "./pages/adjquiz"),
);
const AdverbQuizPage = lazy(
  () => import(/* webpackChunkName: "quiz" */ "./pages/adverbQuiz"),
);
const VerbTenseQuizPage = lazy(
  () => import(/* webpackChunkName: "quiz" */ "./pages/verbTenseQuiz"),
);
const ArticleQuizPage = lazy(
  () => import(/* webpackChunkName: "quiz" */ "./pages/articleQuiz"),
);
const PrepositionQuizPage = lazy(
  () => import(/* webpackChunkName: "quiz" */ "./pages/prepositionQuiz"),
);
const ConjunctionQuiz = lazy(
  () => import(/* webpackChunkName: "quiz" */ "./pages/ConjunctionQuiz"),
);

// practice chunk
const NounPractice = lazy(
  () => import(/* webpackChunkName: "practice" */ "./pages/nounPractice"),
);
const VerbPractice = lazy(
  () => import(/* webpackChunkName: "practice" */ "./pages/verbPractice"),
);
const ArticlePractice = lazy(
  () => import(/* webpackChunkName: "practice" */ "./pages/articlePractice"),
);
const PrepositionPractice = lazy(
  () =>
    import(/* webpackChunkName: "practice" */ "./pages/prepositionPractice"),
);
const AdjectivePractice = lazy(
  () =>
    import(
      /* webpackChunkName: "practice" */ "./pages/adjectivePage/adjectivePractice"
    ),
);
const AdverbPractice = lazy(
  () =>
    import(
      /* webpackChunkName: "practice" */ "./pages/adverbPage/adverbPractice"
    ),
);
const ConjunctionPractice = lazy(
  () =>
    import(/* webpackChunkName: "practice" */ "./pages/conjunctionPractice"),
);

// adjective chunk
const AdjectiveRoyalOrder = lazy(
  () =>
    import(
      /* webpackChunkName: "adjective" */ "./utils/SentenceChecker/AdjectiveRoyalOrder"
    ),
);
const AdjectiveSentenceStructures = lazy(
  () =>
    import(
      /* webpackChunkName: "adjective" */ "./utils/SentenceChecker/AdjectiveSentenceStructures"
    ),
);
const AdjectiveFillBlanks = lazy(
  () =>
    import(
      /* webpackChunkName: "adjective" */ "./utils/SentenceChecker/AdjectiveFillBlanks"
    ),
);

// adverb chunk
const AdverbTypes = lazy(
  () =>
    import(
      /* webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbTypes"
    ),
);
const AdverbTypeSorting = lazy(
  () =>
    import(
      /* webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbTypeSorting"
    ),
);
const AdverbForms = lazy(
  () =>
    import(
      /* webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbForms"
    ),
);
const AdverbRoyalOrder = lazy(
  () =>
    import(
      /* webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbRoyalOrder"
    ),
);
const AdverbSentenceStructures = lazy(
  () =>
    import(
      /* webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbSentenceStructures"
    ),
);
const AdverbIdentificationGame = lazy(
  () =>
    import(
      /* webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbIdentificationGame"
    ),
);

function AppLayout() {
  const location = useLocation();
  const showSidebar =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup";
  const isHome = location.pathname === "/";
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <Flex direction="column" h="100vh" overflow="hidden">
      <Navbar showSidebar={showSidebar} />
      <Flex flex="1" overflow="hidden">
        {showSidebar && (
          <Box
            flexShrink="0"
            h={{ base: "auto", md: "100%" }}
          >
            <Sidebar />
          </Box>
        )}
        <Box
          ref={contentRef}
          flex="1"
          minW="0"
          h="100%"
          overflowY="auto"
          position="relative"
          bg={isHome ? "paper" : "brand.300"}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/overview/:id" component={PromptOverview} />
              <Route path="/practice-menu" component={PracticeMenu} />
              <Route
                path="/sentence-structure"
                component={SentenceStructures}
              />
              <Route
                path="/verb-tense-structure"
                component={VerbTenseStructure}
              />
              <Route
                path="/verb-grammar-legend"
                component={VerbGrammarLegend}
              />
              <Route
                path="/verb-sentence-builder"
                component={VerbSentenceBuilder}
              />
              <Route
                path="/verb-level-selection"
                component={VerbLevelSelection}
              />
              <Route path="/verb-wordbank" component={VerbWordBank} />
              <Route path="/article-structure" component={ArticleStructure} />
              <Route
                path="/article-grammar-legend"
                component={ArticleGrammarLegend}
              />
              <Route
                path="/article-sentence-builder"
                component={ArticleSentenceBuilder}
              />
              <Route
                path="/article-level-selection"
                component={ArticleLevelSelection}
              />
              <Route path="/article-wordbank" component={ArticleWordBank} />
              <Route path="/prompts" component={PromptList} />
              <Route
                path="/adjective-structure"
                component={AdjectiveStructure}
              />
              <Route
                path="/adjective-royal-order"
                component={AdjectiveRoyalOrder}
              />
              <Route
                path="/adjective-sentence-structures"
                component={AdjectiveSentenceStructures}
              />
              <Route
                path="/adjective-fill-blanks"
                component={AdjectiveFillBlanks}
              />
              <Route path="/adverb-structure" component={AdverbStructure} />
              <Route path="/adverb-types" component={AdverbTypes} />
              <Route path="/adverb-forms" component={AdverbForms} />
              <Route path="/adverb-royal-order" component={AdverbRoyalOrder} />
              <Route
                path="/adverb-sentence-structures"
                component={AdverbSentenceStructures}
              />
              <Route
                path="/adverb-identification-game"
                component={AdverbIdentificationGame}
              />
              <Route
                path="/adverb-type-sorting"
                component={AdverbTypeSorting}
              />
              <Route
                path="/conjunction-structure"
                component={ConjunctionStructure}
              />
              <Route path="/prep1-structure" component={Prep1Structure} />
              <Route path="/prep2-structure" component={Prep2Structure} />
              <Route path="/prep3-structure" component={Prep3Structure} />
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
              <Route
                path="/preposition-practice"
                component={PrepositionPractice}
              />
              <Route path="/adjective-practice" component={AdjectivePractice} />
              <Route path="/adverb-practice" component={AdverbPractice} />
              <Route
                path="/conjunction-practice"
                component={ConjunctionPractice}
              />
              <Route path="/adj-quiz" component={AdjectiveQuizPage} />
              <Route path="/adverb-quiz" component={AdverbQuizPage} />
              <Route path="/verb-tense-quiz" component={VerbTenseQuizPage} />
              <Route path="/article-quiz" component={ArticleQuizPage} />
              <Route path="/preposition-quiz" component={PrepositionQuizPage} />
              <Route path="/conjunction-quiz" component={ConjunctionQuiz} />
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
