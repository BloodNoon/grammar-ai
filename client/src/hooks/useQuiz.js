import { useState, useCallback } from "react";

const defaultGenerateFn = (data) => {
  const validQuestions = data.filter(
    (q) => q.answer_count === "Single" && q.options && q.options.length > 0,
  );
  const shuffled = [...validQuestions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  return shuffled;
};

export default function useQuiz(quizData, customGenerateFn) {
  const generateFn = useCallback((data) => {
    if (customGenerateFn) {
      return customGenerateFn(data);
    }
    return defaultGenerateFn(data);
  }, [customGenerateFn]);

  const [activeQuestions, setActiveQuestions] = useState(() =>
    generateFn(quizData),
  );
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuiz = useCallback(() => {
    setActiveQuestions(generateFn(quizData));
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [quizData, generateFn]);

  const handleSelect = useCallback((questionId, option) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  }, [isSubmitted]);

  const handleSubmit = useCallback(() => {
    let newScore = 0;
    activeQuestions.forEach((q) => {
      if (answers[q.id] === q.answer[0]) newScore += 1;
    });
    setScore(newScore);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeQuestions, answers]);

  const totalAnswered = Object.keys(answers).length;
  const progressPercent = activeQuestions.length > 0 ? (totalAnswered / activeQuestions.length) * 100 : 0;

  return {
    activeQuestions,
    answers,
    isSubmitted,
    score,
    handleSelect,
    handleSubmit,
    generateQuiz,
    totalAnswered,
    progressPercent,
  };
}
