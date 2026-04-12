const state = {
  isRunning: false,
  startTime: null,
  accumulatedTime: 0,
  mode: "stopwatch",
  timerDuration: 1500,
  isVisible: true,
  pomoPhase: "work",
};

let timerInterval = null;

// Listen for messages from background script
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "play-sound") {
    playAlertSound();
  }
});

// Initialize the UI elements
function createTimerUI() {
  const root = document.createElement("div");
  root.id = "ag-timer-root";
  root.innerHTML = `
    <div class="ag-container">
      <div class="ag-timer-header">
        <div class="ag-timer-mode-switcher" id="ag-mode-toggle">STOPWATCH</div>
        <div class="ag-timer-session-info" id="ag-session-info"></div>
      </div>

      <div class="ag-controls">
        <div class="ag-pomo-btn-group">
          <button class="ag-timer-btn-adjust ag-pomo-work" id="ag-pomo-25">WORK</button>
          <button class="ag-timer-btn-adjust ag-pomo-break" id="ag-pomo-5">BREAK</button>
        </div>

        <div class="ag-quick-pick">
          <button class="ag-timer-btn-adjust ag-quick-pick-btn" data-min="10">10m</button>
          <button class="ag-timer-btn-adjust ag-quick-pick-btn" data-min="30">30m</button>
          <button class="ag-timer-btn-adjust ag-quick-pick-btn" data-min="60">60m</button>
        </div>

        <button class="ag-timer-btn-adjust ag-minus-btn" id="ag-minus-1">-1m</button>
        <div class="ag-timer-display" id="ag-display">00:00:00</div>
        <button class="ag-timer-btn-adjust ag-plus-btn" id="ag-plus-1">+1m</button>

        <button class="ag-timer-btn" id="ag-start-pause">START</button>
        <button class="ag-timer-btn" id="ag-reset">RESET</button>
      </div>
    </div>
  `;
  const firstElement = document.body.firstElementChild;

  if (firstElement) {
    document.body.insertBefore(root, firstElement);
  } else {
    document.body.appendChild(root);
  }

  document
    .getElementById("ag-start-pause")
    .addEventListener("click", togglePlay);
  document.getElementById("ag-reset").addEventListener("click", resetTimer);
  document
    .getElementById("ag-mode-toggle")
    .addEventListener("click", toggleMode);

  // Custom adjust listeners
  document.getElementById("ag-plus-1").onclick = () => adjustTimer(60);
  document.getElementById("ag-minus-1").onclick = () => adjustTimer(-60);

  // Pomodoro Presets
  document.getElementById("ag-pomo-25").onclick = () => setPomodoro("work");
  document.getElementById("ag-pomo-5").onclick = () =>
    setPomodoro("short-break");

  // Quick Pick durations
  document.querySelectorAll(".ag-quick-pick-btn").forEach((btn) => {
    btn.onclick = () => {
      const minutes = parseInt(btn.dataset.min);
      chrome.storage.local.get(["state"], (res) => {
        chrome.storage.local.set({
          state: {
            ...res.state,
            mode: "timer",
            timerDuration: minutes * 60,
            accumulatedTime: 0,
            isRunning: false,
            startTime: null,
            soundPlayed: false,
          },
        });
      });
    };
  });

  const displayEl = document.getElementById("ag-display");
  displayEl.addEventListener("click", () => {
    if (state.isRunning) return;
    displayEl.contentEditable = true;
    displayEl.focus();

    const range = document.createRange();
    range.selectNodeContents(displayEl);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  });

  displayEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      displayEl.contentEditable = false;
      parseTimeInput(displayEl.textContent);
    }
  });

  displayEl.addEventListener("blur", () => {
    displayEl.contentEditable = false;
    parseTimeInput(displayEl.textContent);
  });

  syncUI();
}

function parseTimeInput(str) {
  const parts = str.split(":").map((p) => parseInt(p.trim()) || 0);
  let totalSeconds = 0;
  if (parts.length === 3) {
    totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    totalSeconds = parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    // Treat as minutes by default for convenience
    totalSeconds = parts[0] * 60;
  }

  if (totalSeconds >= 0) {
    chrome.storage.local.get(["state"], (res) => {
      chrome.storage.local.set({
        state: {
          ...res.state,
          mode: "timer",
          timerDuration: totalSeconds,
          accumulatedTime: 0,
        },
      }, () => {
        syncUI();
      });
    });
  }
}

function setPomodoro(phase) {
  const durations = {
    work: 1500,
    "short-break": 300,
    "long-break": 900,
  };
  chrome.storage.local.get(["state"], (res) => {
    chrome.storage.local.set({
      state: {
        ...res.state,
        mode: "pomodoro",
        pomoPhase: phase,
        timerDuration: durations[phase],
        accumulatedTime: 0,
        isRunning: false,
        startTime: null,
        soundPlayed: false,
      },
    });
  });
}

