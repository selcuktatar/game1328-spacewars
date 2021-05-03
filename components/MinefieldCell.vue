<template>
  <div
    class="cell"
    :class="{ revealed: isRevealed, alien: isBomb }"
    @click="onCellLeftClicked"
    @click.right="onCellRightClicked"
  >
    <div class="content" v-show="isValueVisible">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    cellData: Object,
    bombIcon: {
      type: String,
      default: '💣',
    },
    flagIcon: {
      type: String,
      default: '❗',
    },
  },
  data() {
    return {}
  },
  methods: {
    onCellLeftClicked() {
      this.$emit('onCellLeftClicked', {
        x: this.cellData.x,
        y: this.cellData.y,
      })
    },
    onCellRightClicked() {
      this.$emit('onCellRightClicked', {
        x: this.cellData.x,
        y: this.cellData.y,
      })
    },
  },
  computed: {
    value() {
      // Revealed can be a bomb or a number
      if (this.isRevealed) {
        if (this.cellData.isBomb) {
          return this.bombIcon
        } else {
          return this.cellData.proximityCount > 0
            ? this.cellData.proximityCount
            : ''
        }
      }
      // Unrevealed is marked or empty
      return this.cellData.isMarked ? this.flagIcon : ''
    },
    isValueVisible() {
      return this.isRevealed || this.cellData.isMarked
    },
    isRevealed() {
      return this.cellData.isRevealed
    },
    isBomb() {
      return this.cellData.isBomb && this.cellData.isRevealed
    },
  },
}
</script>

<style lang="scss" scoped>
.cell {
  // table-cell causes the cells to be of equal width in the row
  display: table-cell;
  position: relative;
  background-color: rgb(219, 219, 219);
  font-weight: bold;
  min-width: 24px;
  max-width: 40px;
  border: rgba(255, 255, 255, 0.562) 1px solid;
  //   border-radius: 50%;
}

// Equal the height to the cell's width
.cell:before {
  content: '';
  display: block;
  padding-top: 100%; /* initial ratio of 1:1*/
}

.content {
  // Ignore padding
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  // Center content
  display: flex;
  justify-content: center;
  align-items: center;
}

.revealed {
  background-color: #5fc8f8;
}
.alien {
  background-color: rgb(64, 231, 120);
}
</style>
