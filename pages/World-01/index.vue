<template>
  <v-row>
    <v-col>
      <game :levelSettings="levelSettings"></game>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      levelSettings: {
        levelName: 'Alien World',
        backdrop: '/worlds/alien-world.jpg',
        boardColor: '#F26718',
        rpMultiplier: 3,
        missonObjective:
          "Good work sneaking away from those gaurds! I've never seen anyone recover faster from a tractor pull than you! ",
        bombIcon: '👽',
        flagIcon: '💎',
        startText: 'AVOID DETECTION! ⚒️',
        emptyCellText: 'Nice!',
        highProxCellText: 'Close one!',
        winText: 'You won! 💎',
        loseText: 'Game over! 💥',
      },
    }
  },
}
</script>

<style></style>
