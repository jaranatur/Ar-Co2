import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
// ❌ no need for handleBikeActions anymore
// import { handleBikeActions } from './scenes/handleBikeActions.js';

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
  setupInfoBoxLogic(); // ✅ now calls the updated version
});

function setupInfoBoxLogic() {
  const infoBox = document.getElementById("info-box");
  const sceneSelection = document.getElementById("scene-selection");
  const btnClose = document.getElementById("btn-close-info");
  const uiButtons = document.getElementById("ui-buttons");

  if (infoBox && sceneSelection && btnClose && uiButtons) {
    const closeInfoBox = () => {
      infoBox.setAttribute("visible", "false");
      sceneSelection.setAttribute("visible", "true");

      // ✅ Show 2D HTML UI
      uiButtons.style.display = "block";

      console.log("✅ Info-Box entfernt. Szene sichtbar + UI Buttons angezeigt");
    };
    btnClose.addEventListener("click", closeInfoBox);
  } else {
    console.error("⚠️ Info-UI Elemente nicht vollständig geladen.");
  }
}
