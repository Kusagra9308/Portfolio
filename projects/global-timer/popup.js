const toggleBtn = document.getElementById('toggle-visibility');
const controlBtn = document.getElementById('control-timer');
const resetBtn = document.getElementById('reset-timer');

// Status indicators
function updateState() {
  chrome.storage.local.get(['state'], (res) => {
    if (!res.state) return;
    const s = res.state;
    toggleBtn.textContent = s.isVisible ? 'HIDE TIMER' : 'SHOW TIMER';
    toggleBtn.style.background = s.isVisible ? '#00e5ff' : '#2c2c2e';
    toggleBtn.style.color = s.isVisible ? '#000' : '#fff';
    controlBtn.textContent = s.isRunning ? 'PAUSE' : 'START';
  });
}

toggleBtn.onclick = () => {
  chrome.storage.local.get(['state'], (res) => {
    const next = !res.state.isVisible;
    chrome.storage.local.set({ state: { ...res.state, isVisible: next } });
  });
};

controlBtn.onclick = () => {
  chrome.storage.local.get(['state'], (result) => {
    const currentState = result.state;
    const now = Date.now();
    let newState = { ...currentState };
    if (currentState.isRunning) {
      newState.isRunning = false;
      newState.accumulatedTime += (now - currentState.startTime);
      newState.startTime = null;
    } else {
      newState.isRunning = true;
      newState.startTime = now;
    }
    chrome.storage.local.set({ state: newState });
  });
};

resetBtn.onclick = () => {
  chrome.storage.local.get(['state'], (res) => {
    chrome.storage.local.set({ state: { ...res.state, isRunning: false, startTime: null, accumulatedTime: 0, soundPlayed: false } });
  });
};

document.getElementById('pomo-25').onclick = () => setPomodoro('work');
document.getElementById('pomo-5').onclick = () => setPomodoro('short-break');
document.getElementById('pomo-15').onclick = () => setPomodoro('long-break');

function setPomodoro(phase) {
  const durations = {
    'work': 1500,
    'short-break': 300,
    'long-break': 900
  };
  chrome.storage.local.get(['state'], (res) => {
    chrome.storage.local.set({ state: { 
      ...res.state, 
      mode: 'pomodoro', 
      pomoPhase: phase,
      timerDuration: durations[phase], 
      accumulatedTime: 0, 
      isRunning: false, 
      startTime: null, 
      soundPlayed: false 
    }});
  });
}

document.getElementById('set-custom-timer').onclick = () => {
  const customMin = parseFloat(document.getElementById('custom-minutes').value);
  if (customMin > 0) {
    chrome.storage.local.get(['state'], (res) => {
      chrome.storage.local.set({ state: { 
        ...res.state, 
        mode: 'timer', 
        timerDuration: customMin * 60, 
        accumulatedTime: 0, 
        isRunning: false, 
        startTime: null, 
        soundPlayed: false 
      }});
      document.getElementById('custom-minutes').value = '';
    });
  }
};

updateState();
chrome.storage.onChanged.addListener(updateState);
