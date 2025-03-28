// scripts/common/handleEarthRotation.js
import { earth, hintText, infoBox } from './globals.js';

export function handleEarthRotation() {
  let isDragging = false;
  let lastX = 0;
  let rotationProgress = 0;
  let scaleProgress = 1;
  let sceneTransitioned = false;

  const verstandenPlane = document.getElementById("verstandenPlane");

  console.log("✅ handleEarthRotation läuft!");

  const onTouchStart = (event) => {
    if (!earth) {
      console.error("⚠️ 'earth' ist NULL! Wurde initGlobals() aufgerufen?");
      return;
    }

    isDragging = true;
    lastX = event.touches[0].clientX;
    event.preventDefault();
  };

  const onTouchMove = (event) => {
    if (!isDragging || sceneTransitioned || !earth) return;

    let deltaX = event.touches[0].clientX - lastX;
    lastX = event.touches[0].clientX;

    const currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
    earth.setAttribute("rotation", {
      x: currentRotation.x,
      y: currentRotation.y + deltaX * 0.3,
      z: currentRotation.z
    });

    rotationProgress += Math.abs(deltaX);
    const opacity = Math.max(0, 1 - rotationProgress / 500);
    hintText.setAttribute("text", `opacity: ${opacity}`);
    if (opacity === 0) {
      hintText.setAttribute("visible", "false");
      console.log("📝 Hinweistext ausgeblendet!");
    }

    scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
    earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

    if (rotationProgress > 600 && !sceneTransitioned) {
      sceneTransitioned = true;
      earth.setAttribute("visible", "false");
      infoBox.setAttribute("visible", "true");
      console.log("🌍 Erde ausgeblendet, InfoBox sichtbar");

      document.addEventListener("click", closeInfoBoxOnTap, { once: true });
      document.addEventListener("touchstart", closeInfoBoxOnTap, { once: true });
    }
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  const closeInfoBoxOnTap = () => {
    const infoBoxEl = document.getElementById("info-box");
    const sceneSelectionEl = document.getElementById("scene-selection");
    if (!infoBoxEl || !sceneSelectionEl) return;

    infoBoxEl.setAttribute("visible", "false");
    sceneSelectionEl.setAttribute("visible", "true");
    console.log("✅ Info durch Tap geschlossen → Szene sichtbar");
  };

  document.addEventListener("touchstart", onTouchStart, { passive: false });
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("touchend", onTouchEnd);

  // Bonus: manuelles "Verstanden" schließen
  if (verstandenPlane) {
    verstandenPlane.addEventListener("click", () => {
      console.log("🟢 Manuell Info-Box schließen");
      const infoBoxEl = document.getElementById("info-box");
      const sceneSelectionEl = document.getElementById("scene-selection");
      if (infoBoxEl && sceneSelectionEl) {
        infoBoxEl.setAttribute("visible", "false");
        sceneSelectionEl.setAttribute("visible", "true");
      }
    });
  } else {
    console.warn("⚠️ 'verstandenPlane' nicht gefunden.");
  }
}
