import React, { useState } from 'react';

export default ({ gameState, dispatch }) => {
  return <div>
    <h2>Congratulations! </h2>
    <div>You won!</div>
    <div>
      <button onClick={() => dispatch({ event: 'reset' })}>Start New Game</button>
    </div>
  </div>;
};