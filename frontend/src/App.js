import React, { useReducer } from 'react';
import './App.css';

import Home from './components/home';
import GameView from './components/game-view';
import WaitView from './components/wait-view';
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
      { answer: 'When you are 18', correct: false },
      { answer: 'When I live in my own place', correct: true },
      { answer: 'Only when I own my own home', correct: false },
    ],
  }
];

const generateNewGame = () => {
  const remainingQuestions = [...questions];

  return {
    round: 1,
    remainingQuestions,
    currentQuestion: remainingQuestions.shift(),
    answers: [],
    ledger: [
      { type: 'deposit', description: 'Initial Deposit', amount: 1000 },
    ]
  };
};

const getOutcome = ({ remainingTime }, answered, correct) => {
  if (!answered) {
    return 'no-answer';
  }

  if (!correct) {
    return 'wrong';
  }

  if (remainingTime > 7) {
    return 'great';
  }

  if (remainingTime > 3) {
    return 'good';
  }

  return 'bad';
};

const getAmountForAnswer = ({ correct, timeChallenge }) => {
  if (!correct) {
    return 10;
  }

  if (timeChallenge === 'great') {
    return 100;
  }

  if (timeChallenge === 'good') {
    return 50;
  }

  return 20;
};

const updateLedger = (ledger, lastAnswer) => {
  return [
    ...ledger,
    { type: 'deposit', description: 'Pay', amount: getAmountForAnswer(lastAnswer) },
    { type: 'withdrawal', description: 'Outgoings', amount: -25 }
  ]
};

function App() {
  const [gameState, dispatch] = useReducer((state, { event, ...rest }) => {
    if (event === 'game-start') {
      const { name } = rest;

      return { name, ...generateNewGame() };
    }

    if (event === 'answer-question') {
      const [nextQuestion, ...remainingQuestions] = state.remainingQuestions;

      const correctAnswerIndex = state.currentQuestion.answers.reduce((index, { correct }, i) => {
        if (index < 0 && correct) {
          return i;
        }

        return index;
      }, -1);

      const answered = typeof rest.answer !== 'undefined';
      const correct = correctAnswerIndex === rest.answer;
      const newAnswer = { ...rest, correct, outcome: getOutcome(rest, answered, correct) };
      console.log(newAnswer);

      return {
        ...state,
        ledger: updateLedger(state.ledger, newAnswer),
        remainingQuestions,
        nextQuestion,
        currentQuestion: undefined,
        answers: [
          ...state.answers,
          newAnswer,
        ],
        complete: nextQuestion ? false : true,
      };
    }

    if (event === 'wait-complete') {
      return { ...state, round: state.round + 1, nextQuestion: undefined, currentQuestion: state.nextQuestion };
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

  if (!gameState.currentQuestion) {
    return (
      <div className="App">
        <TopBar />
        <WaitView gameState={gameState} dispatch={dispatch} allowedTime={15} />
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
