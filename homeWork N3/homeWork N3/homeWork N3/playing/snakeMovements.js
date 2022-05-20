import { config } from "../config/config.js";


export class snakeMovements {
    SquareList = [];
    direction = [];

    constructor(direction) {
        this.direction = direction;
    }

    set setSquaresList(data) {
        this.SquareList = data;
    }

    movingSnake() {
        let tail = document.getElementsByClassName("square");
        let arr = this.SquareList;
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
            if (e.keyCode === 37 && this.direction.dx===0 ) {
                this.direction.dy = 0;
                this.direction.dx = -config.dx;
                console.log(37);

            }
            if (e.keyCode === 40 && this.direction.dy === 0) {
                this.direction.dy = config.dy;
                this.direction.dx = 0;
                console.log(40);
            }
            if (e.keyCode === 39 && this.direction.dx===0) {
                this.direction.dy = 0;
                this.direction.dx = config.dx;
                console.log(39);

            }
            if (e.keyCode === 38 && this.direction.dy===0 ) {
                this.direction.dy = -config.dy;
                this.direction.dx = 0;
                console.log(38);
            }
            

        })
    }


}