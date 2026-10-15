/* ═══════════════════════════════════════════════════════
   NXT NEURAL CITY — Main Controller
   Author: AL-AMIN
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════
   GLOBAL STATE
   ═══════════════════════════════════════════════════════ */
var STATE = {
  bootComplete: false,
  cityRunning: false,
  paused: false,
  speed: 3,
  
  time: {
    day: 1,
    hour: 6,
    minute: 0,
    dayOfWeek: 0,
    tickCount: 0
  },
  
  weather: 'sunny',
  
  treasury: 1000000,
  population: 0,
  totalCitizens: 0,
  
  stats: {
    happiness: 78,
    economy: 92,
    traffic: 45,
    power: 92,
    pollution: 34,
    employment: 89
  },
  
  view: 'city',
  selectedBuilding: null,
  selectedCitizen: null,
  
  autoSaveTimer: 0,
  lastTick: Date.now()
};

/* ═══════════════════════════════════════════════════════
   BOOT SEQUENCE
   ═══════════════════════════════════════════════════════ */
(function init() {
  console.log('%c🌆 NXT NEURAL CITY Starting...', 
    'color:#00d4ff;font-family:monospace;font-size:18px;font-weight:bold');
  
  // Load saved state if exists
  loadSavedState();
  
  // Run splash
  runSplash();
  
  // Init canvas
  initCanvas();
  
  // Bind events
  bindEvents();
  
  // Start clock
  startClock();
  
  console.log('%c✅ Boot complete', 
    'color:#22c55e;font-family:monospace;font-size:14px;font-weight:bold');
})();

/* ═══════════════════════════════════════════════════════
   SPLASH SEQUENCE
   ═══════════════════════════════════════════════════════ */
function runSplash() {
  var bar = document.getElementById('bootBar');
  var txt = document.getElementById('bootText');
  
  var steps = [
    { pct: 10, text: 'LOADING ASSETS...' },
    { pct: 25, text: 'GENERATING TERRAIN...' },
    { pct: 40, text: 'PLACING BUILDINGS...' },
    { pct: 55, text: 'SPAWNING CITIZENS...' },
    { pct: 70, text: 'STARTING VEHICLES...' },
    { pct: 85, text: 'INITIALIZING ECONOMY...' },
    { pct: 95, text: 'STARTING SIMULATION...' },
    { pct: 100, text: 'WELCOME, MAYOR AL-AMIN!' }
  ];
  
  var i = 0;
  
  function nextStep() {
    if (i >= steps.length) {
      setTimeout(function() {
        hideSplash();
      }, 600);
      return;
    }
    
    var step = steps[i];
    if (bar) bar.style.width = step.pct + '%';
    if (txt) txt.textContent = step.text;
    
    i++;
    setTimeout(nextStep, 350);
  }
  
  setTimeout(nextStep, 400);
}

function hideSplash() {
  var splash = document.getElementById('splash');
  if (splash) {
    splash.classList.add('hide');
    setTimeout(function() {
      splash.style.display = 'none';
      STATE.bootComplete = true;
      startCity();
    }, 800);
  }
}

/* ═══════════════════════════════════════════════════════
   START CITY
   ═══════════════════════════════════════════════════════ */
function startCity() {
  console.log('%c🏙️ Starting city simulation...', 
    'color:#00d4ff;font-family:monospace;font-size:14px');
  
  STATE.cityRunning = true;
  
  // Init city
  if (typeof initCity === 'function') initCity();
  
  // Init roads
  if (typeof initRoads === 'function') initRoads();
  
  // Init buildings
  if (typeof initBuildings === 'function') initBuildings();
  
  // Init citizens
  if (typeof initPopulation === 'function') initPopulation();
  
  // Init traffic
  if (typeof initTraffic === 'function') initTraffic();
  
  // Init weather
  if (typeof initWeather === 'function') initWeather();
  
  // Start main loop
  startMainLoop();
  
  // Show welcome toast
  setTimeout(function() {
    showToast('🌆 Welcome to NXT NEURAL CITY, Mayor AL-AMIN!', 'success');
  }, 500);
}

/* ═══════════════════════════════════════════════════════
   MAIN LOOP
   ═══════════════════════════════════════════════════════ */
var MAIN_LOOP_INTERVAL = null;

function startMainLoop() {
  if (MAIN_LOOP_INTERVAL) clearInterval(MAIN_LOOP_INTERVAL);
  
  MAIN_LOOP_INTERVAL = setInterval(function() {
    if (!STATE.cityRunning || STATE.paused) return;
    
    for (var s = 0; s < STATE.speed; s++) {
      gameTick();
    }
  }, 1000);
  
  console.log('%c🔄 Main loop started at ' + STATE.speed + 'x speed', 
    'color:#22c55e;font-family:monospace');
}

