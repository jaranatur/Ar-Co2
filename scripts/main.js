import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';

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
  setupInfoBoxLogic();
});

function setupInfoBoxLogic() {
  const sceneSelection = document.getElementById("scene-selection");
  const uiButtons = document.getElementById("ui-buttons");

  if (sceneSelection && uiButtons) {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "visible" &&
          sceneSelection.getAttribute("visible") === "true"
        ) {
          uiButtons.style.visibility = "visible";
          uiButtons.style.opacity = "1";
          console.log("✅ scene-selection sichtbar → Buttons eingeblendet");
        }
      }
    });

    observer.observe(sceneSelection, { attributes: true });
  } else {
    console.error("❌ sceneSelection oder uiButtons nicht gefunden!");
  }
}



