export function setupOverlayObserver() {
  const sceneSelection = document.getElementById("scene-selection");
  const overlay = document.getElementById("input-overlay");
  const aScene = document.querySelector("a-scene");

  if (sceneSelection && overlay && aScene) {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "visible" &&
          sceneSelection.getAttribute("visible") === "true"
        ) {
          overlay.style.display = "flex";
          aScene.classList.add("overlay-active"); // 🧠 Wichtig!
          console.log("📊 Overlay eingeblendet + A-Frame deaktiviert");
        }
      }
    });

    observer.observe(sceneSelection, { attributes: true });
  } else {
    console.error("❌ sceneSelection, overlay oder <a-scene> nicht gefunden!");
  }
}
