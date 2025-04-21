import { hintText, arrow, sceneSelection } from './globals.js';
import { startQuestionFlow } from './questionFlow.js';

export function handleEarthRotation() {
  const tryInit = () => {
    const earth = document.getElementById("earth");

    if (!earth || earth.object3D?.children.length === 0) {
      setTimeout(tryInit, 100);
      return;
    }

    initRotation(earth);
  };

  tryInit();
}

function initRotation(earth) {
  let isDragging = false;
  let lastX = 0;
  let rotationProgress = 0;
  let scaleProgress = 1;
  let sceneTransitioned = false;

  const hintBg = document.getElementById("hint-bg");

  const onTouchStart = (e) => {
    if (e.target.closest("#input-overlay")) return;
    isDragging = true;
    lastX = e.touches[0].clientX;
    e.preventDefault();
  };

  const onTouchMove = (e) => {
    if (!isDragging || sceneTransitioned) return;

    const deltaX = e.touches[0].clientX - lastX;
    lastX = e.touches[0].clientX;

    const current = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
    earth.setAttribute("rotation", {
      x: current.x,
      y: current.y + deltaX * 0.3,
      z: current.z
    });

    rotationProgress += Math.abs(deltaX);
    const opacity = Math.max(0, 1 - rotationProgress / 500);
    const currentText = hintText.getAttribute("text") || {};
    hintText.setAttribute("text", { ...currentText, opacity });
    if (hintBg) hintBg.setAttribute("material", "opacity", 0.4 * opacity);

    if (opacity < 0.2) {
      hintText?.setAttribute("visible", false);
      arrow?.setAttribute("visible", false);
      hintBg?.setAttribute("visible", false);
    }

    scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
    earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

    if (rotationProgress > 600 && !sceneTransitioned) {
      sceneTransitioned = true;
      earth.setAttribute("visible", false);
      sceneSelection?.setAttribute("visible", true);
      sceneSelection?.setAttribute("data-visible", "true");
      startQuestionFlow();
    }
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  document.addEventListener("touchstart", onTouchStart, { passive: false });
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("touchend", onTouchEnd);
}
