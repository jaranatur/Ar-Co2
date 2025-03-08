document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const campusMap = document.getElementById("campus-map");
    const infoBox = document.getElementById("info-box");
    const btnCloseInfo = document.getElementById("btn-close-info");

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

        // 🌍 Erde langsam rauszoomen
        scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
        earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

        // 🔥 Wenn genug gedreht wurde, Erde verschwinden lassen & Karte einblenden
        if (rotationProgress > 600) {
            earth.setAttribute("visible", "false");
            campusMap.setAttribute("visible", "true");
            showInfoBox();
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
            showInfoBox();
        }
    });

    window.addEventListener("touchend", () => {
        isDragging = false;
    });

    // 🌟 Smooth fade-in for info box
    function showInfoBox() {
        infoBox.setAttribute("visible", "true");
        infoBox.setAttribute("animation", "property: opacity; from: 0; to: 1; dur: 500; easing: ease-in-out");
        console.log("ℹ️ Info box shown with fade-in effect.");
    }

    // ❌ Fix: Close button now works with fade-out animation
    btnCloseInfo.addEventListener("click", () => {
        infoBox.setAttribute("animation", "property: opacity; from: 1; to: 0; dur: 300; easing: ease-out");
        setTimeout(() => {
            infoBox.setAttribute("visible", "false");
        }, 300);
        console.log("ℹ️ Info box closed.");
    });
});
