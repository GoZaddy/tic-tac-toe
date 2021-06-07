 <template>
  <div class = 'flex justify-center mt-10'>
    <Game />
  </div>
</template>

<script>
//Use:
/*
This component will serve as something like an App component.
Users will be able to start new game from here
Maybe create another component for keeping track of a particular game's stats like Board instance,
players, play mode(AI vs AI, AI vs Human or Human vs AI).

*/
import Game from './components/Game';
export default {
  name: 'App',
  components: {
    Game
  },
  data(){
    return {}
  },
}
</script>

<style scoped>

</style>