function playAlertSound() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const now = audioCtx.currentTime;

  function beep(startTime) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(2000, startTime); // Sharper high-pitch

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, startTime + 0.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.11);
  }

  // Triple-beep pattern every second for 8 seconds (Long duration)
  for (let i = 0; i < 8; i++) {
    const offset = i * 1.0;
    beep(now + offset);
    beep(now + offset + 0.15);
    beep(now + offset + 0.3);
  }

  setTimeout(() => audioCtx.close(), 10000);
}

function adjustTimer(deltaSeconds) {
  chrome.storage.local.get(["state"], (res) => {
    let s = res.state;
    // Only adjust when paused
    if (!s.isRunning) {
      let nextDuration = Math.max(0, s.timerDuration + deltaSeconds);
      chrome.storage.local.set({
        state: { ...s, timerDuration: nextDuration, accumulatedTime: 0 },
      });
    }
  });
}

function toggleMode() {
  chrome.storage.local.get(["state"], (result) => {
    const currentState = result.state;
    const newMode = currentState.mode === "stopwatch" ? "timer" : "stopwatch";
    const defaultDuration = newMode === "timer" ? 1500 : 0;

    chrome.storage.local.set({
      state: {
        ...currentState,
        mode: newMode,
        isRunning: false,
        startTime: null,
        accumulatedTime: 0,
        timerDuration: defaultDuration,
        soundPlayed: false,
      },
    });
  });
}

function togglePlay() {
  chrome.storage.local.get(["state"], (result) => {
    const currentState = result.state;
    const now = Date.now();
    let newState = { ...currentState };

    if (currentState.isRunning) {
      newState.isRunning = false;
      newState.accumulatedTime += now - currentState.startTime;
      newState.startTime = null;
    } else {
      newState.isRunning = true;
      newState.startTime = now;
    }

    chrome.storage.local.set({ state: newState });
  });
}

function resetTimer() {
  chrome.storage.local.get(["state"], (result) => {
    const currentState = result.state;
    chrome.storage.local.set({
      state: {
        ...currentState,
        isRunning: false,
        startTime: null,
        accumulatedTime: 0,
        soundPlayed: false,
      },
    });
  });
}

function updateDisplay() {
  const displayEl = document.getElementById("ag-display");
  const btnEl = document.getElementById("ag-start-pause");
  if (!displayEl || displayEl.contentEditable === "true" || document.activeElement === displayEl) return;

  const now = Date.now();
  let elapsedMs = state.accumulatedTime;
  if (state.isRunning && state.startTime) {
    elapsedMs += now - state.startTime;
  }

  let displaySeconds;
  if (state.mode === "stopwatch") {
    displaySeconds = Math.floor(elapsedMs / 1000);
  } else {
    const remaining = state.timerDuration * 1000 - elapsedMs;
    displaySeconds = Math.max(0, Math.floor(remaining / 1000));

    // Note: Completion logic moved to background script for reliability
  }

  const h = Math.floor(displaySeconds / 3600);
  const m = Math.floor((displaySeconds % 3600) / 60);
  const s = displaySeconds % 60;

  displayEl.textContent = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  btnEl.textContent = state.isRunning ? "Pause" : "Start";
}

function syncUI() {
  chrome.storage.local.get(["state"], (result) => {
    if (result.state) {
      Object.assign(state, result.state);

      const root = document.getElementById("ag-timer-root");
      const modeToggle = document.getElementById("ag-mode-toggle");
      const sessionInfo = document.getElementById("ag-session-info");

      if (root) {
        root.classList.toggle("ag-hidden", !state.isVisible);
        root.classList.remove("mode-timer", "mode-stopwatch", "mode-pomodoro");
        root.classList.add(`mode-${state.mode.toLowerCase()}`);
      }

      if (modeToggle) {
        modeToggle.textContent = state.mode.toUpperCase();
      }

      if (sessionInfo) {
        if (state.mode === "pomodoro") {
          sessionInfo.textContent = state.pomoPhase
            .replace("-", " ")
            .toUpperCase();
          sessionInfo.style.display = "block";
        } else {
          sessionInfo.style.display = "none";
        }
      }

      updateDisplay();
    }
  });
}

chrome.storage.onChanged.addListener((changes) => {
  if (changes.state) {
    Object.assign(state, changes.state.newValue);
    syncUI();
  }
});

function startDisplayLoop() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateDisplay, 100);
}

chrome.storage.local.get(["state"], (result) => {
  if (result.state) {
    Object.assign(state, result.state);
  }

  if (!document.getElementById("ag-timer-root")) {
    createTimerUI();
    startDisplayLoop();
  }
});