function gameTick() {
  STATE.time.tickCount++;
  STATE.time.minute += TIME.GAME_MINUTES_PER_TICK;
  
  // Time update
  if (STATE.time.minute >= 60) {
    STATE.time.minute -= 60;
    STATE.time.hour++;
    
    if (STATE.time.hour >= 24) {
      STATE.time.hour = 0;
      STATE.time.day++;
      STATE.time.dayOfWeek = (STATE.time.dayOfWeek + 1) % 7;
      
      // New day events
      onNewDay();
    }
  }
  
  // Update systems
  if (typeof updateCitizens === 'function') updateCitizens();
  if (typeof updateTraffic === 'function') updateTraffic();
  if (typeof updateEconomy === 'function') updateEconomy();
  
  // Every 10 ticks
  if (STATE.time.tickCount % 10 === 0) {
    if (typeof updateWeather === 'function') updateWeather();
    if (typeof checkEvents === 'function') checkEvents();
  }
  
  // Every 30 ticks
  if (STATE.time.tickCount % 30 === 0) {
    updateStats();
  }
  
  // Auto-save every 60 ticks
  if (STATE.time.tickCount % 60 === 0) {
    autoSave();
  }
  
  // Update UI
  updateTopBar();
}

function onNewDay() {
  console.log('%c📅 New day: Day ' + STATE.time.day, 
    'color:#f59e0b;font-family:monospace');
  
  if (typeof onDailyEvents === 'function') onDailyEvents();
  if (typeof payCitizens === 'function') payCitizens();
  if (typeof collectTaxes === 'function') collectTaxes();
}

/* ═══════════════════════════════════════════════════════
   CLOCK
   ═══════════════════════════════════════════════════════ */
function startClock() {
  updateTopBar();
  setInterval(updateTopBar, 1000);
}

function updateTopBar() {
  // Clock
  var hour = STATE.time.hour.toString().padStart(2, '0');
  var minute = STATE.time.minute.toString().padStart(2, '0');
  var clockEl = document.getElementById('topClock');
  if (clockEl) clockEl.textContent = hour + ':' + minute;
  
  // Date
  var dateEl = document.getElementById('topDate');
  if (dateEl) {
    dateEl.textContent = 'Day ' + STATE.time.day;
  }
  
  // Weather
  var weatherEl = document.getElementById('topWeather');
  if (weatherEl) {
    var w = WEATHER[STATE.weather];
    weatherEl.textContent = w.icon + ' ' + w.name;
  }
  
  // Money
  var moneyEl = document.getElementById('topMoney');
  if (moneyEl) {
    moneyEl.textContent = formatNumber(Math.floor(STATE.treasury));
  }
  
  // Population
  var popEl = document.getElementById('topPop');
  if (popEl) {
    popEl.textContent = STATE.population;
  }
}

/* ═══════════════════════════════════════════════════════
   STATS UPDATE
   ═══════════════════════════════════════════════════════ */
function updateStats() {
  // Simulated stats (will be real from citizens in later parts)
  var s = STATE.stats;
  
  var el;
  el = document.getElementById('statHappiness');
  if (el) el.textContent = Math.round(s.happiness) + '%';
  
  el = document.getElementById('statEconomy');
  if (el) el.textContent = Math.round(s.economy) + '%';
  
  el = document.getElementById('statTraffic');
  if (el) el.textContent = Math.round(s.traffic) + '%';
  
  el = document.getElementById('statPower');
  if (el) el.textContent = Math.round(s.power) + '%';
  
  el = document.getElementById('statPollution');
  if (el) el.textContent = Math.round(s.pollution) + '%';
  
  el = document.getElementById('statEmployment');
  if (el) el.textContent = Math.round(s.employment) + '%';
}

/* ═══════════════════════════════════════════════════════
   CANVAS INIT
   ═══════════════════════════════════════════════════════ */
function initCanvas() {
  var canvas = document.getElementById('cityCanvas');
  if (!canvas) return;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 64 - 220;
    
    if (typeof CAMERA !== 'undefined') {
      CAMERA.width = canvas.width;
      CAMERA.height = canvas.height;
    }
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  // Store globally
  window.CITY_CANVAS = canvas;
  window.CITY_CTX = canvas.getContext('2d');
}

/* ═══════════════════════════════════════════════════════
   VIEW MODES
   ═══════════════════════════════════════════════════════ */
