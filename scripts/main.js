import { initGlobals } from './globals.js';
import { initScene } from './initScene.js';
import { handleEarthRotation } from './handleEarthRotation.js';
import { handleCubeClicks } from './handleCubeClicks.js';

// 🚀 Device-Motion-Zugriff automatisch anfordern
function requestMotionPermission() {
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
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

// Warte auf erste Interaktion (Touch oder Klick), um Berechtigung anzufordern
document.addEventListener("click", requestMotionPermission, { once: true });
document.addEventListener("touchstart", requestMotionPermission, { once: true });

document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ AR Szene geladen!");

    await new Promise((resolve) => setTimeout(resolve, 500)); // Sicherheitspuffer

    initGlobals();  // **Stelle sicher, dass die Variablen zuerst geladen werden**
    initScene();
    handleEarthRotation();
    handleCubeClicks();
});
