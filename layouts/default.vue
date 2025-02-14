<template>
  <v-app class="game-backdrop">
    <alert></alert>
    <v-navigation-drawer v-model="drawer"
                         :mini-variant="miniVariant"
                         :clipped="false"
                         dark
                         color="#04040D"
                         fixed
                         app>
      <v-list>
        <v-list-item v-for="(item, i) in items"
                     :key="i"
                     :to="item.to"
                     router
                     exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="false"
               fixed
               flat
               app
               color="transparent">
      <v-app-bar-nav-icon color="white"
                          text
                          light
                          @click.stop="drawer = !drawer" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer></v-spacer>
      <v-img height="72"
             contain
             src="/Logo-Wide.png"></v-img>
      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main style="">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-footer :absolute="false"
              app>
      <span>Mike Tierce GAME-1328-0390 Practium </span>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
    <GameRegistiration />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'fal fa-question-square',
          title: 'Demo Instructions',
          to: '/',
        },
        {
          icon: 'fal fa-backpack',
          title: 'Inventory',
          to: '/fleet-inventory',
        },
        {
          icon: 'fal fa-meteor',
          title: 'The Asteroid Mine',
          to: '/asteroid-mine',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Space Wars',
    }
  },
}
</script>
<style lang="scss" scoped>
.game-backdrop {
  overflow: auto;
  background-image: url('/Game-Backdrop.png');
  background-size: cover;
}
</style>
