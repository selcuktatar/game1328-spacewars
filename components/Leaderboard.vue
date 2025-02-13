<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {}
    },
    computed: {
      ...mapGetters({ allItems: 'game/AllItems' }),
    },
    methods: {
      getFirstLetters(name) {
        return name[0]
      }
    }
}
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title class="font-weight-bold">Leaderboard</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, index) in allItems" :key="`item-${index}`">
          <v-list-item-avatar>
            <v-avatar size="36" color="info">
              <span class="white--text text-h5">{{ getFirstLetters(item.name) }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>
          <v-layout class="justify-end">
            {{ item.cost }}
          </v-layout>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>