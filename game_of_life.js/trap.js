
class Trap extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 10;
        this.directions = [];
    }


    eat() {
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        var emptyCells1 = this.chooseCell(3)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells.length)]

        var emptyCells2 = this.chooseCell(5)
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells.length)]

       

        if (newCell) {
            this.energy++;
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 0
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
        }else if (newCell1) {
            this.energy++;
            var newX = newCell1[0]
            var newY = newCell1[1]
            matrix[newY][newX] = 0
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break
                }
            }

        }else if (newCell2) {
            this.energy -= 3;
            var newX = newCell2[0]
            var newY = newCell2[1]
            matrix[newY][newX] = 0
            for (var i in vampireArr) {
                if (newX == vampireArr[i].x && newY == vampireArr[i].y) {
                    vampireArr.splice(i, 1)
                    break
                }
            }

        }

    }

}