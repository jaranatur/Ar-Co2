import { earth, hintText, infoBox } from './common/globals.js';

export function handleEarthRotation() {
  let isDragging = false;
  let lastX = 0;
  let rotationProgress = 0;
  let scaleProgress = 1;

  let sceneTransitioned = false; // ✅ Prevent multiple executions
  const verstandenPlane = document.getElementById("verstandenPlane");

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
    if (!isDragging || sceneTransitioned) return;

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

    if (rotationProgress > 600 && !sceneTransitioned) {
      sceneTransitioned = true; // ✅ prevent retrigger
      earth.setAttribute("visible", "false");
      infoBox.setAttribute("visible", "true");
      console.log("🌍 Erde ausgeblendet, Infotext eingeblendet!");

      const closeOnTap = () => {
        const infoBoxEl = document.getElementById("info-box");
        const sceneSelectionEl = document.getElementById("scene-selection");
        if (!infoBoxEl || !sceneSelectionEl) return;

        infoBoxEl.setAttribute("visible", "false");
        sceneSelectionEl.setAttribute("visible", "true");
        console.log("✅ Info durch Tap geschlossen → Szene sichtbar");

        document.removeEventListener("click", closeOnTap);
        document.removeEventListener("touchstart", closeOnTap);
      };

      document.addEventListener("click", closeOnTap, { once: true });
      document.addEventListener("touchstart", closeOnTap, { once: true });
    }
  }, { passive: false });

  document.addEventListener("touchend", () => {
    console.log("📱 Touch End!");
    isDragging = false;
  });

  document.addEventListener("DOMContentLoaded", () => {
    const btnCloseInfo = document.getElementById("btn-close-info");

    if (btnCloseInfo) {
      verstandenPlane.addEventListener("click", () => {
        console.log("ℹ️ Info-Fenster wird manuell geschlossen!");
        const infoBoxEl = document.getElementById("info-box");
        const sceneSelectionEl = document.getElementById("scene-selection");
        infoBoxEl?.setAttribute("visible", "false");
        sceneSelectionEl?.setAttribute("visible", "true");
      });
    } else {
      console.error("❌ btnCloseInfo nicht gefunden!");
    }
  });
}
