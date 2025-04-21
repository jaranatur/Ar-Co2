import { initGlobals } from './common/globals.js';
import { initScene } from './common/initScene.js';
import { handleEarthRotation } from './common/handleEarthRotation.js';
import { setupOverlayObserver } from './common/setupOverlayObserver.js';
import { startQuestionFlow } from './common/questionFlow.js';

document.addEventListener("DOMContentLoaded", async () => {
  await new Promise(r => setTimeout(r, 500));
  initGlobals();
  initScene();
  handleEarthRotation();
  setupOverlayObserver();
});

document.addEventListener("start-questions", () => {
  console.log("📩 Fragenflow-Event empfangen");
  startQuestionFlow();
});
