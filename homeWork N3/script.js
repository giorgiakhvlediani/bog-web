import { canvas, config } from "./config/config.js";
import { makingSection } from "./playing/makingSection.js";
//import { playingSection } from "./playing/playingSection.js";
//import {direction, snakeSquares} from "./data.js";
let xRow = canvas.width / config.dx;
let yROw = canvas.height / config.dy;
let container = document.getElementById('container');
let start = document.getElementsByClassName("bttn");
let square;

let direction = {
    dx: config.dx,
    dy: 0,
}
let snakeSquares = [
    {
        x: config.dx * 2,
        y: 0,
        n: 1,
    },
    {
        x: config.dx,
        y: 0,
        n: 2,
    },
    {
        x: 0,
        y: 0,
        n: 3,
    },

]

// class makingSnake {

//     SquareList = [];
//     constructor(container) {
//         this.id = container;
//     }

//     set setSquaresList(data) {
//         this.SquareList = data;
//     }
//     renderSnakeSquare(obj) {
//         let newSeg = document.createElement('div');
//         container = document.getElementById('container');
//         container.appendChild(newSeg);
//         if (obj.n == 1) {
//             newSeg.classList.add("square")
//             newSeg.classList.add("head")
//         } else {
//             newSeg.classList.add("square");
//         }
//         newSeg.style.left = obj.x + "px";
//         newSeg.style.top = obj.y + "px";
//     }

//     renderSnakeSquareList() {
//         let list = this.SquareList;
//         console.log(list)
//         return list.forEach(this.renderSnakeSquare);
//     }
// }
// class playingSection {
//     movingSnake() {
//         let tail = document.getElementsByClassName("square");
//         let arr = snakeSquares;
//         for (let i = arr.length - 1; i > 0; i--) {
//             snakeSquares[i].x = arr[i - 1].x;
//             snakeSquares[i].y = arr[i - 1].y;
//             tail[i].style.left = snakeSquares[i].x + 'px';
//             tail[i].style.top = snakeSquares[i].y + 'px';
//         }
//         snakeSquares[0].x = snakeSquares[0].x + direction.dx;
//         snakeSquares[0].y = snakeSquares[0].y + direction.dy;
//         tail[0].style.left = snakeSquares[0].x + 'px';
//         tail[0].style.top = snakeSquares[0].y + 'px';
//     }
//     changeDirection() {

//         document.addEventListener('keydown', (e) => {
//             if (e.keyCode === 38 && direction.dy !== -config.dy && direction.dy !== config.dy) {
//                 direction.dy = -config.dy;
//                 direction.dx = 0;
//             }
//             if (e.keyCode === 40 && direction.dy !== -config.dy && direction.dy !== config.dy) {
//                 direction.dy = config.dy;
//                 direction.dx = 0;
//             }

//             if (e.keyCode === 39 && direction.dx !== -config.dx && direction.dx !== config.dx) {
//                 direction.dy = 0;
//                 direction.dx = config.dx;

//             }
//             if (e.keyCode === 37 && direction.dx !== -config.dx && direction.dx !== config.dx) {
//                 direction.dy = 0;
//                 direction.dx = -config.dx;
//             }

//         })
//     }


// }
export class playingSection {
    SquareList = [];
    direction=[];

    constructor(direction) {
        console.log(direction);
        this.direction=direction;
        console.log( this.direction);
    }

    set setSquaresList(data) {
        this.SquareList = data;
        console.log(data, "ar bechdavs");
    } 
    
