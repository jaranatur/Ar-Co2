import { earth, hintText, infoBox, sceneSelection } from './globals.js';

export function handleEarthRotation() {
    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;
    let scaleProgress = 1;

    console.log("✅ handleEarthRotation läuft!");

    // Warte, bis die Erde geladen ist
    const checkEarthLoaded = setInterval(() => {
        if (!earth) {
            console.log("⏳ Warte auf 'earth'...");
            return;
        }
        clearInterval(checkEarthLoaded);
        console.log("🌍 Earth gefunden:", earth);

        // ✅ Sicherstellen, dass Touch-Events nicht blockiert werden
        earth.setAttribute("pointer-events", "auto");

        // ✅ Touchsteuerung (für mobile Geräte)
        earth.addEventListener("touchstart", (event) => {
            console.log("📱 Touch Start erkannt!");
            isDragging = true;
            lastX = event.touches[0].clientX;
            event.preventDefault(); // Verhindert Scrollen auf mobilen Geräten
        });

        window.addEventListener("touchmove", (event) => {
            if (!isDragging) return;

            console.log("📱 Touchmove erkannt!");

            let deltaX = event.touches[0].clientX - lastX;
            lastX = event.touches[0].clientX;

            let currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
            earth.setAttribute("rotation", {
                x: currentRotation.x,
                y: currentRotation.y + deltaX * 0.3, // Sanftere Drehung
                z: currentRotation.z
            });

            rotationProgress += Math.abs(deltaX);
            console.log("🔄 rotationProgress:", rotationProgress);

            // 🌟 Fortschritt fürs Verblassen des Textes
            let opacity = Math.max(0, 1 - rotationProgress / 500);
            hintText.setAttribute("text", `opacity: ${opacity}`);
            if (opacity === 0) {
                hintText.setAttribute("visible", "false");
                console.log("📝 Hinweistext ausgeblendet!");
            }

            // 🌍 Erde langsam rauszoomen (bis auf 0.3 statt 0.5)
            scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
            earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);
            console.log("📏 Erde skaliert:", earth.getAttribute("scale"));

            // 🔥 Wenn genug gedreht wurde, Erde verschwinden lassen & Infotext einblenden
            if (rotationProgress > 600) {
                earth.setAttribute("visible", "false");
                infoBox.setAttribute("visible", "true");
                console.log("🌍 Erde ausgeblendet, Infotext eingeblendet!");
            }
        });

        window.addEventListener("touchend", () => {
            console.log("📱 Touch End!");
            isDragging = false;
        });
    }, 100);
}
