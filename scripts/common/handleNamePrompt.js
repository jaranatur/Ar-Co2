
// scripts/common/handleNamePrompt.js

export function setupNamePrompt() {
    const scene = document.querySelector('a-scene');
    const namePrompt = document.getElementById('name-prompt');
    const userNameInput = document.getElementById('user-name');
    const startButton = document.getElementById('start-btn');
    const inputOverlay = document.getElementById('input-overlay');
    const overlayTitle = inputOverlay.querySelector('.input-card-header h2');
  
    document.addEventListener('earth-rotated', () => {
      if (scene) {
        scene.style.pointerEvents = 'none';
      }
      if (namePrompt) {
        namePrompt.style.display = 'flex';
        userNameInput.focus();
      }
    });
  
    startButton.addEventListener('click', () => {
      const name = userNameInput.value.trim();
      if (name === '') {
        alert('Bitte gib deinen Namen ein.');
        return;
      }
  
      if (overlayTitle) {
        overlayTitle.textContent = `${name}s Nachhaltigkeitsinfos`;
      }
  
      if (namePrompt) {
        namePrompt.style.display = 'none';
      }
      if (inputOverlay) {
        inputOverlay.style.display = 'block';
      }
  
      const firstQuestionEvent = new Event('start-questions');
      document.dispatchEvent(firstQuestionEvent);
    });
  }
  