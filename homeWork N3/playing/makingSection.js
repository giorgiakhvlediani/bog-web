export class makingSection {

    SquareList = [];
    
    // constructor(container) {
    //     this.id = container;
    //     console.log(this.id);
    // }

    set setSquaresList(data) {
        this.SquareList = data;
    }
    renderSnakeSquare(obj) {
        let newSeg = document.createElement('div');
        let container = document.getElementById('container');
        container.appendChild(newSeg);
        if (obj.n == 1) {
            newSeg.classList.add("square")
            newSeg.classList.add("head")
        } else {
            newSeg.classList.add("square");
        }
        newSeg.style.left = obj.x + "px";
        newSeg.style.top = obj.y + "px";
    }

    renderSnakeSquareList() {
        let list = this.SquareList;
      //  console.log(list)
        return list.forEach(this.renderSnakeSquare);
    }
}