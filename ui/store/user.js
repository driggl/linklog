export const state = () => {
  return {
    user: null
  }
}

export const getters = {
  userLoggedIn: () => {
    if (process.browser) {
      return sessionStorage.token != null
    }
    return false
  },
  user: (state) => state.user
}

export const mutations = {
  STORE_TOKEN: (state, token) => {
    if (process.browser) {
      sessionStorage.token = token
      window.location.reload()
    }
  },
  CLEAN_TOKEN: (state) => {
    if (process.browser) {
      sessionStorage.removeItem('token')
      window.location.reload()
    }
  },
  STORE_USER: (state, user) => {
    state.user = user
  },
  CLEAN_USER: (state) => {
    state.user = null
  }
}

export const actions = {
  async LOGIN({ commit, state }, { login, password }) {
    const response = await this.$axios.post('/login', {
      data: {
        attributes: {
          login,
          password
        }
      }
    })

    commit('STORE_TOKEN', response.data.token)
  },

  LOGOUT({ commit }) {
    commit('CLEAN_TOKEN')
    commit('CLEAN_USER')
  },

  async LOAD_USER({ commit }) {
    const { data } = await this.$axios.get('/me')
    commit('STORE_USER', { id: data.data.id, ...data.data.attributes })
  }
}
