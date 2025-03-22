<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  props: {
    headline: String,
    description: String,
    ui: String
  }
}
</script>
<template>
        <v-card :class="ui">
          <v-card-title class="headline font-weight-black">
            {{ headline }}
          </v-card-title>
          <v-card-text >
            <p class="font-italic">
             {{ description }}
            </p>
          </v-card-text>
        </v-card>
</template>

