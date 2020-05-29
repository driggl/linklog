export const state = () => {
  return {
    token: null,
    user: null
  }
}

export const getters = {
  userLoggedIn: (state) => state.token !== null,
  user: (state) => state.user
}

export const mutations = {
  STORE_TOKEN: (state, token) => {
    state.token = token
  },
  STORE_USER: (state, user) => {
    state.user = user
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
    const { data } = await this.$axios.get('/me', {
      headers: { Authorization: `Bearer ${response.data.token}` }
    })
    commit('STORE_USER', { ...data.data.attributes })
  }
}
