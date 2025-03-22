export const state = () => ({
    mainHeadline: 'Welcome To The GAME1328',
    subtitle: 'Space Wars Demo',
    gameRules: [
      {
        id: 1,
        header: 'About The Game',
        rule: 'Space Wars is a collection of sapce themed action adventure & puzzle minigames where the main objective is typically to avoid alien abduction.',
      },
      {
        id: 2,
        header: 'How To Play',
        rule: 'Everybody wants the best tech but few are willing to put in the work for it. The Asteroid Mine is by far the best place to mine the ore you need to upgrade or purchase new equipment.',
      },
      {
        id: 3,
        header: '',
        rule: 'Click on cells in the Asteroid Mine to check for ore. You can process the ore into new items and equipment from your Inventory View.',
      },
    ]
})

export const getters = {
    InstructionMainHeadline(state) {
        return state.mainHeadline;
    },
    InstructionSubtitle(state) {
        return state.subtitle;
    },
    InstructionGameRules(state) {
        return state.gameRules;
    },
}