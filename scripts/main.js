import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { setupOverlayObserver } from './common/setupOverlayObserver.js';



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
  setupOverlayObserver();

});

window.addEventListener("load", () => {
  // 🟢 Fix canvas
  const canvas = document.querySelector("a-scene canvas");
  if (canvas) {
    console.log("✅ Canvas gefunden & fix wird angewendet.");
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "none";
  } else {
    console.warn("⚠️ Kein A-Frame Canvas gefunden!");
  }

  // 🧪 Debug overlay
  const overlay = document.getElementById("input-overlay");

  overlay.addEventListener("touchstart", (e) => {
    console.log("👆 touchstart received by overlay");
    overlay.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  });

  overlay.addEventListener("click", () => {
    console.log("🖱️ click received by overlay");
    alert("✅ Overlay clicked!");
  });

  document.addEventListener("touchstart", (e) => {
    const target = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    console.log("👆 Touch target:", target?.id || target?.tagName);
  });
});
