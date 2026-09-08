(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────────────────────
  let currentMode = 'lorem'; // "lorem" | "nonsense"
  let lastUrl = '';
  let apiPanelVisible = false;

  const STORAGE_KEY = 'tga_state';

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mode: currentMode,
      loremType: loremType.value,
      loremCount: loremCount.value,
      loremClassic: loremClassic.checked,
      nonsenseType: nonsenseType.value,
      nonsenseCount: nonsenseCount.value,
    }));
  }

  function restoreState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return;
      if (saved.loremType) loremType.value = saved.loremType;
      if (saved.loremCount) loremCount.value = saved.loremCount;
      if (saved.loremClassic != null) loremClassic.checked = saved.loremClassic;
      if (saved.nonsenseType) nonsenseType.value = saved.nonsenseType;
      if (saved.nonsenseCount) nonsenseCount.value = saved.nonsenseCount;
      if (saved.mode === 'nonsense') {
        currentMode = 'nonsense';
        tabLorem.classList.remove('active');
        tabNonsense.classList.add('active');
        tabLorem.setAttribute('aria-selected', 'false');
        tabNonsense.setAttribute('aria-selected', 'true');
        panelLorem.hidden = true;
        panelNonsense.hidden = false;
      }
    } catch {
      // ignore corrupt storage
    }
  }

  // ── Element refs ───────────────────────────────────────────────────────────
  const tabLorem = document.getElementById('tab-lorem');
  const tabNonsense = document.getElementById('tab-nonsense');
  const panelLorem = document.getElementById('panel-lorem');
  const panelNonsense = document.getElementById('panel-nonsense');
  const loremType = document.getElementById('lorem-type');
  const loremCount = document.getElementById('lorem-count');
  const nonsenseType = document.getElementById('nonsense-type');
  const nonsenseCount = document.getElementById('nonsense-count');
  const btnGenerate = document.getElementById('btn-generate');
  const output = document.getElementById('output');
  const btnCopy = document.getElementById('btn-copy');
  const btnShowApi = document.getElementById('btn-show-api');
  const apiPanel = document.getElementById('api-panel');
  const apiUrlDisplay = document.getElementById('api-url-display');
  const btnCopyUrl = document.getElementById('btn-copy-url');
  const loremClassic = document.getElementById('lorem-classic');
  const siteTitle = document.getElementById('site-title');

  // ── Dynamic hostname branding ──────────────────────────────────────────────
  const host = location.hostname;
  document.title = `${host} — text generation api`;
  siteTitle.innerHTML = host.split('.').join('<span>.</span>');

  // ── Helpers ────────────────────────────────────────────────────────────────
  function buildUrl() {
    const base = location.origin;
    if (currentMode === 'lorem') {
      const type = loremType.value; // "words" | "sentences" | "paragraphs"
      const count = clamp(parseInt(loremCount.value, 10) || 3);
      const classicParam = loremClassic.checked ? '?classic=false' : '';
      return `${base}/lorem/${type}/${count}${classicParam}`;
    } else {
      const type = nonsenseType.value; // "words" | "sentences"
      const count = clamp(parseInt(nonsenseCount.value, 10) || 3);
      return `${base}/nonsense/${type}/${count}`;
    }
  }

  function clamp(n) {
    return Math.max(1, Math.min(100, isNaN(n) ? 1 : n));
  }

  function showOutput(text, isError) {
    output.value = text;
    output.classList.toggle('error', !!isError);
  }

  function tempLabel(btn, label, original, ms) {
    btn.textContent = label;
    btn.classList.add(label.toLowerCase().replace(/[^a-z]/g, ''));
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove(
        label.toLowerCase().replace(/[^a-z]/g, ''),
      );
    }, ms || 1800);
  }

  async function copyToClipboard(
    text,
    btn,
    successLabel,
    originalLabel,
  ) {
    try {
      await navigator.clipboard.writeText(text);
      tempLabel(btn, successLabel, originalLabel);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy');
        tempLabel(btn, successLabel, originalLabel);
      } catch {
        // silently fail
      }
      document.body.removeChild(ta);
    }
  }

  // ── API fetch ──────────────────────────────────────────────────────────────
  function refreshApiUrl() {
    lastUrl = buildUrl();
    if (apiPanelVisible) {
      apiUrlDisplay.textContent = lastUrl;
    }
    return lastUrl;
  }

  async function generate() {
    const url = refreshApiUrl();

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const text = await res.text();
      showOutput(text, false);
    } catch (err) {
      showOutput(
        `Error: ${err.message}\n\nMake sure the server is running:\n  npm start`,
        true,
      );
    }
  }

  // ── Mode switching ─────────────────────────────────────────────────────────
  function switchMode(mode) {
    currentMode = mode;

    tabLorem.classList.toggle('active', mode === 'lorem');
    tabNonsense.classList.toggle('active', mode === 'nonsense');
    tabLorem.setAttribute('aria-selected', mode === 'lorem');
    tabNonsense.setAttribute('aria-selected', mode === 'nonsense');

    panelLorem.hidden = mode !== 'lorem';
    panelNonsense.hidden = mode !== 'nonsense';

    saveState();
    generate();
  }

  // ── API panel toggle ───────────────────────────────────────────────────────
  function toggleApiPanel(forceOpen) {
    if (forceOpen !== undefined) {
      apiPanelVisible = forceOpen;
    } else {
      apiPanelVisible = !apiPanelVisible;
    }

    if (apiPanelVisible) {
      apiUrlDisplay.textContent = lastUrl;
      apiPanel.classList.add('visible');
      btnShowApi.classList.add('active');
      btnShowApi.textContent = 'Hide API endpoint';
    } else {
      apiPanel.classList.remove('visible');
      btnShowApi.classList.remove('active');
      btnShowApi.textContent = 'Show API endpoint';
    }
  }

  // ── Event listeners ────────────────────────────────────────────────────────
  tabLorem.addEventListener('click', () => switchMode('lorem'));
  tabNonsense.addEventListener('click', () => switchMode('nonsense'));

  btnGenerate.addEventListener('click', generate);

  function onSettingChange() {
    saveState();
    refreshApiUrl();
  }

  [loremType, nonsenseType].forEach((el) => el.addEventListener('change', onSettingChange));
  [loremCount, nonsenseCount].forEach((el) => {
    el.addEventListener('input', onSettingChange);
    el.addEventListener('change', onSettingChange);
  });
  loremClassic.addEventListener('change', onSettingChange);

  // Re-generate on Enter in count inputs
  [loremCount, nonsenseCount].forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') generate();
    });
  });

  btnCopy.addEventListener('click', () => {
    if (!output.value) return;
    copyToClipboard(output.value, btnCopy, 'Copied!', 'Copy');
  });

  btnShowApi.addEventListener('click', () => {
    toggleApiPanel();
  });

  btnCopyUrl.addEventListener('click', () => {
    if (!lastUrl) return;
    copyToClipboard(lastUrl, btnCopyUrl, 'Copied!', 'Copy URL');
  });

  // ── Init ───────────────────────────────────────────────────────────────────
  restoreState();
  generate();
})();
