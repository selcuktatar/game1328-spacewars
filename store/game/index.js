export const types = {
  SET_EXAMPLE_STATE: 'SET_EXAMPLE_STATE',
}

export const state = () => ({
  username: '',
  name: '',
  users: [],
  snackbar: {
    visible: true,
    message: '',
    color: 'primary',
  },
  rankPoints: 0,
  playerItems: [],
  allItems: [
    {
      name: 'Satellite',
      cost: 300,
      image: '/items/satellite.svg',
    },
    {
      name: 'Space Robot',
      cost: 400,
      image: '/items/space-robot.svg',
    },
    {
      name: 'Alien Blaster',
      cost: 900,
      image: '/items/alien-weapon.svg',
    },
    {
      name: 'Cryo Chamber',
      cost: 1200,
      image: '/items/cyrogenic-chamber.svg',
    },
    {
      name: 'Satellite Base',
      cost: 1400,
      image: '/items/satellite-transmitter.svg',
    },
    {
      name: 'Tacital Robot',
      cost: 1400,
      image: '/items/intelligent-tactical-bot.svg',
    },
    {
      name: 'Alien Relic',
      cost: 4000,
      image: '/items/voyager-golden-record.svg',
    },
  ],
})

export const getters = {
  getUsername(state) {
    return state.username
  },
  snackbar(state) {
    return state.snackbar
  },
  RankPoints(state) {
    return state.rankPoints
  },
  AllItems(state) {
    return state.allItems
  },
  PlayerItems(state) {
    return state.playerItems
  },
}

export const mutations = {
  SET_SNACK_ITEM(state, payload) {
    state.snackbar = payload
  },
  SET_PLAYER_ITEM(state, payload) {
    state.playerItems.push(payload)
  },
  REMOVE_RANK_POINTS(state, payload) {
    state.rankPoints -= payload
  },
  ADD_RANK_POINTS(state, payload) {
    state.rankPoints += payload
  },
  SET_USER_INFO(state, payload) {
    state.username = payload.username
    state.name = payload.name
    state.rankPoints = payload.rankPoints
  },
  SET_USERS(state, payload) {
    state.users = payload
  }
}

export const actions = {
  onShowAlert({ commit }, payload) {
    commit('SET_SNACK_ITEM', payload)
  },
  async onPurchaseItem({ commit, state, dispatch }, payload) {
    if (state.rankPoints - payload.cost > 0) {
      commit('SET_PLAYER_ITEM', payload)
      commit('REMOVE_RANK_POINTS', payload.cost)
      dispatch('onShowAlert', {
        visible: true,
        message: `${payload.name} has been added to your items.`,
        color: 'primary',
      })
    } else {
      dispatch('onShowAlert', {
        visible: true,
        message: `You need ${
          payload.cost - state.rankPoints
        } to purchase this item.`,
        color: 'error',
      })
    }
  },
  onAddRankPoints({ commit }, payload) {
    commit('ADD_RANK_POINTS', payload)
  },
  onUpdateUserInfo({commit, dispatch}, payload) {
    commit('SET_USER_INFO', payload)
    dispatch('onShowAlert', {
      visible: true,
      message: `You are logged in your account.`,
      color: 'primary',
    })
  },
  onUpdateUsers({commit}, payload) {
    commit('SET_USERS', payload)
  }
}
