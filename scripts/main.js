import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { setupOverlayObserver } from './common/setupOverlayObserver.js';
import { calculateFootprint } from './common/calculate.js';
import { startQuestionFlow } from './common/questionFlow.js';

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

function collectInputs() {
  return {
    distance: parseInt(document.getElementById("distance").value, 10),
    transport: document.getElementById("transport").value,
    daysPerWeek: parseInt(document.getElementById("days").value, 10),
    mealsPerWeek: parseInt(document.getElementById("meals").value, 10),
    diet: document.getElementById("diet").value,
    water: document.getElementById("water").value,
    paper: document.getElementById("paper").value,
    screenHoursPerDay: parseFloat(document.getElementById("screen").value),
    abroad: document.getElementById("abroad").value === "yes"
  };
}

function requestMotionPermission() {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          console.log("📲 Bewegungssensor aktiviert!");
        } else {
          console.warn("⚠️ Bewegungssensor verweigert!");
        }
      })
      .catch(console.error);
  } else {
    console.log("✅ Keine zusätzliche Berechtigung nötig.");
  }
}

document.addEventListener("click", requestMotionPermission, { once: true });
document.addEventListener("touchstart", requestMotionPermission, { once: true });

document.addEventListener("DOMContentLoaded", async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  initGlobals();
  initScene();
  handleEarthRotation();
  setupOverlayObserver();

  // 🔁 Fragefluss starten, wenn Erde weg ist
  document.addEventListener("start-questions", () => {
    const questionContainer = document.getElementById("question-container");
    if (questionContainer) {
      console.log("📩 Fragenfluss startet!");
      questionContainer.style.display = "block";
      questionContainer.style.pointerEvents = "auto";
      startQuestionFlow(); // ❗ wichtig!
    }
  });

  const initialInputs = collectInputs();
  const initialResult = calculateFootprint(initialInputs);
  updateLiveBall(initialResult.totalKg);
});
