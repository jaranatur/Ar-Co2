import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { calculateFootprint } from './common/calculate.js';
import { questions } from './common/questions.js';

let currentIndex = 0;
let answers = {};
let userName = "";

function updateLiveBall(totalKg) {
  const indicator = document.getElementById("co2-indicator");
  const donut = indicator.querySelector("#donut-meter");
  const value = indicator.querySelector(".co2-value");

  const kg = Math.round(totalKg);
  const percent = Math.min(kg / 100, 1);

  donut.setAttribute("stroke-dasharray", `${percent * 100}, 100`);
  value.textContent = `${kg} kg`;

  if (kg < 50) {
    donut.setAttribute("stroke", "#52b788");
  } else if (kg <= 100) {
    donut.setAttribute("stroke", "#f4a261");
  } else {
    donut.setAttribute("stroke", "#e76f51");
  }

  const overlayVisible = window.getComputedStyle(document.getElementById("input-overlay")).display !== "none";
  indicator.classList.toggle("hidden", !overlayVisible);
}

function renderQuestion(index) {
  const question = questions[index];
  const body = document.querySelector(".input-card-body");
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
      const result = calculateFootprint(answers);
      updateLiveBall(result.totalKg);
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
      const result = calculateFootprint(answers);
      updateLiveBall(result.totalKg);
    });

    body.appendChild(slider);
    body.appendChild(output);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initGlobals();
  initScene();

  // Live-Tracker vorbereiten
  const allInputIds = questions.map(q => q.id);
  allInputIds.forEach(id => answers[id] = id === "screenHoursPerDay" ? 0 : "");
  updateLiveBall(0);

  // Zeige Name-Prompt zuerst
  document.getElementById("name-prompt").style.display = "flex";

  document.getElementById("start-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("user-name").value.trim();
    if (nameInput) {
      userName = nameInput;
      document.getElementById("name-prompt").style.display = "none";

      // Erst nach Name-Eingabe darf gedreht werden
      handleEarthRotation();
    }
  });

  // Fragenflow nach Erddrehung starten
  document.addEventListener("start-questions", () => {
    document.getElementById("input-overlay").style.display = "block";
    renderQuestion(currentIndex);
    document.querySelector(".input-card-header h2").textContent = `${userName}s Nachhaltigkeitsinfos`;
    document.getElementById("co2-indicator").classList.remove("hidden");
  });

  // Navigation
  document.getElementById("prev-question").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
    }
  });

  document.getElementById("next-question").addEventListener("click", () => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    } else {
      const result = calculateFootprint(answers);
      document.getElementById("co2-indicator")?.classList.add("hidden");
      showResultOverlay(result);
    }
  });
});
