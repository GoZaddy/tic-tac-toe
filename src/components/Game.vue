<template>
  <div>
<!--    -->
    <div class="my-2" v-if="!newGameClicked">
      <button
          class="px-4 py-2 text-white bg-green-500 hover:bg-green-600"
          @click="onNewGameClicked"
      >
        New Game
      </button>
    </div>
    <div class="my-2" v-else>
      <button
          class="px-4 py-2 text-white bg-pink-400 hover:bg-pink-500"
          @click="onHumanSelect('x')"
      >
        X
      </button>
      or
      <button
          class="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600"
          @click="onHumanSelect('o')"
      >
        O
      </button>
    </div>

    <div class="text-right my-2">
      <p>Human: {{players.human ? players.human.toUpperCase() : '_'}}</p>
      <p>Computer: {{players.computer ? players.computer.toUpperCase() : '_'}}</p>
    </div>
    <div class="my-2" v-if="currentTurn">
      <p>Current Turn: {{currentTurn.toUpperCase()}}</p>
    </div>
    <Board
        :board="board"
        :game-data="{currentTurn, players}"
        @move-played="onMovePlayed"
    />
  </div>

  
</template>

<script>
import {Board as BoardEntity, minimax} from '../scripts/main';
import Board from "@/components/Board";



export default {

  name: "Game",
  components: {Board},
  data(){
    return {
      newGameClicked: false,
      board: null,
      players: {
        'human': '',
        'computer': ''
      },
      currentTurn: '',
      // for recording moves e.g x-a1, o-a2
      moves: []
    }
  },
  created() {
    this.board = new BoardEntity()
    console.log(this.board.cells())
  },
  methods: {
    onNewGameClicked(){
      this.newGameClicked = true
      this.players = {
        'human': '',
        'computer': ''
      };
      this.currentTurn = '';
      this.moves = [];
      this.board = new BoardEntity()
    },
    onHumanSelect(player){
      if(player === 'x'){
        this.players.human = 'x';
        this.players.computer = 'o';
      } else{
        this.players.human = 'o';
        this.players.computer = 'x';
      }
      this.currentTurn = 'x'
      this.newGameClicked = false;
    },

    onMovePlayed(data){
      this.moves.push(data)
      console.log('move recorded')
      const player = data.split('-')[0]
      if(player === 'x'){
        this.currentTurn = 'o'
      } else {
        this.currentTurn = 'x'
      }
      console.log(this.moves)
    }
  },
  watch: {
    currentTurn(){
      if(this.currentTurn === this.players['computer']){
        //simulate wait time for computer to make decision
        setTimeout(() => {
          const {move} = minimax(this.players['computer'], JSON.parse(JSON.stringify(this.board.cells())), 4, {});
          this.board.occupyCell(this.players['computer'], move)
          this.moves.push(this.players.computer+ '-'+move);
          const gameState = this.board.evaluateGameState()
          console.log('gameState', gameState)
          if(gameState !== Number.POSITIVE_INFINITY && gameState !== Number.NEGATIVE_INFINITY){
            console.log('cells state', this.board.cells());
            this.currentTurn = this.players['human'];
          }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>


</style>