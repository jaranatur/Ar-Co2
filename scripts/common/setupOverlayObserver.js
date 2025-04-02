export function setupOverlayObserver() {
  console.log("🧪 setupOverlayObserver gestartet!");

  const sceneSelection = document.getElementById("scene-selection");
  const overlay = document.getElementById("input-overlay");

  if (!sceneSelection) {
    console.error("❌ sceneSelection NICHT gefunden!");
  } else {
    console.log("✅ sceneSelection gefunden");
  }

  if (!overlay) {
    console.error("❌ input-overlay NICHT gefunden!");
  } else {
    console.log("✅ input-overlay gefunden");
  }

  if (sceneSelection && overlay) {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "visible"
        ) {
          const visible = sceneSelection.getAttribute("visible");
          console.log(`🔍 Mutation erkannt – visible = ${visible}`);

          if (visible === "true") {
            overlay.style.display = "flex";
            console.log("📊 Overlay eingeblendet");
          }
        }
      }
    });

    observer.observe(sceneSelection, { attributes: true });
    console.log("👀 Observer aktiviert auf sceneSelection");
  }
}
