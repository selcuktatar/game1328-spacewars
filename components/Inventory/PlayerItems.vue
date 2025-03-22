<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {}
    },
    computed: {
    ...mapGetters({ playerItems: 'game/PlayerItems' }),
  },
}
</script>
<template>
  <v-list>
    <v-list-item v-for="(item, index) in playerItems" :key="`item-${index}`">
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
</template>