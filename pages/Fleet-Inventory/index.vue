<template>
  <section style="width: 100%">
    <v-row justify="center" style="min-height: 100vh">
      <v-col cols="12" lg="3">
        <v-card style="width: 100%">
          <v-card-title>Rank Points 💎 {{ rankPoints }}</v-card-title>
          <v-list>
            <v-list-item
              v-for="(item, index) in playerItems"
              :key="`item-${index}`"
            >
              <v-list-item-avatar>
                <v-avatar size="32">
                  <v-img :src="item.image" width="32" aspect-ratio="1"></v-img>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" lg="7">
        <v-card style="width: 100%">
          <v-list two-line>
            <v-list-item
              v-for="(item, index) in allItems"
              :key="`item-${index}`"
            >
              <v-list-item-avatar>
                <v-avatar size="40">
                  <v-img :src="item.image" width="40" aspect-ratio="1"></v-img>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ item.name }}
                  <span class="overline">💎 {{ item.cost }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-btn text @click="purchase(item)">
                    <v-icon left color="primary darken-2"
                      >fal fa-usd-circle</v-icon
                    >
                    Purchase
                  </v-btn>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
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
  data() {
    return {
      dialog: true,
    }
  },
  computed: {
    ...mapGetters({ rankPoints: 'game/RankPoints' }),
    ...mapGetters({ playerItems: 'game/PlayerItems' }),
    ...mapGetters({ allItems: 'game/AllItems' }),
  },
  mounted() {},
  methods: {
    async purchase(item) {
      console.log(item)
      const message = await this.$store.dispatch('game/onPurchaseItem', item)
      console.log(message)
    },
    onReturnToFleet() {
      this.$router.push(`/fleet-inventory`)
    },
    onStartNewGame() {
      this.$emit('startNewGame')
    },
  },
}
</script>

<style></style>
