import React, { useReducer } from 'react';
import './App.css';

import { gameStateReduce } from './game-state';

import Home from './components/home';
import GameView from './components/game-view';
import WaitView from './components/wait-view';
import Completed from './components/completed';
import TopBar from './components/top-bar';

function App() {
  const [gameState, dispatch] = useReducer(gameStateReduce, {});

  if (!gameState.name) {
    return (
      <div className="App">
        <TopBar />
        <Home dispatch={dispatch}></Home>
      </div>
    );
  }

  if (gameState.complete) {
    return (
      <div className="App">
        <TopBar />
        <Completed gameState={gameState} dispatch={dispatch} />
      </div>
    );
  }

  if (!gameState.currentQuestion) {
    return (
      <div className="App">
        <TopBar />
        <WaitView gameState={gameState} dispatch={dispatch} allowedTime={10} />
      </div>
    );
  }

  return (
    <div className="App">
      <TopBar />
      <GameView dispatch={dispatch} gameState={gameState} allowedTime={10} />
    </div>
  );
}

export default App;
