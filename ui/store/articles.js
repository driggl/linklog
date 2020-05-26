// =================================================
// State
// =================================================
export const state = () => {
  const store = {
    articles: []
  }

  return store
}

// =================================================
// Getters
// =================================================
export const getters = {
  articles: (state) => state.articles
}

// =================================================
// Mutations
// =================================================
export const mutations = {
  PUSH_ARTICLES: (state, articles) => {
    state.articles.push(...articles)
  }
}

// =================================================
// Actions
// =================================================
export const actions = {
  async FETCH_ARTICLES({ commit }) {
    const response = await this.$axios.get('/articles')
    const articles = response.data.data
    commit('PUSH_ARTICLES', articles)
  }
}
