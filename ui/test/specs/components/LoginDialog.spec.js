import { mount } from '~/test/utils'
import LoginDialog from '@/components/LoginDialog'

describe('LoginDialog', () => {
  let wrapper
  function mountComponent() {
    wrapper = mount(LoginDialog, {
      propsData: {
        visible: true
      }
    })
  }

  test('Inputs are empty on start', () => {
    mountComponent()
    expect(wrapper.find('#login-input').element.value).toEqual('')
    expect(wrapper.find('#password-input').element.value).toEqual('')
  })
})
