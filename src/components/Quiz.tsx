import React, { Component, useState } from 'react'
import './Quiz.css'
import QuizCore from "../core/QuizCore";

interface QuizState {
    quizCore: QuizCore
  selectedAnswer: string | null
    showSubmitButton: boolean
    quizComplete: boolean
}

const Quiz: React.FC = () => {

  const [state, setState] = useState<QuizState>({
      quizCore: new QuizCore(),
    selectedAnswer: null,  // Initialize the selected answer.
      showSubmitButton: false,
      quizComplete: false
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
      if (selectedAnswer && quizCore.hasNextQuestion()) {
          quizCore.answerQuestion(selectedAnswer)
          quizCore.nextQuestion()
          setState(prevState => ({...prevState, selectedAnswer: null, showSubmitButton: false}))
      }
      else if (selectedAnswer && !quizCore.hasNextQuestion()){
          quizCore.answerQuestion(selectedAnswer)
          setState(prevState => ({...prevState, showSubmitButton: true, quizComplete:true}))
      }
  }
  const handleSubmitButton = (): void => {
      setState((prevState) => ({
          ...prevState,
          quizComplete: true,
      }))
      //alert("Quiz completed\n")

  }

  const { quizCore, selectedAnswer, showSubmitButton, quizComplete } = state;
  const currentQuestion = quizCore.getCurrentQuestion();

  if (quizComplete) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotal()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

        {showSubmitButton ? (
            <button onClick={handleSubmitButton}>Submit Quiz</button>
        ) : (
            <button onClick={handleButtonClick}>Next Question</button>
        )}
    </div>
  );
};

export default Quiz;