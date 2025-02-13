<script> 
import { mapGetters } from 'vuex'
export default {
  props: {
    title: String,
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
  <v-card-title>
    {{ title }} 💎 {{ rankPoints }}
    </v-card-title>
</template>