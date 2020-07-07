import * as TextUtils from '../lib/utils/text-utils'
export const state = () => {
  const store = {
    nextPageNumber: 1,
    articles: []
  }

  return store
}

export const getters = {
  articles: (state) => state.articles,
  findArticle: (state) => (slug) => state.articles.find((article) => article.slug === slug)
}

export const mutations = {
  PUSH_ARTICLES: (state, articles) => {
    state.articles.push(...articles)
    state.nextPageNumber++
  },
  REMOVE_ARTICLE: (state, articleId) => {
    const index = state.articles.findIndex((article) => article.id === articleId)
    state.articles.splice(index, 1)
  },
  UPDATE_ARTICLE_DATA: (state, article) => {
    Object.assign(
      state.articles.find((a) => a.id === article.id),
      article
    )
  },
  PREPEND_ARTICLE: (state, article) => {
    state.articles.unshift(article)
  }
}

export const actions = {
  async FETCH_ARTICLES({ commit, state }) {
    const PAGE_SIZE = 10
    const { data } = await this.$axios.get('/articles', {
      params: {
        'page[number]': state.nextPageNumber,
        'page[size]': PAGE_SIZE
      }
    })
    const articles = data.data.map((item) => {
      const userId = item.relationships.user.data.id
      const user = data.included.find((i) => i.type === 'user' && i.id === userId)

      return mapArticle(item, user)
    })
    commit('PUSH_ARTICLES', articles)
    return !data.links.next
  },

  async GET_ARTICLE(_, articleId) {
    const { data } = await this.$axios.get(`/articles/${articleId}`)
    return mapArticle(data.data, data.included[0])
  },

  async DELETE_ARTICLE({ commit }, articleId) {
    await this.$axios.delete(`/articles/${articleId}`)
    commit('REMOVE_ARTICLE', articleId)
  },

  async CREATE_ARTICLE({ commit, dispatch }, article) {
    const slug = TextUtils.slugify(article.title)
    await this.$axios.post('/articles', {
      data: {
        attributes: {
          title: article.title,
          content: article.content,
          slug
        }
      }
    })
    article = await dispatch('GET_ARTICLE', slug)
    commit('PREPEND_ARTICLE', article)
  },

  async UPDATE_ARTICLE({ commit, dispatch }, article) {
    await this.$axios.patch(`/articles/${article.id}`, {
      data: {
        attributes: {
          title: article.title,
          content: article.content
        }
      }
    })
    article = await dispatch('GET_ARTICLE', article.id)
    commit('UPDATE_ARTICLE_DATA', article)
  }
}

function mapArticle(item, author) {
  const article = {
    id: item.id,
    title: item.attributes.title,
    slug: item.attributes.slug,
    content: item.attributes.content,
    excerpt: item.attributes.excerpt
  }

  if (author) {
    article.author = {
      id: author.id,
      login: author.attributes.login,
      name: author.attributes.name,
      email: author.attributes.email,
      url: author.attributes.url,
      avatarUrl: author.attributes.avatarUrl
    }
  }
  return article
}
