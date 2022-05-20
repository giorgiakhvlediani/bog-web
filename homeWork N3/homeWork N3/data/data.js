import {config} from "../config/config.js";

export let direction = {
    dx: config.dx,
    dy: 0,
}
export let snakeSquares = [
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
