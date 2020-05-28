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
  async FETCH_ARTICLES({ commit, state }) {
    const PAGE_SIZE = 10
    const { data } = await this.$axios.get('/articles', {
      params: {
        'page[number]': state.articles.length / PAGE_SIZE + 1,
        'page[size]': PAGE_SIZE
      }
    })
    const articles = data.data.map((item) => {
      const userId = item.relationships.user.data.id
      const user = data.included.find(
        (i) => i.type === 'user' && i.id === userId
      )

      return {
        title: item.attributes.title,
        slug: item.attributes.slug,
        content: item.attributes.content,
        author: {
          login: user.attributes.login,
          name: user.attributes.name,
          email: user.attributes.email,
          url: user.attributes.url,
          avatarUrl: user.attributes.avatarUrl
        }
      }
    })
    commit('PUSH_ARTICLES', articles)
    return !data.links.next
  }
}
