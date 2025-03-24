import { initGlobals } from './globals.js';
import { initScene } from './initScene.js';
import { handleEarthRotation } from './handleEarthRotation.js';
import { handleCubeClicks } from './handleCubeClicks.js';

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
  handleCubeClicks();

  const infoBox = document.getElementById("info-box");
  const sceneSelection = document.getElementById("scene-selection");
  const infoBg = document.getElementById("info-bg");
  const btnClose = document.getElementById("btn-close-info");
  const btnBack = document.getElementById("btn-back");
  const earth = document.getElementById("earth");

  // Klick auf das grüne Panel (info-bg) oder Button
  function closeInfoBox() {
    if (infoBox.getAttribute("visible") === "true") {
      infoBox.setAttribute("visible", "false");
      sceneSelection.setAttribute("visible", "true");
      console.log("📦 Info-Box geschlossen, Szenenauswahl eingeblendet!");
    }
  }

  infoBg.addEventListener("click", closeInfoBox);
  btnClose.addEventListener("click", closeInfoBox);

  btnBack.addEventListener("click", () => {
    console.log("🔙 Zurück zur Erde");
    infoBox.setAttribute("visible", "true");
    sceneSelection.setAttribute("visible", "false");
    earth.setAttribute("visible", "true");
  });

  // Verhindere Scrollen bei Touch
  document.addEventListener("touchmove", (event) => {
    event.preventDefault();
  }, { passive: false });
});
