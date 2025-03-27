import { bike} from './globals.js';

export function handleBikeAction() {
  let isDragging = false;
  let lastX = 0;
  let rotationProgress = 0;
  let scaleProgress = 1;

  let sceneTransitioned = false; // ✅ Prevent multiple executions

  console.log("✅ handleBikeAction läuft!");

  document.addEventListener("touchstart", (event) => {
    if (!bike) {
      console.error("⚠️ 'bike' ist NULL! Wurde initGlobals() aufgerufen?");
      return;
    }

    console.log("📱 Touch Start erkannt!");
    isDragging = true;
    lastX = event.touches[0].clientX;
    event.preventDefault();
  }, { passive: false });

}
