// scripts/main.js
import { initGlobals } from './globals.js';
import { initScene } from './initScene.js';
import { handleEarthRotation } from './handleEarthRotation.js';
import { bike } from './globals.js';

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

  const bikeScene = document.getElementById('scene-bike');
  
  if (bikeScene) {
    console.log("✅ 'scene-bike' gefunden!");
  
    const goToMobilityScene = () => {
      console.log("🚴 Navigiere zur Mobilitätsszene");
      window.location.href = 'scenes/scene1.html';
    };
  
    // Beispiel: Direkt ausführen (nur zu Testzwecken)
    // goToMobilityScene();
  
    document.addEventListener("touchstart", (event) => {
      console.log("📱 Touch erkannt auf Bike!");
      goToMobilityScene();
    });
  
    bikeScene.addEventListener("click", (event) => {
      console.log("🖱️ Click erkannt auf Bike!");
      goToMobilityScene();
    });
  
  } else {
    console.log("❌ 'scene-bike' NICHT gefunden!");
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
