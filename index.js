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
const foundCheeseh1 = document.getElementById('foundCheese');
foundCheeseh1.appendChild(cheeseImage);
foundCheeseh1.style.display = 'none';

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
board[0][0].revealed = true;
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
    } else if (catPosition.x === catTwoPosition.x && catPosition.y === catTwoPosition.y) {
        catTwoPosition.x = Math.floor(Math.random() * cols),
        catTwoPosition.y = Math.floor(Math.random() * rows)
    }
}
endGoalFix();

console.log(board);
console.log(board.length);

board[catPosition.x][catPosition.y].hasCat = true;
board[catTwoPosition.x][catTwoPosition.y].hasCat = true;
board[cheesePosition.x][cheesePosition.y].hasCheese = true;
console.log(catPosition);
console.log(cheesePosition);
console.log(board);

function mouseMotion(x, y) {
    if (!board[y][x].revealed) {
        board[y][x].revealed = true;
        c.fillStyle = board[y][x].hasCat ? "red" : (board[y][x].hasCheese ? "yellow" : "lightgrey");
        c.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        if (board[y][x].hasCat === true) {
            c.drawImage(catImage, x * cellSize, y * cellSize, cellSize, cellSize);
        }
        if (board[y][x].hasCheese === true) {
            c.drawImage(cheeseImage, x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

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
function endGame() {
    document.removeEventListener('keydown', function(e) {
        canvasMouseOver(e);
    })
}


document.addEventListener('keydown', function(e) {
    if (e.key === 'w' || e.key === 'W') {
        mousePosition.y--;
        mouseMotion(mousePosition.x, mousePosition.y);
        console.log(mousePosition);
        console.log(board);
        drawBoard();
    } else if (e.key === 'a' || e.key === 'A') {
        mousePosition.x--;
        
        mouseMotion(mousePosition.x, mousePosition.y);
        console.log(mousePosition);
        drawBoard();
    } else if (e.key === 's' || e.key === 'S') {
        mousePosition.y++;
        
        mouseMotion(mousePosition.x, mousePosition.y);
        console.log(mousePosition);
        drawBoard();
    } else if (e.key === 'd' || e.key === 'D') {
        mousePosition.x++;
        
        mouseMotion(mousePosition.x, mousePosition.y);
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
        mouseLives = 0;
        if (mouseLives = 0) {
            endGame();
        }
    } else if (mousePosition.x === cheesePosition.x && mousePosition.y === cheesePosition.y) {
        c.drawImage(cheeseImage, cheesePosition.x * cellSize, cheesePosition.y * cellSize, cellSize, cellSize);
    }
})

drawBoard();

