import { canvas, config } from "./config/config.js";
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