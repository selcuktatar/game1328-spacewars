<template>
  <section style="width: 100%">
    <v-row justify="center" style="min-height: 100vh">
      <v-col cols="12" lg="3">
        <v-card style="width: 100%">
          <InventoryRankPoints 
           title="Rank Point:"
           :isCenter=false />
          <InventoryPlayerItems />
        </v-card>
      </v-col>

      <v-col cols="12" lg="7">
          <InventoryMarketItems />
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
