import { earth, hintText, infoBox, sceneSelection } from './globals.js';

export function handleEarthRotation() {
    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;
    let scaleProgress = 1;

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
        let opacity = Math.max(0, 1 - rotationProgress / 500);
        hintText.setAttribute("text", `opacity: ${opacity}`);
        if (opacity === 0) hintText.setAttribute("visible", "false");

        scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
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

    window.addEventListener("mouseup", () => isDragging = false);
}
