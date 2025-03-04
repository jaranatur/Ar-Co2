document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    
    let isDragging = false;
    let lastX = 0;

    // 🌍 Event-Listener für das Drehen der Erde
    earth.addEventListener("mousedown", (event) => {
        isDragging = true;
        lastX = event.clientX;
    });

    document.addEventListener("mousemove", (event) => {
        if (!isDragging) return;

        let deltaX = event.clientX - lastX;
        lastX = event.clientX;

        let currentRotation = earth.getAttribute("rotation");
        earth.setAttribute("rotation", {
            x: currentRotation.x,
            y: currentRotation.y + deltaX * 0.5, // Skaliert für weichere Drehung
            z: currentRotation.z
        });

        // Wenn die Erde sich dreht, Hinweistext ausblenden
        hintText.setAttribute("visible", "false");
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Touch-Unterstützung für Mobilgeräte
    earth.addEventListener("touchstart", (event) => {
        isDragging = true;
        lastX = event.touches[0].clientX;
    });

    document.addEventListener("touchmove", (event) => {
        if (!isDragging) return;

        let deltaX = event.touches[0].clientX - lastX;
        lastX = event.touches[0].clientX;

        let currentRotation = earth.getAttribute("rotation");
        earth.setAttribute("rotation", {
            x: currentRotation.x,
            y: currentRotation.y + deltaX * 0.5,
            z: currentRotation.z
        });

        // Hinweistext ausblenden
        hintText.setAttribute("visible", "false");
    });

    document.addEventListener("touchend", () => {
        isDragging = false;
    });
});
