<script>
export default {
    data () {
        return {
            sheet: false
        }
    },
    props: {
        buttonText: String
    }
}
</script>
<template>
    <div class="text-center">
        <v-btn class="my-6" 
        @click="sheet = !sheet"
        color="info"
        block
        >
          {{ buttonText }}
        </v-btn>
        <v-dialog
        v-model="sheet"
        max-width="500px"
      >
        <v-card>

          <div>
            <InstructionsCard />
          </div>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="sheet = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>