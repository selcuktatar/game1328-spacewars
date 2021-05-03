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
        levelName: 'Asteroid Mine',
        backdrop: '/worlds/asteroid-mine.jpg',
        boardColor: '#ececec',
        rpMultiplier: 1,
        missonObjective:
          'This asteroid contains heavy amounts of minerals needed to upgrade our fleet. Mine as much as you can. But be careful there are most likely Alien Traps that you should avoid at all cost. If they spot us they will steal our ore!',
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
