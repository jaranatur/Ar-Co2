import { initGlobals } from './globals.js';
import { initScene } from './initScene.js';
import { handleEarthRotation } from './handleEarthRotation.js';
import { handleCubeClicks } from './handleCubeClicks.js';

document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ AR Szene geladen!");

    await new Promise((resolve) => setTimeout(resolve, 500)); // Sicherheitspuffer

    initGlobals();  // **Stelle sicher, dass die Variablen zuerst geladen werden**
    initScene();
    handleEarthRotation();
    handleCubeClicks();
});
