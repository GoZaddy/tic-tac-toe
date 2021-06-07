<template>
  <div
      @click="cellClicked"
      style="min-height: 100px; min-width: 100px"
      :class="`text-xl text-center flex justify-center items-center capitalize ${isWinningCell === true ? 'bg-yellow-500': ''}`"
  >
    <span>{{content.toUpperCase()}}</span>
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    id: String,
    gameData: Object,
    content:  String,
    isWinningCell: Boolean
  },
  data(){
    return {}
  },
  methods: {
    cellClicked(){
      if(this.gameData.currentTurn && this.gameData.players.human === this.gameData.currentTurn){
        this.$emit('cell-clicked', this.gameData.currentTurn+'-'+this.id)
      }

    }
  }

}
</script>

<style scoped>

</style>