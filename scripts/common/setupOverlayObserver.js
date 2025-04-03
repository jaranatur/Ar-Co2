export function setupOverlayObserver() {
  console.log("🧪 setupOverlayObserver gestartet!");

  const sceneSelection = document.getElementById("scene-selection");
  const overlay = document.getElementById("input-overlay");

  if (!sceneSelection || !overlay) {
    console.error("❌ sceneSelection oder input-overlay NICHT gefunden!");
    return;
  }

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-visible"
      ) {
        const visible = sceneSelection.getAttribute("data-visible");
        console.log(`🔍 Mutation erkannt – data-visible = ${visible}`);

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
