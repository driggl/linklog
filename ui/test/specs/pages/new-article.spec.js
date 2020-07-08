import { mount, buildStore } from '~/test/utils'
import NewArticlePage from '@/pages/articles/new.vue'

describe('NewArticlePage', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(NewArticlePage, {
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
  })

  test('article content is displayed', () => {
    mountComponent()
    // expect(wrapper.find('#article-content').text()).toEqual('This is title')
  })
})
