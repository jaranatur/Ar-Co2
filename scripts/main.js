import { initScene } from './scripts/initScene.js';
import { handleEarthRotation } from './scripts/handleEarthRotation.js';
import { handleCubeClicks } from './scripts/handleCubeClicks.js';


document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");
    initScene();
    handleEarthRotation();
    handleCubeClicks();
});
