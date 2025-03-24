import { earth, hintText, infoBox, sceneSelection } from './globals.js';

export function handleEarthRotation() {
  let isDragging = false;
  let lastX = 0;
  let rotationProgress = 0;
  let scaleProgress = 1;

  console.log("✅ handleEarthRotation läuft!");

  document.addEventListener("touchstart", (event) => {
    if (!earth) {
      console.error("⚠️ 'earth' ist NULL! Wurde initGlobals() aufgerufen?");
      return;
    }

    console.log("📱 Touch Start erkannt!");
    isDragging = true;
    lastX = event.touches[0].clientX;
    event.preventDefault();
  }, { passive: false });

  document.addEventListener("touchmove", (event) => {
    if (!isDragging) return;

    console.log("📱 Touch Move erkannt!");

    let deltaX = event.touches[0].clientX - lastX;
    lastX = event.touches[0].clientX;

    let currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
    earth.setAttribute("rotation", {
      x: currentRotation.x,
      y: currentRotation.y + deltaX * 0.3,
      z: currentRotation.z
    });

    console.log("🔄 rotationProgress:", rotationProgress);

    rotationProgress += Math.abs(deltaX);
    let opacity = Math.max(0, 1 - rotationProgress / 500);
    hintText.setAttribute("text", `opacity: ${opacity}`);
    if (opacity === 0) {
      hintText.setAttribute("visible", "false");
      console.log("📝 Hinweistext ausgeblendet!");
    }

    scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
    earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);
    console.log("📏 Erde skaliert:", earth.getAttribute("scale"));

    if (rotationProgress > 600) {
      earth.setAttribute("visible", "false");
      infoBox.setAttribute("visible", "true");
      console.log("🌍 Erde ausgeblendet, Infotext eingeblendet!");

      // ⏱️ Automatisch nach 2 Sekunden schließen
      setTimeout(() => {
        infoBox.setAttribute("visible", "false");
        sceneSelection?.setAttribute("visible", "true");
        console.log("✅ Info-Fenster automatisch geschlossen → Szene sichtbar");
      }, 2000);
    }
  }, { passive: false });

  document.addEventListener("touchend", () => {
    console.log("📱 Touch End!");
    isDragging = false;
  });

  document.addEventListener("DOMContentLoaded", () => {
    const btnCloseInfo = document.getElementById("btn-close-info");

    if (btnCloseInfo) {
      btnCloseInfo.addEventListener("click", () => {
        console.log("ℹ️ Info-Fenster wird manuell geschlossen!");
        infoBox.setAttribute("visible", "false");
        sceneSelection?.setAttribute("visible", "true");
      });
    } else {
      console.error("❌ btnCloseInfo nicht gefunden!");
    }
  });
}
