export function setupNamePrompt() {
    const scene = document.querySelector('a-scene');
    const namePrompt = document.getElementById('name-prompt');
    const userNameInput = document.getElementById('user-name');
    const startButton = document.getElementById('start-btn');
  
    document.addEventListener('earth-rotated', () => {
      if (scene && scene.parentNode) {
        scene.parentNode.removeChild(scene); // Szene komplett löschen
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
      if (!name) {
        alert('Bitte gib deinen Namen ein.');
        return;
      }
  
      window.userName = name;
  
      // Danach kannst du dein Fragen-Overlay einblenden usw.
      document.getElementById('name-prompt').style.display = 'none';
      document.getElementById('input-overlay').style.display = 'flex';
  
      const startQuestionsEvent = new Event('start-questions');
      document.dispatchEvent(startQuestionsEvent);
    });
  }
  