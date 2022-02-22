var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});



server.listen(3000, () => {
    console.log('connected');
});

// Matrix Generator


function generator(matLen, gr, grEat, pred, trap, vampire) {
   var matrix = [];
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




matrix = generator(30, 5, 15, 7, 3, 7);

io.sockets.emit('send matrix', matrix);

//

grassArr = [];
grassEaterArr = [];
predatorArr = [];
trapArr = [];
vampireArr = [];

Grass = require("./Grass");
GrassEater = require("./GrassEater");
Predator = require("./Predator");
Trap = require("./Trap");
Vampire = require("./Vampire");



function createObject() {
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
    io.sockets.emit('send matrix', matrix)
}




function characterFunctions(){

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


    io.sockets.emit("send matrix", matrix);
}


setInterval(characterFunctions, 500)

io.on('connection', function () {
    createObject()
})