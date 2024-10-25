function generateColors() {
    const startColor = document.getElementById('startColor').value.trim();
    const endColor = document.getElementById('endColor').value.trim();
    const numVariants = parseInt(document.getElementById('numVariants').value);

    if (!startColor || !endColor || isNaN(numVariants) || numVariants < 1) {
        alert('Please provide valid input values.');
        return;
    }

    const startRGB = hexToRgb(startColor);
    const endRGB = hexToRgb(endColor);
    const colorVariants = generateColorVariants(startRGB, endRGB, numVariants);
    displayColors(colorVariants);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function generateColorVariants(startRGB, endRGB, numVariants) {
    const colors = [];
    for (let i = 0; i < numVariants; i++) {
        const r = Math.round(startRGB[0] + (endRGB[0] - startRGB[0]) * (i / (numVariants - 1)));
        const g = Math.round(startRGB[1] + (endRGB[1] - startRGB[1]) * (i / (numVariants - 1)));
        const b = Math.round(startRGB[2] + (endRGB[2] - startRGB[2]) * (i / (numVariants - 1)));
        colors.push(rgbToHex(r, g, b));
    }
    return colors;
}

function displayColors(colors) {
    const colorCards = document.getElementById('colorCards');
    colorCards.innerHTML = '';
    colors.forEach(color => {
        const card = document.createElement('div');
        card.className = 'card color-card col-md-2';
        card.style.backgroundColor = color;
        card.innerHTML = `<div class="card-body text-white"><h5 class="card-title mb-0">${color}</h5></div>`;
        colorCards.appendChild(card);
    });
}