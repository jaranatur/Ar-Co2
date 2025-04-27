export function setupNamePrompt() {
    document.addEventListener('earth-rotated', () => {
      const scene = document.querySelector('a-scene');
      if (scene && scene.parentNode) {
        scene.parentNode.removeChild(scene);
      }
  
      // Alle Canvas-Elemente killen
      document.querySelectorAll('canvas').forEach(canvas => {
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      });
  
      const namePrompt = document.getElementById('name-prompt');
      const userNameInput = document.getElementById('user-name');
  
      if (namePrompt) {
        namePrompt.style.display = 'flex';
      }
  
      setTimeout(() => {
        if (userNameInput) {
          userNameInput.focus();
        }
      }, 300);
    });
  
    document.getElementById('start-btn').addEventListener('click', (e) => {
      e.preventDefault();
  
      const name = document.getElementById('user-name').value.trim();
      if (!name) {
        alert('Bitte gib deinen Namen ein.');
        return;
      }
  
      window.userName = name;
  
      document.getElementById('name-prompt').style.display = 'none';
      document.getElementById('input-overlay').style.display = 'flex';
  
      const startQuestionsEvent = new Event('start-questions');
      document.dispatchEvent(startQuestionsEvent);
    });
  }
  