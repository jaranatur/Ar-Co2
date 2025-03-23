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

    initGlobals();  
    initScene();
    handleEarthRotation();
    handleCubeClicks();

    // Info-Box schließen und Modelle EINMALIG bei Klick anzeigen
    const btnCloseInfo = document.getElementById("btn-close-info");
    btnCloseInfo.addEventListener("click", () => {
        document.getElementById("info-box").setAttribute("visible", "false");
        document.getElementById("scene-selection").setAttribute("visible", "true");
        console.log("ℹ️ Info-Fenster geschlossen, Szenenobjekte eingeblendet");
    }, { once: true });

    document.addEventListener("touchmove", (event) => {
        event.preventDefault();
    }, { passive: false });
});
