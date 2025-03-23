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
  console.log("✅ AR Szene geladen!");

  await new Promise((resolve) => setTimeout(resolve, 500));

  initGlobals();
  initScene();
  handleEarthRotation();
  handleCubeClicks();

  // 🌟 Klick auf das ganze Info-Fenster, nicht nur den Button
  window.addEventListener("click", (e) => {
    const infoBox = document.getElementById("info-box");
    const sceneSelection = document.getElementById("scene-selection");

    if (!infoBox || !sceneSelection) return;

    // Nur reagieren, wenn Infofenster sichtbar ist
    if (infoBox.getAttribute("visible") === "true" && infoBox.contains(e.target)) {
      console.log("✅ Info-Fenster wurde angeklickt – wird jetzt geschlossen.");
      infoBox.setAttribute("visible", "false");
      sceneSelection.setAttribute("visible", "true");
    }
  });

  // Optional: Touchverhalten unterdrücken
  document.addEventListener("touchmove", (event) => {
    event.preventDefault();
  }, { passive: false });
});
