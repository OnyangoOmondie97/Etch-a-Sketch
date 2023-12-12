const container = document.getElementById('container');
const sizeBtn = document.getElementById('size-btn');

function createGrid(size) {
    container.innerHTML = '';
    
    // Calculate the size of each grid square based on the container size
    const squareSize = Math.floor(container.clientWidth / size);
    
    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.style.width = `${squareSize}px`;
        gridSquare.style.height = `${squareSize}px`;
        container.appendChild(gridSquare);
    }

    addHoverEffect();
}

function addHoverEffect() {
    const gridSquares = document.querySelectorAll('.grid-square');

    gridSquares.forEach(square => {
        let interactions = 0;

        square.addEventListener('mouseover', () => {
            // Randomize RGB value
            square.style.backgroundColor = getRandomColor();

            // Progressive darkening effect
            if (interactions < 10) {
                interactions++;
                darkenSquare(square, 10 * interactions);
            }
        });
    });
}

function getRandomColor() {
    const getRandomValue = () => Math.floor(Math.random() * 256);
    return `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;
}

function darkenSquare(square, percent) {
    const currentColor = square.style.backgroundColor;
    const rgbValues = currentColor.match(/\d+/g);

    const newRed = Math.floor(rgbValues[0] * (1 - percent / 100));
    const newGreen = Math.floor(rgbValues[1] * (1 - percent / 100));
    const newBlue = Math.floor(rgbValues[2] * (1 - percent / 100));

    square.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
}

sizeBtn.addEventListener('click', () => {
    let newSize = prompt('Enter the number of squares per side (max 100):');
    newSize = parseInt(newSize);

    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a valid number between 1 and 100.');
    } else {
        createGrid(newSize);
    }
});

// Initial grid creation
createGrid(16);
