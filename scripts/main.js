import { initGlobals } from './globals.js';
import { initScene } from './initScene.js';
import { handleEarthRotation } from './handleEarthRotation.js';
import { handleCubeClicks } from './handleCubeClicks.js';

document.addEventListener("DOMContentLoaded", () => {
    initGlobals(); // Stelle sicher, dass alle Variablen geladen sind
    console.log("✅ AR Szene geladen!");
    initScene();
    handleEarthRotation();
    handleCubeClicks();
});
