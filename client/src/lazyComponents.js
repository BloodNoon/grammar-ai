import { lazy } from "react";

const lazyWithPreload = (importFunc) => {
  const Component = lazy(importFunc);
  Component.preload = importFunc;
  return Component;
};

// ai
export const GrammarAI = lazyWithPreload(() => import("./pages/GrammarAI"));

// ai practice pages
export const NounAIPractice = lazyWithPreload(() => import(/* webpackChunkName: "ai-practice" */ "./pages/NounAIPractice"));
export const VerbAIPractice = lazyWithPreload(() => import(/* webpackChunkName: "ai-practice" */ "./pages/VerbTensesAIPractice"));
export const ArticleAIPractice = lazyWithPreload(() => import(/* webpackChunkName: "ai-practice" */ "./pages/ArticlesAIPractice"));
export const PrepositionAIPractice = lazyWithPreload(() => import(/* webpackChunkName: "ai-practice" */ "./pages/PrepositionsAIPractice"));
export const AdjectiveAIPractice = lazyWithPreload(() => import(/* webpackChunkName: "ai-practice" */ "./pages/AdjectivesAIPractice"));
export const AdverbAIPractice = lazyWithPreload(() => import(/* webpackChunkName: "ai-practice" */ "./pages/AdverbsAIPractice"));
export const ConjunctionAIPractice = lazyWithPreload(() => import(/* webpackChunkName: "ai-practice" */ "./pages/ConjunctionsAIPractice"));

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
export const ForgotAccount = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "auth" */ "./pages/ForgotAccount"));

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
export const VerbSentenceStructures = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/VerbSentenceStructures"));
export const ArticleSentenceStructures = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/ArticleSentenceStructures"));
export const PrepositionSentenceStructures = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/PrepositionSentenceStructures"));
export const ConjunctionSentenceStructures = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "sentence-checker" */ "./pages/ConjunctionSentenceStructures"));

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
export const AuxiliaryVerbsAndVerbals = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "verb-tense" */ "./pages/AuxiliaryVerbsAndVerbals"));

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

// grade-quests chunk
export const GradeQuests = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "grade-quests" */ "./pages/GradeQuests"));
export const Grade3Quest = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "grade-quests" */ "./pages/GradeQuestPages/Grade3Quest"));
export const Grade4Quest = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "grade-quests" */ "./pages/GradeQuestPages/Grade4Quest"));
export const Grade5Quest = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "grade-quests" */ "./pages/GradeQuestPages/Grade5Quest"));
export const Grade6Quest = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "grade-quests" */ "./pages/GradeQuestPages/Grade6Quest"));
export const Grade7Quest = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "grade-quests" */ "./pages/GradeQuestPages/Grade7Quest"));
export const Grade8Quest = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "grade-quests" */ "./pages/GradeQuestPages/Grade8Quest"));
export const Grade9Quest = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "grade-quests" */ "./pages/GradeQuestPages/Grade9Quest"));
export const TestPrep = lazyWithPreload(() => import(/* webpackPrefetch: true, webpackChunkName: "grade-quests" */ "./pages/GradeQuestPages/TestPrep"));

export const routePreloadMap = {
  "/": Home,
  "/signup": Signup,
  "/login": Login,
  "/forgot-account": ForgotAccount,
  "/dashboard": Dashboard,
  "/overview/:id": PromptOverview,
  "/practice-menu": PracticeMenu,
  "/sentence-structure": SentenceStructures,
  "/verb-tense-structure": VerbTenseStructure,
  "/verb-grammar-legend": VerbGrammarLegend,
  "/verb-sentence-builder": VerbSentenceBuilder,
  "/verb-level-selection": VerbLevelSelection,
  "/verb-wordbank": VerbWordBank,
  "/auxiliary-verbs": AuxiliaryVerbsAndVerbals,
  "/verb-sentence-structures": VerbSentenceStructures,
  "/article-structure": ArticleStructure,
  "/article-grammar-legend": ArticleGrammarLegend,
  "/article-sentence-builder": ArticleSentenceBuilder,
  "/article-level-selection": ArticleLevelSelection,
  "/article-wordbank": ArticleWordBank,
  "/article-sentence-structures": ArticleSentenceStructures,
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
  "/conjunction-sentence-structures": ConjunctionSentenceStructures,
  "/prep1-structure": Prep1Structure,
  "/prep2-structure": Prep2Structure,
  "/prep3-structure": Prep3Structure,
  "/preposition-sentence-structures": PrepositionSentenceStructures,
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
  "/grade-quests": GradeQuests,
  "/grade-3-quest": Grade3Quest,
  "/grade-4-quest": Grade4Quest,
  "/grade-5-quest": Grade5Quest,
  "/grade-6-quest": Grade6Quest,
  "/grade-7-quest": Grade7Quest,
  "/grade-8-quest": Grade8Quest,
  "/grade-9-quest": Grade9Quest,
  "/test-prep": TestPrep,
  "/grammar-ai": GrammarAI,
  "/noun-ai-practice": NounAIPractice,
  "/verb-ai-practice": VerbAIPractice,
  "/article-ai-practice": ArticleAIPractice,
  "/preposition-ai-practice": PrepositionAIPractice,
  "/adjective-ai-practice": AdjectiveAIPractice,
  "/adverb-ai-practice": AdverbAIPractice,
  "/conjunction-ai-practice": ConjunctionAIPractice,
};

export const preloadRoute = (path) => {
  let matchedPath = path;
  if (path && path.startsWith("/overview/")) matchedPath = "/overview/:id";
  const component = routePreloadMap[matchedPath];
  if (component && typeof component.preload === "function") component.preload();
};
