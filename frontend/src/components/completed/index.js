import React, { useState } from 'react';

import BankSummary from '../bank-summary';

import './completed.css';

const endMessage = (ledger) => {
  const total = ledger.reduce((total, { amount = 0 }) => total + amount, 0);

  if (total > 300) {
    return 'Wow; you’re a real superstar! You really showed off your finance knowledge! ';
  }

  // if (total > 250) {
  //   return '';
  // }

  // if (total > 100) {
  //   return '';
  // }

  if (total >= 0) {
    return 'Great effort - you got things right but can be faster next time! Well done!';
  }

  return 'Oof! You’re in debt! Take some time to learn about money and have another go at getting back to in credit! ';
};

const ResultPanel = ({ gameState: { ledger, answers } }) => {
  return <div>
    <div className="results-message">
      {endMessage(ledger)}
    </div>
    <BankSummary ledger={ledger} showAll={true} />
  </div>;
};

export default ({ gameState, dispatch }) => {
  return <div className="results-container">
    <h2>Congratulations! </h2>
    <ResultPanel gameState={gameState} />
    <div>
      <button onClick={() => dispatch({ event: 'reset' })}>Start New Game</button>
    </div>
  </div>;
};