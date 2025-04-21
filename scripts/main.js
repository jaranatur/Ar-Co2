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

  if (kg < 50) donut.setAttribute("stroke", "#52b788");
  else if (kg <= 100) donut.setAttribute("stroke", "#f4a261");
  else donut.setAttribute("stroke", "#e76f51");

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
  if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") console.log("📲 Bewegungssensor aktiviert!");
        else console.warn("⚠️ Bewegungssensor verweigert!");
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

  const initialInputs = collectInputs();
  const initialResult = calculateFootprint(initialInputs);
  updateLiveBall(initialResult.totalKg);

  const backBtn = document.getElementById("back-btn");
  const buttonGroup = document.getElementById("button-group");

  const screenSlider = document.getElementById("screen");
  const screenValue = document.getElementById("screen-value");

  if (screenSlider && screenValue) {
    const updateScreenValue = () => {
      const val = parseFloat(screenSlider.value);
      const hours = Math.floor(val);
      const minutes = (val % 1 === 0.5) ? "30 Minuten" : "";
      screenValue.textContent = minutes ? `${hours} Std ${minutes}` : `${hours} Stunden`;

      const inputs = collectInputs();
      const result = calculateFootprint(inputs);
      updateLiveBall(result.totalKg);
    };

    screenSlider.addEventListener("input", updateScreenValue);
    updateScreenValue();
  }

  const allInputs = document.querySelectorAll('#input-overlay select, #input-overlay input[type="range"]');
  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      const inputs = collectInputs();
      const result = calculateFootprint(inputs);
      updateLiveBall(result.totalKg);
    });
  });

  const calculateBtn = document.getElementById("calculate-btn");
  if (calculateBtn) {
    calculateBtn.addEventListener("click", () => {
      const inputs = collectInputs();
      const result = calculateFootprint(inputs);
      document.getElementById("co2-indicator")?.classList.add("hidden");
      showResultOverlay(result);
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const card = document.querySelector(".input-card");
      const resultBox = document.getElementById("result-box");

      if (card) card.style.display = "block";
      if (resultBox) resultBox.style.display = "none";
      if (buttonGroup) buttonGroup.style.display = "none";

      const summary = document.getElementById("summary-box");
      const eq = document.getElementById("equivalent-box");
      const trees = document.getElementById("trees-box");
      if (summary) summary.style.opacity = 0;
      if (eq) eq.style.opacity = 0;
      if (trees) trees.style.opacity = 0;

      const treeContainer = document.getElementById("tree-container");
      if (treeContainer) treeContainer.remove();

      const marker = document.querySelector("a-marker");
      if (marker) {
        const planes = marker.querySelectorAll('[gltf-model="#plane-model"]');
        planes.forEach(p => p.remove());
      }

      const inputs = collectInputs();
      const result = calculateFootprint(inputs);
      updateLiveBall(result.totalKg);
    });
  }

  const overlay = document.getElementById("input-overlay");
  const observer = new MutationObserver(() => {
    const isVisible = window.getComputedStyle(overlay).display !== "none";
    const inputs = collectInputs();
    const result = calculateFootprint(inputs);
    updateLiveBall(result.totalKg);
  });
  observer.observe(overlay, { attributes: true, attributeFilter: ['style'] });
});

window.addEventListener("load", () => {
  const canvas = document.querySelector("a-scene canvas");
  if (canvas) {
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "auto";
  }
});

document.addEventListener("start-questions", () => {
  console.log("📩 Fragenflow-Event empfangen");
  startQuestionFlow();
});
