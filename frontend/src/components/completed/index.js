import React, { useState } from 'react';

import BankSummary from '../bank-summary';

import './completed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinStars, faLaughSquint, faSadCry } from '@fortawesome/free-solid-svg-icons';

const endMessage = (ledger) => {
  const total = ledger.reduce((total, { amount = 0 }) => total + amount, 0);

  if (total > 300) {
    return <div className="results-message">
      <div className="results-message__icon">
        <FontAwesomeIcon icon={faGrinStars} />
      </div>
      <div className="results-message__text">
        Wow; you’re a real superstar! You really showed off your finance knowledge!
      </div>
    </div>;
  }

  // if (total > 250) {
  //   return '';
  // }

  // if (total > 100) {
  //   return '';
  // }

  if (total >= 0) {
    return <div className="results-message">
      <div className="results-message__icon">
        <FontAwesomeIcon icon={faLaughSquint} />
      </div>
      <div className="results-message__text">
        Great effort - you got things right but can be faster next time! Well done!
      </div>
    </div>;
  }

  return <div className="results-message">
    <div className="results-message__icon">
      <FontAwesomeIcon icon={faSadCry} />
    </div>
    <div className="results-message__text">
      Oof! You’re in debt! Take some time to learn about money and have another go at getting back to in credit!
    </div>
  </div>;
};

const ResultPanel = ({ gameState: { ledger, answers } }) => {
  return <div>
    {endMessage(ledger)}
    <BankSummary ledger={ledger} showAll={true} />
  </div>;
};

export default ({ gameState, dispatch }) => {
  return <div className="results-container">
    <h2>Congratulations! </h2>
    <ResultPanel gameState={gameState} />
    <div className="results-buttons">
      <button onClick={() => dispatch({ event: 'reset' })}>Start New Game</button>
    </div>
  </div>;
};