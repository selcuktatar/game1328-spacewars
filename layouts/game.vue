<template>
  <v-container fluid
               id="app"
               style="height: 100vh; background-color: red;">
    <!-- <header></header> -->
    <game></game>
    <!-- <footer></footer> -->
  </v-container>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
}

button {
  text-transform: uppercase;
  font-size: 0.7em;
  // background-color: #333;
  // color: #efefef;
  border: none;
  padding: 6px 10px;
  border-radius: 2px;
}

#app {
  font-family: 'M PLUS Rounded 1c', Arial, sans-serif;
  color: #333;
}

#header,
#game,
#footer {
  // position: absolute;
}

#header {
  top: 0;
  width: 100%;
  height: 80px;
}

#game {
  top: 0px;
  width: 100%;
  min-height: calc(100%-200px);
  height: 80vh;
  bottom: 60px;
}

#footer {
  bottom: 0;
  height: 44px;
  width: 100%;
}
</style>
