import { earth, hintText, infoBox, sceneSelection } from './globals.js';

export function handleEarthRotation() {
    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;
    let scaleProgress = 1;
    let lastFrame = 0;

    console.log("🔄 handleEarthRotation gestartet!");

    const checkEarthLoaded = setInterval(() => {
        if (!earth) {
            console.log("⏳ Warte auf 'earth'...");
            return;
        }
        clearInterval(checkEarthLoaded);

        console.log("✅ Earth ist geladen:", earth);

        // Maussteuerung
        earth.addEventListener("mousedown", (event) => {
            console.log("🖱️ Mouse Down!");
            isDragging = true;
            lastX = event.clientX;
        });

        window.addEventListener("mousemove", (event) => {
            if (!isDragging) return;

            let now = Date.now();
            if (now - lastFrame < 16) return; // 60 FPS Limit
            lastFrame = now;

            let deltaX = event.clientX - lastX;
            lastX = event.clientX;

            let currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
            earth.setAttribute("rotation", {
                x: currentRotation.x,
                y: currentRotation.y + deltaX * 0.5,
                z: currentRotation.z
            });

            console.log("🎮 Drehe die Erde: ", earth.getAttribute("rotation"));

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

        window.addEventListener("mouseup", () => {
            console.log("🖱️ Mouse Up!");
            isDragging = false;
        });

        // Touchsteuerung (für mobile Geräte)
        earth.addEventListener("touchstart", (event) => {
            console.log("📱 Touch Start!");
            isDragging = true;
            lastX = event.touches[0].clientX;
        });

        window.addEventListener("touchmove", (event) => {
            if (!isDragging) return;

            let deltaX = event.touches[0].clientX - lastX;
            lastX = event.touches[0].clientX;

            let currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
            earth.setAttribute("rotation", {
                x: currentRotation.x,
                y: currentRotation.y + deltaX * 0.5,
                z: currentRotation.z
            });

            console.log("📱 Drehe die Erde mit Touch: ", earth.getAttribute("rotation"));
        });

        window.addEventListener("touchend", () => {
            console.log("📱 Touch End!");
            isDragging = false;
        });
    }, 100);
}
