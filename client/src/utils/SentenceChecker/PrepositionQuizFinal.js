import React, { useState } from "react";
import "./SubjectQuiz.css"; // reuse same CSS styling as your other games

const quizData = [
  {
    question: "Which sentence uses the preposition correctly?",
    options: [
      "She arrived according the schedule.",
      "She arrived according to the schedule.",
      "She arrived according with the schedule.",
      "She arrived according from the schedule."
    ],
    answer: "She arrived according to the schedule."
  },
  {
    question: "Which compound preposition best completes the sentence: 'The event was canceled ___ the storm.'",
    options: ["due to", "apart from", "instead of", "outside of"],
    answer: "due to"
  },
  {
    question: "Choose the correct usage:",
    options: [
      "He spoke with respect of his teacher.",
      "He spoke with respect to his teacher.",
      "He spoke with respect from his teacher.",
      "He spoke with respect as his teacher."
    ],
    answer: "He spoke with respect to his teacher."
  },
  {
    question: "Which preposition fits: '___ his illness, he continued to work hard.'",
    options: ["Apart from", "Regardless of", "Outside of", "Instead of"],
    answer: "Regardless of"
  },
  {
    question: "Which of the following is NOT a correct compound preposition?",
    options: ["In line with", "On top of", "By means of", "Across between"],
    answer: "Across between"
  },
  {
    question: "Which compound preposition means 'concerning' or 'about'?",
    options: ["As regards", "Due to", "Apart from", "Outside of"],
    answer: "As regards"
  },
  {
    question: "Fill in the blank: 'He managed the team ___ his experience in sports.'",
    options: ["with relation to", "instead of", "apart from", "outside of"],
    answer: "with relation to"
  },
  {
    question: "Choose the correct completion: 'She succeeded ___ hard work and dedication.'",
    options: ["by means of", "apart from", "outside of", "as for"],
    answer: "by means of"
  },
  {
    question: "Which sentence is correct?",
    options: [
      "As far as I know, she is honest.",
      "As far to I know, she is honest.",
      "As far from I know, she is honest.",
      "As far by I know, she is honest."
    ],
    answer: "As far as I know, she is honest."
  },
  {
    question: "Which preposition best completes: 'He applied ___ the job yesterday.'",
    options: ["for", "as to", "due to", "apart from"],
    answer: "for"
  }
];

// Utility function to shuffle questions
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const PrepositionQuizFinal = () => {
  const [shuffledQuiz, setShuffledQuiz] = useState(shuffleArray(quizData));
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === shuffledQuiz[currentQ].answer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Incorrect. The correct answer is "${shuffledQuiz[currentQ].answer}".`);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setFeedback("");
    if (currentQ + 1 < shuffledQuiz.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setShuffledQuiz(shuffleArray(quizData));
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setFeedback("");
    setShowScore(false);
  };

  return (
    <div className="quiz-box">
      <h2>📘 Preposition Quiz</h2>
      {showScore ? (
        <div className="quiz-result">
          <h3>
            Your Score: {score}/{shuffledQuiz.length}
          </h3>
          <p>
            {score >= 7
              ? "🌟 Excellent work!"
              : score >= 4
              ? "👍 Good effort, keep practicing!"
              : "📖 Keep reviewing and try again!"}
          </p>
          {/* Reset Button */}
          <button className="reset-btn" onClick={resetQuiz}>
            🔄 Try Again
          </button>
        </div>
      ) : (
        <div className="question-section">
          <div className="quiz-sentence">
            <h3>
              Question {currentQ + 1}/{shuffledQuiz.length}
            </h3>
            <p>{shuffledQuiz[currentQ].question}</p>
          </div>
          <div className="choices">
            {shuffledQuiz[currentQ].options.map((option, idx) => (
              <button
                key={idx}
                className={`choice-btn ${
                  selected === option
                    ? option === shuffledQuiz[currentQ].answer
                      ? "selected correct"
                      : "selected incorrect"
                    : ""
                }`}
                onClick={() => !selected && handleAnswer(option)}
                disabled={!!selected}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Feedback message */}
          {feedback && <p className="quiz-result">{feedback}</p>}

          {selected && (
            <button className="next-btn" onClick={nextQuestion}>
              {currentQ + 1 < shuffledQuiz.length ? "Next ➡️" : "Finish 🏁"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PrepositionQuizFinal;