document.addEventListener('DOMContentLoaded', function () {
    const settingsToggler = document.querySelector('.settings-toggler');
    const settingsMenu = document.querySelector('.settings-menu');
    const fontSizeInput = document.getElementById('fontSize');
    const increaseFontBtn = document.getElementById('increaseFont');
    const decreaseFontBtn = document.getElementById('decreaseFont');
    const lineHeightInput = document.getElementById('lineHeight');
    const increaseLineHeightBtn = document.getElementById('increaseLineHeight');
    const decreaseLineHeightBtn = document.getElementById('decreaseLineHeight');

    settingsToggler.addEventListener('click', function () {
        settingsMenu.classList.toggle('active');
        toggleSettingsIcon();
    });

    fontSizeInput.addEventListener('input', function () {
        updateFontSize();
    });

    increaseFontBtn.addEventListener('click', function () {
        adjustFontSize(2);
    });

    decreaseFontBtn.addEventListener('click', function () {
        adjustFontSize(-2);
    });

    lineHeightInput.addEventListener('input', function () {
        updateLineHeight();
    });

    increaseLineHeightBtn.addEventListener('click', function () {
        adjustLineHeight(0.2);
    });

    decreaseLineHeightBtn.addEventListener('click', function () {
        adjustLineHeight(-0.2);
    });

    document.documentElement.style.setProperty('--main-color', '#754ef9');
    const themeColorInput = document.getElementById('themeColor');
    themeColorInput.addEventListener('input', function () {
        updateMainColor(themeColorInput.value);
    });

    const resetSettingsBtn = document.getElementById('resetSettings');
    resetSettingsBtn.addEventListener('click', function () {
        resetSettings();
    });

});

function resetSettings() {
    // Reset font size
    document.getElementById('fontSize').value = 10;

    // Reset line height
    document.getElementById('lineHeight').value = 1;

    // Reset main color
    document.getElementById('themeColor').value = '#754ef9';
    updateMainColor('#754ef9');

    // Update styles
    updateFontSize();
    updateLineHeight();
}

function updateMainColor(newColor) {
    document.documentElement.style.setProperty('--main-color', newColor);
}

function toggleSettingsIcon() {
    var iconElement = document.querySelector('.settings-toggler span');
    iconElement.textContent = (iconElement.textContent === 'settings_accessibility') ? 'close' : 'settings_accessibility';
}

function updateFontSize() {
    var fontSizeInput = document.getElementById('fontSize');
    var newFontSize = parseInt(fontSizeInput.value) || 10;
    newFontSize = Math.min(Math.max(newFontSize, 6), 14);
    document.documentElement.style.fontSize = newFontSize + 'px';
}

function adjustFontSize(adjustment) {
    var fontSizeInput = document.getElementById('fontSize');
    var currentFontSize = parseInt(fontSizeInput.value) || 10;
    var newFontSize = Math.min(Math.max(currentFontSize + adjustment, 6), 14);
    fontSizeInput.value = newFontSize;
    updateFontSize();
}

function updateLineHeight() {
    var lineHeightInput = document.getElementById('lineHeight');
    var newLineHeight = parseFloat(lineHeightInput.value) || 1;
    newLineHeight = Math.min(Math.max(newLineHeight, 1), 1.4);
    document.documentElement.style.lineHeight = newLineHeight + 0.6;
}

function adjustLineHeight(adjustment) {
    var lineHeightInput = document.getElementById('lineHeight');
    var currentLineHeight = parseFloat(lineHeightInput.value) || 1;
    var newLineHeight = Math.min(Math.max(currentLineHeight + adjustment, 1), 1.4);
    lineHeightInput.value = newLineHeight.toFixed(1);
    updateLineHeight();
}
