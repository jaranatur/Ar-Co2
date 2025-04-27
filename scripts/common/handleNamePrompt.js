export function setupNamePrompt() {
    const scene = document.querySelector('a-scene');
    const canvas = document.querySelector('a-scene > canvas'); // GENAU das Canvas unter der Szene
    const namePrompt = document.getElementById('name-prompt');
    const userNameInput = document.getElementById('user-name');
    const startButton = document.getElementById('start-btn');
    const inputOverlay = document.getElementById('input-overlay');
    const overlayTitle = inputOverlay.querySelector('.input-card-header h2');
  
    document.addEventListener('earth-rotated', () => {
      if (canvas) {
        canvas.style.display = 'none'; // <<< GANZ WICHTIG: Canvas richtig ausblenden!
      }
  
      if (namePrompt) {
        namePrompt.style.display = 'flex';
      }
  
      setTimeout(() => {
        if (userNameInput) {
          userNameInput.focus();
        }
      }, 300); // kleine mobile Kompatibilitätsverzögerung
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
  
      // Canvas wieder anzeigen, damit AR funktioniert
      if (canvas) {
        canvas.style.display = 'block'; 
      }
  
      // Fragen-Overlay einblenden
      inputOverlay.style.display = 'flex';
  
      if (overlayTitle) {
        overlayTitle.textContent = `${name}s Nachhaltigkeitsinfos`;
      }
  
      const startQuestionsEvent = new Event('start-questions');
      document.dispatchEvent(startQuestionsEvent);
    });
  }
  