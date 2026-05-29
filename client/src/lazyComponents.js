import { lazy } from "react";

// Custom lazy-loading wrapper that exposes a preload method
const lazyWithPreload = (importFunc) => {
  const Component = lazy(importFunc);
  Component.preload = importFunc;
  return Component;
};

// default chunk
export const Home = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "default" */ "./pages/Home"));
export const Dashboard = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "default" */ "./pages/Dashboard"));
export const PracticeMenu = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "default" */ "./pages/PracticeMenu"));
export const PromptList = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "default" */ "./pages/PromptList"));
export const PromptOverview = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "default" */ "./pages/PromptOverview"));
export const NounSortingGame = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "default" */ "./components/SortingGameWrapper"));

// auth chunk
export const Signup = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "auth" */ "./pages/Signup"));
export const Login = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "auth" */ "./pages/Login"));

// sentence-checker chunk
export const SentenceStructures = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/SentenceStructure"));
export const NounsPage = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/NounsPage"));
export const Prep1Structure = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/Prep1Page/prep1Structure"));
export const Prep2Structure = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/Prep2Page/prep2Structure"));
export const Prep3Structure = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/Prep3Page/prep3Structure"));
export const ConjunctionStructure = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/conjunctionStructure"));
export const AdjectiveStructure = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/adjectivePage/adjectiveStructure"));
export const AdverbStructure = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/adverbPage/adverbPage"));
export const PluralNoun = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/pluralNoun"));
export const PossessiveNouns = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/PossessiveNouns"));
export const PropComNouns = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/PropComNoun"));
export const AbPlurNoun = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/AbPlurNoun"));
export const NounComponentTest = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/nounComponentTest"));
export const NounQuizPageTest = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/nounQuizpageTest"));

// article chunk
export const ArticleStructure = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "article" */ "./pages/ArticleStructure"));
export const ArticleGrammarLegend = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "article" */ "./pages/ArticleStructureComponents/ArticleGrammarLegend"));
export const ArticleSentenceBuilder = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "article" */ "./pages/ArticleStructureComponents/ArticleSentenceBuilder"));
export const ArticleLevelSelection = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "article" */ "./pages/ArticleStructureComponents/ArticleLevelSelection"));
export const ArticleWordBank = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "article" */ "./pages/ArticleStructureComponents/ArticleWordbank"));

// verb-tense chunk
export const VerbTenseStructure = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "verb-tense" */ "./pages/VerbTenseStructure"));
export const VerbGrammarLegend = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "verb-tense" */ "./pages/VerbTenseComponents/VerbGrammarLegend"));
export const VerbSentenceBuilder = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "verb-tense" */ "./pages/VerbTenseComponents/VerbSentenceBuilder"));
export const VerbLevelSelection = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "verb-tense" */ "./pages/VerbTenseComponents/VerbLevelSelection"));
export const VerbWordBank = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "verb-tense" */ "./pages/VerbTenseComponents/VerbWordBank"));

// quiz chunk
export const AdjectiveQuizPage = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "quiz" */ "./pages/adjquiz"));
export const AdverbQuizPage = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "quiz" */ "./pages/adverbQuiz"));
export const VerbTenseQuizPage = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "quiz" */ "./pages/verbTenseQuiz"));
export const ArticleQuizPage = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "quiz" */ "./pages/articleQuiz"));
export const PrepositionQuizPage = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "quiz" */ "./pages/prepositionQuiz"));
export const ConjunctionQuiz = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "quiz" */ "./pages/ConjunctionQuiz"));

// practice chunk
export const NounPractice = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "practice" */ "./pages/nounPractice"));
export const VerbPractice = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "practice" */ "./pages/verbPractice"));
export const ArticlePractice = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "practice" */ "./pages/articlePractice"));
export const PrepositionPractice = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "practice" */ "./pages/prepositionPractice"));
export const AdjectivePractice = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "practice" */ "./pages/adjectivePage/adjectivePractice"));
export const AdverbPractice = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "practice" */ "./pages/adverbPage/adverbPractice"));
export const ConjunctionPractice = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "practice" */ "./pages/conjunctionPractice"));

