// Demo variables y límites
let currentFontSizeDemo = 1;
const minFontSizeDemo = 0.33;
const maxFontSizeDemo = 3;

// Global variables y límites
let currentFontSizeGlobal = 1;
const minFontSizeGlobal = 0.33;
const maxFontSizeGlobal = 3;

// Elementos demo
const demoBox = document.getElementById('demo-box');
const increaseFontDemo = document.getElementById('increase-font-demo');
const decreaseFontDemo = document.getElementById('decrease-font-demo');
const toggleDarkDemo = document.getElementById('toggle-dark-demo');
const toggleContrastDemo = document.getElementById('toggle-contrast-demo');
const toggleCursorDemo = document.getElementById('toggle-cursor-demo');
const toggleImagesDemo = document.getElementById('toggle-images-demo');
const toggleLinksDemo = document.getElementById('toggle-links-demo');
const colorBlindDemo = document.getElementById('color-blind-demo');

// Elementos globales
const body = document.body;
const increaseFontGlobal = document.getElementById('increase-font');
const decreaseFontGlobal = document.getElementById('decrease-font');
const toggleDarkGlobal = document.getElementById('toggle-dark');
const toggleContrastGlobal = document.getElementById('toggle-contrast');
const toggleCursorGlobal = document.getElementById('toggle-cursor');
const toggleImagesGlobal = document.getElementById('toggle-images');
const toggleLinksGlobal = document.getElementById('toggle-links');
const changeFontGlobal = document.getElementById('change-font');
const colorBlindGlobal = document.getElementById('color-blind');

// --- Funciones para demo-box ---
function applyFontSizeDemo() {
  demoBox.style.fontSize = (currentFontSizeDemo * 100) + "%";
}
function applyFontFamilyDemo(font) {
  demoBox.style.fontFamily = font;
}
function toggleClassDemo(className) {
  if (demoBox.classList.contains(className)) {
    demoBox.classList.remove(className);
    return false;
  } else {
    demoBox.classList.add(className);
    return true;
  }
}

// Eventos demo
increaseFontDemo?.addEventListener('click', () => {
  if (currentFontSizeDemo < maxFontSizeDemo) {
    currentFontSizeDemo = Math.min(maxFontSizeDemo, currentFontSizeDemo + 0.1);
    applyFontSizeDemo();
  }
});
decreaseFontDemo?.addEventListener('click', () => {
  if (currentFontSizeDemo > minFontSizeDemo) {
    currentFontSizeDemo = Math.max(minFontSizeDemo, currentFontSizeDemo - 0.1);
    applyFontSizeDemo();
  }
});
toggleDarkDemo?.addEventListener('click', () => {
  const enabled = toggleClassDemo('dark-mode-demo');
  toggleDarkDemo.setAttribute('aria-pressed', enabled);
});
toggleContrastDemo?.addEventListener('click', () => {
  const enabled = toggleClassDemo('high-contrast-demo');
  toggleContrastDemo.setAttribute('aria-pressed', enabled);
});
toggleCursorDemo?.addEventListener('click', () => {
  const enabled = toggleClassDemo('cursor-large-demo');
  toggleCursorDemo.setAttribute('aria-pressed', enabled);
});
toggleImagesDemo?.addEventListener('click', () => {
  const enabled = toggleClassDemo('no-images-demo');
  toggleImagesDemo.setAttribute('aria-pressed', enabled);
});
toggleLinksDemo?.addEventListener('click', () => {
  const enabled = toggleClassDemo('no-links-demo');
  toggleLinksDemo.setAttribute('aria-pressed', enabled);
});
colorBlindDemo?.addEventListener('change', () => {
  demoBox.classList.remove('color-blind-rg-demo', 'color-blind-by-demo');
  if (colorBlindDemo.value !== 'normal') {
    demoBox.classList.add(colorBlindDemo.value + '-demo');
  }
});

// --- Funciones para body y toda la página ---
function applyFontSizeGlobal() {
  document.documentElement.style.fontSize = (currentFontSizeGlobal * 100) + "%";
}
function applyFontFamilyGlobal(font) {
  body.style.fontFamily = font;
  document.querySelectorAll('header, main, footer, nav, h1, h2, h3, h4, h5, p, a, li').forEach(el => {
    el.style.fontFamily = font;
  });
}
function toggleClassGlobal(className) {
  return body.classList.toggle(className);
}

