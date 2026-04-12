document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveBtn = document.getElementById('saveBtn');
  const statusText = document.getElementById('statusText');

  // Load existing key (updated to use gemini_api_key)
  chrome.storage.local.get(['gemini_api_key'], (result) => {
    if (result.gemini_api_key) {
      apiKeyInput.value = result.gemini_api_key;
    }
  });

  saveBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (!key) {
      showStatus('Please enter an API key', 'error');
      return;
    }

    chrome.storage.local.set({ gemini_api_key: key }, () => {
      showStatus('Saved! You can now use the quiz solver.', 'success');
    });
  });

  function showStatus(msg, type) {
    statusText.textContent = msg;
    statusText.style.color = type === 'error' ? '#ff4b2b' : '#34a853';
    setTimeout(() => {
      statusText.textContent = '';
    }, 3000);
  }
});
