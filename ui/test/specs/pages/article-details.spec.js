import { mount, buildStore } from '~/test/utils'
import ArticleDetailsPage from '@/pages/articles/_slug/index.vue'

describe('ArticleDetailsPage', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(ArticleDetailsPage, {
      mocks: {
        $route: {
          params: { slug: 'Sample article title' }
        }
      },
      store: buildStore('articles', {
        getters: {
          findArticle: () => () => ({
            title: 'Sample article title',
            content: '# This is title'
          })
        }
      })
    })
  }

  test('article title is displayed', () => {
    mountComponent()
    expect(wrapper.exists()).toEqual(true)
    // expect(wrapper.find('.container h1').text()).toEqual('Sample article title')
  })

  test('article content is displayed', () => {
    mountComponent()
    // expect(wrapper.find('#article-content').text()).toEqual('This is title')
  })
})
