<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({ mainHeadline: 'messages/InstructionMainHeadline' }),
    ...mapGetters({ subtitle: 'messages/InstructionSubtitle' }),
    ...mapGetters({ gameRules: 'messages/InstructionGameRules' }),
  },
}
</script>
<template>
    <v-container>
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title class="headline font-weight-black">
            {{ mainHeadline }}
          </v-card-title>
          <v-card-subtitle class="headline font-weight-black mb-8">
            {{ subtitle }}
          </v-card-subtitle>
          <v-card-text v-for="rule in gameRules" :key="rule.id">
            <h2 class="font-weight-bold mb-2">
              {{ rule.header }}
            </h2>
            <p class="font-italic">
             {{ rule.rule }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

