import { mount, buildStore } from '~/test/utils'
import ArticleDetailsPage from '@/pages/articles/_slug/index.vue'
import { getArticle } from '~/test/fixtures/articles'

describe('ArticleDetailsPage', () => {
  let wrapper
  async function mountComponent(config = {}) {
    wrapper = mount(ArticleDetailsPage, {
      mocks: {
        $route: {
          params: { slug: 'first-sample-article' }
        },
        $auth: {
          loggedIn: !!config.user,
          user: config.user || null
        }
      },
      stubs: ['disqus'],
      store: buildStore('articles', {
        actions: {
          GET_ARTICLE: () => getArticle()
        }
      })
    })
    await wrapper.vm.$options.fetch.bind(wrapper.vm)()
  }

  test('title, author and content are displayed', async () => {
    await mountComponent()
    expect(wrapper.find('h1').text()).toEqual('First sample article')

    expect(wrapper.text()).toContain('Author: xjohn')

    expect(wrapper.find('#article-content p').text()).toContain('This is sample content')
    expect(wrapper.find('#article-content h1').text()).toContain('Header 1')
    expect(wrapper.find('#article-content h2').text()).toContain('Header 2')
  })
})
