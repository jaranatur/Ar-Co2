// File: scripts/main.js

import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { calculateFootprint } from './common/calculate.js';
import { questions } from './common/questions.js';
import { setupNamePrompt } from './common/handleNamePrompt.js'; // Wichtig!

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

  const strokeColor = kg < 50 ? "#52b788" : kg <= 100 ? "#f4a261" : "#e76f51";
  donut.setAttribute("stroke", strokeColor);

  const overlayVisible = window.getComputedStyle(document.getElementById("input-overlay")).display !== "none";
  indicator.style.opacity = overlayVisible ? "1" : "0";
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
  initGlobals();
  initScene();
  handleEarthRotation();
  setupNamePrompt();

  const allInputIds = questions.map(q => q.id);
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
    renderQuestion(currentIndex);

    setTimeout(() => {
      const co2 = document.getElementById("co2-indicator");
      if (co2) {
        co2.style.opacity = "1";
        co2.style.transform = "translateX(-50%) scale(1)";
      }
    }, 50);

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