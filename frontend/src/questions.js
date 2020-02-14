const allQuestions = [
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

export default () => [
  ...allQuestions,
];