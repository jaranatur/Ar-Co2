// scripts/common/handleNamePrompt.js

export function setupNamePrompt() {
    const scene = document.querySelector('a-scene');
    const namePrompt = document.getElementById('name-prompt');
    const userNameInput = document.getElementById('user-name');
    const startButton = document.getElementById('start-btn');
    const inputOverlay = document.getElementById('input-overlay');
    const overlayTitle = inputOverlay.querySelector('.input-card-header h2');
  
    // Warten bis Erde gedreht wurde
    document.addEventListener('earth-rotated', () => {
      if (scene) {
        scene.style.pointerEvents = 'none'; // Szene blockieren
      }
      if (namePrompt) {
        namePrompt.style.display = 'flex';
        setTimeout(() => userNameInput.focus(), 100); // sanftes Fokusieren
      }
    });
  
    // Beim Klick auf „Weiter“
    startButton.addEventListener('click', (e) => {
      e.preventDefault();
  
      const name = userNameInput.value.trim();
      if (name === '') {
        alert('Bitte gib deinen Namen ein.');
        return;
      }
  
      // Name speichern (global)
      window.userName = name;
  
      // Name-Feld verstecken
      namePrompt.style.display = 'none';
  
      // Overlay mit Fragen zeigen
      inputOverlay.style.display = 'flex';
  
      // Überschrift personalisieren
      if (overlayTitle) {
        overlayTitle.textContent = `${name}s Nachhaltigkeitsinfos`;
      }
  
      // Scene pointer-events nicht ändern!
      
      // Starte Fragen
      const firstQuestionEvent = new Event('start-questions');
      document.dispatchEvent(firstQuestionEvent);
    });
  }
  