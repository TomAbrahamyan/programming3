
class Trap {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [];
    }

    getNewCoordinates() {
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

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat() {
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        var emptyCells1 = this.chooseCell(3)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells.length)]

        var emptyCells2 = this.chooseCell(5)
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells.length)]

        console.log(emptyCells);

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