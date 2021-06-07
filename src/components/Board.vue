<template>
  <div class="p-5 sm:p-10 bg-blue-400">
    <div class="grid-container bg-blue-400">
      <Cell
          class="hover:bg-blue-600 w-full h-full border border-gray-200 cursor-pointer"
          v-for="cell in Object.keys(board.cells())"
          :id="cell"
          :key="cell"
          :content="board.getCell(cell).occupiedBy ? board.getCell(cell).occupiedBy.toString() : ''"
          :gameData="gameData"
          @cell-clicked="cellClicked"
          :is-winning-cell="board.getCell(cell).isWinningCell"
      />
    </div>
  </div>


</template>

<script>
import Cell from './Cell';
export default {
  name: "Board",
  props: ['board', 'gameData'],
  components: {
    Cell
  },
  created() {
    console.log(this.board.cells())
  },
  methods: {
    cellClicked(data) {
      console.log(data)
      const [player, move] = data.split('-')
      if(!this.board.getCell(move).occupiedBy){
        console.log('move:', move)
        this.board.occupyCell(player, move);
        this.$emit('move-played', data)
      }


    },

    resolveContent(){

    }
  }
}
</script>

<style scoped>
.grid-container{
  display: grid;
  grid-gap: 5px 5px;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
}
</style>
