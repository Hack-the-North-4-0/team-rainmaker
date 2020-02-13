import React from 'react';

import Countdown from './countdown';

import './game.css';

export default ({ dispatch, gameState }) => {
  const { currentQuestion, round } = gameState;

  const answerQuestion = () => {
    dispatch({ event: 'answer-question' });
  };

  const allowedTime = 10;
  const remainingTime = 7;

  return <div className="game-view">
    <div className="game__content">
      <h2>Round {round}</h2>

      <Countdown total={allowedTime} current={remainingTime} />

      <p className="game__content__question">
        {currentQuestion.question}
      </p>

      <ul className="game__question-answers">
        {currentQuestion.answers.map(({ answer }, i) => {
          return <li key={`answer-${gameState.round}-${i}`} className="game__question-answers__item" onClick={() => {
            answerQuestion(i);
          }}>
            <label>{answer}</label>
          </li>;
        })}
      </ul>
    </div>
  </div>;
};
