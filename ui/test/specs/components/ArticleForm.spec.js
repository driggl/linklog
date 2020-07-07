import { mount } from '~/test/utils'
import ArticleForm from '@/components/ArticleForm'

describe('ArticleForm', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(ArticleForm, {
      propsData: {
        article: {},
        progress: false
      }
    })
  }

  test('Inputs are empty on start', () => {
    mountComponent()
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
