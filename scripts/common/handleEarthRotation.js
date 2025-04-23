//handleEarthRotation.js

import { earth, hintText, arrow, sceneSelection } from './globals.js';

export function handleEarthRotation() {
  let isDragging = false;
  let lastX = 0;
  let rotationProgress = 0;
  let scaleProgress = 1;
  let sceneTransitioned = false;

  const hintBg = document.getElementById("hint-bg");

  const onTouchStart = (event) => {
    console.log("🌀 Touchstart");
    if (!earth || event.target.closest("#input-overlay")) return;
    isDragging = true;
    lastX = event.touches[0].clientX;
    event.preventDefault();
  };

  const onTouchMove = (event) => {
    if (!isDragging || sceneTransitioned || !earth) return;

    const deltaX = event.touches[0].clientX - lastX;
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

    if (hintBg) {
      hintBg.setAttribute("material", "opacity", 0.4 * opacity);
    }

    if (opacity < 0.2) {
      if (hintText.getAttribute("visible") !== "false") hintText.setAttribute("visible", "false");
      if (arrow?.getAttribute("visible") !== "false") arrow.setAttribute("visible", "false");
      if (hintBg?.getAttribute("visible") !== "false") hintBg.setAttribute("visible", "false");
    }

    scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
    earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);


    if (rotationProgress > 600 && !sceneTransitioned) {
      console.log("🌍 Erde verschwindet, Frageflow startet");
      sceneTransitioned = true;
      earth.setAttribute("visible", "false");
      sceneSelection.setAttribute("visible", true);
      sceneSelection.setAttribute("data-visible", "true");

      setTimeout(() => {
        console.log("🎯 Event wird gefeuert: start-questions"); // 
        document.dispatchEvent(new Event("start-questions"));
      }, 500);
    }
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  document.addEventListener("touchstart", onTouchStart, { passive: false });
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("touchend", onTouchEnd);
}