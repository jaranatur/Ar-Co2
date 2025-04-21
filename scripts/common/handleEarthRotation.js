import { earth, hintText, arrow, sceneSelection } from './globals.js';
import { startQuestionFlow } from './questionFlow.js';

export function handleEarthRotation() {
  let isDragging = false;
  let lastX = 0;
  let rotationProgress = 0;
  let scaleProgress = 1;
  let sceneTransitioned = false;

  const hintBg = document.getElementById("hint-bg");

  const onTouchStart = (event) => {
    if (!earth) {
      console.warn("⚠️ earth nicht gefunden");
      return;
    }

    if (event.target.closest("#input-overlay")) {
      console.log("🛑 Touch auf Overlay – ignoriert");
      return;
    }

    isDragging = true;
    lastX = event.touches[0].clientX;
    event.preventDefault();

    console.log("👆 Touchstart erkannt");
  };

  const onTouchMove = (event) => {
    if (!isDragging || sceneTransitioned || !earth) return;

    const deltaX = event.touches[0].clientX - lastX;
    lastX = event.touches[0].clientX;

    let currentRotation = earth.getAttribute("rotation");
    if (!currentRotation || isNaN(currentRotation.y)) {
      console.warn("⚠️ Ungültige Rotation – setze Fallback");
      currentRotation = { x: 0, y: 0, z: 0 };
    }

    const newY = currentRotation.y + deltaX * 0.3;
    earth.setAttribute("rotation", {
      x: currentRotation.x,
      y: newY,
      z: currentRotation.z
    });

    console.log("🌍 Rotation gesetzt:", newY);

    rotationProgress += Math.abs(deltaX);
    const opacity = Math.max(0, 1 - rotationProgress / 500);

    const currentText = hintText?.getAttribute("text") || {};
    hintText?.setAttribute("text", { ...currentText, opacity });

    if (hintBg) {
      hintBg.setAttribute("material", "opacity", 0.4 * opacity);
    }

    if (opacity < 0.2) {
      hintText?.setAttribute("visible", "false");
      arrow?.setAttribute("visible", "false");
      hintBg?.setAttribute("visible", "false");
    }

    scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
    earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);
    console.log("🔍 Skalierung:", scaleProgress);

    if (rotationProgress > 600 && !sceneTransitioned) {
      console.log("🚀 Starte Fragenflow...");
      sceneTransitioned = true;
      earth.setAttribute("visible", "false");
      sceneSelection?.setAttribute("visible", true);
      sceneSelection?.setAttribute("data-visible", "true");
      startQuestionFlow();
    }
  };

  const onTouchEnd = () => {
    isDragging = false;
    console.log("🛑 Touchend");
  };

  document.addEventListener("touchstart", onTouchStart, { passive: false });
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("touchend", onTouchEnd);
}
