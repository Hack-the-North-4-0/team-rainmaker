import React, { useReducer } from 'react';
import './App.css';

import Home from './components/home';
import GameView from './components/game-view';


function App() {
  const [gameState, dispatch] = useReducer((state, { event, ...rest }) => {
    if (event === 'game-start') {
      const { name } = rest;

      return { name, round: 1 };
    }

    return {};
  }, {});

  return (
    <div className="App">
      {!gameState.name
        ? <Home dispatch={dispatch}></Home>
        : <GameView dispatch={dispatch} gameState={gameState}></GameView>}
    </div>
  );
}

export default App;
