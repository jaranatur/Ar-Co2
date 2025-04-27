export function setupNamePrompt() {
    const scene = document.querySelector('a-scene');
    const sceneParent = scene?.parentNode;
    const namePrompt = document.getElementById('name-prompt');
    const userNameInput = document.getElementById('user-name');
    const startButton = document.getElementById('start-btn');
    const inputOverlay = document.getElementById('input-overlay');
    const overlayTitle = inputOverlay.querySelector('.input-card-header h2');
  
    let storedSceneHtml = '';
  
    document.addEventListener('earth-rotated', () => {
      if (scene && sceneParent) {
        storedSceneHtml = scene.outerHTML; // Backup machen
        sceneParent.removeChild(scene); // GANZE Szene entfernen
      }
  
      if (namePrompt) {
        namePrompt.style.display = 'flex';
      }
  
      setTimeout(() => {
        if (userNameInput) {
          userNameInput.focus();
        }
      }, 300);
    });
  
    startButton.addEventListener('click', (e) => {
      e.preventDefault();
  
      const name = userNameInput.value.trim();
      if (name === '') {
        alert('Bitte gib deinen Namen ein.');
        return;
      }
  
      window.userName = name;
  
      // Namensfeld ausblenden
      namePrompt.style.display = 'none';
  
      // Fragen-Overlay anzeigen
      inputOverlay.style.display = 'flex';
  
      if (overlayTitle) {
        overlayTitle.textContent = `${name}s Nachhaltigkeitsinfos`;
      }
  
      // Szenen-Neuaufbau, wenn du willst:
      if (sceneParent && storedSceneHtml) {
        sceneParent.insertAdjacentHTML('beforeend', storedSceneHtml);
      }
  
      const startQuestionsEvent = new Event('start-questions');
      document.dispatchEvent(startQuestionsEvent);
    });
  }
  