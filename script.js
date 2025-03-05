document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const campusMap = document.getElementById("campus-map"); // 2D-Karte

    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0; // Speichert, wie viel gedreht wurde
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
        let opacity = Math.max(0, 1 - rotationProgress / 300); // Verblassen ist schneller (300 statt 500)
        hintText.setAttribute("text", `opacity: ${opacity}`);
    
        if (opacity === 0) { 
            hintText.setAttribute("visible", "false"); 
            earth.setAttribute("visible", "false"); // 🌍 Erde verschwindet direkt!
            campusMap.setAttribute("visible", "true");
            console.log("🌍 Erde sofort verschwunden, sobald der Text weg war!");
        }
    });
    
        // 🌍 Erde langsam rauszoomen
        // 🌍 Erde langsam rauszoomen (bis auf 0.3 statt 0.5)
scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

        // 🔥 Wenn genug gedreht wurde, Erde verschwinden lassen & Karte einblenden
        if (rotationProgress > 600) {
            earth.setAttribute("visible", "false");
            campusMap.setAttribute("visible", "true");
            console.log("🌍 Erde ausgeblendet, 2D-Karte eingeblendet!");
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

        // 🌟 Fortschritt fürs Verblassen des Textes (auch für Touch)
        rotationProgress += Math.abs(deltaX);
        let opacity = Math.max(0, 1 - rotationProgress / 500);
        hintText.setAttribute("text", `opacity: ${opacity}`);
        if (opacity === 0) hintText.setAttribute("visible", "false");

        // 🌍 Erde langsam rauszoomen
        scaleProgress = Math.max(0.5, 1 - rotationProgress / 1000);
        earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

        // 🔥 Wenn genug gedreht wurde, Erde verschwinden lassen & Karte einblenden
        if (rotationProgress > 1000) {
            earth.setAttribute("visible", "false");
            campusMap.setAttribute("visible", "true");
            console.log("🌍 Erde ausgeblendet, 2D-Karte eingeblendet!");
        }
    });

    window.addEventListener("touchend", () => {
        isDragging = false;
    });
});
