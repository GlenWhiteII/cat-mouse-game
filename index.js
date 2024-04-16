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

const board = [];

for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
        row.push({
            revealed: false,
            hasCat: false,
            hasCheese: false,
            hasMouse: false
        });
    }
    board.push(row);
};
board[0][0].revealed = true;

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


console.log(board);
console.log(board.length);

board[catPosition.x][catPosition.y].hasCat = true;
board[catTwoPosition.x][catTwoPosition.y].hasCat = true;
board[cheesePosition.x][cheesePosition.y].hasCheese = true;
console.log(catPosition);
console.log(cheesePosition);
console.log(board);

function mouseMotion() {
    c.drawImage(mouseImage, mousePosition.x * cellSize, mousePosition.y * cellSize, cellSize, cellSize)
    c.fillStyle = board[mousePosition.x][mousePosition.y].hasCat ? "red" : (board[mousePosition.x][mousePosition.y].hasCheese ? "yellow" : "lightgrey");
    if (board[mousePosition.x][mousePosition.y].hasCat === true) {
        console.log('found cat');
        c.drawImage(catImage, catPosition.x * cellSize, catPosition.y * cellSize, cellSize, cellSize);

    } else if (board[mousePosition.x][mousePosition.y].hasCheese === true) {
        c.drawImage(cheeseImage, cheesePosition.x * cellSize, cheesePosition.y * cellSize, cellSize, cellSize);
        console.log('found cheese');
    } else {
        console.log(board[mousePosition.x][mousePosition.y]);
        console.log(board[catPosition.x][catPosition.y]);
    }
};

function drawBoard() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            c.fillStyle = 'white';
            c.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            c.strokeStyle = 'black';
            c.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
<<<<<<< HEAD
=======
   
>>>>>>> 490cf9f8a509ab8e51d7951cfea80a3102345de5
    c.drawImage(mouseImage, mousePosition.x * cellSize, mousePosition.y * cellSize, cellSize, cellSize);
    c.drawImage(mouseHoleImage, mouseHolePosition.x * cellSize, mouseHolePosition.y * cellSize, cellSize, cellSize);
}


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
})

drawBoard();

