import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { calculateFootprint } from './common/calculate.js';
import { setupQuestions, mainQuestions } from './common/questions.js';
import { setupNamePrompt } from './common/handleNamePrompt.js';

let currentIndex = 0;
let answers = {};
let userName = "";
let currentQuestions = [];

function updateLiveBall(totalKg) {
  const indicator = document.getElementById("co2-indicator");
  const donut = indicator?.querySelector("#donut-meter");
  const value = indicator?.querySelector(".co2-value");
  const max = indicator?.querySelector(".co2-max");

  if (!indicator || !donut || !value || !max) return;

  const kg = Math.round(totalKg);
  const percent = Math.min(kg / 100, 1);

  donut.classList.remove("green", "orange", "red");
  if (kg < 50) donut.classList.add("green");
  else if (kg <= 100) donut.classList.add("orange");
  else donut.classList.add("red");

  donut.setAttribute("stroke-dasharray", `${percent * 100}, 100`);
  value.textContent = `${kg} kg`;
  max.textContent = "/ 100 kg";

  const isVisible = window.getComputedStyle(document.getElementById("input-overlay")).display !== "none";
  indicator.style.display = isVisible ? "flex" : "none";
}

function renderQuestion(index) {
  const question = currentQuestions[index];
  const body = document.querySelector(".input-card-body");
  if (!question || !body) return;

  body.innerHTML = "";

  const label = document.createElement("label");
  label.textContent = question.question;
  body.appendChild(label);

  if (question.type === "select") {
    const select = document.createElement("select");
    select.id = question.id;
    question.options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });

    select.addEventListener("input", () => {
      let value = select.value;
      if (["daysPerWeek", "distance", "mealsPerWeek"].includes(question.id)) {
        value = parseInt(value, 10);
      }
      answers[question.id] = value;
      updateLiveBall(calculateFootprint(answers).totalKg);
    });

    if (answers[question.id]) {
      select.value = answers[question.id];
    }

    body.appendChild(select);
  }

  if (question.type === "slider") {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = question.min;
    slider.max = question.max;
    slider.step = question.step;
    slider.value = answers[question.id] ?? question.value;
    slider.id = question.id;

    const output = document.createElement("span");
    output.id = "screen-value";
    output.textContent = `${slider.value} Stunden`;

    slider.addEventListener("input", () => {
      const val = parseFloat(slider.value);
      answers[question.id] = val;
      output.textContent = `${val} Stunden`;
      updateLiveBall(calculateFootprint(answers).totalKg);
    });

    body.appendChild(slider);
    body.appendChild(output);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const co2 = document.getElementById("co2-indicator");
  if (co2) co2.style.display = "none";

  initGlobals();
  initScene();
  handleEarthRotation();
  setupNamePrompt();

  const allInputIds = mainQuestions.map(q => q.id);
  allInputIds.forEach(id => answers[id] = id === "screenHoursPerDay" ? 0 : "");

  updateLiveBall(0);

  document.addEventListener("start-questions", () => {
    const scene = document.querySelector('a-scene');
    if (scene) {
      scene.classList.add('no-interaction');
    }

    userName = document.getElementById("user-name").value.trim();
    if (!userName) {
      alert("Bitte gib deinen Namen ein!");
      return;
    }

    document.querySelector(".input-card-header h2").textContent = `${userName}s Nachhaltigkeitsinfos`;
    document.getElementById("input-overlay").style.display = "flex";
    if (co2) co2.style.display = "flex";

    renderSetup(); // NEU: Setup-Seite zuerst anzeigen

    new MutationObserver(() => {
      updateLiveBall(calculateFootprint(answers).totalKg);
    }).observe(document.getElementById("input-overlay"), {
      attributes: true,
      attributeFilter: ["style"]
    });
  });

  document.getElementById("prev-question").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
    }
  });

  document.getElementById("next-question").addEventListener("click", () => {
    if (currentIndex < currentQuestions.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    } else {
      const result = calculateFootprint(answers);
      if (co2) co2.style.display = "none";
      console.log("Fragen abgeschlossen:", result);
    }
  });
});

function renderSetup() {
  currentQuestions = setupQuestions;

  const body = document.querySelector(".input-card-body");
  if (!body) return;

  body.innerHTML = "";

  const header = document.createElement("h2");
  header.textContent = "Starte hier:";
  body.appendChild(header);

  setupQuestions.forEach(question => {
    const questionWrapper = document.createElement("div");
    questionWrapper.className = "question-wrapper";

    const label = document.createElement("label");
    label.textContent = question.question;
    questionWrapper.appendChild(label);

    if (question.type === "select") {
      const select = document.createElement("select");
      select.id = question.id;
      question.options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
      });
      questionWrapper.appendChild(select);
    }

    body.appendChild(questionWrapper);
  });

  const btn = document.createElement("button");
  btn.textContent = "Weiter";
  btn.addEventListener("click", () => {
    setupQuestions.forEach(question => {
      const input = document.getElementById(question.id);
      if (input) {
        let value = input.value;
        if (["daysPerWeek", "distance", "mealsPerWeek"].includes(question.id)) {
          value = parseInt(value, 10);
        }
        answers[question.id] = value;
      }
    });

    startMainFlow();
  });
  body.appendChild(btn);

  const indicator = document.getElementById("co2-indicator");
  if (indicator) {
    indicator.style.display = "none";
  }
}

function startMainFlow() {
  currentQuestions = mainQuestions;
  currentIndex = 0;

  const indicator = document.getElementById("co2-indicator");
  if (indicator) {
    indicator.style.display = "flex";
  }

  renderQuestion(currentIndex);
}