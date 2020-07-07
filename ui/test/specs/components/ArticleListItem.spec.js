import { mount } from '~/test/utils'
import ArticleListItem from '@/components/ArticleListItem'

describe('ArticleListItem', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(ArticleListItem, {
      propsData: {
        article: {}
      }
    })
  }

  test('Is vue instance', () => {
    mountComponent()
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
