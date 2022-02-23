var socket = io();

side = 15;



function setup() {
    frameRate(5);
    createCanvas(30 * side, 30 * side);
    background('#acacac');
}


function nkarel(matrix) {

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

}


socket.on('send matrix', nkarel);


function addGrass(){
    socket.emit("add Grass");
}

function addGrassEater(){
    socket.emit("add grassEater");
}

function addPredator(){
    socket.emit("add Predator");
}

function addTrap(){
    socket.emit("add Trap");
}

function addVampire(){
    socket.emit("add Vampire");
}

function kill(){
    socket.emit("kill");
}