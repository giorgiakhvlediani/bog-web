import { config } from "./config.js";


let dx = config.dx;
let dy = config.dx;
let snake = document.getElementById("head");
let container = document.getElementById('container');
let start = document.getElementsByClassName("bttn");
let snakeSquares = [{
    x: 100,
    y: 100,
}
]

class playingSection {

    SquareList = [];
    constructor(container) {
        this.id = container;
    }

    set setSquaresList(data) {
        this.SquareList = data;
    }
    renderSnakeSquare(obj) {
        let newSeg = document.createElement('div');
        container = document.getElementById('container');
        container.appendChild(newSeg);
        newSeg.classList.add("square");
        newSeg.style.left = obj.x + "px";
        newSeg.style.top = obj.y + "px";

    }

    renderSnakeSquareList() {
        return this.SquareList.forEach(this.renderSnakeSquare);
    }

    movingSnake() {
        let x = snake.offsetLeft;
        let y = snake.offsetTop;
        console.log(x);
        if (dx !== 0) {
            dy = 0;
        }
        if (snake.offsetLeft > 0 && snake.offsetLeft + snake.offsetWidth <
            container.offsetWidth && snake.offsetTop > 0 && snake.offsetTop + snake.offsetHeight
            < container.offsetHeight) {
            x = x + dx;
            y = y + dy;
        }
        snake.style.left = x + 'px';
        snake.style.top = y + 'px';
    }
    changeDirection() {

        document.addEventListener('keydown', (e) => {

            if (e.keyCode === 38) {
                dy = -config.dy;
                dx = 0;
            }


            if (e.keyCode === 40) {
                dy = config.dy;
                dx = 0;
            }

            if (e.keyCode === 39) {
                dy = 0;
                dx = config.dx;
                console.log("41")

            }
            if (e.keyCode === 37) {
                dy = 0;
                dx = -config.dx;
                console.log("ra")
            }

        })
    }


}



let playing = new playingSection(container);
function game() {
    playing.movingSnake();
    playing.changeDirection();
    playing.setSquaresList = snakeSquares;
    //   checkApple();
}

createApple();

// createSnake
function createApple() {
    let newSeg = document.createElement('div');
    let container = document.getElementById('container');
    container.appendChild(newSeg);
    newSeg.classList.add("apple");
    let xCoordinate = Math.floor(Math.random() * container.offsetWidth - 10) + 10;
    let yCoordinate = Math.floor(Math.random() * container.offsetHeight - 10) + 10;
    console.log(xCoordinate);
    console.log(container.offsetLeft);
    console.log(container.offsetWidth);
    newSeg.style.left = xCoordinate + "px";
    newSeg.style.top = yCoordinate + "px";

}
// function checkApple() {
//     let apple=document.getElementsByClassName("apple");
//     console.log(apple[0].offsetLeft, snake.offsetLeft);

//     if(apple[0].offsetLeft>=snake.offsetLeft && snake.offsetTop[0]==apple.offsetTop) {  
//         console.log("rame qeni")
//         playing.renderSnakeSquareList();
//     }
// }

start[0].addEventListener('click', (event) => {
    setInterval(game, 1000);
})

