document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    // const campusMap = document.getElementById("campus-map"); // ❌ 2D-Karte auskommentiert
    const infoBox = document.getElementById("info-box");
    const btnCloseInfo = document.getElementById("btn-close-info");
    const sceneSelection = document.getElementById("scene-selection");

    const mobilitySphere = document.getElementById("mobility-sphere");
    const foodSphere = document.getElementById("food-sphere");
    const electronicsSphere = document.getElementById("electronics-sphere");

    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;
    let scaleProgress = 1; // Startgröße für die Erde

    // 🌍 Globale Event-Listener für Maus- & Touchbewegung
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
            // campusMap.setAttribute("visible", "true"); // ❌ 2D-Karte bleibt aus
            infoBox.setAttribute("visible", "true");
            console.log("🌍 Erde ausgeblendet, Infotext eingeblendet!");
        }
    });

    window.addEventListener("mouseup", () => { isDragging = false; });

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

        // 🌟 Fortschritt fürs Verblassen des Textes
        rotationProgress += Math.abs(deltaX);
        let opacity = Math.max(0, 1 - rotationProgress / 500);
        hintText.setAttribute("text", `opacity: ${opacity}`);
        if (opacity === 0) hintText.setAttribute("visible", "false");

        // 🌍 Erde langsam rauszoomen
        scaleProgress = Math.max(0.5, 1 - rotationProgress / 1000);
        earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

        // 🔥 Wenn genug gedreht wurde, Erde verschwinden lassen & Info-Box anzeigen
        if (rotationProgress > 1000) {
            earth.setAttribute("visible", "false");
            // campusMap.setAttribute("visible", "true"); // ❌ 2D-Karte bleibt aus
            infoBox.setAttribute("visible", "true");
            console.log("🌍 Erde ausgeblendet, Infotext eingeblendet!");
        }
    });

    window.addEventListener("touchend", () => { isDragging = false; });

    // ❌ Infotext schließen & Kugeln einblenden
    btnCloseInfo.addEventListener("click", () => {
        infoBox.setAttribute("visible", "false");
        sceneSelection.setAttribute("visible", "true");

        // 🔥 Verstanden-Button endgültig ausblenden
        btnCloseInfo.parentNode.setAttribute("visible", "false");

        console.log("ℹ️ Info-Box geschlossen, Kugeln erscheinen.");
    });

    // 🌍 Sicherstellen, dass Klicks auf 3D-Modelle zuverlässig funktionieren
    window.addEventListener("click", (event) => {
        let targetId = event.target.id;
        console.log("👆 Klick auf:", targetId);

        if (targetId === "mobility-sphere") {
            console.log("🚲 Mobilitätsszene gestartet!");
            sceneSelection.setAttribute("visible", "false");
        } else if (targetId === "food-sphere") {
            console.log("🍽 Ernährungsszene gestartet!");
            sceneSelection.setAttribute("visible", "false");
        } else if (targetId === "electronics-sphere") {
            console.log("📱 Elektronikszene gestartet!");
            sceneSelection.setAttribute("visible", "false");
        }
    });
});
