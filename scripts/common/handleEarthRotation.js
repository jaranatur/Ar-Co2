import { hintText, arrow, sceneSelection } from './globals.js';

export function handleEarthRotation() {
  waitForEarthReady();
}

function waitForEarthReady() {
  const earth = document.getElementById("earth");

  if (!earth || !earth.object3D || earth.object3D.children.length === 0) {
    console.log("⏳ Warte auf Earth...");
    setTimeout(waitForEarthReady, 100);
    return;
  }

  console.log("✅ Earth bereit:", earth);
  setupEarthRotation(earth);
}

function setupEarthRotation(earth) {
  let isDragging = false;
  let lastX = 0;
  let rotationProgress = 0;
  let scaleProgress = 1;
  let sceneTransitioned = false;

  const hintBg = document.getElementById("hint-bg");

  const onTouchStart = (event) => {
    if (!earth || event.target.closest("#input-overlay")) return;
    isDragging = true;
    lastX = event.touches[0].clientX;
    console.log("👆 Touch gestartet");
    event.preventDefault();
  };

  const onTouchMove = (event) => {
    if (!isDragging || sceneTransitioned) return;

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

    const currentText = hintText?.getAttribute("text") || {};
    hintText?.setAttribute("text", { ...currentText, opacity });
    hintBg?.setAttribute("material", "opacity", 0.4 * opacity);

    if (opacity < 0.2) {
      hintText?.setAttribute("visible", false);
      arrow?.setAttribute("visible", false);
      hintBg?.setAttribute("visible", false);
    }

    scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
    earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

    if (rotationProgress > 600 && !sceneTransitioned) {
      console.log("🌍 Rotation abgeschlossen, Szene wechselt...");
      sceneTransitioned = true;
      earth.setAttribute("visible", "false");
      sceneSelection?.setAttribute("visible", true);
      sceneSelection?.setAttribute("data-visible", "true");
      // Noch kein Fragenflow: erstmal deaktiviert
      // startQuestionFlow();
    }
  };

  const onTouchEnd = () => {
    isDragging = false;
    console.log("✋ Touch beendet");
  };

  document.addEventListener("touchstart", onTouchStart, { passive: false });
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("touchend", onTouchEnd);

  console.log("✅ EarthRotation-Events aktiviert");
}
