<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return { }
    },
    computed: {
    ...mapGetters({ allItems: 'game/AllItems' }),
  },
  methods: {
    async purchase(item) {
      console.log(item)
      const message = await this.$store.dispatch('game/onPurchaseItem', item)
      console.log(message)
    },
  }
}
</script>
<template>
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
</template>