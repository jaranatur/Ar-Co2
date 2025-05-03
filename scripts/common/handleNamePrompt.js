export function setupNamePrompt() {
  const btn = document.getElementById('start-btn');
  const userNameInput = document.getElementById('user-name');

  if (!btn || !userNameInput) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = userNameInput.value.trim();
    if (!name) {
      alert('Bitte gib deinen Namen ein!');
      return;
    }

    window.userName = name;

    document.getElementById('name-prompt').style.display = 'none';
    const evt = new Event('start-questions');
    document.dispatchEvent(evt);
  });

  // Optional: Touch-Unterstützung
  btn.addEventListener('touchend', (e) => {
    e.preventDefault();
    e.stopPropagation();
    btn.click();
  });
}
