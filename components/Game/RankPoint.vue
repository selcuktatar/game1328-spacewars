<script>
export default {
    data () {
        return {}
    },
    props: {
        flagIcon: String,
        rpMultiplier: Number,
        gameScore: Number,
    }
}
</script>
<template>
    <v-row justify="center"
                 align="baseline">
            <v-card-title>Points &nbsp;
              <span class="overline">
                {{ flagIcon }}x{{ rpMultiplier }}
              </span>
              &nbsp;
              {{ gameScore }}
            </v-card-title>
          </v-row>
</template>