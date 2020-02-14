import getQuestions from './questions';

const generateNewGame = () => {
  const remainingQuestions = getQuestions();

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

const prizeByOutcome = {
  great: 100,
  good: 50,
  bad: 20,
};

const getAmountForAnswer = ({ outcome }) => {
  if (typeof prizeByOutcome[outcome] !== 'undefined') {
    return prizeByOutcome[outcome];
  }

  return 10;
};

const updateLedger = (ledger, lastAnswer) => {
  return [
    ...ledger,
    { type: 'deposit', description: 'Pay', amount: getAmountForAnswer(lastAnswer) },
    { type: 'withdrawal', description: 'Outgoings', amount: -25 }
  ]
};

export const gameStateReduce = (state, { event, ...rest }) => {
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
};
