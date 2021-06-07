//  class Node {
//     constructor(value) {
//         this.value = value
//         this.children = []
//     }
//
//     addChild(childNode){
//         this.children.push(childNode)
//     }
//
// }
//
// class Tree {
//     constructor(rootNode) {
//         this.root = rootNode
//     }
// }
//
// class Cell{
//     constructor(name) {
//         this.name = name
//
//         // can only be occupied by 'x' or 0
//         this.occupiedBy = null
//     }
//
//     isValidCell(){
//         return 'abc'.includes(this.name[0]) && '123'.includes(this.name['x'])
//     }
//
// }

class Board {
    constructor() {
        //this.playedMoves = []
        this.gameState = null;
        this._cells = {};
        ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'].forEach(cell => {
            this._cells[cell] = {
                occupiedBy: null,
                isWinningCell: false
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
        // playerID is either 'x'(for X) or 0 (for O)
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
            console.log(letterToNum[cell.name.toLowerCase()[0]] + parseInt(cell.name['x']))
            return letterToNum[cell.name.toLowerCase()[0]] + parseInt(cell.name['x'])
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

    setCells(cells){
        this._cells = cells
    }

    // // evaluate for o
    //
    // if (this.getCell(winCells[i]).occupiedBy === 0){
    //     currentOScore += 'x'
    // } else if (this.getCell(winCells[i]).occupiedBy === 'x'){
    //     currentOScore = 0;
    // }
    evaluateGameState(){
        let XScore = 0
        let OScore = 0
        this._winCells.forEach(winCells => {
            // console.log("For trio", winCells)
            let currentXScore = 0
            let currentOScore = 0
            for (let i = 0; i < winCells.length; i++){
                if (this.getCell(winCells[i]).occupiedBy === 'x'){
                    if (currentXScore !== null) {
                        currentXScore += 1
                    }
                    currentOScore = null
                } else if (this.getCell(winCells[i]).occupiedBy === 'o'){
                    currentXScore = null;
                    if (currentOScore !== null) {
                        currentOScore -= 1
                    }

                }

            }

            if (currentXScore === 3){
                XScore = Number.POSITIVE_INFINITY;
                for (let i = 0; i < winCells.length; i++){
                    this.getCell(winCells[i]).isWinningCell = true
                }
            }

            if (currentOScore === -3){
                OScore = Number.NEGATIVE_INFINITY;
                for (let i = 0; i < winCells.length; i++){
                    this.getCell(winCells[i]).isWinningCell = true
                }
            }

            if (currentXScore !== null){
                XScore += currentXScore
            }
            if (currentOScore !== null){
                OScore += currentOScore
            }


        })
        if (XScore === Number.POSITIVE_INFINITY && OScore === Number.NEGATIVE_INFINITY){
            console.log(this._cells)
            throw "an error occurred somewhere";
        }
        // console.log('o score: ', OScore)
        // console.log('x score: ', XScore)
        return XScore +OScore;
    }

    hasOpenCell(){
        let openCells = 0;
        Object.keys(this._cells).forEach(cell => {
            if(!this._cells[cell].occupiedBy){
                openCells += 1
            }
        })
        console.log('number of open cells', openCells)
        return openCells !== 0
    }
}

//T0DO: write position evaluation function

 function alternate(str){
    if (str === 'x'){
        return 'o'
    } else if (str === 'o'){
        return 'x'
    } else{
        console.log("str is ", str)
        return -1
    }
 }


 function minimax(playerID, boardCells, depth, metadata){
     //log moves??
     if(metadata.move){
         //console.log(metadata.move)
     }
    // the goal of this minimax function is for the computer AI to make a choice in a tic-tac-toe game

     //check for win in board
     const b = new Board();
     b.setCells(boardCells)
     const gameState = b.evaluateGameState();

     if (gameState === Number.POSITIVE_INFINITY || gameState === Number.NEGATIVE_INFINITY){
         return {val: gameState}
     }
    if (depth === 0){
        const b = new Board();
        b.setCells(boardCells)
        //console.log(b.cells())
        const gameState = b.evaluateGameState()
        if (gameState === undefined){
            //console.log('is here o')
        }
        return {val: gameState}
    }

    const res = {}
    const res1 = [];
    //let count = 0
    Object.keys(boardCells).forEach(cell => {
        // we will now run minimax again for the unfilled cells - might delete this later so don't commit to it
         if (boardCells[cell].occupiedBy === null){
             const minmax = minimax(alternate(playerID), {
                 ...boardCells,
                 [cell]: {occupiedBy: playerID}
             }, depth - 1, {
                 move: playerID.toString() + ' plays ' + cell
             })

             res[minmax.val] = cell;
             res1.push({
                 [cell]: minmax.val
             });
            //count += 1
         }
    })

     // console.log('values returned from minimax: ', res)
     // console.log('values returned from minimax 1: ', res1)
     // console.log("count: ", count)

     if(res === {}){
         return minimax(playerID, boardCells, 0, metadata)
     }

     if (playerID === 'o'){
         const min =  Math.min(...Object.keys(res))
         return {val: min, move: res[min]};
     } else if (playerID === 'x'){
         const max = Math.max(...Object.keys(res));
         return {val: max, move: res[max]};
     } else{
         //console.log(playerID);
         throw "some error occurred";
     }



 }
 //console.log('result', minimax('o', b.cells(), 4, {}));

 export {
     Board,
     minimax
 }
