import React from 'react';

import './game.css';

export default ({ dispatch, gameState }) => {
  const { currentQuestion, round } = gameState;

  const answerQuestion = () => {
    dispatch({ event: 'answer-question' });
  };

  return <div>
    <h2>Game Round {round}</h2>

    <p>
      {currentQuestion.question}
    </p>

    <ul className="game__question-answers">
      {currentQuestion.answers.map(({ answer }, i) => {
        return <li key={`answer-${gameState.round}-${i}`}><label><input type="radio" name="question-answer" value={`answer-${i + 1}`} /> {answer}</label></li>;
      })}
    </ul>

    <button onClick={() => answerQuestion()}>Answer</button>
  </div>;
};
