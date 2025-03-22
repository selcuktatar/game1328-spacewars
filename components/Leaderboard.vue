<script>

export default {
  async fetch() {
    await this.getLeaderboardData()
  },
  data() {
    return {}
  },
  computed: {
    sortedLeaderboardData() {
      return this.$store.state.game.users.slice().sort((a, b) => b.point - a.point)
    }
  },
  methods: {
    getFirstLetters(name) {
      return name[0]
    },
    async getLeaderboardData() {
      const documents = await this.$fire.firestore.collection('leaderboard').get()
      this.$store.dispatch('game/onUpdateUsers', documents.docs.map(doc => doc.data()))
    }
  }
}
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title class="font-weight-bold">Leaderboard</v-card-title>
      <!-- TODO: REFRESH BUTTON -->
      <v-divider></v-divider>
      <v-list v-if="sortedLeaderboardData.length > 0">
        <v-list-item v-for="(item, index) in sortedLeaderboardData" :key="item.id">
          <v-list-item-avatar>
            <v-avatar size="36" color="info">
              <span class="white--text text-h5">{{ getFirstLetters(item.name.toUpperCase()) }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title class="first-letter">
            {{ item.name }}
          </v-list-item-title>
          <v-layout class="justify-end">
            {{ item.point }}
          </v-layout>
        </v-list-item>
      </v-list>
      <div v-else>
        No leaderboard data found.
      </div>
    </v-card>
  </v-container>
</template>
<style scoped>
.first-letter {
    text-transform: capitalize;
}
</style>


