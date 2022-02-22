let LivingCreature = require('./LivingCreature')


module.exports = class GrassEater extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 11;
        this.multiply = 0
        this.directions = [];
    }

    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell && this.multiply >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            var newGrass = new GrassEater(newX, newY);
            grassEaterArr.push(newGrass);
            this.multiply = 0;
        }
    }

    move() {
       
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        this.energy--
         if (this.energy <= 0) {
            this.die()
        }
        
    }

    eat() {
        var emptyCells = super.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        var emptyCells1 = super.chooseCell(5)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells.length)]


        if (newCell1) {
            this.energy -= 5
            var newX = newCell1[0]
            var newY = newCell1[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in vampireArr) {
                if (newX == vampireArr[i].x && newY == vampireArr[i].y) {
                    vampireArr.splice(i, 1)
                    break
                }
            }
        } else if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        } else {
            this.move()
        }


    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
