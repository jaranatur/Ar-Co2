import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { setupOverlayObserver } from './common/setupOverlayObserver.js';
import { calculateFootprint } from './common/calculate.js';

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
  console.log("✅ main.js wurde geladen!");

  await new Promise((resolve) => setTimeout(resolve, 500));

  initGlobals();
  initScene();
  handleEarthRotation();
  setupOverlayObserver();

  const distanceSlider = document.getElementById("distance");
  const distanceValue = document.getElementById("distance-value");
  const backBtn = document.getElementById("back-btn"); // 👈 EINHEITLICH verwenden

  if (distanceSlider && distanceValue) {
    const updateValue = () => {
      distanceValue.textContent = `${distanceSlider.value} km`;
    };
    distanceSlider.addEventListener("input", updateValue);
    updateValue();
  }

  const calculateBtn = document.getElementById("calculate-btn");

  if (calculateBtn) {
    calculateBtn.addEventListener("click", () => {
      const distance = parseInt(document.getElementById("distance").value, 10);
      const transport = document.getElementById("transport").value;
      const diet = document.getElementById("diet").value;
      const water = document.getElementById("water").value;

      const result = calculateFootprint({ distance, transport, diet, water });

      showResultOverlay(result);
    });
  }

  function showResultOverlay(result) {
    const card = document.querySelector(".input-card");
    const resultBox = document.getElementById("result-box");
    const buttonGroup = document.getElementById("button-group");

    card.style.display = "none";
    resultBox.style.display = "block";
    backBtn.style.display = "none";

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
      if (backBtn) backBtn.style.display = "inline-block";
    }, 8500);
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const card = document.querySelector(".input-card");
      const resultBox = document.getElementById("result-box");
      const buttonGroup = document.getElementById("button-group");

      if (card && resultBox && buttonGroup) {
        card.style.display = "block";
        resultBox.style.display = "none";
        buttonGroup.style.display = "none";
      }
    });
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
