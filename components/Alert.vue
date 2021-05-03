<template>
  <div v-if="snackbar" class="text-center">
    <v-snackbar
      top
      :color="snackbar.color"
      v-model="snackbar.visible"
      :timeout="timeout"
    >
      {{ snackbar.message }}

      <!-- <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click=""> Close </v-btn>
      </template> -->
    </v-snackbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import cloneDeep from 'clone-deep'
export default {
  data: () => ({
    text: 'My timeout is set to 2000.',
    timeout: 2000,
    snackbar: {
      visible: false,
      message: ``,
      color: 'primary',
    },
  }),
  watch: {
    snack(newValue, oldValue) {
      this.snackbar = cloneDeep(newValue)
    },
  },
  computed: {
    ...mapGetters({ snack: 'game/snackbar' }),
  },
}
</script>
