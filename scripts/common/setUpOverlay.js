export function setupOverlayObserver() {
    const sceneSelection = document.getElementById("scene-selection");
    const overlay = document.getElementById("input-overlay");
  
    if (sceneSelection && overlay) {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "visible" &&
            sceneSelection.getAttribute("visible") === "true"
          ) {
            overlay.style.display = "flex";
            console.log("📊 Eingabe-Overlay eingeblendet");
          }
        }
      });
  
      observer.observe(sceneSelection, { attributes: true });
    } else {
      console.error("❌ sceneSelection oder input-overlay nicht gefunden!");
    }
  }
  