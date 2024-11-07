let rightPressed = false;
let leftPressed = false;

// Event listeners for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Handle key down
function keyDownHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

// Handle key up
function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

export function handleInput() {
    const paddleSpeed = 0.05;
    if(rightPressed) {
        // Move paddle right
        // Implement paddle movement logic
    }
    else if(leftPressed) {
        // Move paddle left
        // Implement paddle movement logic
    }
} 