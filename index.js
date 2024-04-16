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

const cellSize = 100;
const rows = 6;
const cols = 6;

const board = [];
console.log(board);
for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
        row.push({ revealed: false, hasCat: false });
    }
    board.push(row);
}

let mousePosition = {
    x: 0,
    y: 0,
};

board[mousePosition.y][mousePosition.x].revealed = true;

let catPosition = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
};

let cheesePosition = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
};

while (catPosition.x === cheesePosition.x && catPosition.y === cheesePosition.y) {
    cheesePosition = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
    };
}

board[catPosition.y][catPosition.x].hasCat = true;
board[cheesePosition.y][cheesePosition.x].hasCheese = true;

function revealSpace(x, y) {
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

document.addEventListener("keydown", function(event) {
    const key = event.key.toLowerCase();
    switch (key) {
        case "w":
            if (mousePosition.y > 0) {
                mousePosition.y--;
                revealSpace(mousePosition.x, mousePosition.y);
                c.drawImage(mouseImage);
            }
            break; 
        case "a":
            if (mousePosition.x > 0) {
                mousePosition.x--;
                revealSpace(mousePosition.x, mousePosition.y);
                c.drawImage(mouseImage);
            }
            break;
        case "s":
            if (mousePosition.y < rows - 1) {
                mousePosition.y++;
                revealSpace(mousePosition.x, mousePosition.y);
                c.drawImage(mouseImage);    
            }
            break;
        case "d":
            if (mousePosition.x < cols - 1) {
                mousePosition.x++;
                revealSpace(mousePosition.x, mousePosition.y);
                
            }    
            break;
    }

    if (mousePosition.x === catPosition.x && mousePosition.y === catPosition.y) {
        alert("Oh No! You've been caught!");
    } else if (mousePosition.x === cols - 1 && mousePosition.y === rows - 1) {
        alert("You got the Cheese!");
    } else if (mousePosition.x === cheesePosition.x && mousePosition.y === cheesePosition.y) {
        alert("Got the Cheese! Now head home!");
    }
});

function drawBoard() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            c.fillStyle = "gray";
            c.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            c.strokeStyle = "black";
            c.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
   
    c.drawImage(mouseImage, mousePosition.x * cellSize, mousePosition.y * cellSize, cellSize, cellSize);
}
drawBoard();
