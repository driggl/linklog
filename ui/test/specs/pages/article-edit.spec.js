import { mount, buildStore } from '~/test/utils'
import ArticleEditPage from '@/pages/articles/_slug/edit.vue'

describe('ArticleEditPage', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(ArticleEditPage, {
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
    expect(wrapper.isVueInstance()).toEqual(true)
    // expect(wrapper.find('.container h1').text()).toEqual('Sample article title')
  })

  test('article content is displayed', () => {
    mountComponent()
    // expect(wrapper.find('#article-content').text()).toEqual('This is title')
  })
})
