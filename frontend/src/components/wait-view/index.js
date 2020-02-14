import React, { useEffect, useState } from 'react';

import Countdown from '../countdown';
import BankSummary from '../bank-summary';

export default ({ dispatch, gameState, allowedTime }) => {
  const { round, answers } = gameState;
  const [remainingTime, setTimeLeft] = useState(allowedTime);

  useEffect(() => {
    setTimeout(() => {
      const newTimeleft = remainingTime - 1;

      if (newTimeleft <= 0) {
        dispatch({ event: 'wait-complete' });
        return;
      }

      setTimeLeft(newTimeleft);
    }, 1000);
  });

  const lastAnswerMessage = ({ outcome }) => {
    if (outcome === 'no-answer') {
      return 'Sorry, you were too slow answering!';
    }

    if (outcome === 'wrong') {
      return 'Oh no! I\'m afraid that answer wasn\'t right!';
    }

    if (outcome === 'great') {
      return 'That was a super fast, super correct, great job!';
    }
    
    if (outcome === 'good') {
      return 'That was pretty fast, good job';
    }

    if (outcome === 'bad') {
      return 'You were right, but you could have been faster!';
    }
  };

  return <div className="game-view">
    <div className="game__content">
      <h2>Round {round} Complete</h2>

      <Countdown total={allowedTime} current={remainingTime} />

      <p className="game__content__question">
        {lastAnswerMessage(answers[answers.length - 1])}
      </p>

      <BankSummary ledger={gameState.ledger} />
    </div>
  </div>;
};
