// Extension states
const DEFAULT_STATE = {
  isRunning: false,
  startTime: null,
  accumulatedTime: 0,
  mode: 'stopwatch', // 'stopwatch', 'timer', 'pomodoro'
  timerDuration: 1500, // 25 mins by default
  isVisible: true,
  soundPlayed: false,
  pomoPhase: 'work', // 'work', 'short-break', 'long-break'
  pomoSessions: 0
};

// Initialize storage on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['state'], (result) => {
    if (!result.state) {
      chrome.storage.local.set({ state: DEFAULT_STATE });
    }
  });
});

// Handle alarms for timer completion
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'timer-finished') {
    chrome.storage.local.get(['state'], (result) => {
      const s = result.state;
      if (!s || !s.isRunning) return;

      // Update state
      const newState = { 
        ...s, 
        isRunning: false, 
        soundPlayed: true, 
        startTime: null, 
        accumulatedTime: s.timerDuration * 1000 
      };
      
      chrome.storage.local.set({ state: newState });

      // Create a notification
      chrome.notifications.create('timer-complete', {
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: s.mode === 'pomodoro' ? `Pomodoro ${s.pomoPhase.toUpperCase()} Finished!` : 'Timer Finished!',
        message: s.mode === 'pomodoro' ? 'Time for a break!' : 'Your set time has expired.',
        priority: 2
      });

      // Send message to all tabs to play sound if possible
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { action: 'play-sound' }).catch(() => {});
        });
      });
    });
  }
});

// Synchronize alarms when state changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.state) {
    const s = changes.state.newValue;
    chrome.alarms.clear('timer-finished');

    if (s.isRunning && (s.mode === 'timer' || s.mode === 'pomodoro')) {
      const elapsed = s.accumulatedTime;
      const total = s.timerDuration * 1000;
      const remainingMs = total - elapsed;
      
      if (remainingMs > 0) {
        chrome.alarms.create('timer-finished', {
          when: Date.now() + remainingMs
        });
      }
    }
  }
});

// Handle shortcut to toggle visibility
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-visibility') {
    chrome.storage.local.get(['state'], (result) => {
      if (!result.state) return;
      const newState = { ...result.state, isVisible: !result.state.isVisible };
      chrome.storage.local.set({ state: newState });
    });
  }
});
