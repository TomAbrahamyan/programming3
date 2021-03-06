let LivingCreature = require('./LivingCreature')


module.exports = class Vampire  extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 25;
        this.multiply = 0
        this.directions = [];
    }


    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        var emptyCells1 = super.chooseCell(1);
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)];

        if (newCell && this.multiply >= 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newVampire = new Vampire(newX, newY);
            vampireArr.push(newVampire);
            this.multiply = 0;
        }else if (newCell1 && this.multiply >= 10) {
            var newX = newCell1[0];
            var newY = newCell1[1];
            matrix[newY][newX] = 5;

            var newVampire = new Vampire(newX, newY);
            vampireArr.push(newVampire);
            this.multiply = 0;
        }
    }

    move() {
        this.energy -= 2
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        var emptyCells1 = super.chooseCell(1)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]


        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else if (newCell1 && this.energy >= 0) {
            var newX = newCell1[0]
            var newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 1
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (var i in vampireArr) {
            if (this.x == vampireArr[i].x && this.y == vampireArr[i].y) {
                vampireArr.splice(i, 1);
                break;
            }
        }


    }
}

