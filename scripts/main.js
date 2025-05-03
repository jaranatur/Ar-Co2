// import { initGlobals } from './common/globals.js';
// import { initScene } from './common/initScene.js';
// import { handleEarthRotation } from './common/handleEarthRotation.js';
import { calculateFootprint } from './common/calculate.js';
import { setupQuestions, mainQuestions } from './common/questions.js';
import { setupNamePrompt } from './common/handleNamePrompt.js';
import { feedbackTexts } from './common/feedbackTexts.js';
import { renderGarden } from './renderGarden.js';

let currentIndex = 0;
let answers = {};
let userName = "";
let currentQuestions = [];

const renderButton = document.getElementById("render-button");
const nextButton = document.getElementById("next-question");

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
  hideFeedback();
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
      if (typeof opt === "string") {
        option.value = opt;
        option.textContent = opt;
      } else {
        option.value = opt.value;
        option.textContent = opt.label;
      }
      select.appendChild(option);
    });

    select.value = "";
    if (select.querySelector('option[value=""]')) {
      select.querySelector('option[value=""]').disabled = true;
    }

    select.addEventListener("input", () => {
      let value = select.value;
      if (["daysPerWeek", "distance", "mealsPerWeek"].includes(question.id)) {
        value = parseInt(value, 10);
      }
      answers[question.id] = value;
      updateLiveBall(calculateFootprint(answers).totalKg);
      showFeedback(question.id, value);
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
      showFeedback(question.id, val);
    });

    body.appendChild(slider);
    body.appendChild(output);
  }

  checkRenderReady();
}

function checkRenderReady() {
  const isLastQuestion = currentIndex === currentQuestions.length - 1;
  const allAnswered = mainQuestions.every(q => {
    const val = answers[q.id];
    return val !== null && val !== undefined && val !== '';
  });

  if (isLastQuestion && allAnswered) {
    renderButton.style.display = "block";
    nextButton.style.display = "none";
  } else {
    renderButton.style.display = "none";
    nextButton.style.display = "inline-block";
  }
}

function showFeedback(questionId, selectedValue) {
  const feedbackBox = document.getElementById('feedback-text');
  let feedback = '';

  if (typeof feedbackTexts[questionId] === 'function') {
    feedback = feedbackTexts[questionId](selectedValue);
  } else if (typeof feedbackTexts[questionId] === 'object') {
    feedback = feedbackTexts[questionId][selectedValue] || '';
  }

  if (feedback && feedbackBox) {
    feedbackBox.innerText = feedback;
    feedbackBox.style.display = "block";
    feedbackBox.classList.add('active');
    feedbackBox.classList.remove('hidden');
  }
}

function hideFeedback() {
  const feedbackBox = document.getElementById('feedback-text');
  if (feedbackBox) {
    feedbackBox.classList.remove('active');
    feedbackBox.classList.add('hidden');
    setTimeout(() => {
      feedbackBox.style.display = "none";
    }, 600);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const co2 = document.getElementById("co2-indicator");
  if (co2) co2.style.display = "none";

  // initGlobals();
  // initScene();
  setupNamePrompt();

  const namePrompt = document.getElementById("name-prompt");
  if (namePrompt) namePrompt.style.display = "flex";

  document.querySelector("#earth-container")?.setAttribute("visible", "false");
  document.querySelector("#hint-text")?.setAttribute("visible", "false");
  document.querySelector("#hint-bg")?.setAttribute("visible", "false");
  document.querySelector("#arrow-icon-entity")?.setAttribute("visible", "false");

  const navButtons = document.getElementById("nav-buttons");
  if (navButtons) navButtons.style.display = "none";

  const allInputIds = mainQuestions.map(q => q.id);
  allInputIds.forEach(id => answers[id] = id === "screenHoursPerDay" ? 0 : "");

  updateLiveBall(0);

  document.addEventListener("start-questions", () => {
    const scene = document.querySelector('a-scene');
    if (scene) scene.classList.add('no-interaction');

    userName = document.getElementById("user-name").value.trim();
    if (!userName) {
      alert("Bitte gib deinen Namen ein!");
      return;
    }

    document.querySelector(".input-card-header h2").textContent = `${userName}s Nachhaltigkeitsinfos`;
    document.getElementById("input-overlay").style.display = "flex";
    if (co2) co2.style.display = "flex";

    renderSetup();

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
      checkRenderReady();
    }
  });

  document.getElementById("next-question").addEventListener("click", () => {
    if (currentIndex < currentQuestions.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
      checkRenderReady();
    } else {
      const result = calculateFootprint(answers);
      if (co2) co2.style.display = "none";
      console.log("Fragen abgeschlossen:", result);
    }
  });

  const marker = document.querySelector("a-marker");
  if (marker) {
    marker.setAttribute("emitevents", "true");

    marker.addEventListener("markerLost", () => {
      console.log("⚠️ Marker verloren – Szene bleibt sichtbar.");
    });

    marker.addEventListener("markerFound", () => {
      console.log("✅ Marker wiedergefunden.");
    });
  }
});

renderButton.addEventListener("click", () => {
  renderButton.style.display = "none";

  document.querySelector(".input-card").style.display = "none";
  document.getElementById("nav-buttons").style.display = "none";
  document.getElementById("feedback-text").style.display = "none";
  document.getElementById("co2-indicator").style.display = "none";

  const hint = document.getElementById("scan-hint");
  if (hint) {
    hint.style.display = "block";
    setTimeout(() => {
      hint.style.transition = "opacity 1s ease";
      hint.style.opacity = "0";
      setTimeout(() => hint.remove(), 1000);
    }, 10000);
  }

  const garden = document.querySelector("#garden-container");
  const grass = document.querySelector("#grass-plane");
  if (garden) garden.setAttribute("visible", "true");
  if (grass) grass.setAttribute("visible", "true");

  const marker = document.querySelector("a-marker");
  if (!marker) {
    console.error("❌ Kein Marker gefunden!");
    return;
  }

  if (marker.object3D.visible) {
    console.log("✅ Marker sichtbar – direkt rendern.");
    renderGarden(answers);
  } else {
    marker.addEventListener("markerFound", () => {
      console.log("✅ Marker sichtbar → Garten wird gerendert.");
      renderGarden(answers);
    }, { once: true });
  }
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
        if (typeof opt === "string") {
          option.value = opt;
          option.textContent = opt;
        } else {
          option.value = opt.value;
          option.textContent = opt.label;
        }
        select.appendChild(option);
      });

      select.value = "";
      if (select.querySelector('option[value=""]')) {
        select.querySelector('option[value=""]').disabled = true;
      }

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

  const navButtons = document.getElementById("nav-buttons");
  if (navButtons) navButtons.style.display = "flex";
}
