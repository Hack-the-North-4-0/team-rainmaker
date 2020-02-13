import React, { useReducer } from 'react';
import './App.css';

import Home from './components/home';
import GameView from './components/game-view';
import Completed from './components/completed';
import TopBar from './components/top-bar';

const questions = [
  {
    question: 'Which of these can you buy with a days wage',
    answers: [
      { answer: 'Takeaway', correct: false },
      { answer: 'New Phone', correct: false },
      { answer: 'Trainers', correct: false },
      { answer: 'Cap', correct: true },
    ],
  },
  {
    question: 'Which of these is a type of credit',
    answers: [
      { answer: 'Phone Contract', correct: true },
      { answer: 'New Trainers', correct: false },
      { answer: 'Netflix Subscription', correct: false },
    ],
  },
  {
    question: 'What is a loan',
    answers: [
      { answer: 'Free Money', correct: false },
      { answer: 'Money you owe someone', correct: true },
      { answer: 'What you get paid', correct: false },
    ],
  },
  {
    question: 'You are given £20 for your birthday, whats the best way to make this £30',
    answers: [
      { answer: 'Sitck it under a mattress', correct: true },
      { answer: 'Spend it', correct: false },
      { answer: 'Savings', correct: false },
    ],
  },
  {
    question: 'When will you pay council tax',
    answers: [
      { answer: 'When you are 18', correct: true },
      { answer: 'When I live in my own place', correct: false },
      { answer: 'Only when I own my own home', correct: false },
    ],
  }
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

  return (
    <div className="App">
      <TopBar />
      <GameView dispatch={dispatch} gameState={gameState} />
    </div>
  );
}

export default App;
