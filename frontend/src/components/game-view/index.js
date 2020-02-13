import React, { useEffect, useState } from 'react';

import Countdown from '../countdown';

import './game.css';

export default ({ dispatch, gameState, allowedTime }) => {
  const { currentQuestion, round } = gameState;
  const [remainingTime, setTimeLeft] = useState(allowedTime);

  useEffect(() => {
    setTimeout(() => {
      const newTimeleft = remainingTime - 1;

      if (newTimeleft <= 0) {
        dispatch({ event: 'answer-question' });
        return;
      }

      setTimeLeft(newTimeleft);
    }, 1000);
  });

  const answerQuestion = (answer, remainingTime) => {
    dispatch({ event: 'answer-question', answer, remainingTime });
  };

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
            answerQuestion(i, remainingTime);
          }}>
            <label>{answer}</label>
          </li>;
        })}
      </ul>
    </div>
  </div>;
};
