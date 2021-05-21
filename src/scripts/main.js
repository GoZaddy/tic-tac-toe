 class Node {
    constructor(value) {
        this.value = value
        this.children = []
    }

    addChild(childNode){
        this.children.push(childNode)
    }

}

class Tree {
    constructor(rootNode) {
        this.root = rootNode
    }
}

class Cell{
    constructor(name) {
        this.name = name

        // can only be occupied by 1 or 0
        this.occupiedBy = null
    }

    isValidCell(){
        return 'abc'.includes(this.name[0]) && '123'.includes(this.name[1])
    }

}

class Board {
    constructor() {
        //this.playedMoves = []
        this.gameState = null;
        this._cells = {};
        ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'].forEach(cell => {
            this._cells[cell] = {
                occupiedBy: null,
            }
        })
        this._winCells = [
            ['a1', 'a2', 'a3'],
            ['b1', 'b2', 'b3'],
            ['c1', 'c2', 'c3'],
            ['a1', 'b1', 'c1'],
            ['a2', 'b2', 'c2'],
            ['a3', 'b3', 'c3'],
            ['a1', 'b2', 'c3'],
            ['a3', 'b2', 'c1']
        ]
    }

    getCell(cell){
        return this._cells[cell.toLowerCase()]
    }

    cells(){
        return this._cells
    }

    occupyCell(playerID, cellName){
        // playerID is either 1(for X) or 0 (for O)
        this._cells[cellName.toLowerCase()].occupiedBy = playerID
    }

    isAWin(cells){
        if (cells.length !== 3){
            throw "argument must be an array of 3 Cell objects"
        }
        function getScore(cell){
            const letterToNum = {
                'a': 1,
                'b': 2,
                'c': 3
            }
            console.log(letterToNum[cell.name.toLowerCase()[0]] + parseInt(cell.name[1]))
            return letterToNum[cell.name.toLowerCase()[0]] + parseInt(cell.name[1])
        }
        let score = 0
        cells.forEach(cell => {
            score += getScore(cell)
        })

        if (score % 3 === 0){
            return true
        }
        return false
    }

    // // evaluate for o
    //
    // if (this.getCell(winCells[i]).occupiedBy === 0){
    //     currentOScore += 1
    // } else if (this.getCell(winCells[i]).occupiedBy === 1){
    //     currentOScore = 0;
    // }
    evaluateGameState(){
        let XScore = 0
        let OScore = 0
        this._winCells.forEach(winCells => {
            console.log("For trio", winCells)
            let currentXScore = 0
            let currentOScore = 0
            for (let i = 0; i < winCells.length; i++){
                if (this.getCell(winCells[i]).occupiedBy === 1){
                    if (currentXScore !== -1) {
                        currentXScore += 1
                    }
                    currentOScore = -1
                } else if (this.getCell(winCells[i]).occupiedBy === 0){
                    currentXScore = -1;
                    if (currentOScore !== -1) {
                        currentOScore += 1
                    }

                }

            }
            console.log("x: ", currentXScore)
            console.log("o: ", currentOScore)
            if (currentXScore === 3){
                XScore = Number.POSITIVE_INFINITY
            }

            if (currentOScore === 3){
                OScore = Number.NEGATIVE_INFINITY
            }

            if (currentXScore !== -1){
                XScore += currentXScore
            }
            if (currentOScore !== -1){
                OScore += currentOScore
            }


        })
        if (XScore === Number.POSITIVE_INFINITY && OScore === Number.NEGATIVE_INFINITY){
            throw "an error occurred somewhere";
        }
        console.log('o score: ', OScore)
        console.log('x score: ', XScore)
        return XScore - OScore;
    }
}

b = new Board()
 b.occupyCell(1, 'b1')
 b.occupyCell(1, 'b2')
 b.occupyCell(1, 'c3')
 b.occupyCell(1, 'c2')
 b.occupyCell(0, 'a1')
 b.occupyCell(0, 'c1')
 b.occupyCell(0, 'a2')
 b.occupyCell(0, 'a3')
 console.log(b.cells())

 console.log(b.evaluateGameState())
// console.log(b.isAWin([
//     new Cell('a3'),
//     new Cell('b2'),
//     new Cell('b1')
// ]))

cell = new Cell('c3')
console.log(cell.isValidCell())

//T0DO: write position evaluation function
