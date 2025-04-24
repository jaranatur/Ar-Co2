import { earth, hintText, arrow, sceneSelection } from './globals.js';

export function handleEarthRotation() {
  let isDragging = false;
  let lastX = 0;
  let rotationProgress = 0;
  let scaleProgress = 1;
  let sceneTransitioned = false;

  const hintBg = document.getElementById("hint-bg");

  const onTouchStart = (event) => {
    if (!earth || event.target.closest("#input-overlay")) return;
    isDragging = true;
    lastX = event.touches[0].clientX;
    event.preventDefault();
  };

  const onTouchMove = (event) => {
    if (!isDragging || sceneTransitioned || !earth) return;

    const deltaX = event.touches[0].clientX - lastX;
    lastX = event.touches[0].clientX;

    const currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
    earth.setAttribute("rotation", {
      x: currentRotation.x,
      y: currentRotation.y + deltaX * 0.3,
      z: currentRotation.z
    });

    rotationProgress += Math.abs(deltaX);
    const opacity = Math.max(0, 1 - rotationProgress / 500);

    const currentText = hintText.getAttribute("text") || {};
    hintText.setAttribute("text", { ...currentText, opacity });

    if (hintBg) {
      hintBg.setAttribute("material", "opacity", 0.4 * opacity);
    }

    if (opacity < 0.2) {
      hintText.setAttribute("visible", "false");
      arrow?.setAttribute("visible", "false");
      hintBg?.setAttribute("visible", "false");
    }

    scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
    earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

    // ✅ Wenn genug gedreht → Szene wechseln
    if (rotationProgress > 600 && !sceneTransitioned) {
      console.log("🌍 Erde verschwindet – Namensfeld erscheint");
      sceneTransitioned = true;

      // 🌍 Erde entfernen
      if (earth && earth.parentNode) {
        earth.parentNode.removeChild(earth);
      }

      // Szene aktivieren
      sceneSelection.setAttribute("visible", true);

      // 🧠 Raycaster & Cursor deaktivieren → HTML wieder nutzbar
      const camera = document.querySelector("a-camera");
      if (camera) {
        camera.removeAttribute("raycaster");
        camera.removeAttribute("cursor");
      }

      // 🧑‍🎓 Nameingabe anzeigen
      const namePrompt = document.getElementById("name-prompt");
      if (namePrompt) {
        namePrompt.style.display = "flex";

        // 🖐️ Fokus setzen für Mobile
        const inputField = document.getElementById("user-name");
        setTimeout(() => {
          inputField?.focus();
        }, 200);
      }
    }
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  document.addEventListener("touchstart", onTouchStart, { passive: false });
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("touchend", onTouchEnd);
}
