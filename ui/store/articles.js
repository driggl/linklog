import * as TextUtils from '../lib/utils/text-utils'
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
  findArticle: (state) => (slug) => state.articles.find((article) => article.slug === slug)
}

// =================================================
// Mutations
// =================================================
export const mutations = {
  PUSH_ARTICLES: (state, articles) => {
    state.articles.push(...articles)
  },
  REMOVE_ARTICLE: (state, articleId) => {
    const index = state.articles.findIndex((article) => article.id === articleId)
    state.articles.splice(index, 1)
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
      const user = data.included.find((i) => i.type === 'user' && i.id === userId)

      return {
        id: item.id,
        title: item.attributes.title,
        slug: item.attributes.slug,
        content: item.attributes.content,
        excerpt: item.attributes.excerpt,
        author: {
          id: user.id,
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
  },

  async GET_ARTICLE(_, articleId) {
    const { data } = await this.$axios.get(`/articles/${articleId}`)

    const item = data.data
    return {
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      content: item.attributes.content,
      excerpt: item.attributes.excerpt
    }
  },

  async DELETE_ARTICLE({ commit }, articleId) {
    await this.$axios.delete(`/articles/${articleId}`)
    commit('REMOVE_ARTICLE', articleId)
  },

  async CREATE_ARTICLE(_, article) {
    await this.$axios.post('/articles', {
      data: {
        attributes: {
          title: article.title,
          content: article.content,
          slug: TextUtils.slugify(article.title)
        }
      }
    })
  },

  async UPDATE_ARTICLE(_, article) {
    await this.$axios.patch(`/articles/${article.id}`, {
      data: {
        attributes: {
          title: article.title,
          content: article.content,
          slug: TextUtils.slugify(article.title)
        }
      }
    })
  }
}