function setView(view) {
  STATE.view = view;
  
  document.querySelectorAll('.view-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.view === view);
  });
  
  showToast('View: ' + view.toUpperCase());
}

/* ═══════════════════════════════════════════════════════
   TIME CONTROLS
   ═══════════════════════════════════════════════════════ */
function togglePause() {
  STATE.paused = !STATE.paused;
  
  var btn = document.getElementById('pauseBtn');
  if (btn) {
    btn.innerHTML = STATE.paused ? 
      '<i class="fas fa-play"></i>' : 
      '<i class="fas fa-pause"></i>';
  }
  
  showToast(STATE.paused ? '⏸️ Paused' : '▶️ Resumed');
}

function setSpeed(speed) {
  STATE.speed = speed;
  
  document.querySelectorAll('.time-btn[data-speed]').forEach(function(b) {
    b.classList.toggle('active', parseInt(b.dataset.speed) === speed);
  });
  
  showToast('Speed: ' + speed + 'x');
}

/* ═══════════════════════════════════════════════════════
   SIDE PANEL
   ═══════════════════════════════════════════════════════ */
function openSidePanel(title, content) {
  var panel = document.getElementById('sidePanel');
  var titleEl = document.getElementById('sidePanelTitle');
  var bodyEl = document.getElementById('sidePanelBody');
  
  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.innerHTML = content;
  if (panel) panel.classList.add('open');
}

function closeSidePanel() {
  var panel = document.getElementById('sidePanel');
  if (panel) panel.classList.remove('open');
}

/* ═══════════════════════════════════════════════════════
   MODAL SYSTEM
   ═══════════════════════════════════════════════════════ */
function openModal(title, content) {
  var overlay = document.getElementById('modalOverlay');
  var titleEl = document.getElementById('modalTitle');
  var bodyEl = document.getElementById('modalBody');
  
  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.innerHTML = content;
  if (overlay) overlay.classList.add('show');
}

function closeModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.modal-header button')) return;
  var overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('show');
}

/* ═══════════════════════════════════════════════════════
   STAT DETAIL
   ═══════════════════════════════════════════════════════ */
function showStatDetail(stat) {
  var info = {
    happiness: { title: '😊 Happiness', desc: 'Overall citizen happiness level' },
    economy: { title: '💰 Economy', desc: 'City economic health' },
    traffic: { title: '🚗 Traffic', desc: 'Road congestion level' },
    power: { title: '⚡ Power', desc: 'Power grid capacity' },
    pollution: { title: '🌱 Pollution', desc: 'Environmental pollution level' },
    employment: { title: '💼 Employment', desc: 'Citizen employment rate' }
  };
  
  var d = info[stat] || { title: stat, desc: '' };
  var value = Math.round(STATE.stats[stat] || 0);
  
  openSidePanel(d.title, 
    '<div style="text-align:center;padding:20px">' +
      '<div style="font-size:64px;font-weight:900;color:#00d4ff;font-family:Orbitron">' + value + '%</div>' +
      '<p style="margin-top:16px;color:#cbd5e1">' + d.desc + '</p>' +
      '<div style="margin-top:24px;padding:16px;background:rgba(0,212,255,.06);border-radius:12px">' +
        '<div style="font-size:12px;color:#7a8194">Change per day</div>' +
        '<div style="font-size:24px;color:#22c55e;font-weight:800">+' + (Math.random() * 3).toFixed(1) + '%</div>' +
      '</div>' +
    '</div>'
  );
}

/* ═══════════════════════════════════════════════════════
   BUILD MENU
   ═══════════════════════════════════════════════════════ */
function openBuildMenu() {
  var modal = document.getElementById('buildModal');
  if (modal) {
    modal.classList.add('show');
    renderBuildList('residential');
  }
}

function closeBuildMenu(e) {
  if (e && e.target !== e.currentTarget) return;
  var modal = document.getElementById('buildModal');
  if (modal) modal.classList.remove('show');
}

function renderBuildList(zone) {
  var list = document.getElementById('buildList');
  if (!list) return;
  
  list.innerHTML = '';
  
  Object.keys(BUILDINGS).forEach(function (key) {
    var b = BUILDINGS[key];
    if (b.zone !== zone) return;
    
    var item = document.createElement('div');
    item.className = 'build-item';
    item.onclick = function () { selectBuilding(key); };
    
    item.innerHTML =
      '<div class="build-item-icon">' + b.icon + '</div>' +
      '<div class="build-item-name">' + b.name + '</div>' +
      '<div class="build-item-cost"><i class="fas fa-coins"></i> ' + formatNumber(b.cost) + '</div>' +
      '<div class="build-item-desc">' + (b.w + 'x' + b.h + ' tiles') + '</div>';
    
    list.appendChild(item);
  });
}

