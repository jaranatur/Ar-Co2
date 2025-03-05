document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const campusMap = document.getElementById("campus-map");

    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;

    // 🌍 Globale Event-Listener für Maus- & Touchbewegung
    window.addEventListener("mousedown", (event) => {
        if (event.target.id === "earth" || event.target.closest("#earth")) {
            isDragging = true;
            lastX = event.clientX;
        }
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
        let opacity = Math.max(0, 1 - rotationProgress / 300); // Schnellere Verblassung
        hintText.setAttribute("text", `opacity: ${opacity}`);

        // 🌍 Erde sofort verschwinden lassen, wenn der Text weg ist
        if (opacity === 0 && earth.getAttribute("visible") !== "false") {
            console.log("🌍 Erde sofort verschwunden, sobald der Text weg war!");
            hintText.setAttribute("visible", "false");
            earth.setAttribute("visible", "false");
            campusMap.setAttribute("visible", "true");
        }
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // 🖐 Touch-Unterstützung für Mobilgeräte
    window.addEventListener("touchstart", (event) => {
        if (event.target.id === "earth" || event.target.closest("#earth")) {
            isDragging = true;
            lastX = event.touches[0].clientX;
        }
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
        let opacity = Math.max(0, 1 - rotationProgress / 300);
        hintText.setAttribute("text", `opacity: ${opacity}`);

        if (opacity === 0 && earth.getAttribute("visible") !== "false") {
            console.log("🌍 Erde sofort verschwunden, sobald der Text weg war!");
            hintText.setAttribute("visible", "false");
            earth.setAttribute("visible", "false");
            campusMap.setAttribute("visible", "true");
        }
    });

    window.addEventListener("touchend", () => {
        isDragging = false;
    });
});
