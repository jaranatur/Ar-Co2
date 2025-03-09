import { initScene } from './initScene.js';
import { handleEarthRotation } from './handleEarthRotation.js';
import { handleCubeClicks } from './handleCubeClicks.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");
    initScene();
    handleEarthRotation();
    handleCubeClicks();
});
