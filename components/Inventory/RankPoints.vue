<script> 
import { mapGetters } from 'vuex'
export default {
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
    Rank Points 💎 {{ rankPoints }}
    </v-card-title>
</template>