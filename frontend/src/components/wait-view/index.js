import React, { useEffect, useState } from 'react';

import Countdown from '../countdown';

export default ({ dispatch, gameState, allowedTime }) => {
  const { round } = gameState;
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

  return <div className="game-view">
    <div className="game__content">
      <h2>Round {round} Complete</h2>

      <Countdown total={allowedTime} current={remainingTime} />

      <p className="game__content__question">
        Next round starting soon! Get Ready...
      </p>
    </div>
  </div>;
};