function selectBuilding(id) {
  STATE.selectedBuilding = id;
  var b = BUILDINGS[id];
  showToast('Selected: ' + b.name + ' (' + formatNumber(b.cost) + ' coins)');
}

document.querySelectorAll('.build-cat').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.build-cat').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    renderBuildList(btn.dataset.cat);
  });
});

/* ═══════════════════════════════════════════════════════
   OTHER MENUS (placeholders)
   ═══════════════════════════════════════════════════════ */
function openPolicyMenu() {
  openModal('📜 Policies', 
    '<div style="text-align:center;padding:40px">' +
      '<div style="font-size:64px;margin-bottom:20px">📜</div>' +
      '<h3 style="color:#00d4ff;margin-bottom:12px">Policy System</h2>' +
      '<p style="color:#7a8194">Coming in Part 14</p>' +
    '</div>'
  );
}

function openEventMenu() {
  openModal('🎉 Events', 
    '<div style="text-align:center;padding:40px">' +
      '<div style="font-size:64px;margin-bottom:20px">🎉</div>' +
      '<h3 style="color:#00d4ff;margin-bottom:12px">Events System</h2>' +
      '<p style="color:#7a8194">Coming in Part 16</p>' +
    '</div>'
  );
}

function openCitizensMenu() {
  openModal('👥 Citizens', 
    '<div style="text-align:center;padding:40px">' +
      '<div style="font-size:64px;margin-bottom:20px">👥</div>' +
      '<h3 style="color:#00d4ff;margin-bottom:12px">Citizens List</h2>' +
      '<p style="color:#7a8194">Coming in Part 13</p>' +
    '</div>'
  );
}

function openAnalytics() {
  openModal('📊 Analytics', 
    '<div style="text-align:center;padding:40px">' +
      '<div style="font-size:64px;margin-bottom:20px">📊</div>' +
      '<h3 style="color:#00d4ff;margin-bottom:12px">Analytics Dashboard</h2>' +
      '<p style="color:#7a8194">Coming in Part 19</p>' +
    '</div>'
  );
}

function openEventLog() {
  openSidePanel('📋 Event Log', 
    '<div style="padding:16px;color:#cbd5e1">' +
      '<p>🌆 City started</p>' +
      '<p>👤 Mayor AL-AMIN took office</p>' +
      '<p style="color:#7a8194;margin-top:16px">Full log in Part 17</p>' +
    '</div>'
  );
}

/* ═══════════════════════════════════════════════════════
   SETTINGS
   ═══════════════════════════════════════════════════════ */
function openSettings() {
  var modal = document.getElementById('settingsModal');
  if (modal) modal.classList.add('show');
}

function closeSettings(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.modal-header button')) return;
  var modal = document.getElementById('settingsModal');
  if (modal) modal.classList.remove('show');
}

