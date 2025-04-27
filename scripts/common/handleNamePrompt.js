// scripts/common/handleNamePrompt.js

export function setupNamePrompt() {
    const scene = document.querySelector('a-scene');
    const canvas = document.querySelector('canvas');
    const namePrompt = document.getElementById('name-prompt');
    const userNameInput = document.getElementById('user-name');
    const startButton = document.getElementById('start-btn');
    const inputOverlay = document.getElementById('input-overlay');
    const overlayTitle = inputOverlay.querySelector('.input-card-header h2');
  
    document.addEventListener('earth-rotated', () => {
      if (scene) {
        scene.style.pointerEvents = 'none';
      }
      if (canvas) {
        canvas.style.pointerEvents = 'none'; // <<< GANZ wichtig!!
      }
      if (namePrompt) {
        namePrompt.style.display = 'flex';
      }
      setTimeout(() => {
        if (userNameInput) {
          userNameInput.focus();
        }
      }, 300); // 300ms für Mobile-Safari Sicherheit
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
  
      // Fragen-Overlay einblenden
      inputOverlay.style.display = 'flex';
  
      if (overlayTitle) {
        overlayTitle.textContent = `${name}s Nachhaltigkeitsinfos`;
      }
  
      const startQuestionsEvent = new Event('start-questions');
      document.dispatchEvent(startQuestionsEvent);
    });
  }
  