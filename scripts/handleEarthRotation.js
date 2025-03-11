import { earth, hintText, infoBox, sceneSelection } from './globals.js';

export function handleEarthRotation() {
    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;
    let scaleProgress = 1;

    console.log("✅ handleEarthRotation läuft!");

    const checkEarthLoaded = setInterval(() => {
        if (!earth) {
            console.log("⏳ Warte auf 'earth'...");
            return;
        }
        clearInterval(checkEarthLoaded);
        console.log("🌍 Earth gefunden:", earth);

        // 🔥 Touch-Events auf `window` registrieren und prüfen, ob `earth` getroffen wurde
        window.addEventListener("touchstart", (event) => {
            let target = event.target.closest("#earth");
            if (!target) return; // Falls nicht auf die Erde getippt wurde → ignorieren
            
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
                y: currentRotation.y + deltaX * 0.3,
                z: currentRotation.z
            });

            rotationProgress += Math.abs(deltaX);
            console.log("🔄 rotationProgress:", rotationProgress);

            let opacity = Math.max(0, 1 - rotationProgress / 500);
            hintText.setAttribute("text", `opacity: ${opacity}`);
            if (opacity === 0) {
                hintText.setAttribute("visible", "false");
                console.log("📝 Hinweistext ausgeblendet!");
            }

            scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
            earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);
            console.log("📏 Erde skaliert:", earth.getAttribute("scale"));

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
