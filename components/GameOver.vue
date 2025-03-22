<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error"
             dark
             v-bind="attrs"
             v-on="on">
        Game Over
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        You've Been Abducted!
      </v-card-title>
      <v-card-text>Don't Panic! Just before you
        were captured {{score}} {{flagIcon}} were transfered back to the fleet.
        You could send a distress signal for rescue or hang in there and see
        what you can mine from the alien planet!
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1"
               text
               @click="onReturnToFleet">
          Send Distress Signal
        </v-btn>
        <v-btn nuxt
               to="/world-01"
               color="purple darken-1"
               text
               @click="onStartNewGame">
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0,
    },
    flagIcon: {
      type: String,
      default: '💎',
    },
  },
  async mounted() {
    this.$store.commit('game/ADD_RANK_POINTS', this.score)
    const username = this.$store.state.game.username
    const rankPoints = this.$store.state.game.rankPoints
    await this.$fire.firestore
      .collection('leaderboard')
      .doc(username)
      .update({
        point: rankPoints
      });
  },
  data() {
    return {
      dialog: true,
    }
  },
  methods: {
    onReturnToFleet() {
      this.$router.push(`/fleet-inventory?addRP=${this.score}`)
    },
    onStartNewGame() {
      this.$emit('startNewGame')
    },
  },
}
</script>