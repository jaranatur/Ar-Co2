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
  
      document.getElementById("result-summary").textContent = "";
      document.getElementById("result-equivalent").textContent = "";
      document.getElementById("result-trees").textContent = "";
  
      // 1️⃣ CO₂-Gesamtwert
      setTimeout(() => {
        document.getElementById("result-summary").textContent =
          `Du verursachst etwa ${result.totalKg} kg CO₂`;
      }, 0);
  
      // 2️⃣ Flugzeug-Vergleich (Text)
      setTimeout(() => {
        document.getElementById("result-equivalent").textContent =
          result.equivalent;
      }, 2500);
  
      // 3️⃣ Flugzeug-Animation
      setTimeout(() => {
        showPlane();
      }, 5000);
  
      // 4️⃣ Baum-Vergleich (Text)
      setTimeout(() => {
        document.getElementById("result-trees").textContent =
          `🌳 Dafür bräuchtest du ${result.trees} Baum${result.trees > 1 ? 'e' : ''} zum Ausgleich`;
      }, 8000);
  
      // 5️⃣ Baum-Animation (AR)
      setTimeout(() => {
        showTrees(result);
      }, 10500);
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
  if (oldContainer) oldContainer.remove();

  const container = document.createElement("a-entity");
  container.setAttribute("id", "tree-container");

  const treeCount = Math.min(result.trees, 20);

  for (let i = 0; i < treeCount; i++) {
    const tree = document.createElement("a-entity");
    tree.setAttribute("gltf-model", "#tree-model");

    // Position leicht nach hinten
    const angle = (i / treeCount) * Math.PI * 2;
    const radius = 0.25 + Math.random() * 0.15;
    const x = Math.cos(angle) * radius;
    const z = -0.5 + Math.sin(angle) * radius;

    const scale = (0.25 + Math.random() * 0.1).toFixed(2); // größerer Baum

    tree.setAttribute("position", `${x} 0 ${z}`);
    tree.setAttribute("scale", "0.001 0.001 0.001");
    tree.setAttribute("animation", {
      property: "scale",
      to: `${scale} ${scale} ${scale}`,
      dur: 4000, // ⏳ langsamer
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

  // 👉 Startposition rechts oben, Rotation: leicht geneigt
  plane.setAttribute("position", "2 2 0");
  plane.setAttribute("scale", "0.8 0.8 0.8");
  plane.setAttribute("rotation", "0 -90 10"); // von der Seite, leicht geneigt

  plane.setAttribute("animation", {
    property: "position",
    to: "-2 1.5 0",
    dur: 7000,
    easing: "easeInOutSine"
  });

  marker.appendChild(plane);
}


