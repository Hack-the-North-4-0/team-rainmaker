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
    question: 'You are given £20 for your birthday, whats the best way to turn this into £30',
    answers: [
      { answer: 'Stick it under a mattress', correct: true },
      { answer: 'Spend it', correct: false },
      { answer: 'Savings', correct: false },
      { answer: 'Lottery tickets', correct: false },
    ],
  },
  {
    question: 'When might you pay council tax',
    answers: [
      { answer: 'When you are 18', correct: false },
      { answer: 'When I live in my own place', correct: true },
      { answer: 'Only when I own my own home', correct: false },
      { answer: 'When my bin is full and needs taking away', correct: false },
    ],
  },
 {
    question: 'What happens when you spend more than you earn as income',
    answers: [
      { answer: 'You pay less tax', correct: false },
      { answer: 'Getting into debt', correct: true },
      { answer: 'It means you are budgeting well', correct: false },
      { answer: 'Nothing happens', correct: false },
    ],
  },
     {
    question: 'What is a salary',
    answers: [
      { answer: 'A vegetable', correct: true },
      { answer: 'Regular income for work you do', correct: true },
      { answer: 'Money from the government', correct: false },
      { answer: 'Money you pay for your car', correct: false },
    ],
  },
     {
    question: 'What is disposable income',
    answers: [
      { answer: 'Money you can throw away', correct: true },
      { answer: 'Money you have to spend fast', correct: false },
      { answer: 'Money leftover after you\'ve bought essentials', correct: true },
      { answer: 'Money you spend on rent', correct: false },
    ],
  },
     {
    question: 'Which of these is the worst way to borrow £20',
    answers: [
      { answer: 'A payday loan', correct: true },
      { answer: 'Using a free overdraft', correct: false },
      { answer: 'A credit card', correct: false },
      { answer: 'Ask your mate', correct: false },
    ],
  },
     {
    question: 'What is an ISA',
    answers: [
      { answer: 'A lolly ice', correct: false },
      { answer: 'An income spending app', correct: false },
      { answer: 'A KPOP band', correct: false },
      { answer: 'An individual savings accounts', correct: true },
    ],
  },
];

function getRandomQuestions(number) {
  let chosenQuestions = new Set();
  while(chosenQuestions.size < number) {
    const tmp = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    chosenQuestions.add(tmp);
  }
  return [...chosenQuestions];
}

export default () => getRandomQuestions(10);
