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

    // 👉 Korrigiert: Info-Box schließen und Cubes EINMALIG bei Klick auf Button anzeigen
    const btnCloseInfo = document.getElementById("btn-close-info");
    if (btnCloseInfo) {
        btnCloseInfo.addEventListener("click", () => {
            const infoBox = document.getElementById("info-box");
            const cubes = document.getElementById("scene-selection");

            if (infoBox && cubes) {
                infoBox.setAttribute("visible", "false");
                cubes.setAttribute("visible", "true");
                console.log("ℹ️ Info-Fenster geschlossen, Cubes eingeblendet");
            }
        }, { once: true });
    }

    // Optional: Touch-Move verhindern (zur besseren UX)
    document.addEventListener("touchmove", (event) => {
        event.preventDefault();
    }, { passive: false });
});
