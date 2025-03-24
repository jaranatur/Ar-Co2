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

  // 🔍 MutationObserver mit Logging
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const visible = infoBox.getAttribute("visible");
      console.log("👀 infoBox sichtbar:", visible);
      if (visible === "true") {
        console.log("🕒 Info sichtbar – starte Timeout zum Schließen");
        setTimeout(() => {
          const stillVisible = infoBox.getAttribute("visible");
          if (stillVisible === "true") {
            infoBox.setAttribute("visible", "false");
            sceneSelection.setAttribute("visible", "true");
            console.log("✅ Info automatisch geschlossen → Szene sichtbar");
          } else {
            console.log("⛔ Info war schon nicht mehr sichtbar");
          }
        }, 2000);
      }
    });
  });

  if (infoBox) {
    console.log("🧩 Observer aktiv – warte auf Sichtbarkeitswechsel");
    observer.observe(infoBox, { attributes: true, attributeFilter: ['visible'] });
  } else {
    console.warn("❌ infoBox nicht gefunden");
  }

  document.addEventListener("touchmove", (event) => {
    event.preventDefault();
  }, { passive: false });
});
