import React, { useState } from 'react';

export default ({ dispatch }) => {
  const [name, setName] = useState('');
  const startGame = () => {
    dispatch({ event: 'game-start', name });
  };

  return <div>
    <h2>Welcome! </h2>
    <div>Please enter your name below.</div>
    <div>
      <input
        type="text"
        placeholder="Your name"
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            startGame();
          }
        }}
        onChange={(e) => setName(e.target.value)} />
    </div>
    <div>
      <button onClick={startGame}>Start Game</button>
    </div>
  </div>;
};