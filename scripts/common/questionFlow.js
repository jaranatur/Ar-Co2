//questionFlow.js
import { createDragHoldButton } from './dragAndHold.js';
import { updateCO2Value, answers } from './globals.js';

const questions = [
  {
    id: 1,
    key: 'daysPerWeek', // 🆕 Schlüssel für Antwortspeicherung
    text: '🗓️ Wie oft bist du pro Woche an der HSD?',
    options: [
      { label: '1 Tag', value: 1 },
      { label: '2 Tage', value: 2 },
      { label: '3 Tage', value: 3 },
      { label: '4 Tage', value: 4 },
      { label: '5 Tage', value: 5 }
    ]
  }
];

let currentQuestionIndex = 0;

export function startQuestionFlow() {
  renderQuestion(questions[currentQuestionIndex]);
}

function renderQuestion(question) {
  const container = document.getElementById('question-container');
  container.innerHTML = '';

  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.innerText = question.text;
  container.appendChild(questionDiv);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'button-wrapper';

  question.options.forEach(option => {
    const button = createDragHoldButton(option.label, () => handleAnswer(question.key, option.value));
    buttonWrapper.appendChild(button);
  });

  container.appendChild(buttonWrapper);
}

function handleAnswer(key, value) {
  answers[key] = value; // 🧠 Antwort speichern
  updateCO2Value(value * 5); // z. B. 5 kg pro Tag, dummy-Wert

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
