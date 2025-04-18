
import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { setupOverlayObserver } from './common/setupOverlayObserver.js';
import { calculateFootprint } from './common/calculate.js';

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

  function showResultOverlay(result) {
    const card = document.querySelector(".input-card");
    const resultBox = document.getElementById("result-box");

    card.style.display = "none";
    resultBox.style.display = "block";

    const summary = document.getElementById("summary-box");
    summary.textContent = `Dein CO₂-Ausstoß beträgt etwa ${result.totalKg} kg pro Jahr.`;
    summary.style.opacity = 1;

    setTimeout(() => {
      const eq = document.getElementById("equivalent-box");
      eq.textContent = result.equivalent;
      eq.style.opacity = 1;
      showPlane();
    }, 3000);

    setTimeout(() => {
      const trees = document.getElementById("trees-box");
      trees.textContent = `🌳 Dafür bräuchtest du ${result.trees} Baum${result.trees > 1 ? 'e' : ''} zum Ausgleich.`;
      trees.style.opacity = 1;
      showTrees(result);
      if (buttonGroup) buttonGroup.style.display = "flex";
    }, 8500);
  }
});

window.addEventListener("load", () => {
  const canvas = document.querySelector("a-scene canvas");
  if (canvas) {
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "none";
  }
});

function showTrees(result) {
  const marker = document.querySelector("a-marker");
  const oldContainer = document.getElementById("tree-container");
  if (oldContainer) oldContainer.remove();

  const container = document.createElement("a-entity");
  container.setAttribute("id", "tree-container");

  const treeCount = Math.min(result.trees, 20);

  for (let i = 0; i < treeCount; i++) {
    const tree = document.createElement("a-entity");
    tree.setAttribute("gltf-model", "#tree-model");

    const angle = (i / treeCount) * Math.PI * 2;
    const radius = 0.25 + Math.random() * 0.15;
    const x = Math.cos(angle) * radius;
    const z = -0.5 + Math.sin(angle) * radius;
    const scale = (0.25 + Math.random() * 0.1).toFixed(2);

    tree.setAttribute("position", `${x} 0 ${z}`);
    tree.setAttribute("scale", "0.001 0.001 0.001");
    tree.setAttribute("animation", {
      property: "scale",
      to: `${scale} ${scale} ${scale}`,
      dur: 7000,
      easing: "easeOutElastic"
    });

    container.appendChild(tree);
  }

  marker.appendChild(container);
}

function showPlane() {
  const marker = document.querySelector("a-marker");

  const plane = document.createElement("a-entity");
  plane.setAttribute("gltf-model", "#plane-model");
  plane.setAttribute("position", "-2 2.6 -1");
  plane.setAttribute("rotation", "0 90 0");
  plane.setAttribute("scale", "0.4 0.4 0.4");
  plane.setAttribute("animation", {
    property: "position",
    to: "5 2.6 -1",
    dur: 5000,
    easing: "easeInOutSine"
  });

  marker.appendChild(plane);
}
