document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const infoBox = document.getElementById("info-box");
    const btnCloseInfo = document.getElementById("btn-close-info");
    const sceneSelection = document.getElementById("scene-selection");

    const mobilitySphere = document.getElementById("mobility-sphere");
    const foodSphere = document.getElementById("food-sphere");
    const electronicsSphere = document.getElementById("electronics-sphere");

    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;

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

        rotationProgress += Math.abs(deltaX);
        if (rotationProgress > 600) {
            earth.setAttribute("visible", "false");
            infoBox.setAttribute("visible", "true");
        }
    });

    window.addEventListener("mouseup", () => { isDragging = false; });

    // ❌ Infotext schließen & Kugeln einblenden
    btnCloseInfo.addEventListener("click", () => {
        infoBox.setAttribute("visible", "false");
        sceneSelection.setAttribute("visible", "true");

        // 🔥 Verstanden-Button endgültig verschwinden lassen
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
