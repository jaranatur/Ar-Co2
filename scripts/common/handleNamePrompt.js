export function setupNamePrompt() {
    const scene = document.querySelector('a-scene');
    const canvas = document.querySelector('a-scene > canvas');
    const namePrompt = document.getElementById('name-prompt');
    const userNameInput = document.getElementById('user-name');
    const startButton = document.getElementById('start-btn');
    const inputOverlay = document.getElementById('input-overlay');
    const overlayTitle = document.querySelector('.input-card-header h2');
  
    document.addEventListener('earth-rotated', () => {
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas); // <<< GANZ entfernen
      }
  
      if (namePrompt) {
        namePrompt.style.display = 'flex';
        setTimeout(() => {
          if (userNameInput) {
            userNameInput.focus();
          }
        }, 300);
      }
    });
  
    startButton.addEventListener('click', (e) => {
      e.preventDefault();
  
      const name = userNameInput.value.trim();
      if (!name) {
        alert('Bitte gib deinen Namen ein.');
        return;
      }
  
      window.userName = name;
  
      if (namePrompt) {
        namePrompt.style.display = 'none';
      }
      if (inputOverlay) {
        inputOverlay.style.display = 'flex';
      }
      if (overlayTitle) {
        overlayTitle.textContent = `${name}s Nachhaltigkeitsinfos`;
      }
  
      const startQuestionsEvent = new Event('start-questions');
      document.dispatchEvent(startQuestionsEvent);
    });
  }
  