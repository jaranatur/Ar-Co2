export function setupOverlayObserver() {
  const sceneSelection = document.getElementById("scene-selection");
  const overlay = document.getElementById("input-overlay");

  console.log("🕵️ setupOverlayObserver wird ausgeführt");
  console.log("➡️ sceneSelection gefunden?", !!sceneSelection);
  console.log("➡️ input-overlay gefunden?", !!overlay);

  if (sceneSelection && overlay) {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "visible"
        ) {
          const visible = sceneSelection.getAttribute("visible");
          console.log("👀 sceneSelection sichtbar?", visible);

          if (visible === "true") {
            overlay.style.display = "flex";
            console.log("📊 Overlay eingeblendet ✅");
          }
        }
      }
    });

    observer.observe(sceneSelection, { attributes: true });

    // ⛑️ Fallback – falls MutationObserver nicht feuert
    setTimeout(() => {
      const fallbackVisible = sceneSelection.getAttribute("visible");
      if (fallbackVisible === "true" && overlay.style.display !== "flex") {
        overlay.style.display = "flex";
        console.log("⚠️ Fallback: Overlay per Timeout eingeblendet");
      }
    }, 1000);
  } else {
    console.error("❌ sceneSelection oder input-overlay nicht gefunden!");
  }
}
