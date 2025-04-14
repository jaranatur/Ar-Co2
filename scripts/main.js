import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { setupOverlayObserver } from './common/setupOverlayObserver.js';
import { calculateFootprint } from './common/calculate.js';

// 🟢 Kamera-Zugriff für mobile Geräte aktivieren
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

// 🟢 CO₂-Donut aktualisieren
function updateLiveBall(totalKg) {
  const ball = document.getElementById("co2-indicator");
  const meter = document.getElementById("donut-meter");
  const value = ball?.querySelector(".co2-value");

  if (!ball || !meter || !value) return;

  const percent = Math.min((totalKg / 100) * 100, 100);
  meter.setAttribute("stroke-dasharray", `${percent} ${100 - percent}`);
  value.textContent = `${Math.round(totalKg)} kg`;

  const kg = parseFloat(totalKg);
  if (kg < 50) {
    meter.setAttribute("stroke", "#52b788"); // grün
  } else if (kg <= 100) {
    meter.setAttribute("stroke", "#f4a261"); // gelb
  } else {
    meter.setAttribute("stroke", "#e76f51"); // rot
  }
}

// 🔁 Sichtbarkeit des Donuts nur im Overlay
const overlayObserver = new MutationObserver(() => {
  const overlay = document.querySelector(".input-card");
  const co2Indicator = document.getElementById("co2-indicator");
  if (!co2Indicator) return;
  if (overlay && overlay.style.display === "block") {
    co2Indicator.classList.remove("hidden");
  } else {
    co2Indicator.classList.add("hidden");
  }
});
overlayObserver.observe(document.body, { attributes: true, subtree: true });

// 🟢 Eingaben sammeln
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
    abroad: document.getElementById("abroad").value === "yes",
  };
}

// 🟢 Haupt-Init
document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ main.js wurde geladen!");
  await new Promise((r) => setTimeout(r, 500));

  initGlobals();
  initScene();
  handleEarthRotation();
  setupOverlayObserver();

  const backBtn = document.getElementById("back-btn");
  const buttonGroup = document.getElementById("button-group");
  const screenSlider = document.getElementById("screen");
  const screenValue = document.getElementById("screen-value");

  if (screenSlider && screenValue) {
    const updateScreenValue = () => {
      const val = parseFloat(screenSlider.value);
      const hours = Math.floor(val);
      const minutes = (val % 1 === 0.5) ? "30 Minuten" : "";
      screenValue.textContent = minutes
        ? `${hours} Std ${minutes}`
        : `${hours} Stunden`;

      const result = calculateFootprint(collectInputs());
      updateLiveBall(result.totalKg);
    };
    screenSlider.addEventListener("input", updateScreenValue);
    updateScreenValue();
  }

  const calculateBtn = document.getElementById("calculate-btn");
  if (calculateBtn) {
    calculateBtn.addEventListener("click", () => {
      const result = calculateFootprint(collectInputs());
      updateLiveBall(result.totalKg);
      showResultOverlay(result);
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      document.querySelector(".input-card").style.display = "block";
      document.getElementById("result-box").style.display = "none";
      buttonGroup.style.display = "none";

      ["summary-box", "equivalent-box", "trees-box"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.style.opacity = 0;
      });

      const treeContainer = document.getElementById("tree-container");
      if (treeContainer) treeContainer.remove();

      const marker = document.querySelector("a-marker");
      if (marker) {
        const planes = marker.querySelectorAll('[gltf-model="#plane-model"]');
        planes.forEach((p) => p.remove());
      }
    });
  }
});

// 🎯 Ergebnisse anzeigen
function showResultOverlay(result) {
  const card = document.querySelector(".input-card");
  const resultBox = document.getElementById("result-box");

  card.style.display = "none";
  resultBox.style.display = "block";

  document.getElementById("summary-box").textContent = `Dein CO₂-Ausstoß beträgt etwa ${result.totalKg} kg pro Jahr.`;
  document.getElementById("summary-box").style.opacity = 1;

  setTimeout(() => {
    document.getElementById("equivalent-box").textContent = result.equivalent;
    document.getElementById("equivalent-box").style.opacity = 1;
    showPlane();
  }, 3000);

  setTimeout(() => {
    document.getElementById("trees-box").textContent = `🌳 Dafür bräuchtest du ${result.trees} Baum${result.trees > 1 ? "e" : ""} zum Ausgleich.`;
    document.getElementById("trees-box").style.opacity = 1;

    document.getElementById("button-group").style.display = "flex";
    showTrees(result);
  }, 8500);
}

// 🌳 Baum-Animation
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
      easing: "easeOutElastic",
    });

    container.appendChild(tree);
  }

  marker.appendChild(container);
}

// ✈️ Flugzeug-Animation
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
    easing: "easeInOutSine",
  });

  marker.appendChild(plane);
}
