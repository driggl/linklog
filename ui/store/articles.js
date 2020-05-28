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
  articles: (state) => state.articles,
  findArticle: (state) => (slug) =>
    state.articles.find((article) => article.slug === slug)
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
    const articles = response.data.data.map((item) => ({
      ...item.attributes
    }))
    commit('PUSH_ARTICLES', articles)
  }
}
