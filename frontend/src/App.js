import React, { useReducer } from 'react';
import './App.css';

import Home from './components/home';
import GameView from './components/game-view';
import Completed from './components/completed';

const questions = [
  {
    question: 'question one text',
    answers: [
      { answer: 'Answer 1', correct: false },
      { answer: 'Answer 2', correct: true },
      { answer: 'Answer 3', correct: false },
    ],
  },
];

const generateNewGame = () => {
  const remainingQuestions = [...questions];

  return { round: 1, remainingQuestions, currentQuestion: remainingQuestions.shift() };
};

function App() {
  const [gameState, dispatch] = useReducer((state, { event, ...rest }) => {
    if (event === 'game-start') {
      const { name } = rest;

      return { name, ...generateNewGame() };
    }

    if (event === 'answer-question') {
      const [currentQuestion, ...remainingQuestions] = state.remainingQuestions;

      if (!currentQuestion) {
        return { ...state, complete: true };
      }

      return { ...state, round: state.round + 1, remainingQuestions, currentQuestion };
    }

    if (event === 'reset') {
      return { name: state.name, ...generateNewGame() };
    }

    return state;
  }, {});

  if (!gameState.name) {
    return (
      <div className="App">
        <Home dispatch={dispatch}></Home>
      </div>
    );
  }

  if (gameState.completed) {
    return (
      <div className="App">
        <Completed gameState={gameState} />
      </div>
    );
  }

  return (
    <div className="App">
      <GameView dispatch={dispatch} gameState={gameState}></GameView>
    </div>
  );
}

export default App;
