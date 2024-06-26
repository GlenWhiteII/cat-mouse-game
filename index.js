const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;


const mouseImage = new Image();
mouseImage.src = "./images/mouse-character-removebg-preview.png"; 

const catImage = new Image();
catImage.src = "./images/cat-character-removebg-preview.png"; 

const cheeseImage = new Image();
cheeseImage.src = "./images/cheese-character-removebg-preview.png"; 

const mouseHoleImage = new Image();
mouseHoleImage.src = "./images/mousehole-image.jpg";
const cellSize = 100;
const rows = 6;
const cols = 6;

// h1 Elements for the bottom of the screen
const foundCath1 = document.getElementById('foundCat');
foundCath1.appendChild(catImage);
foundCath1.style.display = 'none';
catImage.setAttribute('id', 'cat-image');

const foundCheeseh1 = document.getElementById('foundCheese');
foundCheeseh1.appendChild(cheeseImage);
foundCheeseh1.style.display = 'none';
cheeseImage.setAttribute('id', 'cheese-image');
const foundHoleh1 = document.getElementById('foundHome');
foundHoleh1.appendChild(mouseHoleImage);
foundHoleh1.style.display = 'none';
mouseHoleImage.setAttribute('id', 'mousehole-image');

const board = [];

for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
        row.push({
            revealed: false,
            hasCat: false,
            hasCheese: false,
        });
    }
    board.push(row);
};
let mouseLives = 1;

let mouseHolePosition = {
    x: 5,
    y: 5
};

let mousePosition = {
    x: 0,
    y: 0
};

let catPosition = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
}

let catTwoPosition = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
}

let cheesePosition = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
}
// Functions for potential malfunctions such as cats spawning in end goal position,
// starting position, or cheese position

function cheeseFix() {
    if (cheesePosition.x === catPosition.x && cheesePosition.y === catPosition.x) {
        cheesePosition.x = Math.floor(Math.random() * cols),
        cheesePosition.y = Math.floor(Math.random() * rows),
        console.log('Wow, it really happened');
    }
}
cheeseFix();

function endGoalFix() {
    if (catPosition.x === mouseHolePosition.x && catPosition.y === mouseHolePosition.y || catTwoPosition.x === mouseHolePosition.x && catTwoPosition.y === mouseHolePosition.y || catPosition.x === catTwoPosition.x && catPosition.y === catTwoPosition.y) {
        catPosition.x = Math.floor(Math.random() * cols),
        catPosition.y = Math.floor(Math.random() * rows),
        console.log('Cat in end goal fixed');
    } else if (catTwoPosition.x === mouseHolePosition.x && catTwoPosition.y === mouseHolePosition.y) {
        catTwoPosition.x = Math.floor(Math.random() * cols),
        catTwoPosition.y = Math.floor(Math.random() * rows)
    }
}
endGoalFix();
// ---------------------------------------------------------------------------

// Setting up the game board
board[catPosition.x][catPosition.y].hasCat = true;
board[catTwoPosition.x][catTwoPosition.y].hasCat = true;
board[cheesePosition.x][cheesePosition.y].hasCheese = true;
// ---------------------------------------------------------------------------
let winCondition = 0;
function mouseMotion() {
    if (mousePosition.x === catPosition.x && mousePosition.y === catPosition.y) {
        console.log('Caught by the cat!');
        foundCath1.style.display = 'block';
        alert('Caught by the cat!');
        winCondition -= 2;
    } else if (mousePosition.x === catTwoPosition.x && mousePosition.y === catTwoPosition.y) {
        console.log('Caught by the cat!'); 
        foundCath1.style.display = 'block';
        alert('Caught by the cat!');
        winCondition -= 2;
    } else if (mousePosition.x === cheesePosition.x && mousePosition.y === cheesePosition.y) {
        console.log('You found the cheese!');
        foundCheeseh1.style.display = 'block';
        alert('You found the cheese! Make it home!');
        winCondition += 1;
        console.log(winCondition);
    } else if (mousePosition.x === mouseHolePosition.x && mousePosition.y === mouseHolePosition.y) {
        console.log('You made it home!');
        if (winCondition === 1) {
            alert('You Win! Congratulations!')
            foundHoleh1.style.display = 'block';
        } else if (winCondition < 0) {
            alert('Press restart to try again!');
        } else {
            alert("Don't forget your cheese!");
        }
    }
}

// Creating the game board
function drawBoard() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            c.fillStyle = 'white';
            c.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            c.strokeStyle = 'black';
            c.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
    c.drawImage(mouseImage, mousePosition.x * cellSize, mousePosition.y * cellSize, cellSize, cellSize);
    c.drawImage(mouseHoleImage, mouseHolePosition.x * cellSize, mouseHolePosition.y * cellSize, cellSize, cellSize);
    }
    drawBoard();
// ------------------------------------------------------------------------------

// Adding event listeners for mouse movement
document.addEventListener('keydown', function(e) {
    if (e.key === 'w' || e.key === 'W') {
        mousePosition.y--;
        mouseMotion();
        console.log(mousePosition);
        console.log(board);
        drawBoard();
    } else if (e.key === 'a' || e.key === 'A') {
        mousePosition.x--;
        
        mouseMotion();
        console.log(mousePosition);
        drawBoard();
    } else if (e.key === 's' || e.key === 'S') {
        mousePosition.y++;
        
        mouseMotion();
        console.log(mousePosition);
        drawBoard();
    } else if (e.key === 'd' || e.key === 'D') {
        mousePosition.x++;
        
        mouseMotion();
        console.log(mousePosition);
        drawBoard();
    }
    if (mousePosition.x === catPosition.x && mousePosition.y === catPosition.y) {
        c.drawImage(catImage, catPosition.x * cellSize, catPosition.y * cellSize, cellSize, cellSize);
        mouseLives = 0;
        if (mouseLives = 0) {
            endGame();
        }
    } else if (mousePosition.x === catTwoPosition.x && mousePosition.y === catTwoPosition.y) {
        c.drawImage(catImage, catTwoPosition.x * cellSize, catTwoPosition.y * cellSize, cellSize, cellSize);
        
    } else if (mousePosition.x === cheesePosition.x && mousePosition.y === cheesePosition.y) {
        c.drawImage(cheeseImage, cheesePosition.x * cellSize, cheesePosition.y * cellSize, cellSize, cellSize);
    }
})
// -------------------------------------------------------------------------

// Restart Button until I find a better method

function refreshPage() {
    history.go(0);
};
// -------------------------------------------------------------------------