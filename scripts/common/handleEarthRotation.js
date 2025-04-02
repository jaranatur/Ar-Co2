import { earth, hintText, arrow, sceneSelection } from './globals.js';

export function handleEarthRotation() {
  let isDragging = false;
  let lastX = 0;
  let rotationProgress = 0;
  let scaleProgress = 1;
  let sceneTransitioned = false;

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
    const currentText = hintText.getAttribute("text") || {};
    hintText.setAttribute("text", { ...currentText, opacity });

    if (opacity === 0) {
      hintText.setAttribute("visible", "false");
      if (arrow) arrow.setAttribute("visible", "false");
      console.log("📝 Hinweistext & Pfeil ausgeblendet!");
    }

    scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
    earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

    if (rotationProgress > 100 && !sceneTransitioned) {
      sceneTransitioned = true;
      earth.setAttribute("visible", "false");
      sceneSelection.setAttribute("visible", "true");
      console.log("🌍 Erde versteckt → sceneSelection sichtbar → Overlay erscheint");
    }
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  document.addEventListener("touchstart", onTouchStart, { passive: false });
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("touchend", onTouchEnd);
}
