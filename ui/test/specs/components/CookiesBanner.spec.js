import { mount } from '~/test/utils'
import CookiesBanner from '@/components/CookiesBanner'

describe('CookiesBanner', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(CookiesBanner)
  }

  test('Contains cookies message', () => {
    mountComponent()
    expect(wrapper.text()).toContain('This website uses cookies to ensure you get the best experience on our website')
  })

  test('Emits "accepted" event after click on close button', () => {
    mountComponent()
    wrapper.find('.close-button').trigger('click')
    expect(wrapper.emitted('accepted').length).toEqual(1)
  })
})
