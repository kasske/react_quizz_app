import { useState, useEffect } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";

export default function Question({
  index,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const correctAnswer = QUESTIONS[index]?.answers[0];
      if (correctAnswer) {
        setAnswer({
          selectedAnswer: answer.selectedAnswer,
          isCorrect: correctAnswer === answer.selectedAnswer,
        });
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [answer.selectedAnswer, index]);

  function handleSelectAnswer(selectedAnswer) {
    setAnswer({
      selectedAnswer,
      isCorrect: null,
    });
  }

  useEffect(() => {
    if (answer.selectedAnswer && answer.isCorrect !== null) {
      setTimeout(() => {
        onSelectAnswer(answer.selectedAnswer);
      }, 2000);
    }
  }, [answer.selectedAnswer, answer.isCorrect, onSelectAnswer]);

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{QUESTIONS[index]?.text}</h2>
      <Answers
        answers={QUESTIONS[index]?.answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
