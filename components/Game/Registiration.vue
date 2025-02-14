<script>
import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        header: 'Welcome to the Space Wars',
        description: 'Please enter your username. If you never created your account before, you can create your username typing here!',
        username: '',
        storeUsername: '',
        dialog: true,
        isLoading: false,
        rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
    }
},
    computed: {
      isDisabled() {
        if (this.username.length >= 3) {
            return false
        } 
        return true
      },
    },
    async mounted() {
        this.storeUsername = await this.$store.state.game.username
        await this.checkStoreUsername()
    },
     methods: {
        checkStoreUsername() {
            if (
                !this.storeUsername 
                || this.storeUsername.length === 0 
                || this.storeUsername === undefined
                || this.storeUsername === null
            ) {
                this.dialog = true
                this.username = ''
                return
            }
            this.dialog = false
            this.username = this.storeUsername
            return
        },
        updateStoreUsername() {
            const message = this.$store.dispatch('game/onUpdateUsername', this.username)
        },
        async submit() {
            this.isLoading = true
            this.checkStoreUsername()
            this.updateStoreUsername()
            this.isLoading = false
            this.dialog = false
        }
    }
}
</script>
<template>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="350"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ header }}
        </v-card-title>
        <v-card-text>{{ description }}</v-card-text>
        <v-text-field
            class="ml-2"
            label="Username"
            :rules="rules"
            hide-details="auto"
            v-model="username"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            text
            block
            :disabled="isDisabled"
            :loading="isLoading"
            @click="submit"
          >
            Login or Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>