    movingSnake() {
        let tail = document.getElementsByClassName("square");
        let arr = this.SquareList;
        console.log(arr);
        for (let i = arr.length - 1; i > 0; i--) {
            this.SquareList[i].x = arr[i - 1].x;
            this.SquareList[i].y = arr[i - 1].y;
            tail[i].style.left = this.SquareList[i].x + 'px';
            tail[i].style.top = this.SquareList[i].y + 'px';
        }
        this.SquareList[0].x = this.SquareList[0].x + this.direction.dx;
        this.SquareList[0].y = this.SquareList[0].y + this.direction.dy;
        tail[0].style.left = this.SquareList[0].x + 'px';
        tail[0].style.top = this.SquareList[0].y + 'px';
    }
    changeDirection() {

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 38 &&  this.direction.dy !== -config.dy &&  this.direction.dy !== config.dy) {
                this.direction.dy = -config.dy;
                this.direction.dx = 0;
            }
            if (e.keyCode === 40 &&  this.direction.dy !== -config.dy &&  this.direction.dy !== config.dy) {
                this.direction.dy = config.dy;
                this.direction.dx = 0;
            }

            if (e.keyCode === 39 &&  this.direction.dx !== -config.dx &&  this.direction.dx !== config.dx) {
                this.direction.dy = 0;
                this.direction.dx = config.dx;

            }
            if (e.keyCode === 37 &&  this.direction.dx !== -config.dx &&  this.direction.dx !== config.dx) {
                this.direction.dy = 0;
                this.direction.dx = -config.dx;
            }

        })
    }


}

function addingSquare() {
    let squareXPosition = 0;
    let squareYPosition = 0;
    console.log(direction.dx, "Dy");
    if (direction.dx > 0) {
        squareXPosition = snakeSquares[snakeSquares.length - 1].x + direction.dx;
        squareYPosition = snakeSquares[0].y;
        console.log("es");
    } else {
        console.log(snakeSquares[snakeSquares.length - 1].x);
        squareXPosition = snakeSquares[snakeSquares.length - 1].x - direction.dx;
        squareYPosition = snakeSquares[snakeSquares.length - 1].y;
    }
    let square = {
        x: squareXPosition,
        y: squareYPosition,
    };
    snakeSquares.push(square);
    buildingSnake.renderSnakeSquare(square);
}

let buildingSnake = new makingSection(container);
let playing = new playingSection(direction);
createApple();
buildingSnake.setSquaresList = snakeSquares;
buildingSnake.renderSnakeSquareList();

function game() {
    playing.setSquaresList = snakeSquares, direction;
    playing.movingSnake();
    playing.changeDirection();
    checkApple();
    checkingBorder()
}


// createSnake
function createApple() {
    let newSeg = document.createElement('div');
    container.appendChild(newSeg);
    newSeg.classList.add("apple");
    let appleCreated=false;
 //   while(appleCreated==false) {
    let randomXPosition = parseInt(Math.random() * (xRow - 1) + 0);
    let randomYPosition = parseInt(Math.random() * (yROw - 1) + 0);
    let xCoordinate = randomXPosition * config.dx;
    let yCoordinate = randomYPosition * config.dy;
 //   for(let i=0; )
    newSeg.style.left = xCoordinate + "px";
    newSeg.style.top = yCoordinate + "px";
 //   }
}

function checkApple() {
    let apple = document.getElementsByClassName("apple");
    if (snakeSquares[0].x === apple[0].offsetLeft &&
        snakeSquares[0].y === apple[0].offsetTop) {
        console.log("esa");
        crashToApple()
    }
}
function crashToApple() {
    let allDivs = document.querySelectorAll("div");
    for (let i = 0; i < allDivs.length; i++) {
        console.log(allDivs[i].classList.remove("apple"));
    }
    createApple();
    addingSquare();
}

function checkingBorder() {
    square = document.getElementsByClassName("square");
    //  console.log(square);
    console.log(snakeSquares[0].y + square[0].offsetWidth > canvas.height);
    if (snakeSquares[0].x + square[0].offsetWidth > canvas.width ||
        snakeSquares[0].x < 0 ||
        snakeSquares[0].y + square[0].offsetWidth > canvas.height ||
        snakeSquares[0].y < 0) {
        clearInterval(playingSnake);
    }
}

let playingSnake = setInterval(game, 200);
// start[0].addEventListener('click', (event) => {
//     let playingSnake = setInterval(game, 200);
// })

