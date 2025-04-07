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
    const backBtn = document.getElementById("back-btn");
  
    if (card && resultBox && backBtn) {
      card.style.display = "none";
      resultBox.style.display = "block";
      backBtn.style.display = "inline-block";
  
      document.getElementById("result-summary").textContent =
        `Du verursachst etwa ${result.totalKg} kg CO₂`;
      document.getElementById("result-equivalent").textContent =
        result.equivalent;
      document.getElementById("result-trees").textContent =
        `🌳 Dafür bräuchtest du ${result.trees} Baum${result.trees > 1 ? 'e' : ''} zum Ausgleich`;
      
      // ➕ Bäume in AR anzeigen
      showTrees(result);
    }
  }
  

  const backButton = document.getElementById("back-btn");

  if (backButton) {
    backButton.addEventListener("click", () => {
      const card = document.querySelector(".input-card");
      const resultBox = document.getElementById("result-box");

      if (card && resultBox) {
        card.style.display = "block";
        resultBox.style.display = "none";
        backButton.style.display = "none";
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
  if (oldContainer) oldContainer.remove(); // alte löschen, falls vorhanden

  const container = document.createElement("a-entity");
  container.setAttribute("id", "tree-container");

  const treeCount = Math.min(result.trees, 20); // Maximal 20 Bäume

  for (let i = 0; i < treeCount; i++) {
    const tree = document.createElement("a-entity");
    tree.setAttribute("gltf-model", "#tree-model");

    // Zufällige Position rund um Marker
    const angle = (i / treeCount) * Math.PI * 2;
    const radius = 1 + Math.random() * 0.5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    tree.setAttribute("position", `${x} 0 ${z}`);
    tree.setAttribute("scale", "0.3 0.3 0.3");
    container.appendChild(tree);
  }

  marker.appendChild(container);
}


