// scripts/main.js
import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { handleBikeActions } from './scenes/handleBikeActions.js'; // ⬅️ Import hinzugefügt

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
 // handleBikeActions(); // ⬅️ Szene-spezifische Logik
  setupInfoBoxLogic();
});

function setupInfoBoxLogic() {
  const infoBox = document.getElementById("info-box");
  const sceneSelesction = document.getElementById("scene-selection");
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
}
