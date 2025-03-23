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

  const scene = document.querySelector("a-scene");
  const infoBox = document.getElementById("info-box");
  const sceneSelection = document.getElementById("scene-selection");

  // 💥 Click-Listener auf Szene
  scene.addEventListener("click", (e) => {
    const target = e.target;

    console.log("🎯 Geklickt auf:", target.id || target.tagName);
    console.log("🖱️ Globaler Klick erkannt!");
    console.log("🔍 e.target:", e.target);
    console.log("🧭 e.target.id:", e.target.id);
    console.log("🎯 infoBox.contains(e.target):", infoBox && infoBox.contains(e.target));
    console.log("👁️ Sichtbarkeit info-box:", infoBox && infoBox.getAttribute("visible"));

    if (infoBox.getAttribute("visible") === "true" && target.id === "info-bg") {
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
