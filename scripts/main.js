// scripts/main.js
import { initGlobals } from './globals.js';
import { initScene } from './initScene.js';
import { handleEarthRotation } from './handleEarthRotation.js';
import { startQuestionFlow } from './questionFlow.js';

document.addEventListener("DOMContentLoaded", async () => {
  await new Promise(r => setTimeout(r, 500));
  initGlobals();
  initScene();
  handleEarthRotation();
});

document.addEventListener("start-questions", () => {
  console.log("📩 Fragenflow-Event empfangen");
  startQuestionFlow();
});
