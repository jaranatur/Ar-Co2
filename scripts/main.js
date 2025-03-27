// scripts/main.js
import { initGlobals } from './globals.js';
import { initScene } from './initScene.js';
import { handleEarthRotation } from './handleEarthRotation.js';

function requestMotionPermission() {
  if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
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

  const bikeScene = document.querySelector('#scene-bike');

  if (!bikeScene) {
    console.error("❌ 'scene-bike' nicht gefunden!");
  } else {
    const goToMobilityScene = () => {
      console.log("🚴 Navigiere zur Mobilitätsszene");
      window.location.href = 'scenes/scene1.html';
    };

    // Touch for mobile
    bikeScene.addEventListener('touchstart', (e) => {
      console.log("📱 Touch erkannt auf Bike!");
      goToMobilityScene();
    }, { passive: true });

    // Click for fallback
    bikeScene.addEventListener('click', (e) => {
      console.log("🖱️ Click erkannt auf Bike!");
      goToMobilityScene();
    });
  }

  const infoBox = document.getElementById("info-box");
  const sceneSelection = document.getElementById("scene-selection");
  const btnClose = document.getElementById("btn-close-info");

  if (infoBox && sceneSelection && btnClose) {
    const closeInfoBox = () => {
      infoBox.setAttribute("visible", "false");
      sceneSelection.setAttribute("visible", "true");
      console.log("✅ Info-Box entfernt. Szene sichtbar.");
    };

    btnClose.addEventListener("click", closeInfoBox);
  } else {
    console.error("⚠️ Info-UI Elemente nicht vollständig geladen.");
  }
});
