import { earth, hintText, infoBox, sceneSelection } from './globals.js';

export function handleEarthRotation() {
    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;
    let scaleProgress = 1;

    console.log("🔄 handleEarthRotation gestartet!");

    // Warte, bis die Erde geladen ist
    const checkEarthLoaded = setInterval(() => {
        if (!earth) {
            console.log("⏳ Warte auf 'earth'...");
            return;
        }
        clearInterval(checkEarthLoaded);
        console.log("✅ Earth ist geladen:", earth);

        // ✅ Touchsteuerung (für mobile Geräte)
        earth.addEventListener("touchstart", (event) => {
            console.log("📱 Touch Start!");
            isDragging = true;
            lastX = event.touches[0].clientX;
            event.preventDefault(); // Verhindert Scrollen auf mobilen Geräten
        });

        window.addEventListener("touchmove", (event) => {
            if (!isDragging) return;

            let deltaX = event.touches[0].clientX - lastX;
            lastX = event.touches[0].clientX;

            let currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
            earth.setAttribute("rotation", {
                x: currentRotation.x,
                y: currentRotation.y + deltaX * 0.3, // Sanftere Drehung
                z: currentRotation.z
            });

            console.log("📱 Drehe die Erde mit Touch: ", earth.getAttribute("rotation"));

            // 🌟 Fortschritt fürs Verblassen des Textes
            rotationProgress += Math.abs(deltaX);
            let opacity = Math.max(0, 1 - rotationProgress / 500); // Nach 500 Einheiten ist der Text weg
            hintText.setAttribute("text", `opacity: ${opacity}`);
            if (opacity === 0) hintText.setAttribute("visible", "false");

            // 🌍 Erde langsam rauszoomen (bis auf 0.3 statt 0.5)
            scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
            earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

            // 🔥 Wenn genug gedreht wurde, Erde verschwinden lassen & Infotext einblenden
            if (rotationProgress > 600) {
                earth.setAttribute("visible", "false");
                infoBox.setAttribute("visible", "true"); // 🔥 Infotext erscheint!
                console.log("🌍 Erde ausgeblendet, Infotext eingeblendet!");
            }
        });

        window.addEventListener("touchend", () => {
            console.log("📱 Touch End!");
            isDragging = false;
        });
    }, 100);
}
