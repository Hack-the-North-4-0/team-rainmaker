import React, { useState } from 'react';

import BankSummary from '../bank-summary';

import './completed.css';

const ResultPanel = ({ gameState: { ledger, answers } }) => {
  return <div>
    <div className="results-message">
      You Won!
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