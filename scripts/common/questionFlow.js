// scripts/questionFlow.js
import { createDragHoldButton } from './dragAndHold.js';
import { updateCO2Value } from './globals.js';

const questions = [
  {
    id: 1,
    text: '🗓️ Wie oft bist du pro Woche an der HSD?',
    options: [
      { label: '1 Tag', value: 5 },
      { label: '2 Tage', value: 10 },
      { label: '3 Tage', value: 15 },
      { label: '4 Tage', value: 20 },
      { label: '5 Tage', value: 25 }
    ]
  }
];

let currentQuestionIndex = 0;

export function startQuestionFlow() {
  console.log("▶️ startQuestionFlow gestartet");
  renderQuestion(questions[currentQuestionIndex]);
}

function renderQuestion(question) {
  const container = document.getElementById('question-container');
  container.style.display = 'flex';
  container.style.pointerEvents = 'auto';
  container.innerHTML = '';

  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.innerText = question.text;
  container.appendChild(questionDiv);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'button-wrapper';

  question.options.forEach(option => {
    const button = createDragHoldButton(option.label, () => handleAnswer(option.value));
    buttonWrapper.appendChild(button);
  });

  container.appendChild(buttonWrapper);
}

function handleAnswer(value) {
  updateCO2Value(value);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion(questions[currentQuestionIndex]);
  } else {
    showResults();
  }
}

function showResults() {
  const container = document.getElementById('question-container');
  container.innerHTML = '<h2>✅ Du hast alle Fragen beantwortet!</h2>';
}
