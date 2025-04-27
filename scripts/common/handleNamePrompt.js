export function setupNamePrompt() {
    function initStartButton() {
      const btn = document.getElementById('start-btn');
      if (!btn) {
        console.error('Start button not found!');
        return;
      }
  
      const userNameInput = document.getElementById('user-name');
  
      // Touchstart für Mobile verbessern
      if (userNameInput) {
        userNameInput.addEventListener('touchstart', (e) => {
          e.stopPropagation();
          userNameInput.focus();
        });
      }
  
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = userNameInput.value.trim();
        if (!name) {
          alert('Bitte gib deinen Namen ein!');
          return;
        }
        
        window.userName = name;
  
        document.getElementById('name-prompt').style.display = 'none';
        document.getElementById('input-overlay').style.display = 'flex';
  
        const startQuestionsEvent = new Event('start-questions');
        document.dispatchEvent(startQuestionsEvent);
      });
  
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.click(); // Trigger Klick
      });
    }
  
    document.addEventListener('earth-rotated', () => {
      // 1. Canvas entfernen
      document.querySelectorAll('canvas').forEach(canvas => {
        canvas.parentNode?.removeChild(canvas);
      });
  
      // 2. Erde entfernen
      const earthContainer = document.getElementById('earth-container');
      if (earthContainer && earthContainer.parentNode) {
        earthContainer.parentNode.removeChild(earthContainer);
      }
  
      // 3. Marker entfernen
      const marker = document.querySelector('a-marker');
      if (marker && marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
  
      // 4. Name-Prompt korrekt anzeigen
      const namePrompt = document.getElementById('name-prompt');
      if (namePrompt) {
        namePrompt.style.cssText = 'display: flex !important; z-index: 10000 !important; pointer-events: all !important;';
      }
  
      // 5. Start-Button initialisieren (mit Delay für Sicherheit)
      setTimeout(initStartButton, 300);
    });
  }
  