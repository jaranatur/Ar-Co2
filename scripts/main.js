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
  console.log("🚀 main.js wurde geladen!"); // WICHTIG: Start-Log
  console.log("✅ AR Szene geladen!");

  await new Promise((resolve) => setTimeout(resolve, 500));

  initGlobals();
  initScene();
  handleEarthRotation();
  handleCubeClicks();

  const infoBox = document.getElementById("info-box");
  const sceneSelection = document.getElementById("scene-selection");

  // 💥 Globaler Klick auf alles im Fenster
  window.addEventListener("click", (e) => {
    const target = e.target;

    console.log("🖱️ Globaler Klick erkannt!");
    console.log("🔍 e.target:", target);
    console.log("🧭 e.target.id:", target.id);
    console.log("🎯 infoBox.contains(e.target):", infoBox && infoBox.contains(target));
    console.log("👁️ Sichtbarkeit info-box:", infoBox && infoBox.getAttribute("visible"));

    if (infoBox.getAttribute("visible") === "true" && infoBox.contains(target)) {
      console.log("✅ Infofenster wird ausgeblendet, Szenenauswahl erscheint");
      infoBox.setAttribute("visible", "false");
      sceneSelection.setAttribute("visible", "true");
    }
  });

  // Verhindere Scrollen bei Touch
  document.addEventListener("touchmove", (event) => {
    event.preventDefault();
  }, { passive: false });
});
