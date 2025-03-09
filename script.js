document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const campusMap = document.getElementById("campus-map");
    const infoBox = document.getElementById("info-box");
    const sceneSelection = document.getElementById("scene-selection");

    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;
    let scaleProgress = 1;

    // 🌍 Event-Listener für Maus- & Touchbewegung (Erde drehen)
    window.addEventListener("mousedown", (event) => {
        isDragging = true;
        lastX = event.clientX;
    });

    window.addEventListener("mousemove", (event) => {
        if (!isDragging) return;

        let deltaX = event.clientX - lastX;
        lastX = event.clientX;

        let currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
        earth.setAttribute("rotation", {
            x: currentRotation.x,
            y: currentRotation.y + deltaX * 0.5,
            z: currentRotation.z
        });

        // 🌟 Fortschritt fürs Verblassen des Textes
        rotationProgress += Math.abs(deltaX);
        let opacity = Math.max(0, 1 - rotationProgress / 500);
        hintText.setAttribute("text", `opacity: ${opacity}`);
        if (opacity === 0) hintText.setAttribute("visible", "false");

        // 🌍 Erde langsam rauszoomen (bis auf 0.3)
        scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
        earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

        // 🔥 Wenn genug gedreht wurde, Erde verschwinden lassen & Info-Box anzeigen
        if (rotationProgress > 600) {
            earth.setAttribute("visible", "false");
            infoBox.setAttribute("visible", "true");
            console.log("🌍 Erde verschwunden, Infotext eingeblendet!");

            // ⏳ Info-Box wird nach 5 Sekunden automatisch geschlossen
            setTimeout(() => {
                console.log("ℹ️ Info-Box wird automatisch ausgeblendet.");
                infoBox.setAttribute("visible", "false");
                sceneSelection.setAttribute("visible", "true");
            }, 5000);
        }
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // 🖐 Touch-Unterstützung für Mobilgeräte
    window.addEventListener("touchstart", (event) => {
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

        rotationProgress += Math.abs(deltaX);
        let opacity = Math.max(0, 1 - rotationProgress / 500);
        hintText.setAttribute("text", `opacity: ${opacity}`);
        if (opacity === 0) hintText.setAttribute("visible", "false");

        scaleProgress = Math.max(0.5, 1 - rotationProgress / 1000);
        earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

        if (rotationProgress > 1000) {
            earth.setAttribute("visible", "false");
            infoBox.setAttribute("visible", "true");
            console.log("🌍 Erde ausgeblendet, Infotext eingeblendet!");

            // ⏳ Info-Box wird nach 5 Sekunden automatisch geschlossen
            setTimeout(() => {
                console.log("ℹ️ Info-Box wird automatisch ausgeblendet.");
                infoBox.setAttribute("visible", "false");
                sceneSelection.setAttribute("visible", "true");
            }, 5000);
        }
    });

    window.addEventListener("touchend", () => {
        isDragging = false;
    });

    // ❌ Infotext schließen durch Klick auf den Bildschirm
    window.addEventListener("click", () => {
        console.log("👆 Klick erkannt, Info-Box wird sofort ausgeblendet.");
        infoBox.setAttribute("visible", "false");
        sceneSelection.setAttribute("visible", "true");
    });
});
