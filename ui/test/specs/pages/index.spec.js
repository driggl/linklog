import { shallow, buildStore } from '~/test/utils'
import MainPage from '@/pages/index.vue'

describe('Main page', () => {
  let wrapper
  function mountComponent() {
    wrapper = shallow(MainPage, {
      store: buildStore('articles', {
        getters: {
          articles: () => []
        },
        actions: {
          FETCH_ARTICLES: () => {}
        }
      })
    })
  }

  test('is a Vue instance', () => {
    mountComponent()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
