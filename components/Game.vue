<template>
  <section style="padding-bottom: 20vh">
    <v-row justify="center">
      <v-col cols="12" lg="3">
        <v-card class="my-13">
          <v-row justify="center" align="baseline">
            <v-card-title class="headline"
              >{{ levelSettings.levelName }}
            </v-card-title>
            <game-over
              :score="gameScore"
              :icon="levelSettings.flagIcon"
              @startNewGame="prepareNewGame"
              v-if="gameOver"
            ></game-over>
          </v-row>
        </v-card>
        <v-card class="my-13">
          <v-row justify="center" align="baseline">
            <v-card-title
              >Rank Points &nbsp;
              <span class="overline">
                {{ levelSettings.flagIcon }}x{{ levelSettings.rpMultiplier }}
              </span>
              &nbsp;
              {{ gameScore }}
            </v-card-title>
          </v-row>
        </v-card>
        <v-card>
          <v-card-title>Mission Objective</v-card-title>
          <v-card-text>
            <span class="body-2">{{ levelSettings.missonObjective }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8">
        <!-- <v-img src="/Logo-Wide.png"
               class="pb-12"
               width="100%"
               contain></v-img> -->
        <v-card :color="levelSettings.boardColor">
          <v-card-text>
            <div id="game">
              <!-- <form class="options"
          @submit.prevent="prepareNewGame">
      Size <input class="number-input" :min="fieldSizeMin" :max="fieldSizeMax" :placeholder="fieldSizeDefault" v-model.number="fieldSize" type="number" />
      <button>New game</button>
    </form> -->
              <!-- <h2 class="game-state">{{ gameStateText }}</h2> -->
              <!-- <p>{{ bombStateText }}</p> -->

              <!-- <button-switch id="mine-mode-switch"
                   @onSelected="onModeChanged"></button-switch> -->
              <minefield
                :minefield="minefield"
                @onCellLeftClicked="onCellClicked"
                @onCellRightClicked="onCellFlagged"
              ></minefield>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  props: {
    levelSettings: {
      type: Object,
      default: () => {
        return {
          boardColor: '#B8B8B8',
          levelName: 'Asteroid Mine',
          rpMultiplier: 1,
          missonObjective:
            'This asteroid contains heavy amounts of minerals needed to upgrade our fleet. Mine as much as you can. But be careful there are most likely Alien Traps that you should avoid at all cost. If they spot us they will steal our ore! ',
          bombIcon: '👽',
          flagIcon: '💎',
          startText: 'AVOID DETECTION! ⚒️',
          emptyCellText: 'Nice!',
          highProxCellText: 'Close one!',
          winText: 'You won! 💎',
          loseText: 'Game over! 💥',
        }
      },
    },
    bombIcon: {
      type: String,
      default: '👽',
    },
    flagIcon: {
      type: String,
      default: '💎',
    },
    startText: {
      type: String,
      default: 'AVOID DETECTION! ⚒️',
    },
    emptyCellText: {
      type: String,
      default: 'Nice!',
    },
    highProxCellText: {
      type: String,
      default: 'Close one!',
    },
    winText: {
      type: String,
      default: 'You won! 💎',
    },
    loseText: {
      type: String,
      default: 'Game over! 💥',
    },
  },
  data() {
    return {
      fieldSizeDefault: 30,
      fieldSizeMin: 5,
      fieldSizeMax: 50,
      fieldSize: 30,
      mineModeEnabled: true,
      minefield: [
        [
          {
            x: 0,
            y: 0,
            isBomb: false,
            isRevealed: false,
            isMarked: false,
            proximityCount: 0,
          },
        ],
      ],
      firstClickHappened: false,
      bombList: [],
      amountOfCellsMarked: 0,
      amountOfBombs: 0,
      gameOver: false,
      gameStateText: '',
    }
  },
  created() {
    this.prepareNewGame()
  },
  watch: {
    levelName(newVal, oldVal) {
      if (newVal === 'World-01') {
        // this.rpMultiplier = 2
      }
    },
  },
  mounted() {
    console.log(this.$route.name)
  },
  computed: {
    levelName() {
      return this.$route.name
    },
    gameScore() {
      let score = 0
      for (let x = 0; x < this.size; x++) {
        for (let y = 0; y < this.size; y++) {
          //   console.log(this.minefield[x][y])
          if (this.minefield[x][y].isRevealed && !this.minefield[x][y].isBomb) {
            score +=
              this.minefield[x][y].proximityCount *
              this.levelSettings.rpMultiplier
          }
        }
      }
      return score
    },
    bombStateText() {
      return (
        this.gameScore +
        ' ' +
        this.flagIcon +
        ' / ' +
        this.amountOfBombs +
        ' ' +
        this.levelSettings.bombIcon
      )
    },
  },
  methods: {
    onModeChanged(isMineMode) {
      console.log('Mode: ' + (isMineMode ? 'Mine' : 'Flag'))
      this.mineModeEnabled = isMineMode
    },
    prepareNewGame() {
      // Reset variables
      this.gameOver = false
      this.firstClickHappened = false
      this.minefield.splice(0)
      this.bombList.splice(0)
      this.amountOfCellsMarked = 0

      // Change the game state text to wish the player good luck
      this.gameStateText = this.levelSettings.startText

      // Save the current field size
      this.size = this.fieldSize

      const amountOfCells = this.size * this.size
      // Determine the amount of bombs
      this.amountOfBombs = Math.round(amountOfCells * 0.15)

      console.log(
        this.amountOfBombs + ' / ' + amountOfCells + ' cells will be bombs.'
      )

      // Create empty field
      for (let x = 0; x < this.size; x++) {
        this.$set(this.minefield, x, [])
        for (let y = 0; y < this.size; y++) {
          // Create a data tile for every coord
          this.$set(this.minefield[x], y, {
            x: x,
            y: y,
            isBomb: false,
            isRevealed: false,
            isMarked: false,
            proximityCount: 0,
          })
        }
      }
      console.log(this.minefield)
    },
    placeMines(excludeCoord) {
      console.log('Creating field (' + this.size + ' x ' + this.size + ') ...')

      // Linaer list of all coords
      let coords = []

      // Fill the minefield
      for (let x = 0; x < this.size; x++) {
        for (let y = 0; y < this.size; y++) {
          if (excludeCoord.x != x || excludeCoord.y != y) {
            // Save the coords in a linear array
            coords.push({ x: x, y: y })
          }
        }
      }
      // coords now equals
      // [{x: 0, y:0}, {x:1, y:1}, ...]
      // but it excludes the x:y for the cell
      // click that generated the build
      //
      // Shuffle the coords array so we can pick random unique bomb locations
      shuffle(coords)

      // Place the set amount of bombs in random unique locations
      let amountOfBombLeftToPlace = this.amountOfBombs
      // Keep track of the placed bombs
      while (amountOfBombLeftToPlace > 0 && coords.length > 0) {
        // Get a unique random coord
        const selectedCoord = coords.pop()
        // Get the tile data
        let bombCell = this.minefield[selectedCoord.x][selectedCoord.y]
        // Set it to a bomb
        bombCell.isBomb = true
        // Keep track of it
        this.bombList.push(bombCell)
        // One bomb less to place
        amountOfBombLeftToPlace--
      }

      // Calculate the proximity for all tiles around a bomb
      for (let b = 0; b < this.bombList.length; b++) {
        const bombCell = this.bombList[b]
        this.doForAdjecentCells(bombCell, function (adjecentCell) {
          // Increase its proximity count by 1
          adjecentCell.proximityCount++
        })
      }
    },
    onCellClicked(coord) {
      if (this.mineModeEnabled) {
        this.onCellMined(coord)
      } else {
        this.onCellFlagged(coord)
      }
    },
    onCellMined(coord) {
      if (!this.firstClickHappened) {
        this.firstClickHappened = true
        this.placeMines(coord)
      }

      let cell = this.minefield[coord.x][coord.y]
      if (!this.gameOver && cell !== undefined) {
        if (cell.isMarked) {
          return console.log(
            "Can't mine marked tile: " + coord.x + ', ' + coord.y
          )
        }
        console.log('Mining: ' + coord.x + ', ' + coord.y + '...')
        cell.isRevealed = true

        // If it is a bomb
        if (cell.isBomb) {
          // Game over
          this.setGameOver()
          return
        }

        // If it is an empty cell, clear all adjecent cells
        if (cell.proximityCount == 0) {
          this.gameStateText = this.levelSettings.emptyCellText
          const vm = this
          const closure = function (adjecentCell) {
            if (!adjecentCell.isRevealed) {
              // If marked, remove the mark
              if (adjecentCell.isMarked) {
                adjecentCell.isMarked = false
                vm.amountOfCellsMarked--
              }
              // Reveal the tile
              adjecentCell.isRevealed = true
              // Repeat for that cell if it is also a blank
              if (adjecentCell.proximityCount == 0) {
                vm.doForAdjecentCells(adjecentCell, closure)
              }
            }
          }
          vm.doForAdjecentCells(cell, closure)
        }

        // Compliment on close call
        if (cell.proximityCount > 2) {
          this.gameStateText = this.levelSettings.highProxCellText
        }
        // console.log(this.minefield)
      }
    },
    onCellFlagged(coord) {
      let cell = this.minefield[coord.x][coord.y]
      if (!this.gameOver && cell !== undefined) {
        if (cell.isRevealed) {
          return console.log(
            "Can't flag revealed tile: " + coord.x + ', ' + coord.y
          )
        }
        console.log('(Un)Flagging: ' + coord.x + ', ' + coord.y + '...')
        cell.isMarked = !cell.isMarked
        this.amountOfCellsMarked += cell.isMarked ? 1 : -1

        // Check if all bombs are marked
        let allBombsMarked = true
        for (let b = 0; b < this.bombList.length; b++) {
          if (!this.bombList[b].isMarked) {
            allBombsMarked = false
            break
          }
        }
        // All bombs are marked? No more markings than bombs?
        if (
          this.firstClickHappened &&
          this.bombList.length == this.amountOfCellsMarked &&
          allBombsMarked
        ) {
          // Winner!
          this.setGameWon()
        }
      }
    },
    // helper method
    doForAdjecentCells(middleCell, closure) {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          // Calculate adjecent cell coords
          const adjecentX = middleCell.x + i
          const adjecentY = middleCell.y + j

          // Check if the cell it within the field's borders
          if (
            adjecentX >= 0 &&
            adjecentX < this.size &&
            adjecentY >= 0 &&
            adjecentY < this.size
          ) {
            // Execute whatever it wants
            closure(this.minefield[adjecentX][adjecentY])
          }
        }
      }
    },
    // Lose the game when a bomb is clicked
    setGameOver() {
      this.gameOver = true
      // Reveal all bombs
      for (let b = 0; b < this.bombList.length; b++) {
        this.bombList[b].isRevealed = true
      }

      this.gameStateText = this.levelSettings.loseText
    },
    setGameWon() {
      this.gameOver = true
      // Reveal all cells
      for (let x = 0; x < this.size; x++) {
        for (let y = 0; y < this.size; y++) {
          let cell = this.minefield[x][y]
          cell.isRevealed = cell.isBomb ? false : true
        }
      }
      this.gameStateText = this.levelSettings.winText
    },
  },
}

// HELPER METHODS

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
</script>

<style lang="scss" scoped>
#game {
  text-align: center;
  // margin-left: -12px;
}

#minefield {
  //   position: absolute;
  //   top: 100px;
  //   width: calc(100%-16px);
  //   left: 8px;
  //   right: 8px;
  //   min-height: calc(100%-180px);
  height: 100%;
  //   bottom: 50px;
}

#mine-mode-switch {
  position: absolute;
  bottom: 16px;
  left: 8px;
  right: 8px;
}

p {
  margin: 0;
  font-size: 0.9em;
}

.game-state {
  margin: 10px 0 0 0;
}

.number-input {
  border: 1px solid #eee;
  padding: 4px 10px;
  border-radius: 2px;
  width: 80px;
  margin: 0 12px;
}
</style>
