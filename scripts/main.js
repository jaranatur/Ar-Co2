//main.js

import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { setupOverlayObserver } from './common/setupOverlayObserver.js';
import { calculateFootprint } from './common/calculate.js';
import { questions } from './common/questions.js';

let currentIndex = 0;
let answers = {};

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
      answers[question.id] = select.value;
      const result = calculateFootprint(answers);
      updateLiveBall(result.totalKg);
    });
    body.appendChild(select);
  }

  if (question.type === "slider") {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = question.min;
    slider.max = question.max;
    slider.step = question.step;
    slider.value = question.value;
    slider.id = question.id;

    const output = document.createElement("span");
    output.id = "screen-value";
    output.textContent = "0 Stunden";

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
  const indicator = document.getElementById("co2-indicator");

}

document.addEventListener("DOMContentLoaded", () => {
  initGlobals();
  initScene();
  // 💡 Hier CO₂-Tracker vorbereiten (alles auf 0 setzen)
  const allInputIds = questions.map(q => q.id);
  allInputIds.forEach(id => answers[id] = id === "screenHoursPerDay" ? 0 : "");
  updateLiveBall(0);
  document.getElementById("co2-indicator").classList.remove("hidden");


  handleEarthRotation();

  document.getElementById("back-btn").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
    }
  });

  document.getElementById("btn-hsd").addEventListener("click", () => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    } else {
      const result = calculateFootprint(answers);
      document.getElementById("co2-indicator")?.classList.add("hidden");
      showResultOverlay(result);
    }
  });

 document.addEventListener("start-questions", () => {
  console.log("🚀 Fragen-Flow startet");
  document.getElementById("input-overlay").style.display = "block";
  renderQuestion(currentIndex);
  document.getElementById("co2-indicator").classList.remove("hidden");

});

});