function switchTab(tab) {
  document.querySelectorAll('.settings-tab').forEach(function (t) {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  document.querySelectorAll('.settings-panel').forEach(function (p) {
    p.classList.toggle('active', p.id === 'tab-' + tab);
  });
}

function updateGraphics(val) {
  CITY_CONFIG.QUALITY = val;
  saveState();
  showToast('Graphics: ' + val.toUpperCase());
}

function updateVolume(type, val) {
  showToast(type + ' volume: ' + val + '%');
}

function updateSpeed(val) {
  setSpeed(parseInt(val));
}

function updateCitizenCount(val) {
  showToast('Citizens: ' + val + ' (restart required)');
}

function toggleGrid(checked) {
  CITY_CONFIG.SHOW_GRID = checked;
}

function toggleZones(checked) {
  CITY_CONFIG.SHOW_ZONES = checked;
}

function toggleNames(checked) {
  CITY_CONFIG.SHOW_NAMES = checked;
}

/* ═══════════════════════════════════════════════════════
   SAVE / LOAD
   ═══════════════════════════════════════════════════════ */
function saveState() {
  try {
    var data = {
      time: STATE.time,
      treasury: STATE.treasury,
      population: STATE.population,
      stats: STATE.stats,
      weather: STATE.weather
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function loadSavedState() {
  try {
    var raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      var data = JSON.parse(raw);
      if (data.time) STATE.time = data.time;
      if (data.treasury) STATE.treasury = data.treasury;
      if (data.population) STATE.population = data.population;
      if (data.stats) STATE.stats = data.stats;
      if (data.weather) STATE.weather = data.weather;
      
      console.log('%c💾 Save loaded', 'color:#f59e0b;font-family:monospace');
    }
  } catch (e) {}
}

function saveCity() {
  saveState();
  showToast('💾 City saved!', 'success');
}

function loadCity() {
  loadSavedState();
  showToast('📁 City loaded!', 'success');
}

function exportCity() {
  var data = {
    time: STATE.time,
    treasury: STATE.treasury,
    population: STATE.population,
    stats: STATE.stats,
    timestamp: new Date().toISOString()
  };
  
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'nxt-city-save-' + Date.now() + '.json';
  a.click();
  URL.revokeObjectURL(url);
  
  showToast('📤 City exported!', 'success');
}

function resetCity() {
  if (!confirm('Reset entire city? This cannot be undone!')) return;
  localStorage.removeItem(SAVE_KEY);
  location.reload();
}

function autoSave() {
  saveState();
}

/* ═══════════════════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════════════════ */
var TOAST_TIMER = null;

function showToast(msg, type) {
  var t = document.getElementById('toast');
  if (!t) return;
  
  t.textContent = msg;
  t.className = 'toast';
  if (type) t.classList.add(type);
  
  setTimeout(function () { t.classList.add('show'); }, 10);
  
  clearTimeout(TOAST_TIMER);
  TOAST_TIMER = setTimeout(function () {
    t.classList.remove('show');
  }, 2500);
}

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */
function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ═══════════════════════════════════════════════════════
   ZOOM CONTROLS
   ═══════════════════════════════════════════════════════ */
function zoomIn() {
  if (typeof zoomCamera === 'function') {
    zoomCamera(1.2);
    showToast('🔍 Zoom In');
  }
}

function zoomOut() {
  if (typeof zoomCamera === 'function') {
    zoomCamera(0.8);
    showToast('🔍 Zoom Out');
  }
}

function resetCamera() {
  if (typeof resetCameraPosition === 'function') {
    resetCameraPosition();
    showToast('🏠 Camera Reset');
  }
}

/* ═══════════════════════════════════════════════════════
   OPEN MENU
   ═══════════════════════════════════════════════════════ */
function openMenu() {
  openSidePanel('🌆 NXT NEURAL CITY', 
    '<div style="padding:16px">' +
      '<div style="text-align:center;margin-bottom:20px">' +
        '<div style="font-size:60px">🌆</div>' +
        '<h3 style="color:#00d4ff;font-family:Orbitron;margin-top:12px">NXT NEURAL CITY</h3>' +
        '<p style="color:#7a8194;font-size:12px">v1.0</p>' +
      '</div>' +
      '<div style="background:rgba(0,212,255,.06);border-radius:12px;padding:16px;margin-bottom:12px">' +
        '<div style="font-size:11px;color:#7a8194;text-transform:uppercase;letter-spacing:1px">Mayor</div>' +
        '<div style="font-size:20px;font-weight:800;color:#00d4ff">AL-AMIN</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">' +
        '<div style="background:rgba(34,197,94,.1);padding:12px;border-radius:8px;text-align:center">' +
          '<div style="font-size:24px;font-weight:800;color:#22c55e">' + STATE.time.day + '</div>' +
          '<div style="font-size:10px;color:#7a8194">Days</div>' +
        '</div>' +
        '<div style="background:rgba(255,215,0,.1);padding:12px;border-radius:8px;text-align:center">' +
          '<div style="font-size:20px;font-weight:800;color:#ffd700">' + formatNumber(Math.floor(STATE.treasury)) + '</div>' +
          '<div style="font-size:10px;color:#7a8194">Treasury</div>' +
        '</div>' +
      '</div>' +
      '<p style="color:#cbd5e1;font-size:13px;line-height:1.6">' +
        '🌆 AI-Powered Living Digital Twin<br>' +
        '👥 1000+ AI Citizens<br>' +
        '🚗 Real-time Traffic<br>' +
        '💰 Dynamic Economy<br>' +
      '</p>' +
    '</div>'
  );
}

/* ═══════════════════════════════════════════════════════
   EVENT BINDING
   ═══════════════════════════════════════════════════════ */
function bindEvents() {
  // Keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
      closeBuildMenu();
      closeSettings();
      closeSidePanel();
    }
    
    if (e.key === ' ') {
      e.preventDefault();
      togglePause();
    }
  });
}

/* ═══════════════════════════════════════════════════════
   END OF MAIN.JS
   ═══════════════════════════════════════════════════════ */
console.log('%c🎮 Main.js loaded', 
  'color:#22c55e;font-family:monospace;font-weight:bold');
