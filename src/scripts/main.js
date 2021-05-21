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
        this.gameState = null
        this._cells = [
            new Cell('a1'),
            new Cell('a2'),
            new Cell('a3'),
            new Cell('b1'),
            new Cell('b2'),
            new Cell('b3'),
            new Cell('c1'),
            new Cell('c2'),
            new Cell('c3')
        ]
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

    evaluateGameState(){

    }
}

b = new Board()
// console.log(b.isAWin([
//     new Cell('a3'),
//     new Cell('b2'),
//     new Cell('b1')
// ]))

cell = new Cell('c3')
console.log(cell.isValidCell())

//T0DO: write position evaluation function