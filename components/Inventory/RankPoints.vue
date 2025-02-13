<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: String,
    isCenter: Boolean, 
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({ rankPoints: 'game/RankPoints' }),
  },
}
</script>

<template>
    <v-card-title :class="{ 'justify-center': isCenter }">
      {{ title }} 💎 {{ rankPoints }}
    </v-card-title>
</template>

<style scoped>
.v-card-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
