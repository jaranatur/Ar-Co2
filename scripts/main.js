import { initGlobals } from './globals.js';
import { initScene } from './initScene.js';
import { handleEarthRotation } from './handleEarthRotation.js';
import { handleCubeClicks } from './handleCubeClicks.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");
    
    initGlobals();  // Stellt sicher, dass `earth` existiert
    initScene();  
    handleEarthRotation();  
    handleCubeClicks();
});
