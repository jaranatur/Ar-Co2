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

  // Sicherstellen, dass das Fahrrad-Element korrekt angesprochen wird
  const bikeScene = document.querySelector('[id="scene-bike"]');
  if (!bikeScene) {
    console.error("Das Element mit der ID 'scene-bike' wurde nicht gefunden.");
  } else {
    bikeScene.addEventListener('click', () => {
      console.log("Navigiere zur Mobilitätsszene");
      window.location.href = 'scenes/scene1.html'; // Stelle sicher, dass der Pfad korrekt ist
    });
  }

  // Setup für Info-Box Schließen
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
    console.error("Eines der notwendigen Elemente für die Info-Box ist nicht vorhanden.");
  }
});
