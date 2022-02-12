/*
let matrix = []
let n = 11
let m = 11
for (let i = 0; i < m; i++) {
matrix[i] = []
for (let j = 0; j < n; j++) {
matrix[i][j] = Math.floor(Math.random() * 2)
}
}
var side = 50;
*/



function generator(matLen, gr, grEat, pred, trap, vampire) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < trap; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < vampire; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}

let side = 15;

let matrix = generator(30, 5, 15, 7, 3, 10);



var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var trapArr = [];
var vampireArr = [];

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);

            }
            if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y);
                grassEaterArr.push(grEater);

            }
            if (matrix[y][x] == 3) {
                var pre = new Predator(x, y);
                predatorArr.push(pre);

            }
            if (matrix[y][x] == 4) {
                var trap = new Trap(x, y);
                trapArr.push(trap);

            }
            if (matrix[y][x] == 5) {
                var vampire = new Vampire(x, y);
                vampireArr.push(vampire);

            }
        }
    }

}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("orange");
            } else if (matrix[y][x] == 4) {
                fill("red");
            } else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side);

        }
    }


    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }


    for (var i in predatorArr) {
        predatorArr[i].mul();
        predatorArr[i].eat();
    }

    for (var i in trapArr) {
        trapArr[i].eat();
    }

    for (var i in vampireArr) {
        vampireArr[i].mul();
        vampireArr[i].move();
    }

}