// --- Cargar configuraciones guardadas al cargar la página ---
document.addEventListener('DOMContentLoaded', () => {
  // Fuente tamaño
  const savedFontSize = localStorage.getItem('fontSizeGlobal');
  if (savedFontSize) {
    currentFontSizeGlobal = parseFloat(savedFontSize);
    applyFontSizeGlobal();
  }

  // Fuente familia
  const savedFontFamily = localStorage.getItem('fontFamilyGlobal');
  if (savedFontFamily) {
    changeFontGlobal.value = savedFontFamily;
    applyFontFamilyGlobal(savedFontFamily);
  }

  // Modo oscuro
  const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
  if (darkModeEnabled) {
    body.classList.add('dark-mode');
    toggleDarkGlobal.setAttribute('aria-pressed', 'true');
  } else {
    body.classList.remove('dark-mode');
    toggleDarkGlobal.setAttribute('aria-pressed', 'false');
  }

  // Alto contraste
  const contrastEnabled = localStorage.getItem('highContrastEnabled') === 'true';
  if (contrastEnabled) {
    body.classList.add('high-contrast');
    toggleContrastGlobal.setAttribute('aria-pressed', 'true');
  } else {
    body.classList.remove('high-contrast');
    toggleContrastGlobal.setAttribute('aria-pressed', 'false');
  }

  // Cursor grande
  const cursorEnabled = localStorage.getItem('cursorLargeEnabled') === 'true';
  if (cursorEnabled) {
    body.classList.add('cursor-large');
    toggleCursorGlobal.setAttribute('aria-pressed', 'true');
  } else {
    body.classList.remove('cursor-large');
    toggleCursorGlobal.setAttribute('aria-pressed', 'false');
  }

  // Quitar imágenes
  const imagesDisabled = localStorage.getItem('noImagesEnabled') === 'true';
  if (imagesDisabled) {
    body.classList.add('no-images');
    toggleImagesGlobal.setAttribute('aria-pressed', 'true');
  } else {
    body.classList.remove('no-images');
    toggleImagesGlobal.setAttribute('aria-pressed', 'false');
  }

  // Quitar links
  const linksDisabled = localStorage.getItem('noLinksEnabled') === 'true';
  if (linksDisabled) {
    body.classList.add('no-links');
    toggleLinksGlobal.setAttribute('aria-pressed', 'true');
  } else {
    body.classList.remove('no-links');
    toggleLinksGlobal.setAttribute('aria-pressed', 'false');
  }

  // Daltonismo - filtro color
  const savedColorBlind = localStorage.getItem('colorBlindGlobal') || 'normal';
  body.classList.remove('color-blind-rg', 'color-blind-by');
  if (savedColorBlind !== 'normal') {
    body.classList.add(savedColorBlind);
  }
  colorBlindGlobal.value = savedColorBlind;
});

// --- Eventos globales ---
increaseFontGlobal?.addEventListener('click', () => {
  if (currentFontSizeGlobal < maxFontSizeGlobal) {
    currentFontSizeGlobal = Math.min(maxFontSizeGlobal, currentFontSizeGlobal + 0.1);
    applyFontSizeGlobal();
    localStorage.setItem('fontSizeGlobal', currentFontSizeGlobal);
  }
});

decreaseFontGlobal?.addEventListener('click', () => {
  if (currentFontSizeGlobal > minFontSizeGlobal) {
    currentFontSizeGlobal = Math.max(minFontSizeGlobal, currentFontSizeGlobal - 0.1);
    applyFontSizeGlobal();
    localStorage.setItem('fontSizeGlobal', currentFontSizeGlobal);
  }
});

changeFontGlobal?.addEventListener('change', () => {
  applyFontFamilyGlobal(changeFontGlobal.value);
  localStorage.setItem('fontFamilyGlobal', changeFontGlobal.value);
});

toggleDarkGlobal?.addEventListener('click', () => {
  const enabled = toggleClassGlobal('dark-mode');
  toggleDarkGlobal.setAttribute('aria-pressed', enabled);
  localStorage.setItem('darkModeEnabled', enabled);
});

toggleContrastGlobal?.addEventListener('click', () => {
  const enabled = toggleClassGlobal('high-contrast');
  toggleContrastGlobal.setAttribute('aria-pressed', enabled);
  localStorage.setItem('highContrastEnabled', enabled);
});

toggleCursorGlobal?.addEventListener('click', () => {
  const enabled = toggleClassGlobal('cursor-large');
  toggleCursorGlobal.setAttribute('aria-pressed', enabled);
  localStorage.setItem('cursorLargeEnabled', enabled);
});

toggleImagesGlobal?.addEventListener('click', () => {
  const enabled = toggleClassGlobal('no-images');
  toggleImagesGlobal.setAttribute('aria-pressed', enabled);
  localStorage.setItem('noImagesEnabled', enabled);
});

toggleLinksGlobal?.addEventListener('click', () => {
  const enabled = toggleClassGlobal('no-links');
  toggleLinksGlobal.setAttribute('aria-pressed', enabled);
  localStorage.setItem('noLinksEnabled', enabled);
});

colorBlindGlobal?.addEventListener('change', () => {
  body.classList.remove('color-blind-rg', 'color-blind-by');
  if (colorBlindGlobal.value !== 'normal') {
    body.classList.add(colorBlindGlobal.value);
  }
  localStorage.setItem('colorBlindGlobal', colorBlindGlobal.value);
});

// Botón flotante para mostrar/ocultar menú accesibilidad
const btnAccessibility = document.getElementById('btn-accessibility');
const menuAccessibility = document.getElementById('accesibilidad');

btnAccessibility.addEventListener('click', () => {
  const isHidden = menuAccessibility.hasAttribute('hidden');
  if (isHidden) {
    menuAccessibility.removeAttribute('hidden');
    btnAccessibility.setAttribute('aria-expanded', 'true');
  } else {
    menuAccessibility.setAttribute('hidden', '');
    btnAccessibility.setAttribute('aria-expanded', 'false');
  }
});

// Botón hamburguesa menú principal
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  const isActive = mainNav.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isActive);
});
