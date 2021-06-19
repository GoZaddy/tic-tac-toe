 <template>
  <div
      @click="cellClicked"
      style="min-height: 100px; min-width: 100px"
      :class="`relative text-xl text-center flex justify-center items-center capitalize ${isWinningCell === true ? 'bg-yellow-500': ''}`"
      @mouseover="hover = true"
      @mouseleave="hover = false"
  >
    <span>{{content.toUpperCase()}}</span>
    <span class="absolute right-1 bottom-1 text-gray-200 text-xs" v-if="hover || gameData.gameState === 'done'">{{id.toUpperCase()}}</span>
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    id: String,
    gameData: Object,
    content:  String,
    isWinningCell: Boolean,

  },
  data(){
    return {
      hover: false
    }
  },
  methods: {
    cellClicked(){
      if(this.gameData.currentTurn && this.gameData.players.human === this.gameData.currentTurn){
        this.$emit('cell-clicked', this.gameData.currentTurn+'-'+this.id)
      }

    },
  }

}
</script>

<style scoped>

</style>
