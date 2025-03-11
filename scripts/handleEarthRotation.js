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

            rotationProgress += Math.abs(deltaX);
            let opacity = Math.max(0, 1 - rotationProgress / 500);
            hintText.setAttribute("text", `opacity: ${opacity}`);
            if (opacity === 0) hintText.setAttribute("visible", "false");

            scaleProgress = Math.max(0.5, 1 - rotationProgress / 800);
            earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

            if (rotationProgress > 600) {
                earth.setAttribute("visible", "false");
                infoBox.setAttribute("visible", "true");

                setTimeout(() => {
                    infoBox.setAttribute("visible", "false");
                    sceneSelection.setAttribute("visible", "true");
                }, 5000);
            }
        });

        window.addEventListener("touchend", () => {
            console.log("📱 Touch End!");
            isDragging = false;
        });

        // 🔄 Falls sich die Erde nicht dreht, initialisiere sie noch einmal
        setTimeout(() => {
            if (!isDragging) {
                console.log("🔄 Automatische Rotation aktiv!");
                earth.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear");
            }
        }, 3000);
    }, 100);
}
