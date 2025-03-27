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

  const bikeScene = document.getElementById("scene-bike");
  bikeScene?.addEventListener('click', () => {
    window.location.href = 'scenes/scene1.html'; // Navigiere zur Mobilitätsszene
  });

  const infoBox = document.getElementById("info-box");
  const sceneSelection = document.getElementById("scene-selection");
  const infoBg = document.getElementById("info-bg");
  const btnClose = document.getElementById("btn-close-info");

  function closeInfoBox() {
    if (infoBox.getAttribute("visible") === "true") {
      infoBox.setAttribute("visible", "false");
      sceneSelection.setAttribute("visible", "true");
      console.log("✅ Info-Box entfernt. Szene sichtbar.");
    }
  }

  btnClose?.addEventListener("click", closeInfoBox);
  infoBg?.addEventListener("click", closeInfoBox);
  infoBox?.addEventListener("click", closeInfoBox);

  // 🔄 POLLING statt Observer
  let autoClosed = false;

  // Hinzugefügter Code für globalen Click-Event-Listener
  window.addEventListener("click", function(event) {
    let targetElement = event.target;

    while (targetElement != null) {
      if (targetElement.id === "scene-bike") {
        console.log("Bike clicked, navigating to scene1.html");
        window.location.href = '../scenes/scene1.html';  // Pfad aktualisiert
        return;
      }
      targetElement = targetElement.parentElement;
    }
  });

  document.addEventListener("touchmove", (event) => {
    event.preventDefault();
  }, { passive: false });
});
