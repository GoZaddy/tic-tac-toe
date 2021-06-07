<template>
  <div style="width:95%;max-width:400px">
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
        :game-data="{currentTurn, players, gameState}"
        @move-played="onMovePlayed"
    />
    <div v-if="gameState === 'done'" class="mt-5">
      <h2 class="px-2 font-bold">Moves played:</h2>
      <div class="flex flex-wrap xs:max-w-11/12 md:max-w-full">
        <p class="text-center text-md uppercase" v-html="moves.join(`<span class='text-pink-400'>&nbsp;&rarr;&nbsp;</span>`)"></p>
      </div>

    </div>
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
      gameState: 'uninitialized', //uninitialized, started, finished
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
      this.gameState = 'uninitialized';
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
      this.gameState = 'started'
    },

    onMovePlayed(data){
      this.moves.push(data)
      const gameState = this.board.evaluateGameState();
      console.log('gameState', gameState)

      //just checking if there are open cells
      if(gameState !== Number.POSITIVE_INFINITY && gameState !== Number.NEGATIVE_INFINITY){
        if (!this.board.hasOpenCell()){
          console.log('bullshit')
          this.gameState = 'done'
        } else {
            const player = data.split('-')[0]
            if(player === 'x'){
              this.currentTurn = 'o'
            }
            else {
              this.currentTurn = 'x'
            }
        }

      }
      else {
        const player = data.split('-')[0]
        if(player === 'x'){
          this.currentTurn = 'o'
        }
        else {
          this.currentTurn = 'x'
        }
      }
      console.log('move recorded')


    }
  },
  watch: {
    currentTurn(){
      if(this.currentTurn === this.players['computer']){
        console.log('computer playing')
        //simulate wait time for computer to make decision
        setTimeout(() => {
          try{
            const {move} = minimax(this.players['computer'], JSON.parse(JSON.stringify(this.board.cells())), 4, {});
            this.board.occupyCell(this.players['computer'], move)
            this.moves.push(this.players.computer+ '-'+move);
            const gameState = this.board.evaluateGameState();
            console.log('gameState', gameState)
            if(gameState !== Number.POSITIVE_INFINITY && gameState !== Number.NEGATIVE_INFINITY){
              if (!this.board.hasOpenCell()){
                console.log('bullshit')
                this.gameState = 'done'
              } else {
                console.log('cells state', this.board.cells());
                this.currentTurn = this.players['human'];
              }

            } else {
              console.log('game done')
              this.gameState = 'done'
            }
          } catch (e) {
            console.log('error', e)
          }


        }, 1000)
      }
    }
  }
}
</script>

<style scoped>


</style>
