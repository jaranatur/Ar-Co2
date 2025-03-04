document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const campusMap = document.getElementById("campus-map");
    
    let isDragging = false;
    let lastX = 0;
    let rotationTime = 0; // Zeitmesser für das Drehen der Erde
    let zoomStarted = false; // Damit der Zoom nur einmal startet

    // 🌍 Globale Event-Listener für Drehung
    window.addEventListener("mousedown", (event) => {
        isDragging = true;
        lastX = event.clientX;
    });

    window.addEventListener("mousemove", (event) => {
        if (!isDragging || zoomStarted) return;

        let deltaX = event.clientX - lastX;
        lastX = event.clientX;

        let currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
        earth.setAttribute("rotation", {
            x: currentRotation.x,
            y: currentRotation.y + deltaX * 0.5, // Weichere Drehung
            z: currentRotation.z
        });

        // Hinweistext ausblenden
        hintText.setAttribute("visible", "false");

        // Erhöhe die Zeit, die der Nutzer gedreht hat
        rotationTime += Math.abs(deltaX);
        
        // Wenn genug gedreht wurde, Zoom starten
        if (rotationTime > 300) { // Wert anpassen für mehr/weniger Drehzeit
            startZoom();
        }
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Touch-Unterstützung
    window.addEventListener("touchstart", (event) => {
        isDragging = true;
        lastX = event.touches[0].clientX;
    });

    window.addEventListener("touchmove", (event) => {
        if (!isDragging || zoomStarted) return;

        let deltaX = event.touches[0].clientX - lastX;
        lastX = event.touches[0].clientX;

        let currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
        earth.setAttribute("rotation", {
            x: currentRotation.x,
            y: currentRotation.y + deltaX * 0.5,
            z: currentRotation.z
        });

        // Hinweistext ausblenden
        hintText.setAttribute("visible", "false");

        rotationTime += Math.abs(deltaX);
        
        if (rotationTime > 300) {
            startZoom();
        }
    });

    window.addEventListener("touchend", () => {
        isDragging = false;
    });

    // 📌 Zoom-Animation starten & Erde durch die Karte ersetzen
    function startZoom() {
        if (zoomStarted) return;
        zoomStarted = true;
    
        console.log("🔍 Zoom beginnt!");
    
        // Sanftes Verkleinern der Erde, aber nicht zu extrem
        earth.setAttribute("animation__zoomOut", "property: scale; to: 0.05 0.05 0.05; dur: 1500; easing: easeInOutQuad");
    
        setTimeout(() => {
            earth.setAttribute("visible", "false");
            campusMap.setAttribute("visible", "true");
        }, 1500);
    }
    
});
