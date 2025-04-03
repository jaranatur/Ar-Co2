export function setupOverlayObserver() {
  console.log("🧪 setupOverlayObserver gestartet!");

  const sceneSelection = document.getElementById("scene-selection");
  const overlay = document.getElementById("input-overlay");
  const aScene = document.querySelector("a-scene");

  if (!sceneSelection || !overlay || !aScene) {
    console.error("❌ sceneSelection, overlay oder <a-scene> NICHT gefunden!");
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
          aScene.classList.add("overlay-active"); // 👉 blockiert A-Frame
          console.log("📊 Overlay eingeblendet & A-Frame deaktiviert");
        }
      }
    }
  });

  observer.observe(sceneSelection, { attributes: true });
  console.log("👀 Observer aktiviert auf sceneSelection");
}
