import { config } from "./config/config.js";
import { makingSnake } from "./playing/makingSnake.js";
import { snakeMovements } from "./playing/snakeMovements.js";
import { direction, snakeSquares } from "./data/data.js";
let xRow = config.width / config.dx;
let yROw = config.height / config.dy;
let container = document.getElementById('container');
let button = document.getElementsByClassName("bttn");
let square;
let playingSnake;
let score = 0;
let clicked = 0;


class appleClass {
    scores = []
    set setScores(data) {
        this.scores = data;
    }
    createApple() {
        let newSeg = document.createElement('div');
        container.appendChild(newSeg);
        newSeg.classList.add("apple");
        let appleCreated = false;
        let xCoordinate;
        let yCoordinate;
        while (appleCreated === false) {
            let randomXPosition = parseInt(Math.random() * (xRow - 1) + 0);
            let randomYPosition = parseInt(Math.random() * (yROw - 1) + 0);
            xCoordinate = randomXPosition * config.dx;
            yCoordinate = randomYPosition * config.dy;
            for (let i = 0; i < snakeSquares.length; i++) {
                if (xCoordinate === snakeSquares[i].x && yCoordinate === snakeSquares[i].y) {
                    break;
                }
                if (i === snakeSquares.length - 1) {
                    appleCreated = true;
                }
            }
        }
        newSeg.style.left = xCoordinate + "px";
        newSeg.style.top = yCoordinate + "px";
    }

    checkApple() {
        let apple = document.getElementsByClassName("apple");
        if (snakeSquares[0].x === apple[0].offsetLeft &&
            snakeSquares[0].y === apple[0].offsetTop) {
            this.scores++;
            score = this.scores;
            document.getElementsByClassName("score")[0].innerText = score;
            console.log(document.getElementsByClassName("score"));
            this.removeApple()

        }
    }
    removeApple() {
        let elem = document.getElementsByClassName("apple");
        console.log(elem);
        container.removeChild(elem[0]);
        this.createApple();
        this.addingSquare();
    }

    addingSquare() {
        let squareXPosition = 0;
        let squareYPosition = 0;
        squareXPosition = snakeSquares[snakeSquares.length - 1].x;
        squareYPosition = snakeSquares[snakeSquares.length - 1].y;
        let square = {
            x: squareXPosition,
            y: squareYPosition,
        };
        snakeSquares.push(square);
        buildingSnake.renderSnakeSquare(square);
    }
}

let buildingSnake = new makingSnake(container);
let movement = new snakeMovements(direction);
let appleFunctions = new appleClass(score);
appleFunctions.setScores = score;
appleFunctions.createApple();
buildingSnake.setSquaresList = snakeSquares;
buildingSnake.renderSnakeSquareList();
clicking();

function game() {
    playingGame();
}
function playingGame() {
    movement.setSquaresList = snakeSquares;
    movement.movingSnake();
    movement.changeDirection();
    appleFunctions.checkApple();
    crashingYourself();
    checkingBorder();
}

function crashingYourself() {
    for (let i = 1; i < snakeSquares.length; i++) {
        if (snakeSquares[0].x === snakeSquares[i].x && snakeSquares[0].y === snakeSquares[i].y) {
            let str = "you killed yourself, score: ";
            losing(str);

        }
    }
}

function checkingBorder() {
    square = document.getElementsByClassName("square");
    console.log(snakeSquares[0].y + square[0].offsetWidth > config.height);
    if (snakeSquares[0].x + square[0].offsetWidth > config.width ||
        snakeSquares[0].x < 0 ||
        snakeSquares[0].y + square[0].offsetWidth > config.height ||
        snakeSquares[0].y < 0) {
        let str = "collapssed to border, your score "
        losing(str);

    }
}

function losing(str) {
    clearInterval(playingSnake);
    setTimeout(function () {
        alert(str + score);
    }, 0)
    clicked = 2;
}


function clicking() {
    for (let elem of button) {
        elem.addEventListener('click', (event) => {
            if (elem.innerText === "start" && clicked === 0) {
                playingSnake = setInterval(game, 200);
                clicked++;
            }
            if (clicked === 1) {
                if (clicked == 1 && elem.innerText === "pause" || elem.innerText === "resume") {
                    if (elem.innerText === "pause") {
                        clearInterval(playingSnake);
                        elem.innerText = "resume";
                    } else {
                        elem.innerText = "pause";
                        playingSnake = setInterval(game, 200);
                    }

                }

            }
        })
    }
}