// adjective chunk
export const AdjectiveRoyalOrder = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "adjective" */ "./utils/SentenceChecker/AdjectiveRoyalOrder"));
export const AdjectiveSentenceStructures = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "adjective" */ "./utils/SentenceChecker/AdjectiveSentenceStructures"));
export const AdjectiveFillBlanks = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "adjective" */ "./utils/SentenceChecker/AdjectiveFillBlanks"));

// adverb chunk
export const AdverbTypes = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbTypes"));
export const AdverbTypeSorting = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbTypeSorting"));
export const AdverbForms = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbForms"));
export const AdverbRoyalOrder = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbRoyalOrder"));
export const AdverbSentenceStructures = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbSentenceStructures"));
export const AdverbIdentificationGame = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "adverb" */ "./utils/SentenceChecker/AdverbIdentificationGame"));

// Centralized path-based route preloader mapping
export const routePreloadMap = {
  "/": Home,
  "/signup": Signup,
  "/login": Login,
  "/dashboard": Dashboard,
  "/overview/:id": PromptOverview,
  "/practice-menu": PracticeMenu,
  "/sentence-structure": SentenceStructures,
  "/verb-tense-structure": VerbTenseStructure,
  "/verb-grammar-legend": VerbGrammarLegend,
  "/verb-sentence-builder": VerbSentenceBuilder,
  "/verb-level-selection": VerbLevelSelection,
  "/verb-wordbank": VerbWordBank,
  "/article-structure": ArticleStructure,
  "/article-grammar-legend": ArticleGrammarLegend,
  "/article-sentence-builder": ArticleSentenceBuilder,
  "/article-level-selection": ArticleLevelSelection,
  "/article-wordbank": ArticleWordBank,
  "/prompts": PromptList,
  "/adjective-structure": AdjectiveStructure,
  "/adjective-royal-order": AdjectiveRoyalOrder,
  "/adjective-sentence-structures": AdjectiveSentenceStructures,
  "/adjective-fill-blanks": AdjectiveFillBlanks,
  "/adverb-structure": AdverbStructure,
  "/adverb-types": AdverbTypes,
  "/adverb-forms": AdverbForms,
  "/adverb-royal-order": AdverbRoyalOrder,
  "/adverb-sentence-structures": AdverbSentenceStructures,
  "/adverb-identification-game": AdverbIdentificationGame,
  "/adverb-type-sorting": AdverbTypeSorting,
  "/conjunction-structure": ConjunctionStructure,
  "/prep1-structure": Prep1Structure,
  "/prep2-structure": Prep2Structure,
  "/prep3-structure": Prep3Structure,
  "/nouns": NounsPage,
  "/propcom-nouns": PropComNouns,
  "/abplur-nouns": AbPlurNoun,
  "/plural-noun": PluralNoun,
  "/possessive-nouns": PossessiveNouns,
  "/NounSortingGame": NounSortingGame,
  "/NounComponentTest": NounComponentTest,
  "/NounQuizPageTest": NounQuizPageTest,
  "/noun-practice": NounPractice,
  "/verb-practice": VerbPractice,
  "/article-practice": ArticlePractice,
  "/preposition-practice": PrepositionPractice,
  "/adjective-practice": AdjectivePractice,
  "/adverb-practice": AdverbPractice,
  "/conjunction-practice": ConjunctionPractice,
  "/adj-quiz": AdjectiveQuizPage,
  "/adverb-quiz": AdverbQuizPage,
  "/verb-tense-quiz": VerbTenseQuizPage,
  "/article-quiz": ArticleQuizPage,
  "/preposition-quiz": PrepositionQuizPage,
  "/conjunction-quiz": ConjunctionQuiz,
};

export const preloadRoute = (path) => {
  let matchedPath = path;
  if (path && path.startsWith("/overview/")) {
    matchedPath = "/overview/:id";
  }
  const component = routePreloadMap[matchedPath];
  if (component && typeof component.preload === "function") {
    component.preload();
  }
};
