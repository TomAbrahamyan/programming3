let LivingCreature = require('./LivingCreature')



module.exports = class Grass extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        

    }


    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell && this.multiply >= 2) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}